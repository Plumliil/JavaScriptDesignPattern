## 原型模式
原型模式是在同一类型的许多对象之间共享属性的有用方法.原型是 JavaScript 原生的对象，可以通过原型链被对象访问。

在我们的应用程序中，我们经常需要创建许多相同类型的对象。实现此目的的一个有用方法是创建 ES6 类的多个实例。

假设我们想创造很多狗！在我们的例子中，狗不用做那么多：它们只是有一个名字，而且它们可以吠叫！

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");
```
请注意这里构造函数如何包含 name 属性，而类本身如何包含 bark 属性。使用 ES6 类时，类本身定义的所有属性（在本例中为 bark）都会自动添加到原型中。

我们可以通过访问构造函数上的prototype属性直接查看原型，或者通过任何实例上的__proto__属性。

```javascript
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```

构造函数的任何实例上的 __proto__ 值都是对构造函数原型的直接引用！每当我们尝试直接访问对象上不存在的对象属性时，JavaScript 就会沿着原型链向下查找该属性在原型链中是否可用