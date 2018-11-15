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


module.exports.getRandom = getRandom;
module.exports.eastExists = eastExists;
module.exports.westExists = westExists;
module.exports.southExists = southExists;
module.exports.northExists = northExists;
module.exports.getEastValue = getEastValue;
module.exports.getWestValue = getWestValue;
module.exports.getNorthValue = getNorthValue;
module.exports.getSouthValue = getSouthValue;
