# promise-timeout

A super-simple way to put a timeout on promise resolution.

```javascript
import { timeout, TimeoutError } from 'promise-timeout';

let somePromise = goDoSomething();

timeout(somePromise, 1000)
  .then((thing) => console.log('I did a thing!'))
  .catch((err) => {
    if (err instanceof TimeoutError) {
      console.error('Timeout :-(');
    }
  });
```

Or, for pre-ES2015:

```javascript
'use strict';

var pt = require('promise-timeout');

var somePromise = goDoSomething();

pt.timeout(somePromise, 1000)
  .then(function (thing) {
    console.log('I did a thing!');
  }).catch(function (err) {
    if (err instanceof pt.TimeoutError) {
      console.error('Timeout :-(');
    }
  });
```
