import { loadController, render } from "./public/views/view-loader.js";

async function load() {
  const content = await render();
  document.getElementById("app").innerHTML = content;
  await loadController();
}

window.addEventListener("DOMContentLoaded", load);
window.addEventListener("hashchange", load);