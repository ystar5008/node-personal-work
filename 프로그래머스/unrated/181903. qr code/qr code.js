function solution(q, r, code) {
    let answer = '';
    //1. code의 각 인덱스를 q로 나누기

    for (let i = 0; i < code.length; i++) {
        if (i % q === r) {
            answer += code[i]
        }
    }
    //2. q로 나눈 나머지가 r인 경우만 합치기
    return answer;
}