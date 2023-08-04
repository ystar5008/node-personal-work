function solution(a, d, included) {
    let answer = 0;
    for (let i = 0; i < included.length; i++) {
        if (included[i]) {
            answer += (i * d) + a
        }
    }
    return answer;
}