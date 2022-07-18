// const b = [
//   [3, -2, 1, 4],
//   [1, -3, 2, 2],
//   [-1, 2, 5, 1],
// ];
// const a = [
//   [8, -5, 4],
//   [1, -8, 4],
//   [-1, 2, 9],
// ];
// const a = [
//   [5, -3, 4, 4],
//   [2, -9, 2, 2],
//   [-1, 5, 10, 1],
// ];
// const a = [
//   [40.5, 1.7, -3.2, 2.1, 9.23, -3.52, 31.41],
//   [2.5, 60.1, 5.2, 2.8, 7.23, -5.52, 37, 11],
//   [11.3, 2.7, -51.2, 4.1, -7.58, 4.25, 24.17],
//   [8.4, -4.6, -6.5, 65.1, 1.43, 15.26, 62.49],
//   [42.7, -36.9, -42.7, 61.1, 236, -35.26, 76.72],
//   [9.2, -1, 35, -2, 14.73, 84.64, 38.57],
// ];

function findInverseMatrix(matrix, epsilon) {
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
          if (sumRow >= diaValue) {
            checkDiaDom = false;
          }
        }
      }
    }
    if (checkDiaDom) {
      return "row";
    }
    checkDiaDom = true;
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
          if (sumCol >= diaValue) {
            checkDiaDom = false;
          }
        }
      }
    }
    if (checkDiaDom) {
      return "column";
    }
    return false;
  }
  function findMatrixA(matrix) {
    const result = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < result.length; i++) {
      if (result.length !== matrix[0].length) {
        result[i].pop();
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

  function checkResult(q, result, prevResult, epsilon) {
    const xMinusX = subtractMatrices(result, prevResult);
    const e = (q * findNorm("row", xMinusX)) / (1 - q);
    // console.log(e);
    // return true;
    if (e < epsilon) {
      return true;
    } else {
      return false;
    }
  }
  function subtractMatrices(matA, matB) {
    const result = JSON.parse(JSON.stringify(matA));
    for (let i = 0; i < matA.length; i++) {
      for (let j = 0; j < matA[0].length; j++) {
        result[i][j] = matA[i][j] - matB[i][j];
      }
    }
    // console.log(result);
    return result;
  }
  function findBetaMatrix(matrix, matA) {
    const result = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i === j) {
          // console.log(matrix[i][j]);
          result[i][j] = result[i][j] / matA[i][j];
          // console.log(matrix[i][matrix.length]);
        }
      }
    }
    // console.log(result);
    return result;
  }
  function findAlphaMatrix(matrix) {
    const result = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        result[i][j] = matrix[i][j] / matrix[i][i];
        if (i === j) {
          result[i][j] = 1 - result[i][j];
        } else {
          result[i][j] = -1 * result[i][j];
        }
      }
    }
    return result;
  }
  function findNorm(normType, matrix) {
    const sumArray = [];
    if (normType === "row") {
      for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[0].length; j++) {
          sum += absolute(matrix[i][j]);
        }
        sumArray.push(sum);
      }
    } else if (normType === "column") {
      if (matrix[0].length === 1) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
          sum += absolute(matrix[i][0]);
        }
        return sum;
      }
      for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix[0].length; j++) {
          sum += absolute(matrix[j][i]);
        }
        // console.log(sum);
        sumArray.push(sum);
        // console.log(sum);
      }
    }
    return Math.max(...sumArray);
  }
  function findTMatrix(matrix) {
    const result = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i === j) {
          result[i][j] = 1 / matrix[i][j];
        } else {
          result[i][j] = 0;
        }
      }
    }
    return result;
  }

  function findIMatrix(matrix) {
    const result = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i === j) {
          result[i][j] = 1;
        } else {
          result[i][j] = 0;
        }
      }
    }
    return result;
  }

  function findLambda(matrix) {
    let max = absolute(matrix[0][0]);
    let min = absolute(matrix[0][0]);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i === j) {
          if (max <= absolute(matrix[i][j])) {
            max = absolute(matrix[i][j]);
          }
          if (min >= absolute(matrix[i][j])) {
            min = absolute(matrix[i][j]);
          }
        }
      }
    }
    return max / min;
  }
  function checkResultColumn(lambda, q, result, prevResult, epsilon) {
    const xMinusX = subtractMatrices(result, prevResult);
    const e = (lambda * (q * findNorm("column", xMinusX))) / (1 - q);
    // return true;
    if (e < epsilon) {
      return true;
    } else {
      return false;
    }
  }

  function theMagicHappenHere(matrix, epsilon) {
    if (checkDiaDom(matrix) === "row") {
      const matA = findMatrixA(matrix);
      const I = findIMatrix(matA);
      const beta = findBetaMatrix(I, matA);
      const alpha = findAlphaMatrix(matA);
      const q = findNorm("row", alpha);
      let count = 0;
      let result = I;
      let tempResult = [];
      do {
        count++;
        tempResult = JSON.parse(JSON.stringify(result));
        result = addMatrices(multiplyMatrices(alpha, tempResult), beta);
      } while (!checkResult(q, result, tempResult, epsilon));
      return {
        matrix: result,
        count,
        matrixType: checkDiaDom(matrix),
        q,
      };
    } else if (checkDiaDom(matrix) === "column") {
      const matA = findMatrixA(matrix);
      const T = findTMatrix(matA);
      const alpha = findAlphaMatrix(multiplyMatrices(T, matA));
      const I = findIMatrix(matA);
      const beta = multiplyMatrices(T, I);
      // console.log(I);
      const q = findNorm(
        "column",
        subtractMatrices(I, multiplyMatrices(matA, T))
      );
      const lambda = findLambda(matA);
      let count = 0;
      let result = I;
      let tempResult = [];
      do {
        count++;
        tempResult = JSON.parse(JSON.stringify(result));
        result = addMatrices(multiplyMatrices(alpha, tempResult), beta);
      } while (!checkResultColumn(lambda, q, result, tempResult, epsilon));
      return {
        matrix: result,
        count,
        matrixType: checkDiaDom(matrix),
        q,
      };
    } else {
      return false;
    }
  }

  return theMagicHappenHere(matrix, epsilon);
}
