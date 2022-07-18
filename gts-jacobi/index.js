const a = [
  [40.5, 1.7, -3.2, 2.1, 9.23, -3.52, 31.41],
  [2.5, 60.1, 5.2, 2.8, 7.23, -5.52, 37, 11],
  [11.3, 2.7, -51.2, 4.1, -7.58, 4.25, 24.17],
  [8.4, -4.6, -6.5, 65.1, 1.43, 15.26, 62.49],
  [42.7, -36.9, -42.7, 61.1, 236, -35.26, 76.72],
  [9.2, -1, 35, -2, 14.73, 84.64, 38.57],
];
const epsilon = 0.00000001;
const b = [
  [3, -2, 1, 4],
  [1, -3, 2, 2],
  [-1, 2, 5, 1],
];

//Tim gia tri tuyet doi
function absolute(a) {
  return Math.abs(a);
}

//Kiem tra ma tran cheo troi hang
function checkDiaDom(array) {
  let checkDiaDom = true;
  let bigger = false;
  for (let i = 0; i < array.length; i++) {
    let sumRow = 0;
    let diaValue = 0;
    for (let k = 0; k < array.length; k++) {
      sumRow += absolute(array[i][k]);
      if (i == k) {
        sumRow -= absolute(array[i][k]);
        diaValue = absolute(array[i][k]);
      }
      if (k === array.length - 1) {
        if (sumRow > diaValue) {
          checkDiaDom = false;
        }
        if (diaValue > sumRow) {
          bigger = true;
        }
      }
    }
  }
  return checkDiaDom && bigger;
}

//Tinh toan ket qua
function calculateAnswer(answer, array, epsilon) {
  for (let i = 0; i < array.length; i++) {
    let rowSum = 0;
    for (let j = 0; j < array.length; j++) {
      rowSum += array[i][j] * answer[j];
      //Neu la ky tu cuoi cung
      if (j === array.length - 1) {
        if (absolute(rowSum - array[i][array.length]) > epsilon) {
          return false;
        }
      }
    }
  }
  return true;
}

// Giai phuong trinh
function findX(matrix, epsilon) {
  const answer = [];
  let iteration = 0;
  for (let i = 0; i < matrix.length; i++) {
    answer.push(0); //Vecto ket qua ban dau la vecto 0
  }
  while (!calculateAnswer(answer, matrix, epsilon)) {
    iteration++;
    const temp = [...answer];
    console.log(temp);
    for (let i = 0; i < answer.length; i++) {
      let sum = matrix[i][matrix.length];
      for (let j = 0; j < answer.length; j++) {
        sum = sum - matrix[i][j] * answer[j];
        if (i === j) {
          sum += matrix[i][j] * answer[j];
        }
        // console.log(sum);
        if (j === answer.length - 1) {
          answer[i] = sum / matrix[i][i];
        }
      }
    }
  }
  console.log(answer);
  console.log(iteration);
}

if (checkDiaDom(a)) {
  findX(a, epsilon);
} else {
  console.log("Khong lam duoc dau ban eeeeeeeeeeeeeee");
}
