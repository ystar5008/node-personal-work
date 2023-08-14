function solution(array, n) {
    let arr = array.map(e => Math.abs(e - n));
    let minDiff = Math.min(...arr);

    let candidates = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === minDiff) {
            candidates.push(array[i]);
        }
    }

    return Math.min(...candidates);
}