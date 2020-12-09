
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/9

const findSumParts = (numbers: number[], sum: number): [number, number] | null => {
    for (let x = 0; x < numbers.length; x++) {
        const first = numbers[x];
        for (let y = 0; y < numbers.length; y++) {
            const second = numbers[y];
            if (y !== x && first + second === sum) {
                return [first, second];
            }
        }
    }

    return null;
}

export const day9Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const preamble = 25;
            const inputArr = data.split("\r\n").map(val => parseInt(val, 10));
            let index = preamble;

            for (; index < inputArr.length; index++) {
                const arr = inputArr.slice(index - preamble, index + preamble);
                const parts = findSumParts(arr, inputArr[index]);

                if (!parts) {
                    break;
                }
            }

            resolve(`Part 1: ${inputArr[index]}`);
        })
    });
}

export const day9Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const target = 14144619;
            const inputArr: number[] = data.split("\r\n").map(val => parseInt(val, 10));
            let contiguousSet: number[] = [];

            for (let index = 0; index < inputArr.length; index++) {
                let total = inputArr[index];
                let trackerIndex = index + 1;

                while (total < target) {
                    total += inputArr[trackerIndex];

                    if ((trackerIndex - index > 2) && (total === target)) {
                        contiguousSet = inputArr.slice(index, trackerIndex).sort((a, b) => a - b);
                        break;
                    }

                    trackerIndex++;
                }

                if (contiguousSet.length > 0) {
                    break;
                }
            }

            resolve(`Part 2: ${contiguousSet[0] + contiguousSet[contiguousSet.length - 1]}`);
        })
    });
}