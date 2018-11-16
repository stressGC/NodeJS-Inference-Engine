const { computeBorderCells } = require('../../../utils');

module.exports = {
  "priority": 990,
  "condition": function(R) {
    const NEEDS_TO_COMPUTE_BORDER = !(this.hasOwnProperty("borderCells"));
    R.when(NEEDS_TO_COMPUTE_BORDER);
  },
  "consequence": function(R) {
    const borderCells = computeBorderCells(this.matrix, this.deducted);
    this.borderCells = borderCells;
    R.next();
  }
}