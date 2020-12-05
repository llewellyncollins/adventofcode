
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/5


// const calculateRow = (map: string): number => {
//     let upper = 127;
//     let lower = 0;

//     for (let index = 0; index < map.length; index++) {
//         const region = map[index];
//         if (region === "F") {
//             upper = Math.floor(lower + ((upper - lower) / 2));
//         }

//         if (region === "B") {
//             lower = Math.floor((lower + 1) + ((upper - lower) / 2));
//         }
//     }

//     return map[map.length - 1] === "F" ? lower : upper;
// }

// const calculateColum = (map: string): number => {
//     let upper = 7;
//     let lower = 0;

//     for (let index = 0; index < map.length; index++) {
//         const region = map[index];
//         if (region === "L") {
//             upper = Math.floor(lower + ((upper - lower) / 2));
//         }

//         if (region === "R") {
//             lower = Math.floor((lower + 1) + ((upper - lower) / 2));
//         }
//     }

//     return map[map.length - 1] === "L" ? lower : upper;
// }

const calculatePosition = (map: string, lowerSymbol: string, upperSymbol: string, max: number, min: number): number => {
    let upper = max;
    let lower = min;

    for (let index = 0; index < map.length; index++) {
        const region = map[index];
        if (region === lowerSymbol) {
            upper = Math.floor(lower + ((upper - lower) / 2));
        }

        if (region === upperSymbol) {
            lower = Math.floor((lower + 1) + ((upper - lower) / 2));
        }
    }

    return map[map.length - 1] === lowerSymbol ? lower : upper;
}


const calculateId = (boardingPass: string): number => {
    const rowMap = boardingPass.substr(0, 7);
    const columnMap = boardingPass.substr(-3);
    const row = calculatePosition(rowMap, "F", "B", 127, 0);
    const colum = calculatePosition(columnMap, "L", "R", 7, 0);
    return (row * 8) + colum;
}

export const day5Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const inputArr = data.split("\r\n");
            let highestId = 0;

            inputArr.forEach((input) => {
                const id = calculateId(input);

                if (id > highestId) {
                    highestId = id;
                }
            });

            resolve(`Part 1: ${highestId}`);
        })
    });
}


export const day5Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            const seatMap = new Map<number, string>();
            let highestId = 0;

            inputArr.forEach((input) => {
                const id = calculateId(input);
                seatMap.set(id, input);

                if (id > highestId) {
                    highestId = id;
                }
            });

            let answer = 0;
            for (let index = 0; index < inputArr.length; index++) {
                const input = inputArr[index];
                const id = calculateId(input);

                if (!seatMap.has(id + 1) && id !== highestId) {
                    answer = id + 1;
                    break;
                }
            }

            resolve(`Part 2: ${answer}`);
        })
    });
}