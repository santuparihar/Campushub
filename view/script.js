const links = document.querySelectorAll("#center a");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("You need to log in for this action.");
  });
});