const deathCheck = require('./1_deathCheck');
const winCheck = require('./2_winCheck');
const findPossiblesCells = require('./3_findCells');
const safeFilter = require('./4_safeFilter');
const computeBorders = require('./5_computeBorders');
const detectDanger = require('./6_detectObviousDanger');
const shotPossible = require('./7_shotPossible');
const randomMove = require('./8_randomMove');

module.exports = [
  deathCheck,
  winCheck,
  findPossiblesCells,
  safeFilter,
  computeBorders,
  detectDanger,
  shotPossible,
  randomMove,
];