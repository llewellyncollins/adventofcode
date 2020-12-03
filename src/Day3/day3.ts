
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/3

const calculateTreeCollision = (map: string[], rightMovment: number, downMovement: number): number => {
    const maxLevelLength = map[0].length;
    let levelIndex = 0;
    let positionIndex = 0;
    let treeCount = 0;

    while (levelIndex < map.length) {
        positionIndex = (positionIndex + rightMovment) % maxLevelLength;
        levelIndex += downMovement;
        const level = map[levelIndex];

        if (level && level[positionIndex] === "#") {
            treeCount++;
        }
    }

    return treeCount;
}

export const day3Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr = data.split("\r\n");
            const treeCount = calculateTreeCollision(inputArr, 3, 1);

            resolve(`Part 1: ${treeCount}`);
        })
    });
}


export const day3Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            const movements: [number, number][] = [
                [1, 1],
                [3, 1],
                [5, 1],
                [7, 1],
                [1, 2]
            ];

            const answer = movements.reduce((total: number, movements: [number, number]) => {
                const x = calculateTreeCollision(inputArr, movements[0], movements[1]);
                return total * x;
            }, 1);
            resolve(`Part 2: ${answer}`);
        })
    });
}
