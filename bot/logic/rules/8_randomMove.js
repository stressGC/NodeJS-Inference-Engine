const { getRandom } = require('../../../utils');

module.exports = {
  "priority": 0,
  "condition": function(R) {
    const REMAINING_MOVES = (this.cells.length > 0);
    R.when(REMAINING_MOVES);
  },
  "consequence": function(R) {
    const index = getRandom(0, this.cells.length - 1);
    /* returning a random move from the possible moves */
    const { x, y } = this.cells[index];
    this.result = {
      type: 'GOTO',
      x,
      y
    };
    R.stop();
  }
}