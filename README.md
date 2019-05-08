# Ngspice **ASCII** Rawfile Parser

> A Ngspice **ASCII** rawfile parser written in Javascript. Dependent on Node.js.

### Run the Example

```bash
node parser.spec.js
```

### API

##### `async parser.load(path)`

* Load Ngspice **ASCII** raw file asynchronously. 
  * To change Ngspice rawfile format to `ascii`, add a line `set filetype=ascii` in your `.spiceinit`.

##### `parser.summarize()`

* Return a summary object of the parsed data.

##### `parser.get()`

* Return a `Data` object of the parsed data.

### Object Format

* `Data`: An array containing all plots.

  ```javascript
  Array.<Plot>
  ```

* `Plot`: A plot, e.g. Operating Points, Transient Analysis.

  ```javascript
  {
    title: String, /* Title */
    date: String, /* Date */
    name: String, /* Plotname */
    flags: String, /* Flags */
    nVariables: Integer, /* No. Variables */
    nPoints: Integer, /* No. Points */
    variables: Array.<Variable>, /* Variables */
    values: Array.<Point> /* Values */
  }
  ```

* `Variable`

  ```javascript
  {
    index: Integer, /* The index of data values in "Point" array. */
    name: String, /* Name of the variable. */
    type: String /* Type of the variable, e.g. voltage, current. Ngspice sometimes gives wrong results. */
  }
  ```

* `Point`

  ```javascript
  Array.<Float> /* Data values in the order of "Variable" index. */
  ```

  * Example
    
    If `Variable.index` is `i`, its data values are at index `i` of a `Point` array.
