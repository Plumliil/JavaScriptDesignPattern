// // 普通单例
// const Singleton = function (name) {
//   this.name = name;
//   this.instance = null;
// }

// Singleton.getSingleton = function (name) {
//   if (!this.instance) {
//     this.instance = new Singleton(name)
//   }
//   return this.instance
// }

// const s1 = Singleton.getSingleton('tom');
// const s2 = Singleton.getSingleton('bob');
// console.log(s1 === s2, s1, s2);
// // 透明单例
// const LucencyCreateDiv = (function () {
//   let instance;
//   const CreateDiv = function (html) {
//     if (instance) {
//       return instance
//     }
//     this.html = html;
//     this.init();
//     return instance = this;
//   }
//   CreateDiv.prototype.init = function () {
//     // const div = document.createElement('div');
//     // div.innerHTML = this.html;
//     // document.body.appendChild(div);
//     return 'has append div child'
//   }
//   return CreateDiv;
// })()

// const d1 = new LucencyCreateDiv('tom');
// const d2 = new LucencyCreateDiv('bob');
// console.log(d1 === d2, d1, d2); // true

// // 引入代理类
// const CreateDiv = function (html) {
//   this.html = html;
//   this.init()
// }
// CreateDiv.prototype.init = function () {
//   return 'has append div child' + this.html
// }
// const ProxySingletonCreateDiv = (function () {
//   let instance;
//   return function (html) {
//     if (!instance) {
//       instance = new CreateDiv(html)
//     }
//     return instance
//   }
// })()

// const p1 = new ProxySingletonCreateDiv('tom');
// const p2 = new ProxySingletonCreateDiv('bob');

// console.log(p1 === p2, p1, p2);

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
const counter1 = new Counter();
const counter2 = new Counter();
console.log(counter1, counter2);
console.log(counter1.getInstance() === counter2.getInstance()); // false