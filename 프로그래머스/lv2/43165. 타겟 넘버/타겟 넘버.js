function findTargetNumbers(numbers, target, idx, currentSum) {
  if (idx === numbers.length) {
    return currentSum === target ? 1 : 0;
  }

  const plusCount = findTargetNumbers(numbers, target, idx + 1, currentSum + numbers[idx]);
  const minusCount = findTargetNumbers(numbers, target, idx + 1, currentSum - numbers[idx]);

  return plusCount + minusCount;
}

function solution(numbers, target) {
  return findTargetNumbers(numbers, target, 0, 0);
}