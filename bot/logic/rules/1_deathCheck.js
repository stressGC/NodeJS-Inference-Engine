const { VALUES } = require('../../../config');

/* look for not deducted monster or rift in knowledge */
const checkForDeath = (obj) => {
  const { matrix, deducted } = obj;
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      /* check if we discovered an illegal cell that has not been deducted */
      if ((matrix[y][x]=== VALUES.MONSTER || matrix[y][x]=== VALUES.RIFT) && !deducted[y][x]) return true;
    }
  }
  return false;
}

module.exports = {
  "priority": 1001,
  "condition": function(R) {
    const IS_DEAD = checkForDeath(this);
    R.when(IS_DEAD);
  },
  "consequence": function(R) {
    this.result = {
      type: 'DEATH',
    };
    R.stop();
  }
}