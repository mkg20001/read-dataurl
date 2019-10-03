'use strict'

function readBlob (str) {
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
