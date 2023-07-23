function solution(arr, delete_list) {
    let answer = []
    arr.filter(e => {
        if (!delete_list.includes(e)) {
            answer.push(e)
        }
    });

    return answer
}