const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue
} = require('../../../utils');

const computeBorderCells = (matrix) => {
  let borderCells = Array();
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(checkIfBorder(matrix, x, y)) borderCells.push({ x, y })
    }
  }
  return borderCells;
};

const checkIfBorder = (matrix, x, y) => {
  /* is border if any of its neighbours is unknown and at least one is known */
  if(matrix[y][x] === '?') return false; // if we are unknown => not in border

  const unknownChars = ['?'];
  const unknownCount = countForValueAround(matrix, x, y, unknownChars);
  const knownChars = [' ', 'm', 'm', 'r', 'R'];
  const knownCount = countForValueAround(matrix, x, y, knownChars);
  return (knownCount > 0 && unknownCount > 0)
};

const countForValueAround = (matrix, x, y, values) => {
  let count = 0;
  if (southExists(matrix.length, x, y) && values.includes(getSouthValue(matrix, x, y))) count++;
  if (westExists(matrix.length, x, y) && values.includes(getWestValue(matrix, x, y))) count++;
  if (northExists(matrix.length, x, y) && values.includes(getNorthValue(matrix, x, y))) count++;
  if (eastExists(matrix.length, x, y) && values.includes(getEastValue(matrix, x, y))) count++;

  return count;
}

module.exports = {
  "priority": 990,
  "condition": function(R) {
    const NEEDS_TO_COMPUTE_BORDER = !(this.hasOwnProperty("borderCells"));
    R.when(NEEDS_TO_COMPUTE_BORDER);
  },
  "consequence": function(R) {
    const borderCells = computeBorderCells(this.matrix);
    this.borderCells = borderCells;
    R.next();
  }
}