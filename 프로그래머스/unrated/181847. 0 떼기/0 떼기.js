function solution(n_str) {
    let result = "";
    let foundFirstNonZero = false;

    for (let i = 0; i < n_str.length; i++) {
        const currentChar = n_str.charAt(i);

        if (currentChar !== "0" || foundFirstNonZero) {
            result += currentChar;
            foundFirstNonZero = true;
        }
    }

    return result;
}
