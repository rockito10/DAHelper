chrome.runtime.onMessage.addListener(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async (request: { message: string; tags: string }, sender: any, sendResponse: any) => {
    if (request.message === "setTags") {
      addTagsAndTitleOnCurrentTab(request.tags);
    }
  }
);

function addTagsAndTitleOnCurrentTab(tags: string) {
  let n = 0;

  chrome.storage.local.get("nextSketchId", (data: { nextSketchId: number }) => {
    n = data.nextSketchId;

    const title = `Sketch #${n}`;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || tab.id === undefined) return;

      chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        func: addTagsAndTitleOnDocument,
        args: [tags, title, n], //tags and title
      });
    });
  });
}

function addTagsAndTitleOnDocument(tags: string, title: string, nextSketchId: number) {
  const titleInput = document.getElementsByClassName("_1H6JV y7nva")[2] as HTMLInputElement;
  // const titleInput = document.getElementById("app-root-11") as HTMLInputElement;

  titleInput.addEventListener("click", () => {
    // force title
    titleInput.value = title;
  });

  const tagsInput = document.getElementsByClassName("_1H6JV")[3]; // DA input
  // const tagsInput = document.getElementById("app-root-12"); // DA input
  // paste event

  // paste event
  const pasteEvent = new ClipboardEvent("paste", {
    bubbles: true,
    cancelable: true,
    clipboardData: new DataTransfer(), // For providing clipboard data
  });

  if (!pasteEvent.clipboardData) return;
  // tags and replace data of clipboard to them
  pasteEvent.clipboardData.setData("text/plain", tags);

  tagsInput.dispatchEvent(pasteEvent);

  const submit = document.getElementsByClassName("_17yyH")[0] as HTMLButtonElement;
  submit.addEventListener("click", () => {
    chrome.storage.local.set({ nextSketchId: nextSketchId + 1 });
  });
}
