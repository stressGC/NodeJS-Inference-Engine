const columnify = require('columnify');
const { DISPLAY, VALUES } = require('./config');

/* returns the console display value from a string */
const getDisplayFor = (value, deducted) => {
  switch(value) {
    case VALUES.UNKNOWN:
      return DISPLAY.UNKNOWN;
    case VALUES.MONSTER:
      if (deducted) return DISPLAY.MONSTER_DEDUCTED;
      return DISPLAY.MONSTER;
    case VALUES.SMELL:
      return DISPLAY.SMELL;
    case VALUES.WIND:
      return DISPLAY.WIND;
    case VALUES.PORTAL:
      return DISPLAY.PORTAL;
    case VALUES.RIFT:
      if (deducted) return DISPLAY.RIFT_DEDUCTED;
      return DISPLAY.RIFT_VALUE;
    default:
      return value;
  }
}

/* METHODS */
module.exports = (obj) => {

  /* get pertinent values */
  const matrix = obj._knowledge;
  const deducted = obj._deducted;
  const level = obj._level;
  const score = obj._score;

  /* ATH */
  console.clear();
  console.log("LEVEL : " + level);
  console.log("SCORE : " + score);
  
  if (obj.hasOwnProperty("_actionMessage")) console.log(">", obj._actionMessage);
  else console.log(">")
  
  /* GAME BOARD DISPLAY */
  const line = new Array(matrix.length + 2);
  const horizontalBorders = line.fill(DISPLAY.WALL);
  const output = new Array(matrix.length);

  // top border
  output.unshift(horizontalBorders);
  
  for(let x = 0; x < matrix.length; x++) {
    const displayLine = Array();
    // left border
    displayLine.unshift(DISPLAY.WALL);

    for(let y = 0; y < matrix.length; y++) {
      displayLine.push(getDisplayFor(matrix[y][x], deducted[y][x]));

    }
    // right border
    displayLine.push(DISPLAY.WALL);
    output.push(displayLine);
  }

  // bottom border
  output.push(horizontalBorders)

  console.log(columnify(output, { showHeaders: false }));
}