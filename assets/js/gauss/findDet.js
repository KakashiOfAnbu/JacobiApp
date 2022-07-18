const a = [
  [0, -2, 1, 4, 3],
  [0, 8, 2, -4, -9],
  [5, 9, 1, -4, 1],
  [-3, 0, 2, 6, -8],
  [0, 9, -11, 3, 2],
];
// const a = [
//   [4, -2, 1],
//   [1, -3, 2],
//   [-1, 2, 5],
// ];

// Nhan hang voi mot so
function multiplyRowForANumber(row, number, matrix) {
  const tempMatrix = cloneMatrix(matrix);
  for (let i = 0; i < tempMatrix[row].length; i++) {
    tempMatrix[row][i] = tempMatrix[row][i] * number;
  }
  return tempMatrix;
}

// console.log(addRowAToRowB(1, 2, 1, a));

function findDet(matrix) {
  //  Doi hai hang voi nhau
  function switchTwoRows(rowA, rowB, matrix) {
    const tempMatrix = cloneMatrix(matrix);
    tempMatrix[rowA] = matrix[rowB];
    tempMatrix[rowB] = matrix[rowA];
    return tempMatrix;
  }

  //Cong xhang A voi hang B roi ghi vao hang b
  function addRowAToRowB(rowA, rowB, x, matrix) {
    const tempMatrix = cloneMatrix(matrix);
    for (let i = 0; i < tempMatrix[rowA].length; i++) {
      const amount = x * tempMatrix[rowA][i];
      tempMatrix[rowB][i] += amount;
    }
    return tempMatrix;
  }

  function eliminateByRow(i, j, matrix) {
    let clone = cloneMatrix(matrix);
    for (let k = i + 1; k < matrix.length; k++) {
      let x = -1 * (matrix[k][j] / matrix[i][j]);
      clone = addRowAToRowB(i, k, x, clone);
    }
    return clone;
  }

  function loopSwitchRow(i, j, ind, matrix) {
    let clone = cloneMatrix(matrix);
    let indClone = cloneMatrix(ind);
    let t = i + 1;
    if (clone[t][j] !== 0) {
      clone = switchTwoRows(t, i, clone);
      count++;
      indClone[i] = j;
      return { clone: clone, index: indClone };
    } else {
      while (true) {
        if (t === clone.length - 1 && j === clone[0].length - 1) {
          return "break";
        } else if (t === clone.length - 1 && j < clone[0].length - 1) {
          return "continue";
        } else if (t < clone.length) {
          t++;
          clone = switchTwoRows(t, i, clone);
          count++;
          indClone[i] = j;
          return { clone: clone, index: indClone };
        }
      }
    }
  }
  function absolute(a) {
    return Math.abs(a);
  }

  function cloneMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix));
  }
  let i = 0;
  let j = 0;
  let result = JSON.parse(JSON.stringify(matrix));
  let ind = [];
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    ind.push(-1);
  }
  while (true) {
    if (a[i][j] === 0) {
      const res = loopSwitchRow(i, j, ind, result);
      if (res === "continue") {
        j++;
        continue;
      } else if (res === "break") {
        break;
      } else {
        result = res.clone;
        ind = res.index;
      }
    }
    ind[i] = j;
    if (i === matrix.length - 1) {
      break;
    } else {
      result = eliminateByRow(i, j, result);
      // console.log(result);
      if (j === matrix[0].length - 1) {
        break;
      }
      i++;
      j++;
      continue;
    }
  }
  let det = 1;
  for (let i = 0; i < result.length; i++) {
    det = det * result[i][i];
  }
  return det * Math.pow(-1, count);
}
console.log(findDet(a));
