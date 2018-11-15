const deathCheck = require('./1_deathCheck');
const winCheck = require('./2_winCheck');
const findPossiblesCells = require('./3_findCells');
const safeFilter = require('./4_safeFilter');
const riskDecision = require('./5_riskDecision');
const blockCheck = require('./6_blockCheck');

module.exports = [
  deathCheck,
  winCheck,
  findPossiblesCells,
  safeFilter,
  riskDecision,
];