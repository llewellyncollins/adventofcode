
import fs from "fs";
import path from "path";

const PART1_REGEX = /(?<field>[a-z]{3}):(?<value>#?[a-z0-9]+)/g;

// https://adventofcode.com/2020/day/4

export const day4Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }

            const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
            const inputArr = data.split(/\n\s*\n/g);
            let validCount = 0;

            inputArr.forEach((input) => {
                const matches = input.matchAll(PART1_REGEX);
                let validFieldsCount = 0;

                for (const match of matches) {
                    if (requiredFields.includes((match.groups as any).field)) {
                        validFieldsCount++;
                    }
                }

                if (validFieldsCount === requiredFields.length) {
                    validCount++;
                }
            });

            resolve(`Part 1: ${validCount}`);
        })
    });
}


export const day4Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const requiredFields: { [key: string]: (value: string) => boolean } = {
                "byr": (value: string): boolean => {
                    const number = parseInt(value, 10);
                    return number >= 1920 && number <= 2002;
                },
                "iyr": (value: string): boolean => {
                    const number = parseInt(value, 10);
                    return number >= 2010 && number <= 2020;
                },
                "eyr": (value: string): boolean => {
                    const number = parseInt(value, 10);
                    return number >= 2020 && number <= 2030;
                },
                "hgt": (value: string) => {
                    const match = value.match(/(?<value>[0-9]+)(?<unit>cm|in)/);
                    if (match) {
                        const unit = (match.groups as any).unit;
                        const number = parseInt((match.groups as any).value);

                        if (unit === "cm") {
                            return number >= 150 && number <= 193;
                        } else if (unit === "in") {
                            return number >= 59 && number <= 76;
                        } else {
                            return false;
                        }
                    }
                    return false;
                },
                "hcl": (value: string) => {
                    return /^#[0-9a-z]{6}$/.test(value);
                },
                "ecl": (value: string) => {
                    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);
                },
                "pid": (value: string) => {
                    return /^[0-9]{9}$/.test(value);
                }
            };

            const inputArr = data.split(/\n\s*\n/g);
            let validCount = 0;

            inputArr.forEach((input) => {
                const matches = input.matchAll(PART1_REGEX);
                let validFieldsCount = 0;

                for (const match of matches) {
                    const fieldName = (match.groups as any).field;
                    const value = (match.groups as any).value;

                    try {
                        if (requiredFields[fieldName] && requiredFields[fieldName](value)) {
                            validFieldsCount++;
                        };
                    } catch (error) { }
                }

                if (validFieldsCount === Object.keys(requiredFields).length) {
                    validCount++;
                }
            });
            resolve(`Part 2: ${validCount}`);
        })
    });
}