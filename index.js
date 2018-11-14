const Bot = require('./bot');

const main = async () => {
  const a = [[' ',' ', 'm', ' '],
            [' ','m', 'M', 'm'],
            [' ',' ', 'm', ' '],
            [' ','P', ' ', ' ']];
  const bot = new Bot(a);
  
  await think(bot);
};

const think = async (bot) => {
  await bot.think();
  await sleep(1500);
  if(!bot._dead) {
    await think(bot);
  }
};

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main();


