function solution(n) {
    let collatzSeq = [n];

    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        collatzSeq.push(n);
    }

    return collatzSeq;
}