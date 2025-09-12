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

  identifier() {
    let result = "";
    while (this.currentChar && /[a-zA-Z_$]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    while (this.currentChar && /[a-zA-Z0-9_$]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return result;
  }

  string() {
    let result = "";
    this.advance();

    while (this.currentChar && this.currentChar !== '"') {
      result += this.currentChar;
      this.advance();
    }
    if (this.currentChar === '"') {
      this.advance();
    }
    return result;
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

      if (this.currentChar === "=" && this.input[this.position + 1] === "=") {
        this.advance();
        this.advance();
        return new Token("EQUALS", "==");
      }

      const singleChar = {
        "+": "PLUS",
        "-": "MINUS",
        "*": "MULTIPLY",
        "/": "DIVIDE",
        "(": "LPAREN",
        ")": "RPAREN",
        ";": "SEMICOLON",
        ",": "COMMA",
        "=": "ASSIGN",
        "{": "LBRACE",
        "}": "RBRACE",
      };

      if (singleChar[this.currentChar]) {
        let char = this.currentChar;
        this.advance();
        return new Token(singleChar[char], char);
      }

      if (/[a-zA-Z_$]/.test(this.currentChar)) {
        const value = this.identifier();

        const keywords = {
          let: "LET",
          const: "CONST",
          var: "VAR",
          if: "IF",
          else: "ELSE",
          function: "FUNCTION",
          return: "RETURN",
        };

        const type = keywords[value] || "IDENTIFIER";
        return new Token(type, value);
      }

      if (this.currentChar === '"') {
        return new Token("STRING", this.string());
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

export default Tokenizer;
