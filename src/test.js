import Tokenizer from "./tokenizer.js";

function testTokenizer(input, tokenizerClass) {
  const tokenizer = new tokenizerClass(input);
  const tokens = tokenizer.tokenize();
  console.log("Result:", tokens.map((t) => t.toString()).join(" "));
  return tokens;
}

testTokenizer("let x = 5;", Tokenizer);
testTokenizer("function add(a, b) { return a + b; }", Tokenizer);
testTokenizer('if (x == 5) { print("hello"); }', Tokenizer);
