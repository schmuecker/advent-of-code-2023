async function readFile(path: string): Promise<string> {
  const file = await Bun.file(path);
  return file.text();
}

function getLines(input: string): string[] {
  return input.split("\n");
}

type Matrix = string[][];

function getMatrix(lines: string[]): Matrix {
  const matrix = lines.map((line) => {
    return line.split("");
  });
  return matrix;
}

function isOutOfBounds(length: number, index: number): boolean {
  return index < 0 || index >= length;
}

function checkOutline(matrix: Matrix, index: number[]): boolean {
  const row = index[0];
  const column = index[1];

  const topLeft = [row - 1, column - 1];
  const top = [row - 1, column];
  const topRight = [row - 1, column + 1];
  const right = [row, column + 1];
  const bottomRight = [row + 1, column + 1];
  const bottom = [row + 1, column];
  const bottomLeft = [row + 1, column - 1];
  const left = [row, column - 1];

  const fieldsToCheck = [
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left,
  ];

  let valid = false;
  const noOfRows = matrix.length;
  const noOfColumns = matrix[0].length;

  fieldsToCheck.forEach((field) => {
    if (
      !isOutOfBounds(noOfRows, field[0]) &&
      !isOutOfBounds(noOfColumns, field[1])
    ) {
      const cellValue = matrix[field[0]][field[1]];
      if (cellValue !== "." && isNaN(Number(cellValue))) {
        valid = true;
      }
    }
  });

  return valid;
}

function iterateMatrix(matrix: Matrix) {
  // var zwischenspeicher
  const validNumbers: number[] = [];
  let currentNumber: string = "";
  // Zeilen entlang gehen (2 for loops)
  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
    for (let columnIdx = 0; columnIdx < matrix.length; columnIdx++) {
      const currentCell = matrix[rowIdx][columnIdx];
      // if punkt:
      if (currentCell === ".") {
        //-> if zwischenspeicher leer: geh weiter
        if (!currentNumber) {
          continue;
        } else {
          //-> if zwischenspeicher zahl: check outline von zwischenspeicher
          for (let i = columnIdx - currentNumber.length; i < columnIdx; i++) {
            const hasValidOutline = checkOutline(matrix, [rowIdx, i]);
            //-> //-> wenn outline valid (für eine Zahl im zwischenspeicher), push in ergebnis + lösche zwischenspeicher
            if (hasValidOutline) {
              validNumbers.push(Number(currentNumber));
              i = columnIdx;
            }
          }
          //-> //-> wenn outline invalid, löschen zwischenspeicher
          currentNumber = "";
        }
      } else if (!isNaN(Number(currentCell))) {
        // if zahl: speicher in zwischenspeicher und geh weiter
        currentNumber = `${currentNumber}${currentCell}`;
      } else if (currentNumber) {
        // if sonderzeichen:
        //-> if zwischenspeicher leer: geh weiter
        //-> if zwischenspeicher zahl: push in ergebnis + lösche zwischenspeicher
        validNumbers.push(Number(currentNumber));
        currentNumber = "";
      }
    }
  }
  return validNumbers;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  console.log("Day 03 Challenge 01");
  const fileContent = await readFile("./src/03/input.txt");
  const lines = getLines(fileContent);
  const matrix = getMatrix(lines);
  const validNumbers = iterateMatrix(matrix);
  console.log("Number of valid part numbers:", validNumbers.length);
  console.log(validNumbers);
  const result = sum(validNumbers);
  console.log("Result", result);
}

main();
