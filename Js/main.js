// put active class on click
let lis = document.querySelectorAll("nav ul li");
lis.forEach((e) => {
  e.onclick = function () {
    lis.forEach((el) => {
      el.classList.remove("active");
    });
    e.classList.add("active");
  };
});
// change background for nav in scroll
let nav = document.querySelector("nav");
window.onscroll = () => {
  if (window.scrollY >= 100) {
    nav.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  } else {
    nav.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  }
};
// random background in landing
let header = document.querySelector("header");
let image = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
];
let backgroundOption = true;
let backgroundInterval;
function RandomBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      let random = Math.floor(Math.random() * 8 + 0);
      header.dataset.backgroundimage = `url(../imags/${image[random]})`;
      document.styleSheets[0].rules[38].style.setProperty(
        `background-image`,
        `url(../imags/${image[random]})`
      );
    }, 10000);
  }
}
let check = document.querySelector(".setting .random-back .check");
let label = document.querySelector(".setting .random-back .label");
check.onclick = () => {
  check.classList.toggle("disable");
  if (check.classList.contains("disable")) {
    label.textContent = "OFF";
    backgroundOption = false;
    localStorage.setItem("background image", header.dataset.backgroundimage);
    clearInterval(backgroundInterval);
  } else {
    label.textContent = "ON";
    backgroundOption = true;
    RandomBackground();
  }
  window.localStorage.setItem("random background", backgroundOption);
};
window.onload = () => {
  if (localStorage.getItem("random background") != null) {
    if (localStorage.getItem("random background") == "false") {
      clearInterval(backgroundInterval);
      backgroundOption = false;
      document.styleSheets[0].rules[38].style.backgroundImage =
        localStorage.getItem("background image");
      check.classList.add("disable");
    } else {
      RandomBackground();
      backgroundOption = true;
    }
  } else {
    backgroundOption = true;
    RandomBackground();
  }
};

/* setting */
let setting = document.querySelector(".setting");
let setting_gear = document.querySelector(".setting i");

setting_gear.onclick = () => {
  setting.classList.toggle("set-show");
  setting_gear.classList.toggle("open-set");
};
// set main color
let liColor = document.querySelectorAll(".colors li");
let mainColor = localStorage.getItem("main color");
if (mainColor !== null) {
  liColor.forEach((e) => {
    e.classList.remove("activeC");
    if (e.dataset.color == mainColor) {
      e.classList.add("activeC");
    }
  });
}
document.documentElement.style.setProperty(
  "--main-color",
  localStorage.getItem("main color")
);
liColor.forEach((e) => {
  e.onclick = (el) => {
    liColor.forEach((ele) => {
      ele.classList.remove("activeC");
    });
    e.classList.add("activeC");
    localStorage.setItem("main color", el.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      localStorage.getItem("main color")
    );
  };
});

// skills
let ourSkills = document.querySelector(".our-skills");
let skillProgresSpan = document.querySelectorAll(".skill-progress span");
let aboutUs = document.querySelector(".about");
window.onscroll = () => {
  if (window.scrollY >= ourSkills.offsetTop - aboutUs.offsetTop + 300) {
    skillProgresSpan.textContent = skillProgresSpan.dataset;
    skillProgresSpan.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
// Our gallery
let gallery = document.querySelectorAll(".our-gallery .photos img");
gallery.forEach((img) => {
  img.onclick = (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let imgPop = document.createElement("img");
    let imgBox = document.createElement("div");
    imgPop.src = img.src;
    imgPop.className = "popImg";
    imgBox.className = "popBox";
    imgBox.appendChild(imgPop);
    document.body.appendChild(imgBox);
    overlay.onclick = () => {
      imgBox.remove();
      overlay.remove();
    };
    if (img.alt != "") {
      let paraPop = document.createElement("p");
      paraPop.textContent = img.alt;
      imgBox.style.borderTopWidth = "50px";
      imgBox.append(paraPop);
    }
  };
});
// reset button
let reset = document.querySelector(".reset");
reset.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
// dont make any thing on submit
let submit = document.querySelector(".right [type=submit]");

submit.onclick = () => {
  submit.preventDefault();
};
