function solution(num_list) {
    let answer = 0
    let answer1 = 1
    if(num_list.length >= 11){
        for(let i = 0; i<num_list.length; i++ ){
            answer += num_list[i]
            
        }
        return answer
    }
    if(num_list.length <=10){
        for(let i =0; i<num_list.length; i++){
            answer1 *= num_list[i]
            
        }
        return answer1
    }
}