function solution(arr) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i][j] !== arr[j][i]) {
                return 0; // If any element doesn't match the condition, return 0 immediately.
            }
        }
    }

    return 1; // If all elements pass the condition, return 1.
}

