const path = require('path');

const parser = require('./parser');

async function main() {
  const p = new parser();
  try {
    await p.load(path.join(__dirname, 'ngspice.raw'));
  } catch (error) {
    console.error(error);
  }
  console.dir(p.summarize(), { depth: 4 });
  let result = p.getResult();
  console.dir(result[0]);
}

main();
