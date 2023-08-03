function solution(names) {
    // let answer = names.map((e, i) => i % 5 === 0 ? e : null)


    let answer = names.filter((e, i) => i % 5 === 0);
    return answer;



    // return answer;
}