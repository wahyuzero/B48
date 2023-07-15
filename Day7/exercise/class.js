class Motor {
    constructor(color, price) {
      this.color = color;
      this.price = price;
    }
  
    getInfo() {
      return `I have a motor with color ${this.color}, and the price is $${this.price}`;
    }
  }
  
  const motor1 = new Motor('red', 100);
  const motor2 = new Motor('green', 300);
  console.log(motor1.getInfo());
  console.log(motor2.getInfo());
  