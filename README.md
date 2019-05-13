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

* Return the parsed data in the following format.

* An array containing all plots (e.g. Operating Points, Transient Analysis). Each plot is an object.

  ```javascript
  [
    {
      title: String, /* Title */
      date: String, /* Date */
      name: String, /* Plotname */
      flags: String, /* Flags */
      nVariables: Integer, /* No. Variables */
      nPoints: Integer, /* No. Points */
      variables: [
        {
          index: Integer, /* The index of data values in "Point" array. */
          name: String, /* Name of the variable. */
          type: String /* Type of the variable, e.g. voltage, current. Ngspice sometimes gives wrong type. */
        }
      ],
      values: [
        [ Float ] /* An array of float numbers. */
      ]
    }
  ]
  ```

* Note

  For a variable :
  ```javascript
  {
    index: 3,
    name: "xxx",
    type: "yyy"
  }
  ```

  Data of the variable are `values[0][3]`, `values[1][3]`, ... `values[nPoints-1][3]`.
