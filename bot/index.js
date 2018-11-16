const logic  = require('./logic');
const print = require('../display');

const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue
} = require('../utils');

class Bot {
  
  constructor(board, score){
    this._board = board;
    this._level = board.length;
    this.initialise();
    this._x = 0;
    this._y = 0;
    this._score = score;
    
    this._logic = logic;
  }
  
  async think() {
    /* if death or win has been computed, pass */
    this.display();
    if(this._dead) return false;
    if(this._win) return true;

    /* observe env */
    const newValue = this.observeEnv();
    
    /* compute rules */
    this.updateState(newValue);
    
    const action = await this.chooseAction();
    this.doAction(action);
  }
  
  observeEnv() {
    /* get the informations based on our sensors */
    const value = this._board[this._y][this._x];
    // console.log(`(${this._x},${this._y}) = {${value}}`);
    return value;
  }
  
  updateState(newValue) { 
    if (newValue === 'P') this._win = true;
    if (newValue === 'M' || newValue === 'R') this._dead = true;
    
    this._knowledge[this._y][this._x] = newValue;
    
    return null;
  }
  
  async chooseAction() {
    /* reset our fact variable*/
    this.resetFacts();
    delete this._result;
    
    const fact = {
      matrix : this._knowledge,
      deducted : this._deducted,
    }
    
    const executeRules = new Promise(resolve => {
      this._logic.execute(fact, ((data) => resolve(data.result)));
    });
    
    const result = await executeRules;
    return result;
  }
  
  doAction(action) {
    this._actionMessage = action;
    switch(action.type) {
      case 'GOTO':
        this._score--;
        this._x = action.x;
        this._y = action.y;
        break;
      case 'WIN':
        this._score += 10;
        this._win = true;
        break;
      case 'DEATH':
        this._score -= 10 * Math.pow(this._board.length, 2)
        this._dead = true;
        break;
      case 'UPDATE_KNOWLEDGE':
        this._knowledge[action.y][action.x] = action.value;
        this._deducted[action.y][action.x] = true;
        break;
      case 'SHOOT':
        this._score -= 10;
        /* shoot at monster */
        this.shootHandler(action.x, action.y)

        /* goto the cell */
        this._x = action.x;
        this._y = action.y;
        break;
      default:
        this._dead = true;
        console.log("=> CASE NOT HANDLED BY BOT");
        break;
    }
  }

  shootHandler(x, y) {
    if (this._board[y][x] === 'M') {

      /* check if the smell should remain or disapear (is there another monster around ?) */

      let newValue = ' ';
      if (southExists(this._board.length, x, y) && (getSouthValue(this._board, x, y) === 'M' || getSouthValue(this._board, x, y) === 'R')) {
        newValue = getSouthValue(this._board, x, y).toLowerCase();
      } 
      if (northExists(this._board.length, x, y) && (getNorthValue(this._board, x, y) === 'M' || getNorthValue(this._board, x, y) === 'R')) {
        newValue = getNorthValue(this._board, x, y).toLowerCase();
      } 
      if (eastExists(this._board.length, x, y) && (getEastValue(this._board, x, y) === 'M' || getEastValue(this._board, x, y) === 'R')) {
        newValue = getEastValue(this._board, x, y).toLowerCase();
      } 
      if (westExists(this._board.length, x, y) && (getWestValue(this._board, x, y) === 'M' || getWestValue(this._board, x, y) === 'R')) {
        newValue = getWestValue(this._board, x, y).toLowerCase();
      } 
      this._board[y][x] = newValue;
    } 
  }
  
  initialise() {
    const length = this._board.length;
    
    this._knowledge = new Array(length).fill('?').map(() => new Array(length).fill('?'));
    this._knowledge[0][0] = ' ';
    
    this._deducted = new Array(length).fill(false).map(() => new Array(length).fill(false));
  }
  
  resetFacts() {
    this._facts = Array();
  }

  display() {
    print(this);
  }
};

module.exports = Bot;