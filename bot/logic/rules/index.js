const { 
  southExists, eastExists, westExists, northExists,
  getSouthValue, getEastValue, getNorthValue, getWestValue 
} = require('../../../utils');

/* adds the fact to the array if not already there */
const addFact = (facts, fact) => {
  if (!Array.isArray(facts)) { // instanciate if required
    facts = Array();
  }
  if (!facts.includes(fact)) facts.push(fact); // removes unnecessary computing time
  return facts;
};

const isBorder = (matrix, x, y) => {
  /* returns true if at least one surronding cell is known */
  if (southExists(matrix.length, x, y) && getSouthValue(matrix, x, y)  !== '?') return true;
  if (westExists(matrix.length, x, y) && getWestValue(matrix, x, y)  !== '?') return true;
  if (eastExists(matrix.length, x, y) && getEastValue(matrix, x, y)  !== '?') return true;
  if (northExists(matrix.length, x, y) && getNorthValue(matrix, x, y)  !== '?') return true;
  return false;
}

const isPossible = (matrix, x, y) => {
  if(matrix[y][x] !== '?') return false;
  
  if(!isBorder(matrix, x, y)) return false;
  
  return true;
}

const checkMoves = (obj) => {
  console.log("checking moves");
  const toCheck = Array();
  for(let x = 0; x < obj.matrix.length; x++) {
    for(let y = 0; y < obj.matrix.length; y++) {
      if (isPossible(obj.matrix, x, y)) toCheck.push(`CELL_${x}_${y}`)
    }
  }
  return toCheck;
}

const rules = [{
  "condition": function(R) {
    
    const COMPUTATION_REQUIRED = !this.facts; /* need to compute if no fact */
    R.when(COMPUTATION_REQUIRED);
  },
  "consequence": function(R) {
    const possibleMoves = checkMoves(this);
    this.facts = possibleMoves;
    console.log("current facts : ", this.facts.join('|'));
    R.next();
  }
}];

module.exports = rules;