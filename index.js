const Bot = require('./bot');

const main = async () => {
  const bot = new Bot();
  
  await think(bot);
};

const think = async (bot) => {
  await bot.think();
  // await sleep(500);
  // if(!bot._dead) {
  //   await think(bot);
  // }
};

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();


