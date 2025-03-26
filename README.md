# DAHelper
A helper for uploading in Deviant Art, through a Chrome extension.

# Download and use
Get the source code, then you can change either the typescript file (enabling typescript having npm or pnpm, installing with npm/pnpm i, then running npm/pnpm dev)
or the javascript one.

Add a button for a set of tags to HTML, then to JS:


HTML (popup.html)
```html
<form>
        <button id="AddCuteTagsButton">Cute</button>
        <!-- <button id="otherButton">Other</button> --> <- add your buttons here, you can change their names and ids as you wish
      </form>
```

JS (popup.js)
```javascript
const cuteButton = document.getElementById("AddCuteTagsButton");
// const otherButton = document.getElementById("otherButton") as HTMLButtonElement; <- here you get your button you just made in HTML, be sure to put the right id.
...
addButtonTags(cuteButton, "cute cutedrawing");
// addButtonTags(otherButton, "yourtags");  <- here you add your tags in a single string (example: "traditionalart traditional").

```

As a final step, you have to grab the folder and send it over to the google chrome extensions tab, enabling dev mode and dropping it.
Look for the button in the extensions section, and enjoy!
