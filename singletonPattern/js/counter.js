let counter = 0;
let instance;
class Counter {
  getInstance() {
    if (instance) {
      throw new Error("You can only create one instance!")
    }
    instance = this;
  }
  getCount() {
    return counter;
  }
  increment() {
    return ++counter;
  }
  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter