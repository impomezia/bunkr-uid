'use strict';

const crypto  = require('crypto');
const bs58  = require('bs58');
const crc8  = require('crc').crc8;


/**
 * Generate uid.
 *
 * @param {Number} [length]
 * @returns {String}
 */
function generate(length) {
  length = length || 16;

  const buf = Buffer.allocUnsafe(length + 1);
  crypto.randomBytes(length).copy(buf);

  buf.writeUInt8(255, length);
  buf.writeUInt8(crc8(buf), length);

  return bs58.encode(buf);
}


/**
 * Validate uid.
 *
 * @param {String} id
 * @returns {boolean}
 */
function validate(id) {
  if (typeof id !== 'string') {
    return false;
  }

  let buf;
  try {
    buf = Buffer.from(bs58.decode(id));
  }
  catch (e) {
    return false;
  }

  const crc = buf.readUInt8(buf.length - 1);
  buf.writeUInt8(255, buf.length - 1);
  return crc8(buf) === crc;
}


module.exports.generate = generate;
module.exports.validate = validate;
