function solution(n) {
    for (i = 1; i <= n; i++) {
        if ((i * 6) % n == 0)
            return i
        if (n === 1) {
            return 1
        }
    }
}