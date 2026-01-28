import { loadController, render } from "./src/routes/router.js";

async function load() {
  let content = await render();
  const App = document.getElementById("app")
  App.innerHTML = content;
  await loadController();
}

window.addEventListener("hashchange", load);
window.addEventListener("DOMContentLoaded", load);