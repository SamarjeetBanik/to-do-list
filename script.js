var input = document.getElementById("writespace");

input.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    // event.preventDefault();
    // document.getElementById("btn").click();

    AddTask(input.value)
    document.getElementById("writespace").value = "";
    /* console.log("Enter key pressed"); */
  }
})

console.log("reached")

document.getElementById("btn").addEventListener("click", function(event) {
    AddTask(input.value)
    document.getElementById("writespace").value = "";
    /* console.log("Enter key pressed"); */
})