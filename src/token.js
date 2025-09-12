class Token {
  constructor(type, value, position = 0) {
    this.type = type;
    this.value = value;
    this.position = position;
  }
  toString() {
    return `${this.type}(${this.value})`;
  }
}

export default Token;
