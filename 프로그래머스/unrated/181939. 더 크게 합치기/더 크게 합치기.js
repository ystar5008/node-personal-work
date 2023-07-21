function solution(a, b) {
    const abConcat = Number(String(a) + String(b));
    const baConcat = Number(String(b) + String(a));
    return Math.max(abConcat, baConcat);
}