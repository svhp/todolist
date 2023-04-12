const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const logoutDOM = document.querySelector('#logout')
const id = new URLSearchParams(params).get('id')
const deadlineDOM = document.querySelector('#formdate')

let tempName;

const pokazZadanie = async () => {
  try {
    const data = await axios.get(`/api/tasks/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    })
    const task = data.data.data;
    const { id: taskID, completed, content: name, deadline } = task
    deadlineDOM.value = deadline
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

pokazZadanie()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked
    const deadline = deadlineDOM.value

    const data = await axios.patch(`/api/tasks/${id}`, {
      content: taskName,
      completed: taskCompleted,
      deadline: deadline,
    }, { headers: { Authorization: localStorage.getItem('token') || '', }} ,)

   
    const task = data.data.data;
    const {completed, content: name } = task
    console.log("id: ", task);

    let taskID = id;

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `Sukces, zadanie zaktualizowane..`
    formAlertDOM.classList.add('text-success')

  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Error, spróbuj ponownie..`
  }
  editBtnDOM.textContent = 'Edit'
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