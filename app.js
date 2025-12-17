import { render } from "./public/views/view-loader.js";

window.addEventListener('DOMContentLoaded',async function(){
    let content = await render();
    const app = this.document.getElementById('app');
    app.innerHTML = content
});
window.addEventListener('hashchange',async function(){
    let content = await render();
    const app = this.document.getElementById('app');
    app.innerHTML = content
});
