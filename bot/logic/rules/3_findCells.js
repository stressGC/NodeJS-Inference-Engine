const { VALUES } = require('../../../config');
const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue 
} = require('../../../utils');

const isBorder = (matrix, x, y) => {
  /* returns true if at least one surronding cell is known */
  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y)  !== VALUES.UNKNOWN) return true;
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y)  !== VALUES.UNKNOWN) return true;
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y)  !== VALUES.UNKNOWN) return true;
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y)  !== VALUES.UNKNOWN) return true;
  return false;
}

const isPossible = (matrix, x, y) => {
  if(matrix[y][x] !== VALUES.UNKNOWN) return false;
  
  if(!isBorder(matrix, x, y)) return false;
  
  return true;
}

/* returns all possible moves */
const checkMoves = (obj) => {
  const toCheck = Array();
  for(let x = 0; x < obj.matrix.length; x++) {
    for(let y = 0; y < obj.matrix.length; y++) {
      /* if we can go there, then add it to the return */
      if (isPossible(obj.matrix, x, y)) toCheck.push({ x, y });
    }
  }
  return toCheck;
}

module.exports = {
  "priority": 999,
  "condition": function(R) {
    const COMPUTATION_REQUIRED = !this.possibleCellsComputed; /* need to compute if no fact */
    R.when(COMPUTATION_REQUIRED);
  },
  "consequence": function(R) {
    const possibleMoves = checkMoves(this);
    if (!this.cells) this.cells = Array();
    this.cells = possibleMoves;
    this.possibleCellsComputed = true;
    R.next();
  }
}