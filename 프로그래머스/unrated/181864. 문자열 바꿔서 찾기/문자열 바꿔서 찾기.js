function solution(myString, pat) {
    let str = ''
    let arrmyString = myString.split('')

    console.log(arrmyString)
    for (let i = 0; i < arrmyString.length; i++) {
        if (arrmyString[i] === 'A') {
            str += 'B'
        }
        if (arrmyString[i] === 'B') {
            str += 'A'
        }
    }

    return str.includes(pat) ? 1 : 0;
}