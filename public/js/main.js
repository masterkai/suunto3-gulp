document.addEventListener("DOMContentLoaded", function () {
  console.log('hello there!!!!!!!!');

  class Person {
    constructor(name) {
      this.name = name;
    }

    hello() {
      if (typeof this.name === 'string') {
        return `Hello, I am ${this.name}!`;
      } else {
        return `Hello!`;
      }
    }
  }

  let person = new Person('MasterKai919~~');
  // var name = 'Jen Smith';

  const greetHTML = templates['greeting']({
    message: person.hello()
  });
  // console.log(greetHTML);


});