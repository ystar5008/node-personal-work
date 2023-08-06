const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input = [line];
}).on('close',function(){
    str = input[0];
        let arr = str.split('')

    let a = arr.map(e => "A" <= e && e <= "Z" ? e.toLowerCase() : e.toUpperCase())
    console.log(a.join(''));
});