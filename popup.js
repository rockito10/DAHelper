"use strict";
const cuteButton = document.getElementById("AddCuteTagsButton");
// const otherButton = document.getElementById("otherButton") as HTMLButtonElement;
// add your button ^
// each button can place its own tags
function addButtonTags(button, tags) {
    button.addEventListener("click", () => {
        chrome.runtime.sendMessage({ message: "setTags", tags });
    });
}
addButtonTags(cuteButton, "cute cutedrawing");
// addButtonTags(otherButton, "yourtags");
// ^ add your tags to your button
