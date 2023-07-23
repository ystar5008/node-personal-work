function solution(num_list, n) {
    if (n === 0 || n >= num_list.length) {
        return num_list;
    }

    return num_list.slice(n).concat(num_list.slice(0, n));
}