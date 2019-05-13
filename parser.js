/**
 * @module parser
 */

const readline = require('readline');
const path = require('path');
const fs = require('fs');

function parser(opts) {

  let data = [];

  /**
   * Load a Ngspice ASCII rawfile.
   * @param {string} file - Path to the rawfile.
   * @returns {Promise}
   */
  this.load = (file) => {
    return new Promise((resolve, reject) => {
      let fullPath = path.resolve(file);
      if (fs.existsSync(fullPath)) {
        const rl = readline.createInterface({
          input: fs.createReadStream(fullPath)
        });

        let plots = [];
        let plot = {};
        let point = [];
        let flags = {
          mode: 0,
          varCounter: 0,
          pntCounter: 0
        };
        let lineArray = undefined;

        rl.on('line', (line) => {
          switch (flags.mode) {
            case 0:
              lineArray = line.split(':');
              let keyword = lineArray[0];
              let value = lineArray[1];
              switch (keyword) {
                case 'Title':
                  plot.title = value.trim();
                  break;
                case 'Date':
                  lineArray.shift();
                  plot.date = lineArray.join(':').replace(/ {1,}/g," ").trim();
                  break;
                case 'Plotname':
                  plot.name = value.trim();
                  break;
                case 'Flags':
                  plot.flags = value.trim();
                  break;
                case 'No. Variables':
                  plot.nVariables = parseInt(value.trim());
                  break;
                case 'No. Points':
                  plot.nPoints = parseInt(value.trim());
                  break;
                case 'Variables':
                  plot.variables = [];
                  flags.mode = 1;
                  break;
                case 'Values':
                  plot.values = [];
                  flags.mode = 2;
                  break;
                default:
                  console.log(`Ignore unknown keyword ${keyword}.`);
              }
              break;
            case 1:
              lineArray = line.trim().split('\t');
              plot.variables.push({
                index: parseInt(lineArray[0]),
                name: lineArray[1],
                type: lineArray[2]
              });
              flags.varCounter += 1;
              if (flags.varCounter === plot.nVariables) {
                flags.mode = 0;
                flags.varCounter = 0;
              }
              break;
            case 2:
              lineArray = line.trim().split('\t\t');
              flags.varCounter += 1;
              if (lineArray.length === 2) {
                point.push(parseFloat(lineArray[1]));
              } else {
                point.push(parseFloat(lineArray[0]));
              }
              if (flags.varCounter === plot.nVariables) {
                plot.values.push(point);
                point = new Array();
                flags.varCounter = 0;
                flags.pntCounter += 1;
              }
              if (flags.pntCounter === plot.nPoints) {
                plots.push(plot);
                plot = new Array();
                flags.mode = 0;
                flags.pntCounter = 0;
              }
              break;
            default:
              reject({ error: new Error('Unknown parsing mode.') });
          }
        });

        rl.on('close', () => {
          data = plots;
          resolve({ error: null });
        });
      } else {
        reject({ error: new Error('Input file does not exist.') });
      }
    });

  }

  /**
   * Get summary of the data.
   */
  this.summarize = () => {
    const plots = [];
    for (let i = 0; i < data.length; ++i) {
      plots.push({
        name: data[i].name,
        nVars: data[i].nVariables,
        nPoints: data[i].nPoints,
        vars: data[i].variables
      });
    }
    return {
      nPlots: data.length,
      plots
    }
  }

  /**
   * Get full data.
   */
  this.getResult = () => {
    return data;
  }

}

module.exports = parser;