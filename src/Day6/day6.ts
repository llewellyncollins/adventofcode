
import fs from "fs";
import path from "path";

// https://adventofcode.com/2020/day/6

export const day6Part1 = (): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( path.resolve( __dirname, "input.txt" ), "utf-8", ( err, data ) => {
            if ( err ) {
                reject( err );
            }

            const inputArr = data.split( /\n\s*\n/g );
            let answerCount = 0;

            inputArr.forEach( ( input ) => {
                const allAnswers = [ ...input.replace( /\r|\n/g, "" ) ];
                const answerMap = new Map<string, number>();

                allAnswers.forEach( ( answer ) => {
                    if ( !answerMap.has( answer ) ) {
                        answerMap.set( answer, 1 );
                    } else {
                        answerMap.set(answer, (answerMap as any).get(answer) + 1);
                    }

                } );

                answerCount += answerMap.size;
            } );

            resolve( `Part 1: ${ answerCount }` );
        } )
    } );
}


export const day6Part2 = (): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( path.resolve( __dirname, "input.txt" ), "utf-8", ( err, data ) => {
            if ( err ) {
                reject( err );
            }

            const inputArr = data.split( /\n\s*\n/g );
            let answerCount = 0;

            inputArr.forEach( ( input ) => {
                const groupSize = input.split( "\r\n" ).length;
                const allAnswers = [ ...input.replace( /\r|\n/g, "" ) ];
                const answerMap = new Map<string, number>();

                allAnswers.forEach( ( answer ) => {
                    if ( !answerMap.has( answer ) ) {
                        answerMap.set( answer, 1 );
                    } else {
                        answerMap.set(answer, (answerMap as any).get(answer) + 1);
                    }
                } );

                answerMap.forEach( ( value, key ) => {
                    if ( value === groupSize ) {
                        answerCount++;
                    }
                } );
            } );

            resolve( `Part 2: ${ answerCount }` );
        } )
    } );
}

day6Part2().then( ( answer ) => console.log( answer ) );