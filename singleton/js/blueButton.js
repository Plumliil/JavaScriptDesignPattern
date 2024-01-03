import Counter from "./counter";

// const Counter = require('./counter')

const blue = document.getElementById('blue');

blue.addEventListener('click', () => {
  Counter.decrement();
  console.log("Counter total:", Counter.getCount());
})