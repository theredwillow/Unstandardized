console.log("Minion eyes script loaded!");

class Minion {
  constructor(name) {
    this.name = name;
    this._minion = document.body.querySelector(`.minion.${name}`);
    [this._leftEye, this._rightEye] = [
      ...this._minion.querySelectorAll(".eye"),
    ];
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
