import Tokenizer from "./tokenizer.js";
import ExpressionParser from "./expressionParser.js";

function testExpressionParser(input) {
  console.log(`\nParsing: "${input}"`);

  // Step 1: Tokenize
  const tokenizer = new Tokenizer(input);
  const tokens = tokenizer.tokenize();
  // console.log("Tokens:", tokens.map((t) => t.toString()).join(" "));

  // Step 2: Parse
  const parser = new ExpressionParser(tokens);
  const ast = parser.expression();
  console.log("AST:");
  console.log(ast.toString());

  return ast;
}

testExpressionParser("3 / 4");
testExpressionParser("3 + 4 * 2"); // Should show * has higher precedence
testExpressionParser("(3 + 4) * 2");
