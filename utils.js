const { VALUES } = require('./config');

/* Value classifications */
const UNKNOWN_CHAR = [VALUES.UNKNOWN];
const KNOWN_CHAR = [VALUES.DEFAULT, VALUES.SMELL, VALUES.MONSTER, VALUES.RIFT, VALUES.WIND];

/* check for out of array exceptions */
const eastExists = (length, x, y) => (x  < length - 1);
const westExists = (length, x, y) => (x > 0);
const southExists = (length, x, y) => (y  < length - 1);
const northExists = (length, x, y) => (y > 0); 

/* get side values */
const getEastValue = (matrix, x, y) => matrix[y][x + 1];
const getWestValue = (matrix, x, y) => matrix[y][x - 1];
const getNorthValue = (matrix, x, y) => matrix[y - 1][x];
const getSouthValue = (matrix, x, y) => matrix[y + 1][x];

/* random generator */
const getRandom = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min;

/* sleep function for the prints to be visible by human */
const sleep = async (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

/* counts the time certain values appear around a cell */
const countForValueAround = (matrix, x, y, values) => {
  let count = 0;
  if (southExists(matrix.length, x, y) && values.includes(getSouthValue(matrix, x, y))) count++;
  if (westExists(matrix.length, x, y) && values.includes(getWestValue(matrix, x, y))) count++;
  if (northExists(matrix.length, x, y) && values.includes(getNorthValue(matrix, x, y))) count++;
  if (eastExists(matrix.length, x, y) && values.includes(getEastValue(matrix, x, y))) count++;

  return count;
};

/* returns cells at the border of the unknwon */
const computeBorderCells = (matrix, deducted) => {
  let borderCells = Array();
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if(checkIfBorder(matrix, x, y, deducted)) borderCells.push({ x, y })
    }
  }
  return borderCells;
};
 
/* checks if a cell is at the border of the unknown */
const checkIfBorder = (matrix, x, y, deducted) => {
  /* is border if any of its neighbours is unknown and at least one is known AND cell has not been deducted (blocks recursivity)*/
  if(matrix[y][x] === VALUES.UNKNOWN) return false; // if we are unknown => not in border

  const unknownCount = countForValueAround(matrix, x, y, UNKNOWN_CHAR);
  const knownCount = countForValueAround(matrix, x, y, KNOWN_CHAR);
  const hasBeenDeducted = deducted[y][x]; // if true, has been deducted

  return (knownCount > 0 && unknownCount > 0 && !hasBeenDeducted)
};

module.exports = {
  getRandom,
  sleep,
  countForValueAround,
  computeBorderCells,
  eastExists,
  westExists,
  southExists,
  northExists,
  getEastValue,
  getWestValue,
  getNorthValue,
  getSouthValue,
};
