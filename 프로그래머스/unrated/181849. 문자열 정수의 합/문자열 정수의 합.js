function solution(num_str) {
    let result = 0;
    let arr = num_str.split('')
    for(num of arr){
        result += Number(num)
    }
    
    return result;
}