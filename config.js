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

/* time values */
const TIME = {
  BETWEEN_PLAYS: 200,
  AFTER_GAME_LOST: 1000,
  RECAP_DISPLAY: 1000,
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

module.exports = {
  ENV,
  VALUES,
  DISPLAY,
  TIME,
}