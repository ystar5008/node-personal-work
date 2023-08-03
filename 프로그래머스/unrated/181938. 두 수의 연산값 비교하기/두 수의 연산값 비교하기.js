function solution(a, b) {


    let Num = Number(String(a) + String(b))

    return Num > (2 * a * b) ? Num : (2 * a * b);
}