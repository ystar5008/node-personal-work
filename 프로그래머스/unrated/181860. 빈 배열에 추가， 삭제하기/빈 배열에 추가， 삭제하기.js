function solution(arr, flag) {
    let answer = [];
    //1. arr배열 돌면서

    for (let i = 0; i < arr.length; i++) {
        if (flag[i]) {
            answer.push(...String(arr[i]).repeat(arr[i] * 2))
            console.log(answer)
        } else {
            //3. flag[i]가 false일때 x에서 마지막 arr[i]개의 원소를 제거
            answer.splice(-arr[i])
        }

    }

    return answer.map(e => +e);
}
