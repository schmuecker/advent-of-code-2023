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

type Cubes = {
  red: number;
  blue: number;
  green: number;
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

function getMinimumCubes(game: Game): Cubes {
  let red = 0;
  let green = 0;
  let blue = 0;
  game.rounds.forEach((round) => {
    if (round.red > red) {
      red = round.red;
    }
    if (round.green > green) {
      green = round.green;
    }
    if (round.blue > blue) {
      blue = round.blue;
    }
  });
  return { red, green, blue };
}

function getPowerOfCubes(cubes: Cubes) {
  return cubes.red * cubes.green * cubes.blue;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  console.log("Day 02 - Challenge 1");
  const fileContent = await readFile("./src/02/input.txt");
  const lines = getLines(fileContent);
  const powers = lines.map((line) => {
    const game = parseGame(line);
    const minimumCubes = getMinimumCubes(game);
    const power = getPowerOfCubes(minimumCubes);
    return power;
  });
  const result = sum(powers);
  console.log("Result of Day 02 Challenge 1:", result);
}

main();
