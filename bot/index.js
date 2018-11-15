const logic  = require('./logic');

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
      case 'UPDATE_KNOWLEDGE':
        this._knowledge[action.y][action.x] = action.value;
        this._deducted[action.y][action.x] = true;
        break;
      break;
        default:
        this._dead = true;
        console.log("end of known rules")
        break;
    }
  }
  
  initialise() {
    const length = this._board.length;
    
    this._knowledge = new Array(length).fill('?').map(() => new Array(length).fill('?'));
    this._knowledge[0][0] = ' ';
    
    this._deducted = new Array(length).fill(false).map(() => new Array(length).fill(false));
    console.log(this._deducted);
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