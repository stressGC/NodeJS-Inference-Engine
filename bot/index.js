const logic  = require('./logic');
const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue,
  getRandom,
} = require('../utils');

class Bot {
  
  constructor(board){
    this._board = board;
    this.initialise();
    this._x = 0;
    this._y = 0;
    
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
    console.log("doing action : " + action.type)
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
    console.log("doing action : ", action);
    switch(action.type) {
      case 'GOTO':
        this._x = action.x;
        this._y = action.y;
        break;
      case 'WIN':
        this._win = true;
        break;
      case 'DEATH':
        this._dead = true;
        break;
      case 'UPDATE_KNOWLEDGE':
        this._knowledge[action.y][action.x] = action.value;
        this._deducted[action.y][action.x] = true;
        break;
      case 'SHOOT':
        console.log(action);
        /* shoot at monster */
        this.shootHandler(action.x, action.y)

        /* goto the cell */
        this._x = action.x;
        this._y = action.y;
        break;
      default:
        this._dead = true;
        console.log("end of known rules")
        break;
    }
  }

  shootHandler(x, y) {
    if (this._board[y][x] === 'M') {
      console.log('you killed a monster @', x , y)
      
      // /* the smells of the killed monster disapears */

      // if ()

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
      console.log("setting new value to ", newValue);
      this._board[y][x] = newValue;
    } else {
      console.log("monster missed")
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
    console.log("================================")
    console.log(this._knowledge);
    console.log("_________________________")
    console.log(this._board);
  }
};

module.exports = Bot;