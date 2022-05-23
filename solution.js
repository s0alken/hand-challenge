const fs = require('fs');

const program = [...fs.readFileSync('input.hand', 'utf8')];
const memory = [0];

let index = 0;
let pointer = 0;

const moveToNextCell = () => {
    ++pointer;
    if(memory[pointer] === undefined) memory.push(0);
}

const moveToPrevCell = () => {
    --pointer;
}

const increaseCellValue = () => {
    memory[pointer] =  memory[pointer] + 1 > 255 ? 0 : memory[pointer] + 1;
}

const decreaseCellValue = () => {
    memory[pointer] =  memory[pointer] - 1 < 0 ? 255 : memory[pointer] - 1;
}

const startLoop = () => {
    if(memory[pointer] === 0) {
        let counter = 1;
        while(counter !== 0) {
            ++index;
            if(program[index] === "🤜") ++counter;
            if(program[index] === "🤛") --counter;
        }
    }
}

const endLoop = () => {
    if(memory[pointer] !== 0) {
        let counter = 1;
        while(counter !== 0) {
            --index;
            if(program[index] === "🤛") ++counter;
            if(program[index] === "🤜") --counter;
        }
    }
}

const displayCellValue = () => {
    process.stdout.write(String.fromCharCode(memory[pointer]));
}

const instructions = {
    "👉": moveToNextCell,
    "👈": moveToPrevCell,
    "👆": increaseCellValue,
    "👇": decreaseCellValue,
    "🤜": startLoop,
    "🤛": endLoop,
    "👊": displayCellValue
}

while(index < program.length) {
    instructions[program[index]]();
    index++;
}

