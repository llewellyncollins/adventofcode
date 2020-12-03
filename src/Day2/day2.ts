
import fs from "fs";
import path from "path";

const PART1_REGEX = /(?<min>[0-9]+)-(?<max>[0-9]+) (?<letter>[a-z]{1}): (?<password>[a-z]+)/;

// https://adventofcode.com/2020/day/2

const countLetters = (letter: string, password: string): number => {
    const matches = password.match(new RegExp(`${letter}+`, 'gi'));

    if (matches) {
        return matches?.reduce((total, matchArr) => total + matchArr.length, 0);
    }

    return 0;
}

const validateLetterCount = (count: number, min: number, max: number): boolean => {
    return count >= min && count <= max;
}

export const day2Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            let invalidCount = 0;

            inputArr.forEach((input) => {
                const matches = input.match(PART1_REGEX);
                const min = parseInt((matches?.groups as any).min, 10);
                const max = parseInt((matches?.groups as any).max, 10);
                const letter = (matches?.groups as any).letter;
                const password = (matches?.groups as any).password;

                if (validateLetterCount(countLetters(letter, password), min, max)) {
                    invalidCount++;
                }
            });

            resolve(`Part 1: ${invalidCount}`);
        })
    });
}


export const day2Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            let validCount = 0;

            inputArr.forEach((input) => {
                const matches = input.match(PART1_REGEX);
                const min = parseInt((matches?.groups as any).min, 10);
                const max = parseInt((matches?.groups as any).max, 10);
                const letter = (matches?.groups as any).letter;
                const password = (matches?.groups as any).password;

                if ((password[min - 1] === letter && password[max - 1] !== letter) || (password[min - 1] !== letter && password[max - 1] === letter)) {
                    validCount++;
                }
            });

            resolve(`Part 2: ${validCount}`);
        })
    });
}