export function init() {
  console.log("auth controller loaded");

  const btn = document.getElementById("btn-register");
  console.log(btn);
  function handler(){alert("auth clicked and working")};

  btn?.addEventListener("click", handler);

  return () => {
    btn?.removeEventListener("click", handler);
    console.log("auth controller unloaded");
  };
}