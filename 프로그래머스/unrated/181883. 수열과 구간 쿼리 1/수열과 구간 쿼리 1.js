function solution(arr, queries) {
    for (let query of queries) {
        const [s, e] = query;
        for (let i = s; i <= e; i++) {
            arr[i]++;
        }
    }
    return arr;
}