function solution(arr, k) {
    let answer = [];
    let a = [...new Set(arr)]
    //1. k(3)개의 수를 저장한 배열을 만들기
    for (let i = 0; i < k; i++) {
        if (a[i] === undefined) {
            answer.push(-1)
        } else {
            answer.push(a[i])
        }

    }
    //2. 완성될 배열의 길이가 k보다 작으면 값을 전부 -1로 채우기
    return answer;
}
