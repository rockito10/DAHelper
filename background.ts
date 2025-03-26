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
        func: addTagsOnDocument,
        args: [tags, n], //tags and title
      });
    });
  });
}

function addTagsOnDocument(tags: string, nextSketchId: number) {
  const tagsInput = document.getElementsByClassName("_1H6JV")[3]; // DA input

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
}
