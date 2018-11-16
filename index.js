const colors = require('colors');
const { ENV, TIME} = require('./config');
const Bot = require('./bot');
const { generate } = require('./env');
const { sleep } = require('./utils');

let currentSize = ENV.STARTING_SIZE;
let level = currentSize;
let score = 0;

const main = async () => {
  const forest = generate(currentSize);
  const bot = new Bot(forest, score);
  const res = await think(bot);

  if (res) { // agent escaped
    console.log(("WON ! GOING TO LEVEL:" + level).green);
    await sleep(TIME.RECAP_DISPLAY);
    score += bot._score;
    level++;
    currentSize++;
    await main();
  } else { // agent died
    console.log("LOST ! GOING TO A NEW GAME".red);

    /* resetting default values */
    score = 0;
    currentSize = ENV.STARTING_SIZE;
    level = currentSize;

    await sleep(TIME.AFTER_GAME_LOST);
    await main();
  }
};

/* launches the agent */
const think = async (bot) => {
  let res = null;
  while(res === null || typeof res === "undefined") {
    await sleep(TIME.BETWEEN_PLAYS);
    res = await bot.think();
  }
  return res;
};

main();


