const a = [72, 6, -13, -1]; //  x^3  - 13x^2 + 6x + 72 //  -2,3,12
function cloneArray(array) {
  return JSON.parse(JSON.stringify(array));
}

function findDerivativeArray(array) {
  let result = [];
  // for (let i = array.length - 1; i > 0; i--) {
  for (let i = 1; i < array.length; i++) {
    result.push(array[i] * i);
  }
  return result;
}
console.log(findDerivativeArray(a));

function hornerCalculate(x, array) {}
