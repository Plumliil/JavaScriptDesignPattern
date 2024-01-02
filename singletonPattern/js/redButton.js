// import Counter from "./counter";
const Counter = require('./counter')


const red = document.getElementById('red');

red.addEventListener('click', () => {
  Counter.increment();
  console.log("Counter total:", Counter.getCount());
})