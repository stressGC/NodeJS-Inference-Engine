const { VALUES } = require('../../../config');

const checkForWin = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      /* check if we discovered a portal */
      if (matrix[x][y] === VALUES.PORTAL) return true;
    }
  }
  return false;
};

module.exports = {
  "priority": 1000,
  "condition": function(R) {
    const HAS_WON = checkForWin(this.matrix);
    R.when(HAS_WON);
  },
  "consequence": function(R) {
    this.result = {
      type: 'WIN',
    };
    R.stop();
  }
}