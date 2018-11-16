const columnify = require('columnify');
const config = require('./config');

const getDisplayFor = (elem, deducted) => {
  switch(elem) {
    case "?":
      return config.display.UNKNOWN_VALUE;
    case "M":
      if (deducted) return config.display.MONSTER_VALUE_DEDUCTED;
      return config.display.MONSTER_VALUE
    case "m":
      return config.display.SMELL_VALUE;
    case "r":
      return config.display.WIND_VALUE;
    case 'P':
      return config.display.PORTAL_VALUE;
    case "R":
      if (deducted) return config.display.RIFT_VALUE_DEDUCTED;
      return config.display.RIFT_VALUE;
    default:
      return elem;
  }
}

/* METHODS */
module.exports = (obj) => {
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
  const horizontalBorders = line.fill(config.display.WALL_VALUE);
  const output = new Array(matrix.length);

  // top border
  output.unshift(horizontalBorders);
  
  for(let x = 0; x < matrix.length; x++) {
    const displayLine = Array();
    // left border
    displayLine.unshift(config.display.WALL_VALUE);

    for(let y = 0; y < matrix.length; y++) {
      displayLine.push(getDisplayFor(matrix[y][x], deducted[y][x]));

    }
    // right border
    displayLine.push(config.display.WALL_VALUE);
    output.push(displayLine);
  }

  // bottom border
  output.push(horizontalBorders)

  console.log(columnify(output, { showHeaders: false }));
}