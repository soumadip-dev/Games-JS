// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the class 'col' (the game board cells)
  const cols = document.querySelectorAll(".col");

  // Set the initial player to "X"
  let currentPlayer = "X";

  // Initialize an array to keep track of the board state
  const colArray = new Array(9).fill("Empty");

  // Get the reset button element by its ID
  const resetButton = document.getElementById("reset-Button");

  // Attach a click event listener to the reset button to reset the game
  resetButton.addEventListener("click", resetGame);

  // Create a new div element to display game results (e.g., player turns, winner)
  const resultDisplay = document.createElement("div");
  resultDisplay.id = "result-display";

  // Get the container element and insert the result display above the reset button
  const container = document.getElementById("container");
  container.insertBefore(resultDisplay, resetButton);

  // Display the initial result message (e.g., Player X turn)
  updateResultDisplay();

  // Attach a click event listener to each game board cell
  cols.forEach((col) => {
    col.addEventListener("click", handleClick);
  });

  // Function to update the result display with the current player's turn
  function updateResultDisplay() {
    resultDisplay.textContent = `Player ${currentPlayer} turn`;
  }

  // Function to check if there is a winner or a tie
  function checkWinner() {
    if (
      // Check all possible winning combinations
      (colArray[0] !== "Empty" &&
        colArray[0] === colArray[1] &&
        colArray[1] === colArray[2]) ||
      (colArray[3] !== "Empty" &&
        colArray[3] === colArray[4] &&
        colArray[4] === colArray[5]) ||
      (colArray[6] !== "Empty" &&
        colArray[6] === colArray[7] &&
        colArray[7] === colArray[8]) ||
      (colArray[0] !== "Empty" &&
        colArray[0] === colArray[3] &&
        colArray[3] === colArray[6]) ||
      (colArray[1] !== "Empty" &&
        colArray[1] === colArray[4] &&
        colArray[4] === colArray[7]) ||
      (colArray[2] !== "Empty" &&
        colArray[2] === colArray[5] &&
        colArray[5] === colArray[8]) ||
      (colArray[0] !== "Empty" &&
        colArray[0] === colArray[4] &&
        colArray[4] === colArray[8]) ||
      (colArray[2] !== "Empty" &&
        colArray[2] === colArray[4] &&
        colArray[4] === colArray[6])
    ) {
      // Display the winner and disable the board
      resultDisplay.textContent = `${currentPlayer} wins!`;
      disableBoard();
      return;
    }

    // If there are no empty cells left, declare a tie
    if (!colArray.includes("Empty")) {
      resultDisplay.textContent = "It's a tie!";
    } else {
      // If no winner or tie, switch to the other player
      togglePlayer();
      updateResultDisplay();
    }
  }

  // Function to handle click events on the game board cells
  function handleClick(event) {
    const colId = Number(event.target.id);

    // Prevent changing the value if it is already set
    if (colArray[colId] === "Empty") {
      colArray[colId] = currentPlayer;
      event.target.innerText = currentPlayer;

      // Check for a winner after the current move
      checkWinner();
    }
  }

  // Function to toggle the current player between "X" and "O"
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  // Function to disable the game board after a winner is declared
  function disableBoard() {
    cols.forEach((col) => {
      col.removeEventListener("click", handleClick);
    });
  }

  // Function to reset the game to its initial state
  function resetGame() {
    currentPlayer = "X";
    colArray.fill("Empty");
    updateResultDisplay();

    // Clear the board and re-enable clicking on cells
    cols.forEach((col) => {
      col.textContent = "";
      col.addEventListener("click", handleClick);
    });
  }
});
