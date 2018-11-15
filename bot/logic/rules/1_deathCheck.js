const checkForDeath = (obj) => {
  const { matrix, deducted } = obj;
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      /* check if we discovered an illegal cell that has not been deducted */
      if ((matrix[y][x]=== 'M' || matrix[y][x]=== 'R') && !deducted[y][x]) return true;
    }
  }
  return false;
}

module.exports = {
  "priority": 1001,
  "condition": function(R) {
    const a = checkForDeath(this);
    R.when(a);
  },
  "consequence": function(R) {
    // console.log("IS DEADDDDDDD RULE");
    this.result = {
      type: 'DEATH',
    };
    R.stop();
  }
}