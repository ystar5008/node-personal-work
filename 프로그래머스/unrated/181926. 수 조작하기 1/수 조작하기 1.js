function solution(n, control) {
    for (let char of control) {
      switch (char) {
        case 'w':
          n += 1;
          break;
        case 's':
          n -= 1;
          break;
        case 'd':
          n += 10;
          break;
        case 'a':
          n -= 10;
          break;
        default:
          break;
      }
    }
    return n;
  }