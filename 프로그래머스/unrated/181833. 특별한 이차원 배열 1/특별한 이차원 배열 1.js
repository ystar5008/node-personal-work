function solution(n) {
    let answer = [];

    // Create the n x n matrix with zeros
    for (let i = 0; i < n; i++) {
        let row = new Array(n).fill(0);
        answer.push(row);
    }

    // Set ones along the diagonal
    for (let i = 0; i < n; i++) {
        answer[i][i] = 1;
    }

    return answer;
}