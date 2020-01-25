class Stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }


    push(value) {
        this.top++;
        this.items.push(value);
    }

    pop() {
        const data = this.items[this.top];
        this.items.splice(this.top, 1);
        this.top--;
        return data;
    }

    current() {
        return this.items[this.top];
    }

    isEmpty() {
        return this.top === -1;
    }

    clear() {
        this.top = -1;
        this.items = [];
        return this;
    }
}

export default Stack;