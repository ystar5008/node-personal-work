function solution(my_string) {
    let answer = [...new Set(my_string.split(''))];
    return answer.join('');
}