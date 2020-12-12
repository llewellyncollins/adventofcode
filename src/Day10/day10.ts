
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/10

export const day10Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr: number[] = data.split("\r\n").map(val => parseInt(val, 10)).sort((a, b) => a - b);

            const distributionMap = new Map<number, number>();
            distributionMap.set(1, 0);
            distributionMap.set(2, 0);
            distributionMap.set(3, 1);

            let currentJoltage = 0;

            inputArr.forEach((joltage) => {
                const joltageDiff = joltage - currentJoltage;
                distributionMap.set(joltageDiff, (distributionMap as any).get(joltageDiff) + 1);
                currentJoltage = joltage;
            });

            resolve(`Part 1: ${(distributionMap as any).get(1) * (distributionMap as any).get(3)}`);
        })
    });
}

export const day10Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr: number[] = data.split("\r\n").map(val => parseInt(val, 10)).sort((a, b) => a - b);

            console.log(inputArr);
            resolve(`Part 2: ${0}`);
        })
    });
}

day10Part2().then((ans) => console.log(ans));