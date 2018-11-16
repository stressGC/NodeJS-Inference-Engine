const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue,
  getRandom,
} = require('../../../utils');

const computeBlockingCell = (matrix, deducted) => {
  let borderCells = Array();
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(checkIfBorder(matrix, x, y, deducted)) borderCells.push({ x, y })
    }
  }
  return borderCells;
};

const checkIfBorder = (matrix, x, y, deducted) => {
  /* is border if any of its neighbours is unknown and at least one is known AND cell has not been deducted (blocks recursivity)*/
  if(matrix[y][x] === '?') return false; // if we are unknown => not in border

  const unknownChars = ['?'];
  const unknownCount = countForValueAround(matrix, x, y, unknownChars);

  const knownChars = [' ', 'm', 'm', 'r', 'R'];
  const knownCount = countForValueAround(matrix, x, y, knownChars);

  const hasBeenDeducted = deducted[y][x]; // if true, has been deducted

  return (knownCount > 0 && unknownCount > 0 && !hasBeenDeducted)
};

const countForValueAround = (matrix, x, y, values) => {
  let count = 0;
  
  if (southExists(matrix.length, x, y) && values.includes(getSouthValue(matrix, x, y))) count++;
  if (westExists(matrix.length, x, y) && values.includes(getWestValue(matrix, x, y))) count++;
  if (northExists(matrix.length, x, y) && values.includes(getNorthValue(matrix, x, y))) count++;
  if (eastExists(matrix.length, x, y) && values.includes(getEastValue(matrix, x, y))) count++;

  return count;
}

const blockedByMonsters = (matrix, borderCells) => {
  for (cell of borderCells) {
    if (matrix[cell.y][cell.x] === "m") return true;
  }
  return false;
}

const whereToShoot = (matrix, blockers) => {
  for (blocker of blockers) {
    if (matrix[blocker.y][blocker.x] === "m") {
      return getRandomUnknownAround(matrix, blocker.x, blocker.y);
    }
  }
}

const getRandomUnknownAround = (matrix, x, y) => {
  let unknownAround = Array();

  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y)  === '?') unknownAround.push({ x: x, y: y + 1});
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y)  === '?') unknownAround.push({ x: x - 1, y: y});
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y)  === '?') unknownAround.push({ x: x + 1, y: y});
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y)  === '?') unknownAround.push({ x: x, y: y - 1});

  const index = getRandom(0, unknownAround.length - 1);
  return unknownAround[index];
}

module.exports = {
  "priority": 980,
  "condition": function(R) {

    const NEEDS_TO_COMPUTE_BORDER = !(this.hasOwnProperty("blockingCells"));
    if (NEEDS_TO_COMPUTE_BORDER) this.blockingCells = computeBlockingCell(this.matrix, this.deducted);

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