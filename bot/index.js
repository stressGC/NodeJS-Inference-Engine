const RuleEngine = require("node-rules");

class Bot {

  constructor(){
    this.initialiseKnowledge();
    this._x = 1;
    this._y = 1;
    console.log(this._knowledge);
  }

  async think() {
    /* if death or win has been computed, pass */
    if(this._dead) return false;
    if(this._win) return true;

    /* observe env */
    this.observeEnv();

    /* compute rules */
    await this.updateState();

    /*this.chooseAction();

    this.doAction();*/
  }

  observeEnv() {
    /* get the informations based on our sensors */
    const value = ' ';
    this._knowledge[this._y][this._x] = value;
  }

  async updateState() { 
    console.log("launching inference based on : ")
    console.log(this._knowledge);
    /* reset our fact variable*/
    this.resetFacts();

    const executeRules = new Promise(resolve => {
      this._R.execute(fact, ((data) => resolve(data)));
    });

    const result = await executeRules;
    console.log(result); process.exit(0);
  }

  chooseAction() {
  }

  doAction() {
  }

  initialiseKnowledge() {
    //const length = this._board.length;
    const a = [[' ','?', '?', '?'],
              [' ','?', '?', '?'],
              [' ','?', '?', '?'],
              ['?','?', '?', '?']];

    this._knowledge = a;//new Array(length).fill(VALUES.UNKNOWN).map(() => new Array(length).fill(VALUES.UNKNOWN));
    //this._knowledge[0][0] = VALUES.DEFAULT;
  }

  resetFacts() {
    this._facts = Array();
  }
};

module.exports = Bot;