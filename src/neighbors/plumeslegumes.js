console.log("plumeslegumes loaded");

const closeOpenedDialogue = () => {
  const alreadyOpenedDialogue = document.querySelector(".dia.opened");
  if (alreadyOpenedDialogue) {
    alreadyOpenedDialogue.classList.remove("opened");
  }
};

const plInfoButtons = [...document.querySelectorAll("#plumeslegumes .info")];
plInfoButtons.forEach((infoBtn) => {
  infoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeOpenedDialogue();
    const otherClass = [...infoBtn.classList].find(
      (className) => !["info", "opened"].includes(className),
    );
    const dialogue = document.querySelector(`.dia.${otherClass}`);
    dialogue.classList.add("opened");
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("dia")) return;
  closeOpenedDialogue();
});
