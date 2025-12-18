let currentControllerCleanup = null;
const viewRoutes = {
  "/": { view: "home" },
  "/home": { view: "home" },
  "/login": { view: "login", controller: "auth" },
  "/register": { view: "register", controller: "auth" },
  "/404": { view: "404" },
};
const path = location.hash.replace("#", "") || "/";
const route = viewRoutes[path] || viewRoutes["/404"];

export async function render() {
  const response = await fetch(`/public/views/${route.view}.view.html`);
  const html = await response.text();
  
  return html;
}

export async function loadController() {
    if (typeof currentControllerCleanup === "function") {
    currentControllerCleanup();
    currentControllerCleanup = null;
  }
  if (route.controller) {
    const module = await import(
      `/public/controllers/${route.controller}.controller.js`
    );
    if (typeof module.init === "function") {
      currentControllerCleanup = module.init();
    }
  }
}
