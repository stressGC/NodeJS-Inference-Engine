const {
  PORTAL_VALUE, DEFAULT_VALUE, RIFT_VALUE, MONSTER_VALUE,
  MONSTER_PROBABILITY_PER_CELL, RIFT_PROBABILITY_PER_CELL
} = require('../../config');
const { getRandom } = require('../../utils');
const {
  northExists, southExists, eastExists, westExists,
  getEastValue, getNorthValue, getSouthValue, getWestValue,
} = require('../../utils');


const generateMatrix = (size, monsterProb, riftProb) => {
  // declare the matrix
  const matrix = new Array(size).fill(DEFAULT_VALUE).map((line) => new Array(size).fill(DEFAULT_VALUE));
  
  // generates the random placement of monsters & rifts
  const generatedMatrix = matrix.map(line => line.map(cell => defineCell(cell, MONSTER_PROBABILITY_PER_CELL, RIFT_PROBABILITY_PER_CELL)));
  
  // Clear any monster or rift from around start (else user falls directly while choosing random direction)
  generatedMatrix[0][0] = DEFAULT_VALUE;
  generatedMatrix[1][0] = DEFAULT_VALUE;
  generatedMatrix[0][1] = DEFAULT_VALUE;
  
  // Set the portal (overrides monster & rift), can't be at start
  let xPortal = 0;
  let yPortal = 0;
  while(xPortal === 0 && yPortal === 0) {
    xPortal = getRandom(0, size - 1);
    yPortal = getRandom(0, size - 1);
  }
  generatedMatrix[yPortal][xPortal] = PORTAL_VALUE;
  // return [ [ ' ', ' ', 'm', 'R' ],
  //         [ 'r', 'm', 'M', 'P' ],
  //         [ 'R', 'r', 'm', ' ' ],
  //         [ ' ', ' ', ' ', ' ' ] ];
  return hintsGeneratedMatrix(generatedMatrix);
};

const hintsGeneratedMatrix = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      matrix[y][x] = placeHint(matrix, x, y)
    }
  }
  
  return matrix;
};

const placeHint = (matrix, x, y) => {
  //if current cell is P or M or R
  if (matrix[y][x] === PORTAL_VALUE || matrix[y][x] === RIFT_VALUE || matrix[y][x] === MONSTER_VALUE) return matrix[y][x];
  
  return checkSurroundingsForDangers(matrix, x, y);
};
const hintFor = value => value.toLowerCase();

const checkSurroundingsForDangers = (matrix, x, y) => {
  
  // if side exists and is M or R => place hint
  if (eastExists(matrix.length, x, y)) {
    const eastValue = getEastValue(matrix, x, y);
    
    if (eastValue === MONSTER_VALUE || eastValue === RIFT_VALUE) return hintFor(eastValue);
  }
  
  if (westExists(matrix.length, x, y)) {
    const westValue = getWestValue(matrix, x, y);
    
    if (westValue === MONSTER_VALUE || westValue === RIFT_VALUE) return hintFor(westValue);
  }
  
  if (southExists(matrix.length, x, y)) {
    const southValue = getSouthValue(matrix, x, y);
    
    if (southValue === MONSTER_VALUE || southValue === RIFT_VALUE) return  hintFor(southValue);
  }
  
  if (northExists(matrix.length, x, y)) {
    const northValue = getNorthValue(matrix, x, y);
    
    if (northValue === MONSTER_VALUE || northValue === RIFT_VALUE) return hintFor(northValue);
  }
  
  // else return same value
  return DEFAULT_VALUE;
};

const generate = (size, monsterProb = MONSTER_PROBABILITY_PER_CELL, RiftProb = RIFT_PROBABILITY_PER_CELL) => generateMatrix(size, monsterProb, RiftProb);

const defineCell = (cell, monsterProb, riftProb) => {
  if (Math.random() < riftProb)  return RIFT_VALUE;
  if (Math.random() < monsterProb) return MONSTER_VALUE;
  
  return DEFAULT_VALUE;
};

module.exports = {
  generate,
}