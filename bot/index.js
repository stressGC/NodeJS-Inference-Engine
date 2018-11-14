const logic  = require('./logic');

class Bot {

  constructor(board){
    this._board = board;
    this.initialiseKnowledge();
    this._x = 0;
    this._y = 0;

    this._logic = logic;
  }

  async think() {
    /* if death or win has been computed, pass */
    if(this._dead) return false;
    if(this._win) return true;

    /* observe env */
    this.observeEnv();

    /* compute rules */
    await this.updateState();

    const action = this.chooseAction();

    this.doAction(action);
  }

  observeEnv() {
    /* get the informations based on our sensors */
    const value = this._board[this._y][this._x];
    console.log(`(${this._x},${this._y}) = {${value}}`);
    this._knowledge[this._y][this._x] = value;
  }

  async updateState() { 
    console.log("launching inference based on : ")
    console.log(this._knowledge);

    /* reset our fact variable*/
    this.resetFacts();
    delete this._result;

    const fact = {
      matrix : this._knowledge,
    }

    const executeRules = new Promise(resolve => {
      this._logic.execute(fact, ((data) => resolve(data)));
    });

    const result = await executeRules;
    this._result = {
      ...result.result,
      type: "GOTO",
    };
  }

  chooseAction() {
    switch(this._result.type) {
      case 'GOTO':
        return this._result;
      case 'SHOOT':
        return this._result;
      default:
        return null;
    }
  }

  doAction(action) {
    console.log("doing action : ", action);
    if(action.type === 'GOTO') {
      this._x = action.x;
      this._y = action.y;
    }
  }

  initialiseKnowledge() {
    const length = this._board.length;

    this._knowledge = new Array(length).fill('?').map(() => new Array(length).fill('?'));
    this._knowledge[0][0] = ' ';
  }

  resetFacts() {
    this._facts = Array();
  }
};

module.exports = Bot;