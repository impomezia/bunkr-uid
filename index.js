'use strict';

const crypto = require('crypto');
const bs58   = require('bs58');
const crc8   = require('crc/lib/crc8');


/**
 * Generate uid.
 *
 * @param {Number} [length]
 * @returns {String}
 */
function generate(length = 16) {
  const buf = Buffer.allocUnsafe(length + 1);
  crypto.randomBytes(length).copy(buf);

  buf.writeUInt8(255, length);
  buf.writeUInt8(crc8(buf), length);

  return bs58.encode(buf);
}


/**
 * Generate uid with type.
 *
 * @param {Number} type
 * @param {Number} [length]
 */
function make(type, length = 16) {
  const buf = Buffer.allocUnsafe(length + 1);
  crypto.randomBytes(length - 2).copy(buf);

  buf.writeUInt16BE(type, length - 2);
  buf.writeUInt8(255, length);
  buf.writeUInt8(crc8(buf), length);

  return bs58.encode(buf);
}


/**
 * Validate uid.
 *
 * @param {String} id
 * @returns {Boolean}
 */
function validate(id) {
  if (typeof id !== 'string') {
    return false;
  }

  let buf;
  try {
    buf = bs58.decode(id);
  }
  catch (e) {
    return false;
  }

  if (buf.length < 4) {
    return false;
  }

  const crc = buf.readUInt8(buf.length - 1);
  buf.writeUInt8(255, buf.length - 1);
  return crc8(buf) === crc;
}


function type(id) {
  if (typeof id !== 'string') {
    return 0;
  }

  let buf;
  try {
    buf = bs58.decode(id);
  }
  catch (e) {
    return 0;
  }

  if (buf.length < 4) {
    return 0;
  }

  const crc = buf.readUInt8(buf.length - 1);
  buf.writeUInt8(255, buf.length - 1);

  if (crc8(buf) === crc) {
    return buf.readUInt16BE(buf.length - 3);
  }

  return 0;
}


module.exports.generate = generate;
module.exports.make     = make;
module.exports.validate = validate;
module.exports.type     = type;
