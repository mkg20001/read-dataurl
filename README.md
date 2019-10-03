# read-dataurl

A tiny package to read dataURLs

# Usage

```js
const readDataurl = require('read-dataurl')

const data = readDataurl('data:application/json;base64,e30K')
// => { encoding: 'base64', mime: 'application/json', data: 'e30K' }

const decoded = await readDataurl.decode('data:application/json;base64,e30K')
// => { data: '{}\n', mime: 'application/json' }
```
