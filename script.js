/*
author : Dawoud Tormos
To-Do Assignment 
*/


// Get the modal
var modal = document.getElementById("modal-addTask");

// Get the button that opens the modal
var btn = document.getElementById("Btn-addTask");

// Get the <span> element that closes the modal
var closeModalTask = document.getElementById("closeModalTask");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModalTask.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}