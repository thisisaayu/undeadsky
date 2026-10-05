(function () {
  const audio = document.getElementById("audio");
  const button = document.getElementById("playButton");
  const progress = document.getElementById("progress");
  const fill = document.getElementById("progressFill");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const playerState = document.getElementById("playerState");

  if (!audio || !button || !progress || !fill || !currentTime || !duration || !playerState) return;

  function formatTime(seconds) {
    const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = Math.floor(safeSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function updateProgress() {
    const total = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    const percent = total ? (audio.currentTime / total) * 100 : 0;

    fill.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    progress.setAttribute("aria-valuenow", String(Math.round(percent)));
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(total);
  }

  function seek(clientX) {
    const total = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    if (!total) return;

    const rect = progress.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = percent * total;
  }

  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        playerState.textContent = "tap again";
      });
    } else {
      audio.pause();
    }
  });

  progress.addEventListener("click", (event) => {
    seek(event.clientX);
  });

  progress.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
    }

    if (event.key === "ArrowLeft") {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  });

  audio.addEventListener("play", () => {
    button.classList.add("is-playing");
    button.setAttribute("aria-label", "Pause faithful");
    playerState.textContent = "playing";
  });

  audio.addEventListener("pause", () => {
    button.classList.remove("is-playing");
    button.setAttribute("aria-label", "Play faithful");
    playerState.textContent = "paused";
  });

  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("durationchange", updateProgress);
  audio.addEventListener("timeupdate", updateProgress);

  updateProgress();
})();
