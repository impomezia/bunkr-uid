# Bunkr UID

Simple module to generate and validate Base58 encoded UIDs with CRC8 checksum.


# Install

`npm install @bunkr/uid --save`


# Usage

```javascript
const uuid = require('bunkr-uuid');

uuid.generate(16);
// 31dh27vxYY8qTawfPHeqAZJc

uuid.validate('31dh27vxYY8qTawfPHeqAZJc')
// true
```


# License

MIT