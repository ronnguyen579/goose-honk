(function () {
  // Wait until DOM is ready
  function init() {
    if (document.getElementById("goose-honk-btn")) return;

    // Create button
    const btn = document.createElement("div");
    btn.id = "goose-honk-btn";
    btn.innerHTML = "🪿";

    document.body.appendChild(btn);

    // Sound
    const honk = new Audio("https://www.myinstants.com/media/sounds/honk-sound.mp3");
    honk.volume = 0.4;

    // Click event
    btn.addEventListener("click", () => {
      const s = honk.cloneNode();
      s.playbackRate = 0.9 + Math.random() * 0.2;
      s.currentTime = 0;
      s.play();
    });
  }

  // Ensure it runs after load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();