const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const formDate = document.querySelector("#formdate")
const logoutDOM = document.querySelector('#logout')
const sortbtnDOM = document.querySelector('.sortbtn')
const radioDOM = document.getElementsByName('sortinglab')

const pokazZadania = async (sorted) => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/tasks', {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">Brak zadań przypisanych do twojego konta!</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
   

    if(sorted == "date"){
      tasks.sort(function (a, b) {
        let dateA = new Date(a.deadline),
          dateB = new Date(b.deadline);
        return dateA - dateB;
      });
    }

    if(sorted == "finished"){
      tasks.sort(function (a, b) {
        if (a.completed === true && b.completed === false) {
          return 1;
        }
        if (a.completed === false && b.completed === true) {
          return -1;
        }
        return 0;
      });
    }
  
    console.log("Sorted: ", tasks);

    const allTasks = tasks
      .map((task) => {
        const { completed, id: taskID, content: name, deadline} = task
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    console.log(error);
    tasksDOM.innerHTML =
      '<h5 class="empty-list">Nie jestes zalogowany....</h5>'
      setTimeout(() => {
        window.location.href = `http://localhost:3000/login`;
      },2500);
    }
  loadingDOM.style.visibility = 'hidden'
}
pokazZadania()

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      })
      pokazZadania()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const content = taskInputDOM.value
  console.log("\n\nContent: ", formDate.value);


  try {
    const data = { content: content, username: localStorage.getItem('username'), date: formDate.value }
    const config = { 
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    }
    await axios.post('/api/tasks', data, config)
    pokazZadania()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Sukces, zadanie dodane!`
    formAlertDOM.classList.add('text-success')

  } catch (error) {
    console.log("browser-app create task: ", error);
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Error, nie udało się dodać zadania! `
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

logoutDOM.addEventListener('click', () => {
  console.log('logout');
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.href = 'http://localhost:3000/login'
})

sortbtnDOM.addEventListener('click', () => {
  
  if (radioDOM[0].checked){
    pokazZadania("date")
  }

  if(radioDOM[1].checked){
    pokazZadania("finished")
  }
})