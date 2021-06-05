var input = document.getElementById("writespace")

input.addEventListener("keyup", (event) => {
  if(event.keyCode === 13 && input.value !== "") {
    // event.preventDefault();
    // document.getElementById("btn").click();

    AddTask(input.value)
    document.getElementById("writespace").value = "";
    /* console.log("Enter key pressed"); */
  } else if(event.keyCode === 13 && input.value === "") {
    alert("Please enter something to proceed")
  }
})

console.log("reached")

document.getElementById("btn").addEventListener("click", (event) => {
    if(input.value === "") {
      alert("Please enter something to proceed")
    } else {
      AddTask(input.value)
      document.getElementById("writespace").value = "";
      /* console.log("Enter key pressed"); */
    }
})