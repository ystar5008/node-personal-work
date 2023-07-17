function solution(arr,k){
    let result= [];
    for (let num of arr){
        if(k%2===1){
            result.push(num*k)
        }else{
            result.push(num+k)
        }
    }
    return result
}