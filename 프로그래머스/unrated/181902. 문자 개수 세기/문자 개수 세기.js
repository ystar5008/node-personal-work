function solution(my_string) {

    let answer = new Array(52).fill(0);

    for (let i of my_string) {
        if ('A' <= i && i <= 'Z') {
            let index = i.charCodeAt(0) - 'A'.charCodeAt(0);
            answer[index]++;
        } else if ('a' <= i && i <= 'z') {
            let index = i.charCodeAt(0) - 'a'.charCodeAt(0) + 26;
            answer[index]++;
        }
    }


    return answer;
}