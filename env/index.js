const { ENV, VALUES } = require('../config');
const { getRandom } = require('../utils');
const {
  northExists, southExists, eastExists, westExists,
  getEastValue, getNorthValue, getSouthValue, getWestValue,
} = require('../utils');

const generateMatrix = (size) => {
  // declare the matrix
  const matrix = new Array(size).fill(VALUES.DEFAULT).map((line) => new Array(size).fill(VALUES.DEFAULT));
  
  // generates the random placement of monsters & rifts
  const generatedMatrix = matrix.map(line => line.map(cell => defineCell(ENV.MONSTER_PROBABILITY, ENV.RIFT_PROBABILITY)));
  
  // Clear any monster or rift from around start (else user falls directly while choosing random direction)
  generatedMatrix[0][0] = VALUES.DEFAULT;
  generatedMatrix[1][0] = VALUES.DEFAULT;
  generatedMatrix[0][1] = VALUES.DEFAULT;
  
  // Set the portal (overrides monster & rift), can't be at start
  let xPortal = 0;
  let yPortal = 0;
  while(xPortal === 0 && yPortal === 0) {
    xPortal = getRandom(0, size - 1);
    yPortal = getRandom(0, size - 1);
  }
  generatedMatrix[yPortal][xPortal] = VALUES.PORTAL;

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
  if (matrix[y][x] === VALUES.PORTAL || matrix[y][x] === VALUES.RIFT || matrix[y][x] === VALUES.MONSTER) return matrix[y][x];
  
  return checkSurroundingsForDangers(matrix, x, y);
};

const hintFor = value => value.toLowerCase();

const checkSurroundingsForDangers = (matrix, x, y) => {
  
  // if side exists and is M or R => place hint
  if (eastExists(matrix.length, x, y)) {
    const eastValue = getEastValue(matrix, x, y);
    
    if (eastValue === VALUES.MONSTER || eastValue === VALUES.RIFT) return hintFor(eastValue);
  }
  
  if (westExists(matrix.length, x, y)) {
    const westValue = getWestValue(matrix, x, y);
    
    if (westValue === VALUES.MONSTER || westValue === VALUES.RIFT) return hintFor(westValue);
  }
  
  if (southExists(matrix.length, x, y)) {
    const southValue = getSouthValue(matrix, x, y);
    
    if (southValue === VALUES.MONSTER || southValue === VALUES.RIFT) return  hintFor(southValue);
  }
  
  if (northExists(matrix.length, x, y)) {
    const northValue = getNorthValue(matrix, x, y);
    
    if (northValue === VALUES.MONSTER || northValue === VALUES.RIFT) return hintFor(northValue);
  }
  
  // else return same value
  return VALUES.DEFAULT;
};

const generate = (size) => generateMatrix(size);

const defineCell = (monsterProb, riftProb) => {
  if (Math.random() < monsterProb) return VALUES.MONSTER;
  if (Math.random() < riftProb)  return VALUES.RIFT;
  
  return VALUES.DEFAULT;
};

module.exports = {
  generate,
}