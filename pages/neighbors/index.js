const lazerBunnyButtonClick = () => {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;
  document.documentElement.style.setProperty(
    "--lazer-bunny-color",
    randomColor,
  );
};

const lazerBunnyButton = document.getElementById("lazer-bunny-button");
lazerBunnyButton.addEventListener("click", lazerBunnyButtonClick);
