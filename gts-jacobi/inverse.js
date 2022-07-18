// const b = [
//   [3, -2, 1, 4],
//   [1, -3, 2, 2],
//   [-1, 2, 5, 1],
// ];
const a = [
  [3, -2, 1],
  [1, -3, 2],
  [-1, 2, 5],
];
// const a = [
//   [40.5, 1.7, -3.2, 2.1, 9.23, -3.52],
//   [2.5, 60.1, 5.2, 2.8, 7.23, -5.52, 37],
//   [11.3, 2.7, -51.2, 4.1, -7.58, 4.25],
//   [8.4, -4.6, -6.5, 65.1, 1.43, 15.26],
//   [42.7, -36.9, -42.7, 61.1, 236, -35.26],
//   [9.2, -1, 35, -2, 14.73, 84.64],
// ];

function absolute(a) {
  return Math.abs(a);
}

function addMatrices(matA, matB) {
  if (matA.length !== matB.length && matA[0].length !== matB[0].length) {
    return false;
  }
  const result = JSON.parse(JSON.stringify(matA));

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] += matB[i][j];
    }
  }
  return result;
}
function multiplyMatrices(matA, matB) {
  if (matA[0].length !== matB.length) {
    return false;
  }

  const result = [];
  for (let i = 0; i < matA.length; i++) {
    result.push([]);
  }
  for (let i = 0; i < matA.length; i++) {
    for (let j = 0; j < matB[0].length; j++) {
      let sumItem = 0;
      for (let k = 0; k < matA[0].length; k++) {
        for (let l = 0; l < matB.length; l++) {
          if (k === l) {
            sumItem += matA[i][k] * matB[l][j];
          }
        }
      }
      result[i].push(sumItem);
    }
  }
  return result;
}

function checkDiaDom(matrix) {
  let checkDiaDom = true;
  let bigger = false;
  for (let i = 0; i < matrix.length; i++) {
    let sumRow = 0;
    let diaValue = 0;
    for (let k = 0; k < matrix.length; k++) {
      sumRow += absolute(matrix[i][k]);
      if (i === k) {
        sumRow -= absolute(matrix[i][k]);
        diaValue = absolute(matrix[i][k]);
      }
      if (k === matrix.length - 1) {
        if (sumRow > diaValue) {
          checkDiaDom = false;
        }
        if (diaValue > sumRow) {
          bigger = true;
        }
      }
    }
  }
  if (checkDiaDom && bigger) {
    return "row";
  }
  checkDiaDom = true;
  bigger = false;
  for (let i = 0; i < matrix.length; i++) {
    let sumCol = 0;
    let diaValue = 0;
    for (let j = 0; j < matrix.length; j++) {
      sumCol += absolute(matrix[j][i]);
      if (i === j) {
        sumCol -= absolute(matrix[j][i]);
        diaValue = absolute(matrix[j][i]);
      }
      if (j === matrix.length - 1) {
        // console.log(sumCol, diaValue);
        if (sumCol > diaValue) {
          checkDiaDom = false;
        }
        if (diaValue > sumCol) {
          bigger = true;
        }
      }
    }
  }
  if (checkDiaDom && bigger) {
    return "column";
  }
  return false;
}
function findMatrixA(matrix) {
  return matrix;
}

function findDiaMatrixInverse(matrix) {
  const result = JSON.parse(JSON.stringify(matrix));
  for (let i = 0; i < result.length; i++) {
    if (result.length !== result[i].length) {
      result[i].pop();
    }
    for (let j = 0; j < result.length; j++) {
      if (i !== j) {
        result[i][j] = 0;
      } else {
        result[i][j] = 1 / result[i][j];
      }
    }
  }
  return result;
}

// B = I - TA
function findMatrixB(diaMatrixInverse, matrixA) {
  const result = multiplyMatrices(diaMatrixInverse, matrixA);
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (i === j) {
        result[i][j] = 1 - result[i][j]; // =0
      } else {
        result[i][j] = -1 * result[i][j]; // 0 - gtri
      }
    }
  }
  return result;
}

function findMatrixb(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push([]);
  }
  for (let i = 0; i < matrix.length; i++) {
    result[i].push(matrix[i][matrix.length]);
  }
  return result;
}

//  d= Tb
function findd(diaMatrixInverse, b) {
  return multiplyMatrices(diaMatrixInverse, b);
}

function checkResult(result, matrix, epsilon) {
  const checkMatrix = multiplyMatrices(matrix, result);
  for (let i = 0; i < checkMatrix.length; i++) {
    for (let j = 0; j < checkMatrix.length; j++) {
      if (i === j) {
        if (absolute(checkMatrix[i][j]) - 1 > epsilon) {
          return false;
        }
      } else {
        if (absolute(checkMatrix[i][j]) > epsilon) {
          return false;
        }
      }
    }
  }
  return true;
}

function createIMatrix(matrix) {
  const result = JSON.parse(JSON.stringify(matrix));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (i === j) {
        result[i][j] = 1;
      } else {
        result[i][j] = 0;
      }
    }
  }
  return result;
}

function theMagicHappenHere(matrix, epsilon) {
  if (checkDiaDom(matrix)) {
    const diaMatInverse = findDiaMatrixInverse(matrix);
    const matA = findMatrixA(matrix);
    const B = findMatrixB(diaMatInverse, matA);
    const I = createIMatrix(matA);
    let result = I;
    while (!checkResult(result, matrix, epsilon)) {
      const tempResult = JSON.parse(JSON.stringify(result));
      result = addMatrices(multiplyMatrices(B, tempResult), diaMatInverse);
    }
    console.log(result);
  } else {
    console.log("Ma tran khong cheo troi");
  }
}

theMagicHappenHere(a, 0.00000001);
