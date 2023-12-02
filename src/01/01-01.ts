async function readFile(path: string): Promise<string> {
  const file = await Bun.file(path);
  return file.text();
}

function getLines(input: string): string[] {
  return input.split("\n");
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
  console.log("Day 01");
  const fileContent = await readFile("./src/01/input.txt");
  const lines = getLines(fileContent);
  const numbers = lines.map((line) => {
    const digits = getNumbersInString(line);
    return getFirstAndLastDigit(digits);
  });
  const result = sum(numbers);
  console.log("Day 01 Result:", result);
}

main();
