const layout = document.getElementById("layout");
const tin = document.querySelectorAll(".tin");

tin.forEach((tin) => {
  tin.addEventListener("click", () => {
    layout.dataset.state =
      layout.dataset.state === "closed" ? "opened" : "closed";
  });
});

const thisWIMSEIndex = WIMSEsites.findIndex((site) =>
  window.location.href.startsWith(site.link),
);
console.log("Found at index #", thisWIMSEIndex);

let randomIndex;
let random;
do {
  randomIndex = Math.floor(Math.random() * WIMSEsites.length);
  random = WIMSEsites[randomIndex];
} while (randomIndex === thisWIMSEIndex);

let prev = 0;
let next = 0;
if (thisWIMSEIndex > -1) {
  prev =
    WIMSEsites[
      thisWIMSEIndex - 1 < 0 ? WIMSEsites.length - 1 : thisWIMSEIndex - 1
    ];
  next =
    WIMSEsites[
      thisWIMSEIndex + 1 >= WIMSEsites.length ? 0 : thisWIMSEIndex + 1
    ];
} else {
  console.error("It appears unstandardized has been kicked off this webring!");
}

const prevLink = document.getElementById("prev");
if (prev) {
  prevLink.href = prev.link;
  prevLink.title = prev.name;
} else {
  prevLink.style.display = "none";
}

const randomLink = document.getElementById("random");
randomLink.href = random.link;
randomLink.title = random.name;

const nextLink = document.getElementById("next");
if (next) {
  nextLink.href = next.link;
  nextLink.title = next.name;
} else {
  nextLink.style.display = "none";
}
