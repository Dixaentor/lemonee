let currentControllerCleanup = null;
const viewRoutes = {
  "/": { view: "home" },
  "/home": { view: "home" },
  "/login": { view: "login", controller: "auth" },
  "/register": { view: "register", controller: "auth" },
  "/404": { view: "404" },
};

export async function render() {
    let route = await laodPath();
    const response = await fetch(`/public/views/${route.view}.view.html`);
    return response.text();
}

export async function laodPath(){
    const path = location.hash.replace("#", "") || "/";
    const route = viewRoutes[path] || viewRoutes["/404"];
    
    return route;
}

export async function loadController() {
    let route = await laodPath();
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
