
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/8

export const day8Part1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            const inputArr = data.split("\r\n");
            const tracker: number[] = [];
            let i = 0;
            let accumulator = 0;

            while (i < inputArr.length) {
                if (tracker.includes(i)) {
                    break;
                }
                tracker.push(i);
                const input = inputArr[i];
                const [action, deltaStr] = input.split(" ");
                const delta = parseInt(deltaStr, 10);
                let inc = 0;

                switch (action) {
                    case "acc":
                        accumulator += delta;
                        inc = 1;
                        break;
                    case "jmp":
                        inc += delta;
                        break;
                    case "nop":
                        inc = 1;
                        break;
                }

                i += inc;
            }

            resolve(`Part 1: ${accumulator}`);
        })
    });
}

const calculateAccumulator = (inputArr: string[]): number | null => {
    const tracker: number[] = [];
    let i = 0;
    let accumulator = 0;

    while (i < inputArr.length) {
        if (tracker.includes(i)) {
            tracker.length = 0;
            return null;
        }
        tracker.push(i);
        const input = inputArr[i];
        const [action, deltaStr] = input.split(" ");
        const delta = parseInt(deltaStr, 10);
        let inc = 0;

        switch (action) {
            case "acc":
                accumulator += delta;
                inc = 1;
                break;
            case "jmp":
                inc += delta;
                break;
            case "nop":
                inc = 1;
                break;
        }

        i += inc;
    }

    return accumulator;
}


export const day8Part2 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "input.txt"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            }
            interface ITarget {
                action: string;
                delta: number;
                index: number;
            }

            const inputArr = data.split("\r\n");
            const tracker: number[] = [];
            const targets: ITarget[] = [];
            let i = 0;
            let accumulator = null;

            while (i < inputArr.length) {
                if (tracker.includes(i)) {
                    break;
                }
                tracker.push(i);
                const [action, deltaStr] = inputArr[i].split(" ");
                const delta = parseInt(deltaStr, 10);
                let inc = 0;

                switch (action) {
                    case "acc":
                        inc = 1;
                        break;
                    case "jmp":
                        targets.push({ action, delta, index: i });
                        inc += delta;
                        break;
                    case "nop":
                        targets.push({ action, delta, index: i });
                        inc = 1;
                        break;
                }

                i += inc;
            }

            for (let index = 0; index < targets.length; index++) {
                const target = targets[index];
                const newAction = target.action === "nop" ? "jmp" : "nop";
                const newInstruction = `${newAction} ${target.delta}`;
                const instructions = inputArr.slice();
                instructions[target.index] = newInstruction;

                accumulator = calculateAccumulator(instructions);
                instructions.length = 0;
                if (accumulator !== null) {
                    break;
                }
            }

            resolve(`Part 2: ${accumulator}`);
        })
    });
}
