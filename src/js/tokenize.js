export default function tokenize(code) {
  const regExp = /\s*([a-zA-Z]+|-?[0-9]+\.?(?:[0-9]+)?|\S)\s*/g;
  const tokens = [];

  let match;
  
  while (match = regExp.exec(code)) {
    tokens.push(match[1]);
  }

  return tokens;
}
