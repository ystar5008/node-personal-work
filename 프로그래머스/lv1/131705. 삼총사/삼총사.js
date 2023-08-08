function solution(number) {
    let answer = 0;
    //1. 배열 3개의 수를 더했을때 0이되는 것 찾기

    //2. 반복문 돌면서 
    number.sort()
    console.log(number)
    for (let i = 0; i < number.length; i++) {
        for (let j = i + 1; j < number.length; j++) {
            for (let k = j + 1; k < number.length; k++) {
                console.log(number[i], number[j], number[k])
                if (number[i] + number[j] + number[k] === 0) {
                    answer++

                }

            }
        }


    }
    //3. 배열 요소 3개의 합이 0이면 answer++ 
    return answer;
}