function updateUI() 
{
    if(countTasks().total>0) {
        const tasks = getCookies()

        document.getElementById("list").innerHTML = ""
        tasks.map(task => {
            // task create
            var li = document.createElement("li");
            var value = task.title;
            var t = document.createTextNode(value);
            li.appendChild(t);

            // update ui list
            document.getElementById("list").appendChild(li);
            li.addEventListener('click', function(ev) {
                if (ev.target.tagName === 'LI') {
                    // console.log("triggering",task.id)
                    toggleTask(task.id)
                }
            }, false);
            if(task.status) {
                li.classList.toggle('checked');
            }
            // li.onclick=()=>{
            //     updateTask(task.id)
            // }
            
            // edit task button
            var span1 = document.createElement("SPAN");
            var txt1 = document.createTextNode("✎");
            span1.className = "edit";
            span1.onclick = () => { editTask(task.id) }
            span1.appendChild(txt1);
            li.appendChild(span1);

            // task close button
            var span2 = document.createElement("SPAN");
            var txt2 = document.createTextNode("\u00D7");
            span2.className = "close";
            span2.onclick = () => { removeTask(task.id) }
            span2.appendChild(txt2);
            li.appendChild(span2);
        })
    }
    else {
        document.getElementById("list").innerHTML = ""
    }
}

function getCookies() {
    if(document.cookie.indexOf('Tasks') == -1) {
        return []
    }
    else {
        cookiearray = document.cookie.split(';')
        // const tasks = JSON.parse(cookiearray[1].split('=')[1]);
        for(var i = 0; i < cookiearray.length; i++)
        {
            if(cookiearray[i].split('=')[0].trim() == "Tasks") {
                var tasks = JSON.parse(cookiearray[i].split('=')[1])
                break
            }
        }
        return tasks
    }
}

function updateCookies(tasks) {
    const task_variable_name = "Tasks"
    document.cookie = task_variable_name + '=' + JSON.stringify(tasks) + ';'
    updateUI()
}

function AddTask(title) {
    const id = Math.floor(Math.random() * 1000)
    var tasks = []
    if(countTasks().total > 0) {
        tasks = getCookies()
    }
    tasks.push({ "id": id, "title": title, "status":0 });
    updateCookies(tasks)
}

function countTasks() {
    if(document.cookie.indexOf('Tasks') == -1) {
        return { total: 0, completed: 0, pending: 0 }
    }
    else {
        const tasks = getCookies()
        var total = 0;
        var completed = 0;
        var pending = 0;
        tasks.map(task => {
            total++;
            if(task.status) {
                completed++;
            }
            else {
                pending++;
            }
        })  
        return { total: total, completed: completed, pending: pending }
    }
}

async function editTask(id) {
    if(countTasks().total > 0) {
        const tasks = getCookies()
        for(var i = 0; i < tasks.length; i++) {
            if(tasks[i].id == id) {
                // console.log(tasks[i])
                var title = tasks[i].title
                await Swal.fire({
                    title: `Update "${title}"`,
                    position: 'center',
                    showCancelButton: true,
                    input: 'text',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Blank input not accepted!'
                        }
                    },
                    preConfirm: (updateTask) => {
                        tasks[i].title = updateTask
                        updateCookies(tasks)
                        Swal.fire({
                            toast: true,
                            icon: "success",
                            title: "item updated successfully!",
                            position: 'top',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })
                      }
                })
                break;
            }
        }
    }
}

function removeTask(id) {
    if(countTasks().total>0) {
        const tasks = getCookies()
        for(var i=0; i<tasks.length; i++) {
            if(tasks[i].id == id) {
                tasks.splice(i, 1);
                updateCookies(tasks)
                break;
            }
        }
        updateUI();
        Swal.fire({
            toast: true,
            icon: "success",
            title: "item deleted successfully!",
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    }
}

function toggleTask(id) {
    if(countTasks().total > 0) {
        const tasks = getCookies()
        for(var i=0; i<tasks.length; i++) {
            if(tasks[i].id == id) {
                tasks[i].status = tasks[i].status == 0 ? 1 : 0
                updateCookies(tasks)
            }
        }
    }
    updateUI();
}

function removeAllTasks() {
    if(countTasks().total == 0) {
        Swal.fire({
            toast: true,
            icon: "info",
            title: "No items yet!",
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    } else {
        updateCookies([])
        Swal.fire({
            toast: true,
            icon: "success",
            title: "List cleared!",
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    }
}

const name_variable_name = "Name"

async function loadname() {
    if(document.cookie.indexOf(name_variable_name) == -1) {
        // var name = window.prompt("Enter your name!")
        await Swal.fire({
            title: 'Enter your Name!',
            position: 'top',
            input: 'text',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter your name!'
                }
            },
            preConfirm: (name) => {
                name = formatName(name)
                if(name) {
                    document.cookie = name_variable_name + "=" + name.toString() + ";"
                    document.getElementById("username").innerHTML = getName()
                    Swal.fire({
                        icon: "success",
                        title: `Hello, ${name}`
                    })
                    updateUI()
                }
                else {
                    loadname()
                }
            },
            allowOutsideClick: () => Swal.isLoading()
        })
    }
    else {
        document.getElementById("username").innerHTML = getName()
        Swal.fire({
            toast: true,
            icon: "success",
            title: `Welcome back ${getName()}!`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
        updateUI()
    }
}

function deleteAllCookies() {
    document.cookie = "Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    document.cookie = "Tasks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    document.cookie = "acceptCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    loadname()
}

async function updatename() {
    await Swal.fire({
        title: 'Update your Name!',
        position: 'top',
        showCancelButton: true,
        input: 'text',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to enter your name!'
            }
        },
        preConfirm: (newName) => {
            newName = formatName(newName)
            if(newName) {
                document.cookie = "Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
                document.cookie = name_variable_name + "=" + newName.toString() + ";"
                document.getElementById("username").innerHTML = getName()
                Swal.fire({
                    toast: true,
                    icon: "success",
                    title: "Username updated succesfully!",
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                })
            }
        }
    })
}

function formatName(name) {
    const words = name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

function getName() {
    if(document.cookie.indexOf("Name") != -1) {
        cookiearray = document.cookie.split(';')
        // const name = cookiearray[0].split('=')[1];
        for(var i = 0; i < cookiearray.length; i++)
        {
            if(cookiearray[i].split('=')[0].trim() == "Name") {
                var name = cookiearray[i].split('=')[1]
                break
            }
        }
        return name;
    }
}
