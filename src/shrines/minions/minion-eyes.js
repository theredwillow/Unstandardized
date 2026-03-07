console.log("Minion eyes script loaded!");

// TODO Dynamically change number of eyes by the character
// const MINIONS = {
//   kevin: {
//     eyes: 2
//   },
//   stuart: {
//     eyes: 1
//   },
//   bob: {
//     eyes: 2
//   }
// };

class Minion {
  constructor(name) {
    this.name = name;
    this._minion = document.body.querySelector(`.minion.${name}`);
    const eyeElements = [
      ...this._minion.querySelectorAll(".eye"),
    ];
    eyeElements.forEach((eye) => {
      eye.addEventListener("mouseenter", () => eye.classList.add("closed"));
      eye.addEventListener("mouseleave", () => eye.classList.remove("closed"));
    });
    [this._leftEye, this._rightEye] = eyeElements;
  }

  openEye(eye = "left") {
    const eyeElement = eye === "left" ? this._leftEye : this._rightEye;
    eyeElement.classList.remove("closed");
  }

  closeEye(eye ="left") {
    const eyeElement = eye === "left" ? this._leftEye : this._right;
    eyeElement.classList.add("closed");
  }
}

const kevin = new Minion("kevin");
