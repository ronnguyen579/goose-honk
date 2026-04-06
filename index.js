(function () {
  function createButton() {
    if (document.getElementById("goose-honk-btn")) return;

    const btn = document.createElement("div");
    btn.id = "goose-honk-btn";
    btn.innerHTML = "🪿";

    document.body.appendChild(btn);

    const honk = new Audio("https://www.myinstants.com/media/sounds/honk-sound.mp3");
    honk.volume = 0.4;

    // ===== LOAD SAVED POSITION =====
    const saved = localStorage.getItem("goose-pos");
    if (saved) {
      const pos = JSON.parse(saved);
      btn.style.left = pos.left;
      btn.style.top = pos.top;
      btn.style.right = "auto";
      btn.style.bottom = "auto";
    }

    // ===== CLICK HONK =====
    btn.addEventListener("click", () => {
      const s = honk.cloneNode();
      s.playbackRate = 0.9 + Math.random() * 0.2;
      s.play();
    });

    // ===== DRAG =====
    let isDragging = false;
    let offsetX, offsetY;

    btn.addEventListener("mousedown", (e) => {
      isDragging = true;

      const rect = btn.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      btn.style.left = rect.left + "px";
      btn.style.top = rect.top + "px";
      btn.style.right = "auto";
      btn.style.bottom = "auto";

      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // ===== GIỚI HẠN TRONG MÀN =====
      const maxX = window.innerWidth - btn.offsetWidth;
      const maxY = window.innerHeight - btn.offsetHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      btn.style.left = x + "px";
      btn.style.top = y + "px";
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;

      document.body.style.userSelect = "";

      // ===== SNAP EDGE =====
      const rect = btn.getBoundingClientRect();
      const midX = window.innerWidth / 2;

      if (rect.left < midX) {
        btn.style.left = "10px";
      } else {
        btn.style.left = (window.innerWidth - btn.offsetWidth - 10) + "px";
      }

      // ===== SAVE POSITION =====
      localStorage.setItem("goose-pos", JSON.stringify({
        left: btn.style.left,
        top: btn.style.top
      }));
    });

    // ===== DOUBLE CLICK RESET =====
    btn.addEventListener("dblclick", () => {
      btn.style.left = "auto";
      btn.style.top = "auto";
      btn.style.right = "20px";
      btn.style.bottom = "20px";

      localStorage.removeItem("goose-pos");
    });
  }

  function init() {
    createButton();
    setTimeout(createButton, 1000);
    setTimeout(createButton, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
