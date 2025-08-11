"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
chrome.runtime.onMessage.addListener(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (request, sender, sendResponse) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (request.message === "setTags") {
        addTagsAndTitleOnCurrentTab(request.tags);
      }
    })
);
function addTagsAndTitleOnCurrentTab(tags) {
  let n = 0;
  chrome.storage.local.get("nextSketchId", (data) => {
    // get the id of the next drawing

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || tab.id === undefined) return;
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        func: addTagsOnDocument,
        args: [tags], //tags and title
      });
    });
  });
}
function addTagsOnDocument(tags) {
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
