const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
input = input[0];
input = input.split(' ').map((item) => +item);
solution(input[0], input[1]);
function solution(A) {

    let result = "";

    result = Math.floor(input / 300) + ' ';
    input = input % 300;
    result += Math.floor(input / 60) + ' ';
    input = input % 60;
    result += Math.floor(input / 10);
    input = input % 10;

    if (input !== 0) {
        result = -1;
    }

    //60초 10초로
    console.log(result);
}