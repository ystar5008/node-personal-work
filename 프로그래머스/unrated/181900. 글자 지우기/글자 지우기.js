function solution(my_string, indices) {
    let answer = my_string.split('')
    for (let i = 0; i < indices.length; i++) {
        delete answer[indices[i]]
    }
    return answer.join('');
}