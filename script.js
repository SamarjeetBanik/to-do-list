var input = document.getElementById("writespace")

input.addEventListener("keyup", (event) => {
  if(event.keyCode === 13 && input.value !== "") {
    // event.preventDefault();
    // document.getElementById("btn").click();
    if(input.value.includes(";")) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Illegal input",
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })
      document.getElementById("writespace").value = "";
    } else {
      AddTask(input.value)
      Swal.fire({
        toast: true,
        icon: "success",
        title: "item added successfully!",
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })
      document.getElementById("writespace").value = "";
    }
    /* console.log("Enter key pressed"); */
  } else if(event.keyCode === 13 && input.value === "") {
    // alert("Please enter something to proceed")
    Swal.fire({
      icon: "error",
      title: "Please enter something to proceed!",
      position: "top"
    })
  }
})

/* console.log("reached") */

document.getElementById("btn").addEventListener("click", (event) => {
    if(input.value === "") {
      // alert("Please enter something to proceed")
      Swal.fire({
        icon: "error",
        title: "Please enter something to proceed!",
        position: "top"
      })
    } else {
      AddTask(input.value)
      Swal.fire({
        toast: true,
        icon: "success",
        title: "item added successfully!",
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })
      document.getElementById("writespace").value = "";
      /* console.log("Enter key pressed"); */
    }
})