const logic  = require('./logic');
const print = require('../display');
const { VALUES } = require('../config');
const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue
} = require('../utils');

class Bot {
  
  constructor(board, score){
    this._board = board;
    this._level = board.length;
    this.initialiseMatrixes();
    this._x = 0;
    this._y = 0;
    this._lastScore = '';
    this._score = score;

    /* register inference engine */
    this._logic = logic;
  }
  
  async think() {

    /* if death or win has been computed, pass */
    this.display();
    if(this._dead) return false;
    if(this._win) return true;

    /* observe env */
    const newValue = this.observeEnv();
    
    /*  update agent knowledge with newValue */
    this.updateState(newValue);
    
    /* chose the best action */
    const action = await this.chooseAction();

    /* do this best action */
    this.doAction(action);
  }
  
  observeEnv() {
    /* get the informations based on our sensors */
    const value = this._board[this._y][this._x];
    return value;
  }
  
  updateState(newValue) { 
    /* check if we discovered a portal or a mosnter / rift */
    if (newValue === VALUES.PORTAL) this._win = true;
    if (newValue === VALUES.MONSTER || newValue === VALUES.RIFT) this._dead = true;
    
    /* update knowledge */
    this._knowledge[this._y][this._x] = newValue;
  }
  
  async chooseAction() {
    /* reset our variables*/
    this.resetFacts();
    delete this._result;
    
    /* our base fact is only the knowledge of the bot (pure knowledge & deducted cells) */
    const fact = {
      matrix : this._knowledge,
      deducted : this._deducted,
    }
    
    /* go trhough the inference engine */
    const executeRules = new Promise(resolve => {
      this._logic.execute(fact, ((data) => resolve(data.result)));
    });
    
    /* returns our resultant action */
    const result = await executeRules;
    return result;
  }
  
  doAction(action) {
    this._actionMessage = action; // for display purpose

    switch(action.type) {
      case 'GOTO':
        this.scoreUpdate(-1);

        /* go to the cell */
        this._x = action.x;
        this._y = action.y;
        break;
      case 'WIN':
        this.scoreUpdate(10  * Math.pow(this._board.length, 2));
        this._win = true;
        break;
      case 'DEATH':
        this.scoreUpdate(-10 * Math.pow(this._board.length, 2));
        this._dead = true;
        break;
      case 'UPDATE_KNOWLEDGE':
        /* we deducted a new cell value */
        this._knowledge[action.y][action.x] = action.value;
        this._deducted[action.y][action.x] = true;
        break;
      case 'SHOOT':
        this.scoreUpdate(-10);
        /* shoot at monster */
        this.shootHandler(action.x, action.y)
        /* goto the cell */
        this._x = action.x;
        this._y = action.y;
        break;
      default:
        /* default case, suppose to never be triggered */
        this._dead = true;
        console.log("=> CASE NOT HANDLED BY BOT");
        break;
    }
  }

  shootHandler(x, y) {
    if (this._board[y][x] === VALUES.MONSTER) {

      /* check if the smell should remain or disapear (is there another monster around ?) */

      let newValue = ' ';
      if (southExists(this._board.length, x, y) && (getSouthValue(this._board, x, y) === VALUES.MONSTER || getSouthValue(this._board, x, y) === VALUES.RIFT)) {
        newValue = getSouthValue(this._board, x, y).toLowerCase();
      } 
      if (northExists(this._board.length, x, y) && (getNorthValue(this._board, x, y) === VALUES.MONSTER || getNorthValue(this._board, x, y) === VALUES.RIFT)) {
        newValue = getNorthValue(this._board, x, y).toLowerCase();
      } 
      if (eastExists(this._board.length, x, y) && (getEastValue(this._board, x, y) === VALUES.MONSTER || getEastValue(this._board, x, y) === VALUES.RIFT)) {
        newValue = getEastValue(this._board, x, y).toLowerCase();
      } 
      if (westExists(this._board.length, x, y) && (getWestValue(this._board, x, y) === VALUES.MONSTER || getWestValue(this._board, x, y) === VALUES.RIFT)) {
        newValue = getWestValue(this._board, x, y).toLowerCase();
      } 
      this._board[y][x] = newValue;
    } 
  }
  
  initialiseMatrixes() {
    const length = this._board.length;
    
    /* set all knowledge to unknown */
    this._knowledge = new Array(length).fill(VALUES.UNKNOWN).map(() => new Array(length).fill(VALUES.UNKNOWN));
    
    /* matrix where cells has been deducted */
    this._deducted = new Array(length).fill(false).map(() => new Array(length).fill(false));
  }
  
  resetFacts() {
    this._facts = Array();
  }

  scoreUpdate(toAdd) {
    this._lastScore = toAdd;
    this._score += toAdd;
  }

  display() {
    print(this);
  }
};

module.exports = Bot;