function solution(code) {
    let answer = '';
    let mode = 0;

    for (let i = 0; i < code.length; i++) {
        switch (mode) {
            case 0:
                if (code[i] !== "1") {
                    if (i % 2 === 0) {
                        answer += code[i];
                    }
                } else {
                    mode = 1;
                }
                break;
            case 1:
                if (code[i] !== "1") {
                    if (i % 2 === 1) {
                        answer += code[i];
                    }
                } else {
                    mode = 0;
                }
                break;
        }
    }

    if (mode === 1) {
        mode = 0;
    }

    if (answer === '') {
        return "EMPTY";
    }

    return answer;
}

console.log(solution("abc1abc1abc"));



