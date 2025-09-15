import ASTNode from "./astNode.js";

class ExpressionParser {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
    this.currentToken = this.tokens[this.position];
  }

  // Why do we need error()?
  // To provide helpful feedback when the syntax is wrong
  error() {
    throw new Error(
      `Unexpected token: ${this.currentToken.type} at position ${this.position}`
    );
  }

  // Why do we need eat()?
  // To "consume" expected tokens and move to the next one
  // This is like saying "I expect a semicolon here" and moving past it
  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.tokens[++this.position];
    } else {
      this.error();
    }
  }

  // Why separate factor(), term(), and expression()?
  // To handle operator precedence correctly: * and / before + and -
  // Grammar: expression = term (('+' | '-') term)*
  expression() {
    let node = this.term(); // Start with higher precedence operations

    // Handle addition and subtraction (lower precedence)
    while (["PLUS", "MINUS"].includes(this.currentToken.type)) {
      const op = this.currentToken.type;
      this.eat(op);

      const right = this.term();
      const binOp = new ASTNode("BINARY_OPERATION", op);
      binOp.addChild(node); // Left operand
      binOp.addChild(right); // Right operand
      node = binOp;
    }

    return node;
  }

  // Grammar: term = factor (('*' | '/') factor)*
  term() {
    let node = this.factor();

    // Handle multiplication and division (higher precedence)
    while (["MULTIPLY", "DIVIDE"].includes(this.currentToken.type)) {
      const op = this.currentToken.type;
      this.eat(op);

      const right = this.factor();
      const binOp = new ASTNode("BINARY_OPERATION", op);
      binOp.addChild(node);
      binOp.addChild(right);
      node = binOp;
    }

    return node;
  }

  // Grammar: factor = NUMBER | '(' expression ')'
  // Why do we need factor()?
  // To handle the highest precedence elements: numbers and parentheses
  factor() {
    const token = this.currentToken;

    if (token.type === "NUMBER") {
      this.eat("NUMBER");
      return new ASTNode("NUMBER", token.value);
    } else if (token.type === "LPAREN") {
      this.eat("LPAREN");
      const node = this.expression(); // Recursively parse the expression inside
      this.eat("RPAREN");
      return node;
    }

    this.error();
  }
}

export default ExpressionParser;
