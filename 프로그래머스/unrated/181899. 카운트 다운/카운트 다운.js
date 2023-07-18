function solution(start, end) {
  let answer = [];
  //10 ~ 3
  for (let i = end; i <= start; i++) {
    answer.push(i)
  }
  return answer.reverse();
}