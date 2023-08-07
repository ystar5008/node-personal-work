function solution(t, p) {
    let answer = 0;
    for (let i = 0; i < t.length; i++) {
        if (Number(t.substring(i, p.length + i).length) === p.length && Number(p) >= Number(t.substring(i, p.length + i))) {
            answer++
        }
    }
    return answer;
}