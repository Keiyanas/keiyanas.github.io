// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const entranceScreen = document.getElementById("entrance-screen");
    const mainContent = document.getElementById("main-content");
    const enterButton = document.getElementById("enter-button");
  
    // Add a click event to the "Enter" button
    enterButton.addEventListener("click", () => {
      // Fade out the entrance screen
      entranceScreen.classList.add("hidden");
  
      // After the fade-out animation, hide the entrance screen and show main content
      setTimeout(() => {
        entranceScreen.style.display = "none";
        mainContent.style.display = "block";
      }, 500); // Matches the CSS transition duration (0.5s)
    });
  });
  