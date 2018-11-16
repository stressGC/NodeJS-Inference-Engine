const config = require('./config');
const Bot = require('./bot');
const { generate } = require('./env/generation');

let currentSize = config.STARTING_SIZE;
let level = currentSize;
let score = 0;

const main = async () => {
  console.log("=> GOING TO LEVEL:", level);
  const forest = generate(currentSize);
  const bot = new Bot(forest, score);
  
  const res = await think(bot);
  await sleep(1000);
  if (res) {
    score += bot._score;
    level++;
    currentSize++;
    await main();
  } else {
    console.log("=> LOST");
    console.log("=> GOING TO NEW GAME");
    score = 0;
    currentSize = config.STARTING_SIZE;
    level = currentSize;
    await sleep(1000);
    await main();
  }
};

const think = async (bot) => {
  let res = null;
  while(res === null || typeof res === "undefined") {
    await sleep(200);
    res = await bot.think();
  }
  return res;
};

const sleep = async (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

main();


