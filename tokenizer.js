import Token from "./token.js";

class Tokenizer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentChar = this.input[this.position];
  }

  error() {
    throw new Error(
      `Invalid character ${this.currentChar} at ${this.position}`
    );
  }
  advance() {
    this.position++;
    if (this.position >= this.input.length) {
      this.currentChar = null;
    }
    this.currentChar = this.input[this.position];
  }
  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  number() {
    let result = "";
    while (this.currentChar && /[\d.]/.test(this.currentChar)) {
      result = result + this.currentChar;
      this.advance();
    }

    return parseFloat(result);
  }

  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return new Token("NUMBER", this.number());
      }

      const singleChar = {
        "+": "PLUS",
        "-": "MINUS",
        "*": "MULTIPLY",
        "/": "DIVIDE",
        "(": "LPAREN",
        ")": "RPAREN",
      };

      if (singleChar[this.currentChar]) {
        let char = this.currentChar;
        this.advance();
        return new Token(singleChar[char], char);
      }
      this.error();
    }

    return new Token("EOF", null);
  }
  tokenize() {
    const tokens = [];
    let token = this.getNextToken();

    while (token.type !== "EOF") {
      tokens.push(token);
      token = this.getNextToken();
    }
    tokens.push(token);
    return tokens;
  }
}
