function solution(str1, str2) {
  const str1Length = str1.length;
  const str2Length = str2.length;

  for (let i = 0; i <= str2Length - str1Length; i++) {
    if (str2.substring(i, i + str1Length) === str1) {
      return 1; // str1이 str2의 부분 문자열인 경우
    }
  }

  return 0; // str1이 str2의 부분 문자열이 아닌 경우
}