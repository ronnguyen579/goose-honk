(function () {
  function createButton() {
    if (document.getElementById("goose-honk-btn")) return;

    const btn = document.createElement("div");
    btn.id = "goose-honk-btn";
    btn.innerHTML = "🪿";

    document.body.appendChild(btn);

    const honk = new Audio("https://www.myinstants.com/media/sounds/honk-sound.mp3");
    honk.volume = 0.4;

    btn.addEventListener("click", () => {
      const s = honk.cloneNode();
      s.playbackRate = 0.9 + Math.random() * 0.2;
      s.play();
    });
  }

  // chạy nhiều lần để đảm bảo UI reload vẫn có nút
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
