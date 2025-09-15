class ASTNode {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  toString(indent = 0) {
    const spaces = "  ".repeat(indent);

    let result = `${spaces}${this.type}`;

    if (this.value !== null) {
      result += `: ${this.value}`;
    }

    for (const child of this.children) {
      result += child.toString(indent + 1);
    }
    return result;
  }
}

export default ASTNode;
