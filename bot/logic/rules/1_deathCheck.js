const checkForDeath = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      /* check if we discovered an illegal cell */
      if (matrix[x][y]=== 'M' || matrix[x][y]=== 'R') return true;
    }
  }
  return false;
}

module.exports = {
  "priority": 1001,
  "condition": function(R) {
    const a = checkForDeath(this.matrix);
    R.when(a);
  },
  "consequence": function(R) {
    // console.log("IS DEADDDDDDD RULE");
    this.action = {
      type: 'DEATH',
    };
    R.stop();
  }
}