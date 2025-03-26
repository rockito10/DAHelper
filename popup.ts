const cuteButton = document.getElementById("AddCuteTagsButton") as HTMLButtonElement;
// const otherButton = document.getElementById("otherButton") as HTMLButtonElement;
// add your button ^

// each button can place its own tags

function addButtonTags(button: HTMLButtonElement, tags: string) {
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ message: "setTags", tags });
  });
}

addButtonTags(cuteButton, "cute cutedrawing");
// addButtonTags(otherButton, "yourtags");
// ^ add your tags to your button
