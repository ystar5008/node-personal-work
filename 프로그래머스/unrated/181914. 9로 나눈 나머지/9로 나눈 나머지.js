function solution(number) {

    //각자리 수 더하기


    let arr = number.split('')
    let num = 0
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        num += +arr[i]
    }
    //9로 나누기
    return num % 9;
}