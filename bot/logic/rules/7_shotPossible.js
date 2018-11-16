const { VALUES } = require('../../../config');
const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue,
  getRandom,
  computeBorderCells,
} = require('../../../utils');

/* checks if we are blocked by at least one monster */
const blockedByMonsters = (matrix, borderCells) => {
  for (cell of borderCells) {
    if (matrix[cell.y][cell.x] === VALUES.SMELL) return true;
  }
  return false;
}

/* returns a cell to shoot at */
const whereToShoot = (matrix, blockers) => {
  for (blocker of blockers) {
    if (matrix[blocker.y][blocker.x] === VALUES.SMELL) return getRandomUnknownAround(matrix, blocker.x, blocker.y);
  }
}

/* returns a random unknown cell around a given one */
const getRandomUnknownAround = (matrix, x, y) => {
  let unknownAround = Array();

  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y)  === VALUES.UNKNOWN) unknownAround.push({ x: x, y: y + 1});
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y)  === VALUES.UNKNOWN) unknownAround.push({ x: x - 1, y: y});
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y)  === VALUES.UNKNOWN) unknownAround.push({ x: x + 1, y: y});
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y)  === VALUES.UNKNOWN) unknownAround.push({ x: x, y: y - 1});

  const index = getRandom(0, unknownAround.length - 1);
  return unknownAround[index];
}

module.exports = {
  "priority": 980,
  "condition": function(R) {
    const NEEDS_TO_COMPUTE_BORDER = !(this.hasOwnProperty("blockingCells"));
    if (NEEDS_TO_COMPUTE_BORDER) this.blockingCells = computeBorderCells(this.matrix, this.deducted);

    const BLOCKED_BY_MONSTERS = blockedByMonsters(this.matrix, this.blockingCells);
    R.when(BLOCKED_BY_MONSTERS);
  },
  "consequence": function(R) {
    /* deciding where to shoot at */
    const { x, y } = whereToShoot(this.matrix, this.blockingCells);
    this.result = {
      type: 'SHOOT',
      x,
      y
    };
    R.stop();
  }
}