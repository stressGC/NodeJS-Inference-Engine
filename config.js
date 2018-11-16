const colors = require('colors');

/* CHAR VALUES */
const DEFAULT_VALUE = " ";
const RIFT_VALUE = "R";
const MONSTER_VALUE = "M";
const PORTAL_VALUE = "P";
const CHAR_VALUE = "@";
const UNKNOWN_VALUE = "?";

/* DISPLAY */
const display = {
  WALL_VALUE: "◼".gray,
  UNKNOWN_VALUE: "◼".white,
  WIND_VALUE: "·".green,
  MONSTER_VALUE: "▲".red,
  MONSTER_VALUE_DEDUCTED: "▲".white,
  PORTAL_VALUE: "★".yellow,
  RIFT_VALUE: "●".green,
  RIFT_VALUE_DEDUCTED: "●".white,
  SMELL_VALUE: "·".red,
}

/* ENVIRONMENT VALUES */
const STARTING_SIZE = 4;
const MONSTER_PROBABILITY_PER_CELL = 0.08;
const RIFT_PROBABILITY_PER_CELL = 0.08;

module.exports = {
  DEFAULT_VALUE,
  RIFT_VALUE,
  MONSTER_VALUE,
  PORTAL_VALUE,
  STARTING_SIZE,
  MONSTER_PROBABILITY_PER_CELL,
  RIFT_PROBABILITY_PER_CELL,
  CHAR_VALUE,
  UNKNOWN_VALUE,
  display,
}