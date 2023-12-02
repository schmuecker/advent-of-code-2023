async function readFile(path: string): Promise<string> {
  const file = await Bun.file(path);
  return file.text();
}

function getLines(input: string): string[] {
  return input.split("\n");
}

function insert(str: string, index: number, value: string) {
  return str.substring(0, index) + value + str.substring(index);
}

function convertNumberStringToDigit(word: string): string {
  let newString = `${word}`;
  for (let index = 0; index < newString.length; index++) {
    if (newString.startsWith("one", index)) {
      newString = insert(newString, index, "1");
      index++;
    } else if (newString.startsWith("two", index)) {
      newString = insert(newString, index, "2");
      index++;
    } else if (newString.startsWith("three", index)) {
      newString = insert(newString, index, "3");
      index++;
    } else if (newString.startsWith("four", index)) {
      newString = insert(newString, index, "4");
      index++;
    } else if (newString.startsWith("five", index)) {
      newString = insert(newString, index, "5");
      index++;
    } else if (newString.startsWith("six", index)) {
      newString = insert(newString, index, "6");
      index++;
    } else if (newString.startsWith("seven", index)) {
      newString = insert(newString, index, "7");
      index++;
    } else if (newString.startsWith("eight", index)) {
      newString = insert(newString, index, "8");
      index++;
    } else if (newString.startsWith("nine", index)) {
      newString = insert(newString, index, "9");
      index++;
    }
  }
  return newString;
}

function getNumbersInString(input: string): number[] {
  const matches = input.match(/\d/g);
  if (!matches) {
    console.error("No number found in string", input);
    return [];
  }
  return matches.map((match) => Number(match));
}

function getFirstAndLastDigit(numbers: number[]): number {
  const first = numbers.at(0);
  const last = numbers.at(-1);
  if (!first || !last) {
    return -1;
  }
  return Number(`${first}${last}`);
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  console.log("Day 01 - Challenge 2");
  const fileContent = await readFile("./src/01/input.txt");
  const lines = getLines(fileContent);
  const convertedLines = lines.map((line) => {
    return convertNumberStringToDigit(line);
  });
  const numbers = convertedLines.map((line, index) => {
    const digits = getNumbersInString(line);
    return getFirstAndLastDigit(digits);
  });
  const result = sum(numbers);
  console.log("Day 01 Challenge 2 Result:", result);
}

main();
