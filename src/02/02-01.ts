const cubeLimits = {};

async function readFile(path: string): Promise<string> {
  const file = await Bun.file(path);
  return file.text();
}

function getLines(input: string): string[] {
  return input.split("\n");
}

type Round = {
  red: number;
  blue: number;
  green: number;
  valid: boolean;
};

type Game = {
  id: number;
  rounds: Round[];
};

function parseGame(line: string): Game {}

function isRoundValid(round: Round): boolean {}

function isGameValid(game: Game): boolean {}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  console.log("Day 02 - Challenge 1");
  const fileContent = await readFile("./src/02/input.txt");
  const lines = getLines(fileContent);
  const validGames = [];
  // Mappe über lines
  //   Pro Line, schau ob alle Rounds des Games valid sind
  //   Sammle IDs von valid games
  // Sum der valid game ids
  console.log(lines);
}

main();
