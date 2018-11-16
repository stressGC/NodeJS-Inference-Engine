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

module.exports = {
  getRandom,
  sleep,
  eastExists,
  westExists,
  southExists,
  northExists,
  getEastValue,
  getWestValue,
  getNorthValue,
  getSouthValue,
};
