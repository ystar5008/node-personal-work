function solution(n, k) {
  let answer = [];
  for (let i = k; i <= n; i++) {
    if (i % k === 0) {
      answer.push(i)
    }
  }
  return answer;
}