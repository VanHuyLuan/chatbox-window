const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  const files = [
    "./dist/chatbox-window/polyfills.js",
    "./dist/chatbox-window/main.js",
  ];
  await fs.ensureDir("chatboxs");
  await concat(files, "chatboxs/chat-box.js");
})();
