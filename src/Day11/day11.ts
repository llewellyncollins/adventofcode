
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/11

const countAdjOccupiedSeats = (rowIndex: number, columnIndex: number, grid: string[][]): number => {
    let count = 0;

    for (let rIndex = rowIndex - 1; rIndex <= rowIndex + 1; rIndex++) {
        for (let cIndex = columnIndex - 1; cIndex <= columnIndex + 1; cIndex++) {
            if ((rIndex !== rowIndex || cIndex !== columnIndex) && grid[rIndex] && grid[rIndex][cIndex] && grid[rIndex][cIndex] === "#") {
                count++;
            }
        }
    }

    return count;
}

export const day11Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr: string[][] = data.split("\r\n").map((row) => row.split(""));
            const changes: { rowIndex: number, columnIndex: number, seat: "#" | "L" }[] = [];

            do {
                changes.length = 0;
                inputArr.forEach((row: string[], rowIndex: number) => {
                    row.forEach((seat: string, columnIndex: number) => {
                        if (seat !== ".") {
                            const adjOccupiedSeats = countAdjOccupiedSeats(rowIndex, columnIndex, inputArr);

                            if (seat === "L" && adjOccupiedSeats === 0) {
                                changes.push({ rowIndex, columnIndex, seat: "#" });
                            }

                            if (seat === "#" && adjOccupiedSeats >= 4) {
                                changes.push({ rowIndex, columnIndex, seat: "L" });
                            }
                        }
                    });
                });

                changes.forEach((change) => {
                    inputArr[change.rowIndex][change.columnIndex] = change.seat;
                });

            } while (changes.length !== 0);

            const count = inputArr.reduce((total: number, row: string[]) => {
                const rowCount = row.filter((seat) => seat === "#").length;
                return total + rowCount;
            }, 0);

            resolve(`Part 1: ${count}`);
        })
    });
}

interface IDirection {
    x: -1 | 1 | 0,
    y: -1 | 1 | 0
}

const DIRECTION: { [key: string]: IDirection } = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    UPLEFT: { x: -1, y: -1 },
    UPRIGHT: { x: 1, y: -1 },
    DOWNLEFT: { x: -1, y: 1 },
    DOWNRIGHT: { x: 1, y: 1 }
}

const DIRECTIONS = [
    DIRECTION.UP,
    DIRECTION.DOWN,
    DIRECTION.LEFT,
    DIRECTION.RIGHT,
    DIRECTION.UPLEFT,
    DIRECTION.UPRIGHT,
    DIRECTION.DOWNLEFT,
    DIRECTION.DOWNRIGHT
];

const findInDirection = (rowIndex: number, columnIndex: number, grid: string[][], directon: IDirection): boolean => {
    for (let y = 1; y < grid[rowIndex].length; y++) {
        const xPos = columnIndex + (y * directon.x);
        const yPos = rowIndex + (y * directon.y);

        if (!(grid[yPos] && grid[yPos][xPos] && grid[yPos][xPos])) {
            return false;
        }

        if (grid[yPos][xPos] !== ".") {
            return grid[yPos][xPos] === "#";
        }
    }

    return false;
}

const findInAllDirections = (rowIndex: number, columnIndex: number, grid: string[][]): number => {
    return DIRECTIONS.reduce((total, direction) => {
        if (findInDirection(rowIndex, columnIndex, grid, direction)) {
            total += 1;
        }

        return total;
    }, 0);
}

export const day11Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr: string[][] = data.split("\r\n").map((row) => row.split(""));
            const changes: { rowIndex: number, columnIndex: number, seat: "#" | "L" }[] = [];

            do {
                changes.length = 0;
                inputArr.forEach((row: string[], rowIndex: number) => {
                    row.forEach((seat: string, columnIndex: number) => {
                        if (seat !== ".") {
                            const adjOccupiedSeats = findInAllDirections(rowIndex, columnIndex, inputArr);

                            if (seat === "L" && adjOccupiedSeats === 0) {
                                changes.push({ rowIndex, columnIndex, seat: "#" });
                            }

                            if (seat === "#" && adjOccupiedSeats >= 5) {
                                changes.push({ rowIndex, columnIndex, seat: "L" });
                            }
                        }
                    });
                });

                changes.forEach((change) => {
                    inputArr[change.rowIndex][change.columnIndex] = change.seat;
                });

            } while (changes.length !== 0);

            const count = inputArr.reduce((total: number, row: string[]) => {
                const rowCount = row.filter((seat) => seat === "#").length;
                return total + rowCount;
            }, 0);

            resolve(`Part 2: ${count}`);
        })
    });
}