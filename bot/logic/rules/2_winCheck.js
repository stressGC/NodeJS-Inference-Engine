const checkForWin = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      /* check if we discovered an illegal cell */
      if (matrix[x][y] === 'P') return true;
    }
  }
  return false;
}

module.exports = {
  "priority": 1000,
  "condition": function(R) {
    const a = checkForWin(this.matrix);
    R.when(a);
  },
  "consequence": function(R) {
    // console.log("IS WINNINNNG RULE");
    this.result = {
      type: 'WIN',
    };
    R.stop();
  }
}