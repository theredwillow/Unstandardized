console.log("Minion eyes script loaded!");

class Minion {
  constructor(name) {
    this.name = name;
    this.minion = document.body.querySelector(`.minion.${name}`);
    this.eyes = [...this.minion.querySelectorAll(".eye")];
  }

  blink() {
    console.log('kevin blinked');
    this.eyes.forEach((eye) => {
      eye.classList.toggle("closed");
      setTimeout(() => {
        eye.classList.toggle("closed");
      }, 500);
    });
  }
}

const kevin = new Minion("kevin");
setTimeout(() => {
  kevin.blink();
}, 1000);
