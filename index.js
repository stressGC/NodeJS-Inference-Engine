const { ENV, TIME} = require('./config');
const Bot = require('./bot');
const { generate } = require('./env');
const { sleep } = require('./utils');

let currentSize = ENV.STARTING_SIZE;
let level = currentSize;
let score = 0;

const main = async () => {
  console.log("=> GOING TO LEVEL:", level);
  const forest = generate(currentSize);
  const bot = new Bot(forest, score);
  process.exit()
  const res = await think(bot);
  await sleep(10000);

  if (res) { // agent escaped
    score += bot._score;
    level++;
    currentSize++;
    await main();
  } else { // agent died
    console.log("=> LOST");
    console.log("=> GOING TO NEW GAME");

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


