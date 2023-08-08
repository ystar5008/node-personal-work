function solution(arr) {
    let answer = [...arr];

    const targetLength = Math.pow(2, Math.ceil(Math.log2(arr.length)));
    const zerosToAdd = targetLength - arr.length;

    for (let i = 0; i < zerosToAdd; i++) {
        answer.push(0);
    }

    return answer;
}