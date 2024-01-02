
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

```javascript
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
// Error: You can only create one instance!
```

完美!我们再也不能创建多个实例

现在我们将Counter实例1从counter.js中暴露出来,但是在行动之前,我们需要将该实例冻结,Object.freeze 方法确保使用代码无法修改单例.

处于冻结状态的实例无法添加或修改属性,这就降低了意外覆盖单例中值的风险操作

```javascript
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
```

让我们看一下实现 Counter 示例的应用程序。我们有以下文件
- counter.js 包含Counter类且默认导出一个Counter实例
- index.js 加载 redButton.js 和 blueButton.js 
- redButton.js 引入Counter ,添加Counter的increment方法作为红色按钮的监听器并通过调用 getCount 方法记录counter的当前值
- blueButton.js 引入Counter ,添加Counter的increment方法作为蓝色按钮的监听器并通过调用 getCount 方法记录counter的当前值


redButton.js和blueButton.js从counter.js中引入了相同的实例,该实例在两个文件中均作为 Counter 导入。

不论我们从红色按钮或者蓝色按钮上调用 increment 方法,两个个文件中Counter实例上counter属性的值都会更新,这和我们点击红色或者蓝色的按钮无关,同一个值在所有的实例上共享,这就是为什么即使我们在不同的文件中调用该方法,计数器也会不断地加1

## 折中
将实例化限制为仅一个实例可能会节省大量内存空间,我们不必每次都为新实例设置内存,而只需为一个实例设置内存,该实例在整个应用程序中都会被引用。然而，单例实际上被认为是一种反模式，并且应该在 JavaScript 中避免。

在java,c++等一些编程语言中不可能像javascript中那样直接创建对象,在那些面向对象的编程语言中，我们需要创建一个类，这个类会创建一个对象。创建的对象具有类实例的值，就像 JavaScript 示例中的实例值一样。

### 使用常规对象
让我们使用之前看到的相同示例。然而这一次，counter 只是一个包含以下内容的对象：
- 一个 count 属性
- 一个 increment 方法来使count加一
- 一个 decrement 方法来使count减一


Since objects are passed by reference, both redButton.js and blueButton.js are importing a reference to the same counter object. Modifying the value of count in either of these files will modify the value on the counter, which is visible in both files.

由于对象是通过引用传递的,因此redButton和blueButton都导入对同一计数器对象的引用,修改这两个文件中的count值都会修改counter上的值,该值在这两个文件中都可见