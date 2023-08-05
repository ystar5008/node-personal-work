function solution(ineq, eq, n, m) {
    let answer = 0;


    //1. ineq와 eq를 붙혀인 조건문으로 n과 m을 비교 "<" , ">"  "=" "!"
    if (ineq === "<" && eq === "=") {
        return n <= m ? 1 : 0;
    }

    if (ineq === ">" && eq === "=") {
        return n >= m ? 1 : 0;
    }

    if (ineq === ">" && eq === "!") {
        return n > m ? 1 : 0;
    }


    if (ineq === "<" && eq === "!") {
        return n < m ? 1 : 0;
    }

}