const cubeLimits = { red: 12, green: 13, blue: 14 } as const;

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

function parseGame(line: string): Game {
  const a = line.split(":");
  const b = a[0].split(" ");
  const id = Number(b[1]);

  const c = a[1].split(";");

  const game = { id: id, rounds: [] };

  for (var i = 0; i < c.length; i++) {
    const d = c[i].split(",");

    const round: Round | {} = {};

    for (var j = 0; j < d.length; j++) {
      const e = d[j].split(" ");
      round[e[2]] = Number(e[1]);
    }
    game.rounds.push(round);
  }

  return game;
}

function isRoundValid(round: Round): boolean {
  if (round.red == undefined) round.red = 0;
  if (round.green == undefined) round.green = 0;
  if (round.blue == undefined) round.blue = 0;
  const isRedValid = round.red <= cubeLimits.red;
  const isGreenValid = round.green <= cubeLimits.green;
  const isBlueValid = round.blue <= cubeLimits.blue;
  return isRedValid && isGreenValid && isBlueValid;
}

function isGameValid(game: Game): boolean {
  let isValid = true;
  game.rounds.forEach((round) => {
    if (!isRoundValid(round)) {
      isValid = false;
    }
  });
  return isValid;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  console.log("Day 02 - Challenge 1");
  const fileContent = await readFile("./src/02/input.txt");
  const lines = getLines(fileContent);
  const validGameIds: number[] = [];
  lines.forEach((line) => {
    const game = parseGame(line);
    if (isGameValid(game)) {
      validGameIds.push(game.id);
    }
  });
  const idSum = sum(validGameIds);
  console.log("Result of Day 02 Challenge 1:", idSum);
}

main();
