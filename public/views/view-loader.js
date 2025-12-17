const viewRoutes = {
  "/": { view: "home" },
  "/home": { view: "home" },
  "/404": { view: "404" },
};

export async function render() {
  const path = location.hash.replace("#", "") || "/";
  const route = viewRoutes[path] || viewRoutes['/404'];
  const html = await fetch(`/public/views/${route.view}.view.html`);
  return html.text();
}
