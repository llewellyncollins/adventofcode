
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/1
export const day1Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, input) => {
            if (err) {
                reject(err);
            }
            const hrstart = process.hrtime();
            const inputArr = input.split("\r\n").map((str) => parseInt(str, 10));
            const twoSumMap = new Map<number, number>();
            const values: number[] = [];

            inputArr.forEach((value) => {
                const delta = 2020 - value;

                if (!twoSumMap.has(value)) {
                    twoSumMap.set(value, delta);
                }
            });

            inputArr.forEach((value) => {
                const delta = 2020 - value;
                if (twoSumMap.has(delta)) {
                    values.push(value);
                }
            });

            const answer = values[0] * values[1];
            const hrend = process.hrtime(hrstart);
            // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
            resolve(`Part 1: ${answer}`);
        })
    });
}


export const day1Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, input) => {
            if (err) {
                reject(err);
            }

            const hrstart = process.hrtime();
            const inputArr = input.split("\r\n").map((str) => parseInt(str, 10));
            const deltaMap = new Map<number, Map<number, number>>();

            inputArr.forEach((value) => {
                const delta = 2020 - value;
                const sumMap = new Map<number, number>();
                deltaMap.set(delta, sumMap);

                inputArr.forEach((v) => {
                    const d1 = delta - v;

                    if (d1 > 0 && !sumMap.has(v)) {
                        sumMap.set(v, delta);
                    }
                });
            });

            let answer = 0;

            for (let index = 0; index < inputArr.length; index++) {
                const value = inputArr[index];

                for (let [target, sumMap] of deltaMap.entries()) {
                    const d1 = target - value;
                    if (sumMap.has(d1)) {
                        const d2 = 2020 - target;
                        answer = d1 * d2 * value;
                        break;
                    }
                }
            }

            const hrend = process.hrtime(hrstart);
            // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
            resolve(`Part 2: ${answer}`);
        })
    });
}