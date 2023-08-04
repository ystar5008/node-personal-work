function solution(arr) {
    const target = 2;
    let minSubarray = [];

    let startIndex = -1;
    let endIndex = -1;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            if (count === 0) {
                startIndex = i;
            }
            endIndex = i;
            count++;
        }
    }

    if (count === 0) {
        return [-1];
    }

    for (let i = startIndex; i <= endIndex; i++) {
        minSubarray.push(arr[i]);
    }

    return minSubarray;
}

