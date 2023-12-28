
## 单例模式
单例是可以实例化一次就可以全局访问的类,这个创建出来的单例可以在整个应用中进行共享,这使得单例可以帮助应用管理全局状态

首先让我们看下在ES2015类写法中单例是长什么样子的,对于这个例子,我们将构建一个Counter类,它具有:
- getInstance 方法 来返回一个示例
- getCount 方法 来返回 counter 变量
- 一个 increment 方法来使 counter 加一
- 一个 decrement 方法来使 counter 减一

```javascript
let counter = 0;
class Counter {
  getInstance() {
    return this;
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
console.log(counter1.getInstance() === counter2.getInstance()); // false
```
通过调用两次new方法,我们只是给counter1和counter2设置为不同的实例,counter1合counter2通过getInstance返回的值实际上是不同的实例引用,它们并不严格相等!

让我们来确保Counter只会创建一个实例

确保只会创建一个实例得方法是创建一个叫做instance得变量,在Counter的构造器中,当创建新的实例时,我们可以将instance设置为该实例的引用.我们可以通过判断instance是否有值来防止新实例的创建,如果是实例已经存在,这种情况下应该抛出一个异常来提示用户实例已存在