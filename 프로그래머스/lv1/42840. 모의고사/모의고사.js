function solution(answers) {
  // 수포자들의 답안 패턴
  const pattern_1 = [1, 2, 3, 4, 5];
  const pattern_2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const pattern_3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  // 각 수포자의 정답 개수
  const scores = [0, 0, 0];

  // 정답 개수 count
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === pattern_1[i % pattern_1.length]) {
      scores[0] += 1;
    }
    if (answers[i] === pattern_2[i % pattern_2.length]) {
      scores[1] += 1;
    }
    if (answers[i] === pattern_3[i % pattern_3.length]) {
      scores[2] += 1;
    }
  }

  // 가장 많은 문제를 맞힌 사람 찾기
  const maxScore = Math.max(...scores);
  const result = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] === maxScore) {
      result.push(i + 1);
    }
  }

  return result;
}
