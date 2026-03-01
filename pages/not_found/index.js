// Get the path (e.g., "/not-found")
const missingPath = window.location.pathname;

const routeTitle = document.getElementById("route-title");
if (routeTitle) {
  routeTitle.textContent = missingPath;
}

const shrine = document.getElementById("shrine");
if (shrine) {
  shrine.textContent = missingPath;
}

const man = document.getElementById("man");
const text = document.getElementById("text");
setTimeout(() => {
  if (man) {
    man.src = src = "/assets/404_image_2.png";
  }

  if (text) {
    text.textContent = "IF I HAD ONE!";
  }
}, 3000);
