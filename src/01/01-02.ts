async function readFile(path: string): Promise<string> {
  const file = await Bun.file(path);
  return file.text();
}

function getLines(input: string): string[] {
  return input.split("\n");
}

function convertNumberStringToDigit(word: string): string {
  let newString = `${word}`;
  newString = newString.replaceAll("one", "1");
  newString = newString.replaceAll("two", "2");
  newString = newString.replaceAll("three", "3");
  newString = newString.replaceAll("four", "4");
  newString = newString.replaceAll("five", "5");
  newString = newString.replaceAll("six", "6");
  newString = newString.replaceAll("seven", "7");
  newString = newString.replaceAll("eight", "8");
  newString = newString.replaceAll("nine", "9");
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
  const numbers = convertedLines.map((line) => {
    const digits = getNumbersInString(line);
    console.log({ line, digits, firstLast: getFirstAndLastDigit(digits) });
    return getFirstAndLastDigit(digits);
  });
  const result = sum(numbers);
  console.log("Day 01 Challenge 2 Result:", result);
}

main();
