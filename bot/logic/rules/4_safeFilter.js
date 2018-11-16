const { VALUES } = require('../../../config');
const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue,
  getRandom,
} = require('../../../utils');

const isSafe = (matrix, x, y) => {
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y) === VALUES.DEFAULT) return true;
  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y) === VALUES.DEFAULT) return true;
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y) === VALUES.DEFAULT) return true; 
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y) === VALUES.DEFAULT) return true;

  return false;
}

module.exports = {
  "priority": 998,
  "condition": function(R) {
    R.when(this.possibleCellsComputed === true);
  },
  "consequence": function(R) {
    /* filter possible moves to retain only safe moves */
    const safeFiltered = this.cells.filter((cell) => isSafe(this.matrix, cell.x, cell.y));

    switch(safeFiltered.length) {
      case 0:
        // none is safe, need another filter
        R.next();
        break;
      default:
        // return a random cell which is safe
        this.cells = safeFiltered;
        const index = getRandom(0, safeFiltered.length - 1)
        this.result = {
          type: 'GOTO',
          ...safeFiltered[index],
        };
        R.stop();
    }
  }
}