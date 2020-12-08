
import fs from "fs";
import path from "path";

const PART1_REGEX = /(?<type>^[a-z ]+(?= bags contain))|((?<quantity>\d) (?<bag>[a-z ]+(?= (bags|bag))))/g;

// https://adventofcode.com/2020/day/7

interface IBag {
    searchedBags: string[];
    bags: Map<string, number>
}

const countBags = (targetBags: string[], allBagMap: Map<string, IBag>, foundBags: string[]): string[] => {
    if (targetBags.length === 0) {
        return foundBags;
    }

    const newTargets: string[] = [];

    targetBags.forEach((targetName) => {
        allBagMap.forEach((bag, containerName) => {
            if (!bag.searchedBags.includes(targetName)) {
                bag.bags.forEach((quantity, bagName) => {
                    if (bagName === targetName) {
                        if (!foundBags.includes(containerName)) {
                            newTargets.push(containerName);
                            foundBags.push(containerName);
                            bag.searchedBags.push(targetName);
                        }
                    }
                })
            }
        });
    });

    return countBags(newTargets, allBagMap, foundBags);
}

const countNestedBags = (targetBag: string, allBagMap: Map<string, IBag>): number => {
    const bag = allBagMap.get(targetBag);
    let bagTotal = 0;

    if (bag) {
        bag.bags.forEach((quantity, bagName) => {
            if (allBagMap.get(bagName) && (allBagMap.get(bagName) as any).bags.size > 0) {
                const count = countNestedBags(bagName, allBagMap);
                bagTotal += quantity * count;
            }

            bagTotal += quantity;
        });
    }

    return bagTotal;
}

export const day7Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            const allBagMap = new Map<string, IBag>();
            const targetBag = "shiny gold";
            let targetCount = 0;

            inputArr.forEach((input) => {
                const matches = [...input.matchAll(PART1_REGEX)];
                const type = (matches[0].groups as any).type;
                const bagMap = new Map<string, number>();

                if (matches.length > 1) {
                    for (let index = 1; index < matches.length; index++) {
                        const quantity = parseInt((matches[index].groups as any).quantity, 10);
                        const bag = (matches[index].groups as any).bag;

                        bagMap.set(bag, quantity);
                    }

                    allBagMap.set(type, { bags: bagMap, searchedBags: [] });
                }
            });

            targetCount = countBags([targetBag], allBagMap, []).length;

            resolve(`Part 1: ${targetCount}`);
        })
    });
}


export const day7Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            const allBagMap = new Map<string, IBag>();
            const targetBag = "shiny gold";
            let targetCount = 0;

            inputArr.forEach((input) => {
                const matches = [...input.matchAll(PART1_REGEX)];
                const type = (matches[0].groups as any).type;
                const bagMap = new Map<string, number>();

                if (matches.length > 1) {
                    for (let index = 1; index < matches.length; index++) {
                        const quantity = parseInt((matches[index].groups as any).quantity, 10);
                        const bag = (matches[index].groups as any).bag;

                        bagMap.set(bag, quantity);
                    }

                    allBagMap.set(type, { bags: bagMap, searchedBags: [] });
                }
            });

            targetCount = countNestedBags(targetBag, allBagMap);

            resolve(`Part 2: ${targetCount}`);
        })
    });
}

day7Part2().then(answer => console.log(answer));