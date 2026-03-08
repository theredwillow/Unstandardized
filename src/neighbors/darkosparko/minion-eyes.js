console.log("Minion eyes script loaded!");

const MINIONS = {
  kevin: {
    eyes: 2
  },
  stuart: {
    eyes: 1
  },
  bob: {
    eyes: 2
  }
};

const tribe = document.body.querySelector(".tribe");

class Minion {
  constructor(name) {
    this.name = name;

    this._minion = document.body.querySelector(`.minion.${name}`);
    this._leftEye = this._minion.querySelector(".eye");
    this._leftEye.querySelector("#eye-mask").setAttribute("id", `${name}-eye-mask`);
    this._leftEye.querySelector(".under-eyelid").setAttribute("mask", `url(#${name}-eye-mask)`);

    const { eyes: numberOfEyes } = MINIONS[name];
    if (numberOfEyes > 1) {
      this._rightEye = this._leftEye.cloneNode(true);
      this._leftEye.classList.add("left");
      this._rightEye.classList.add("right");
      this._rightEye.querySelector(`#${name}-eye-mask`).setAttribute("id", `${name}-right-eye-mask`);
      this._rightEye.querySelector(".under-eyelid").setAttribute("mask", `url(#${name}-right-eye-mask)`);
      this._minion.querySelector(".minion-eyes").appendChild(this._rightEye);
      this._rightEye.addEventListener("mouseenter", () => this._rightEye.classList.add("closed"));
      this._rightEye.addEventListener("mouseleave", () => this._rightEye.classList.remove("closed"));
    }
    
    this._leftEye.addEventListener("mouseenter", () => this._leftEye.classList.add("closed"));
    this._leftEye.addEventListener("mouseleave", () => this._leftEye.classList.remove("closed"));
    this.startWatchingMouse(tribe, "left");
    this.startWatchingMouse(tribe, "right");
  }

  openEye(eye = "left") {
    const eyeElement = eye === "left" ? this._leftEye : this._rightEye;
    eyeElement.classList.remove("closed");
  }

  closeEye(eye = "left") {
    const eyeElement = eye === "left" ? this._leftEye : this._rightEye;
    eyeElement.classList.add("closed");
  }

  lookAtMouse(clientX, clientY, eyeElement = this._leftEye) {
    console.log("mouse moved", clientX, clientY);
    const svg = eyeElement.closest("svg");
    const pupil = eyeElement.querySelector(".pupil");

    // 1. Create an SVG point and set it to the mouse coordinates
    let point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;

    // 2. Transform the point into the SVG's coordinate system (viewBox units)
    // This accounts for the 200px vs 50 unit scaling difference
    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    // 3. Get the eye's center in SVG units
    // Using getBBox() gives coordinates relative to the SVG viewBox
    const eyeBox = eyeElement.getBBox();
    const eyeCenterX = eyeBox.x + eyeBox.width / 2;
    const eyeCenterY = eyeBox.y + eyeBox.height / 2;

    // 4. Calculate angle and distance within the 50x50 coordinate system
    const angle = Math.atan2(svgPoint.y - eyeCenterY, svgPoint.x - eyeCenterX);

    // Set distance based on viewBox units (e.g., 5-8 units if the eye is ~20 units wide)
    const distance = 8;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // 5. Apply the movement
    // If the pupil is a <circle>, update cx/cy; otherwise use transform
    pupil.setAttribute("transform", `translate(${x}, ${y})`);
  }

  startWatchingMouse(elementToWatch = tribe, eye = "left") {
    const eyeElement = eye === "left" ? this._leftEye : this._rightEye;
    elementToWatch.addEventListener("mousemove", ({ clientX, clientY }) =>
      this.lookAtMouse(clientX, clientY, eyeElement),
    );
  }

  stopWatchingMouse(elementToWatch = tribe, eye = "left") {
    const eyeElement = eye === "left" ? this._leftEye : this._rightEye;
    elementToWatch.removeEventListener("mousemove", ({ clientX, clientY }) =>
      this.lookAtMouse(clientX, clientY, eyeElement),
    );
  }
}

const kevin = new Minion("kevin");
const stuart = new Minion("stuart");
const bob = new Minion("bob");
