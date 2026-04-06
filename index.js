(function () {
  function createButton() {
    if (document.getElementById("goose-honk-btn")) return;

    const btn = document.createElement("div");
    btn.id = "goose-honk-btn";
    btn.innerHTML = "🪿";

    document.body.appendChild(btn);

    const honk = new Audio("https://www.myinstants.com/media/sounds/honk-sound.mp3");
    honk.volume = 0.4;

    // ===== LOAD POSITION =====
    const saved = localStorage.getItem("goose-pos");
    if (saved) {
      const pos = JSON.parse(saved);
      btn.style.left = pos.left;
      btn.style.top = pos.top;
      btn.style.right = "auto";
      btn.style.bottom = "auto";
    }

    // ===== DRAG (FIXED VERSION) =====
    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    btn.addEventListener("pointerdown", (e) => {
      isDragging = false;

      const rect = btn.getBoundingClientRect();

      startX = e.clientX;
      startY = e.clientY;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      btn.setPointerCapture(e.pointerId);

      // chuyển sang left/top
      btn.style.left = rect.left + "px";
      btn.style.top = rect.top + "px";
      btn.style.right = "auto";
      btn.style.bottom = "auto";
    });

    btn.addEventListener("pointermove", (e) => {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);

      // chỉ bắt đầu drag nếu di chuyển đủ xa (tránh click bị hiểu thành drag)
      if (!isDragging && (dx > 5 || dy > 5)) {
        isDragging = true;
      }

      if (!isDragging) return;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // giới hạn màn hình
      const maxX = window.innerWidth - btn.offsetWidth;
      const maxY = window.innerHeight - btn.offsetHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      btn.style.left = x + "px";
      btn.style.top = y + "px";
    });

    btn.addEventListener("pointerup", (e) => {
      btn.releasePointerCapture(e.pointerId);

      // nếu không drag → coi như click
      if (!isDragging) {
        const s = honk.cloneNode();
        s.playbackRate = 0.9 + Math.random() * 0.2;
        s.play();
        return;
      }

      // SNAP EDGE
      const rect = btn.getBoundingClientRect();
      const midX = window.innerWidth / 2;

      if (rect.left < midX) {
        btn.style.left = "10px";
      } else {
        btn.style.left = (window.innerWidth - btn.offsetWidth - 10) + "px";
      }

      // SAVE
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
