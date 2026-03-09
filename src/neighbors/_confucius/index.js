console.log("Confucius script loaded!");

const figure = document.body.querySelector("#figure");
function nextStep() {
  const currentStep = document.querySelector(".content .active");
  const nextStep = currentStep.nextElementSibling;
  if (nextStep) {
    figure.classList.add("in-corner");
    currentStep.classList.remove("active");
    nextStep.classList.add("active");
  } 
}