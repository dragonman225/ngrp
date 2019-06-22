const path = require('path')
const fs = require('fs')

const parser = require('../parser')

async function main() {

  const Plots = new parser()

  try {
    await Plots.load(path.join(__dirname, 'ngspice.raw'))
  } catch (error) {
    console.error(error)
  }

  console.dir(Plots.summarize(), { depth: 4 })

  let results = Plots.getResults()
  let csvs = Plots.getResultsCSV()

  results.forEach((result, i) => {
    let file = `${result.name}.csv`
    fs.writeFile(path.join(__dirname, file), csvs[i], (err) => {
      if (err) console.error(err)
      else console.log(`Written to ${file}`)
    })
  })
  
}

main()
