/**
 * @module toCSV
 */

module.exports = toCSV

function toCSV(plots, delim = ',') {

  let csvs = []

  plots.forEach(plot => {

    let csv = ''
    let nVars = plot.nVariables

    /** Write Header */
    plot.variables.forEach((vari, index, arr) => {
      csv += vari.name
      if (index < arr.length - 1) {
        csv += delim
      }
    })
    csv += '\n'

    /** Write Values */
    plot.values.forEach(val => {
      for (let i = 0; i < nVars; ++i) {
        csv += val[i]
        if (i < nVars - 1) {
          csv += delim
        }
      }
      csv += '\n'
    })

    csvs.push(csv)

  })

  return csvs

}