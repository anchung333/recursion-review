// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


// presume there is only ever a single class passed into getElementsByClassName
var getElementsByClassName = function(className) {

  //have result array
  var result = [];

  //function that we will recursively call
  var findAndTraverse = function(element) {
    //console.log((_.difference(className.split(' '), [...element.classList])).length);
    // check if the className is in the current element's classList
    if (element.classList && (_.difference(className.split(' '), [...element.classList])).length === 0) {
      result.push(element);
    }

    // check if element has childNodes
    if (element.childNodes) {
      _.each(element.childNodes, function(element) {
        findAndTraverse(element);
      });
    }
  };

  //call the function()
  findAndTraverse(document.body);
  return result;
};
