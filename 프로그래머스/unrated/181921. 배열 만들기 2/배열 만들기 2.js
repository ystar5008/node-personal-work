function solution(l, r) {
    let answer = [];
    for (let i = l; i <= r; i++) {
        //"0"과 "5"를 포함하는지 확인
        if (/^[05]+$/.test(String(i))) {
            answer.push(i)
        }
    }
    return answer.length > 0 ? answer : [-1];
}