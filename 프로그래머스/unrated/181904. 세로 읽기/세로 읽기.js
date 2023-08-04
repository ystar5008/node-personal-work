function solution(my_string, m, c) {
    let result = "";
    for (let i = 0; i < Math.ceil(my_string.length) / m; i++) {
        result += my_string.substring(i * m, i * m + m).charAt(c - 1);
    }
    return result;
}