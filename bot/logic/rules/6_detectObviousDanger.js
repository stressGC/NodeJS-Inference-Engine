const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue
} = require('../../../utils');

const countForValueAround = (matrix, x, y, values) => {
  let count = 0;
  if (southExists(matrix.length, x, y) && values.includes(getSouthValue(matrix, x, y))) count++;
  if (westExists(matrix.length, x, y) && values.includes(getWestValue(matrix, x, y))) count++;
  if (northExists(matrix.length, x, y) && values.includes(getNorthValue(matrix, x, y))) count++;
  if (eastExists(matrix.length, x, y) && values.includes(getEastValue(matrix, x, y))) count++;

  return count;
}

const getCoordsIfOnlyOneUnknownAround = (matrix, x, y) => {
  let unknownCoords = Array();
  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y) === '?') unknownCoords.push({ x: x, y: y+1});
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y) === '?') unknownCoords.push({ x: x-1, y: y});
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y) === '?') unknownCoords.push({ x: x, y: y-1});
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y) === '?') unknownCoords.push({ x: x+1, y: y});

  if (unknownCoords.length === 1) return unknownCoords[0];
  return false;
}

const identifyObviousDanger = (matrix, x, y) => {
  const value = matrix[y][x];
  // console.log("checking danger for ", value, x, y);

  /* if we discovered a danger around this hint, then its not relevant */
  const hintRelevant = countForValueAround(matrix, x, y, value.toUpperCase()) === 0;
  const coords = getCoordsIfOnlyOneUnknownAround(matrix, x, y);

  if(coords.hasOwnProperty('x') && hintRelevant) {

    return {
      type : 'UPDATE_KNOWLEDGE',
      x: coords.x,
      y: coords.y,
      value: value.toUpperCase(),
    } 
  }
  return false;
}

module.exports = {
  "priority": 990,
  "condition": function(R) {
    const BORDER_CELL_TO_COMPUTE = (this.borderCells.length > 0);
    R.when(BORDER_CELL_TO_COMPUTE);
  },
  "consequence": function(R) {
    const { x, y } = this.borderCells.pop();
    const action = identifyObviousDanger(this.matrix, x, y);
    if (action.hasOwnProperty('type')) {
      this.result = action;
      R.stop();
    }
    R.next();
  }
}