const colors = require('colors');

/* CHAR VALUES */
const VALUES = {
  DEFAULT: ' ',
  RIFT: 'R',
  MONSTER: 'M',
  SMELL: 'm',
  PORTAL: 'P',
  UNKNOWN: '?',
  WIND: 'r',
};

// const DEFAULT_VALUE = " ";
// const RIFT_VALUE = "R";
// const MONSTER_VALUE = "M";
// const PORTAL_VALUE = "P";
// const CHAR_VALUE = "@";
// const UNKNOWN_VALUE = "?";

/* time values */
const TIME = {
  BETWEEN_PLAYS: 200,
  AFTER_GAME_LOST: 1000,
}

/* DISPLAY */
const DISPLAY = {
  WALL: "◼".gray,
  UNKNOWN: "◼".white,
  WIND: "·".green,
  MONSTER: "▲".red,
  MONSTER_DEDUCTED: "▲".white,
  PORTAL: "★".yellow,
  RIFT: "●".green,
  RIFT_DEDUCTED: "●".white,
  SMELL: "·".red,
}

/* ENVIRONMENT VALUES */
const ENV = {
  STARTING_SIZE: 4,
  MONSTER_PROBABILITY: 0.08,
  RIFT_PROBABILITY: 0.08,
};

// const STARTING_SIZE = 4;
// const MONSTER_PROBABILITY_PER_CELL = 0.08;
// const RIFT_PROBABILITY_PER_CELL = 0.08;

module.exports = {
  ENV,
  VALUES,
  DISPLAY,
  TIME,
}