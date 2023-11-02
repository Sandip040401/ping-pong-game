import "./styles.css";
document.addEventListener("DOMContentLoaded", () => {
  const topRod = document.getElementById("topRod");
  const bottomRod = document.getElementById("bottomRod");
  const ball = document.getElementById("ball");
  const scoresTab = document.getElementById("scores-tab");
  const bestScoreDisplay = document.getElementById("best-score");

  let ballSpeedX = 2;
  let ballSpeedY = 2;

  let topRodPosition = (window.innerWidth - 120) / 2; // Center the top rod
  let bottomRodPosition = (window.innerWidth - 120) / 2; // Center the bottom rod

  let score = 0;
  let bestScore = localStorage.getItem("bestScore") || 0;

  // Set initial positions of rods
  topRod.style.left = topRodPosition + "px";
  topRod.innerHTML = "Rod 1";
  bottomRod.style.left = bottomRodPosition + "px";
  bottomRod.innerHTML = "Rod 2";

  // Set initial position of the ball
  ball.style.left = (window.innerWidth - 20) / 2 + "px"; // Center the ball horizontally
  ball.style.top = (window.innerHeight - 20) / 2 + "px"; // Center the ball vertically

  document.addEventListener("keydown", (e) => {
    if (e.key === "a" && topRodPosition > 0) {
      topRodPosition -= 10;
    } else if (e.key === "d" && topRodPosition < window.innerWidth - 120) {
      topRodPosition += 10;
    }

    topRod.style.left = topRodPosition + "px";
    bottomRod.style.left = topRodPosition + "px";
  });

  function startGame() {
    scoresTab.classList.add("hidden"); // Hide scores tab when the game starts
    alert("Game started!");

    // Game logic here

    // Example: Move ball
    setInterval(() => {
      moveBall();
    }, 16);
  }

  function moveBall() {
    const ballRect = ball.getBoundingClientRect();
    const topRodRect = topRod.getBoundingClientRect();
    const bottomRodRect = bottomRod.getBoundingClientRect();

    if (
      ballRect.top <= topRodRect.bottom &&
      ballRect.bottom >= topRodRect.top &&
      ballRect.left <= topRodRect.right &&
      ballRect.right >= topRodRect.left
    ) {
      // Ball hits the top rod
      ballSpeedY = Math.abs(ballSpeedY); // Reverse direction
      score++;
    } else if (
      ballRect.top <= bottomRodRect.bottom &&
      ballRect.bottom >= bottomRodRect.top &&
      ballRect.left <= bottomRodRect.right &&
      ballRect.right >= bottomRodRect.left
    ) {
      // Ball hits the bottom rod
      ballSpeedY = -Math.abs(ballSpeedY); // Reverse direction
      score++;
    }

    // Update ball position
    const newLeft = ballRect.left + ballSpeedX;
    const newTop = ballRect.top + ballSpeedY;

    // Check left boundary
    if (newLeft >= 0 && newLeft <= window.innerWidth - 20) {
      ball.style.left = newLeft + "px";
    } else {
      ballSpeedX = -ballSpeedX; // Reverse direction
    }

    // Check top and bottom boundaries
    if (newTop >= 0 && newTop <= window.innerHeight - 20) {
      ball.style.top = newTop + "px";
    } else {
      // Ball went out of bounds at the top or bottom
      endGame();
    }
  }

  function endGame() {
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore);
    }

    bestScoreDisplay.textContent = `Best Score: ${bestScore}`;
    scoresTab.classList.remove("hidden");

    alert(`Game Over! Your score: ${score}`);
    // Reset game state
    topRodPosition = (window.innerWidth - 120) / 2;
    bottomRodPosition = (window.innerWidth - 120) / 2;
    score = 0;

    // Move rods and ball to center
    topRod.style.left = topRodPosition + "px";
    bottomRod.style.left = topRodPosition + "px";
    ball.style.left = (window.innerWidth - 20) / 2 + "px";
    ball.style.top = (window.innerHeight - 20) / 2 + "px";

    // Start new game on Enter key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        scoresTab.classList.add("hidden");
        startGame();
      }
    });
  }

  // Initial game start
  startGame();
});
  