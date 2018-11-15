const config = require('./config');
const Bot = require('./bot');
const { generate } = require('./env/generation');

let currentSize = config.STARTING_SIZE;
let level = 1;

const main = async () => {
  const forest = generate(currentSize);
  const bot = new Bot(forest);
  
  const res = await think(bot);
  console.log("END : ", res)
  await sleep(200);
  if (res) {
    level++;
    console.log("LEVEL :" + level);
    currentSize++;
    await(main());
  } else {
    console.log("died at level " + level);
  }
};

const think = async (bot) => {
  let res = null;
  while(res === null || typeof res === "undefined") {
    await sleep(100);
    res = await bot.think();
  }
  return res;
};

const sleep = async (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

main();


