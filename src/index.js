'use strict'

function readDataurl (str) {
  let i = 5 // skip data;

  let mime = ''
  let enc = ''
  let data = ''

  let block = 'mime'

  while (str.length > i) {
    let cur = str[i]

    switch (block) {
      case 'mime': {
        if (cur === ';') {
          block = 'enc'
        } else {
          mime += cur
        }

        i++

        break
      }
      case 'enc': {
        if (cur === ',') {
          block = 'data'
        } else {
          enc += cur
        }

        i++

        break
      }
      case 'data': {
        data += cur
        i++

        break
      }
      default: {
        throw new TypeError('d')
      }
    }
  }

  return {
    encoding: enc,
    mime,
    data
  }
}

const decoders = {
  base64: (data) => Buffer.from(data, 'base64').toString()
}

async function decode (str, userDecoders = {}) {
  const {data, mime, encoding} = readDataurl(str)
  const decoder = userDecoders[encoding] || decoders[encoding]

  if (!decoder) {
    throw new Error('No decoder for decoding ' + encoding)
  }

  const decoded = await decoder(data)

  return {
    data: decoded,
    mime
  }
}

module.exports = readDataurl
module.exports.decode = decode
