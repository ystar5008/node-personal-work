function solution(arr, intervals) {
    const [a1, b1] = intervals[0];
    const [a2, b2] = intervals[1];

    const interval1 = arr.slice(a1, b1 + 1);
    const interval2 = arr.slice(a2, b2 + 1);

    return interval1.concat(interval2);
}