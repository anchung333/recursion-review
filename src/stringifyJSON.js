// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  //[8, 'hi']

  // create varibale to store our concat string result
  var result = '';

  // check for unstringify-able values
  if (obj === undefined || (typeof obj === 'function')) {
    return result + '';
  }

  // check array
  if (Array.isArray(obj)) {

    // check for empty array
    if (obj.length === 0) {
      return result += '[]';
    } else if (obj.length === 1) {
      return result += '[' + stringifyJSON(obj[0]) + ']';
    } else {
    // loop through the array, and recursively call stringifyJSON
      for (let i = 0; i < obj.length; i++) {
        if (i === 0) {
          result += '[' + stringifyJSON(obj[i]);
        } else if (i === obj.length - 1) {
          result += ',' + stringifyJSON(obj[i]) + ']';
        } else {
          result += ',' + stringifyJSON(obj[i]);
        }
      }
    }
  }

  // check for obj
  else if (typeof obj === 'object') {

    // check for null
    if (obj === null) {
      return result + 'null';
    }

    // check for empty obj
    if (Object.keys(obj).length === 0) {
      return result + '{}';
    }

    // check if length = 1
    else if (Object.keys(obj).length === 1) {

      // checking if the object value contains an unstriafiable value
      if (obj[Object.keys(obj)[0]] === undefined || typeof obj[Object.keys(obj)[0]] === 'function') {
        return result + '{}';
      } else {
        return result + '{"' + Object.keys(obj)[0] + '":' + stringifyJSON(obj[Object.keys(obj)[0]]) + '}';
      }
    } else {

      // add curley brakets if first
      result += '{';

      // loop through obj, and recursively call stringifyJSON
      for (let keys in obj) {

        // checking if the object value contains an unstriafiable value
        if (obj[keys] === undefined || typeof obj[keys] === 'function') {
          result += '';
        }

        // check if the current key is last key in the object
        else if (keys === Object.keys(obj)[Object.keys(obj).length - 1]) {
          result += '"' + keys + '":' + stringifyJSON(obj[keys]);
        } else {
          result += '"' + keys + '":' + stringifyJSON(obj[keys]) + ',';
        }
      }

      // add curley brackets if no more keys
      result += '}';
    }
  }

  // if string, include double quotes
  else if (typeof obj === 'string') {
    result += '"' + obj.toString() + '"';
  }

  // if anything else
  else {
    result += obj.toString();
  }

  return result;
};
