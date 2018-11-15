const deathCheck = require('./1_deathCheck');
const winCheck = require('./2_winCheck');
const findPossiblesCells = require('./3_findCells');
const safeFilter = require('./4_safeFilter');

module.exports = [
  deathCheck,
  winCheck,
  findPossiblesCells,
  safeFilter
];