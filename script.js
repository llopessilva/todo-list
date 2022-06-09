// obtendo todos os elementos necessários
const inputBox = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = () => {
  let userData = inputBox.value // obtendo o valor inserido pelo usuário
  // se os valores do usuário não forem apenas espaços
  if (userData.trim() != 0) {
    addBtn.classList.add('active') // ativa o botão adicionar
  } else {
    addBtn.classList.remove('active') // desativa o botão adicionar
  }
}

showTasks() // chamando a função showTasks

// se o usuário clicar no botão adicionar
addBtn.onclick = () => {
  let userData = inputBox.value // obtendo o valor inserido pelo usuário
  let getLocalStorage = localStorage.getItem('New Todo') //obtendo armazenamento local
  if (getLocalStorage == null) {
    // se localStorage for nulo
    listArray = [] // criando um array vazio
  } else {
    // transformando a string JSON em um objeto JS
    listArray = JSON.parse(getLocalStorage)
  }
  listArray.push(userData) // adicionando dados no array
  localStorage.setItem('New Todo', JSON.stringify(listArray)) // transformando objeto JS em uma string JSON
  showTasks() // chamando a função showTasks
  addBtn.classList.remove('active')
}

//função para adicionar lista de tarefas dentro de ul
function showTasks() {
  let getLocalStorage = localStorage.getItem('New Todo') //obtendo armazenamento local
  if (getLocalStorage == null) {
    // se localStorage for nulo
    listArray = [] // criando um array vazio
  } else {
    listArray = JSON.parse(getLocalStorage) // transformando a string JSON em um objeto JS
  }
  const pendingNumber = document.querySelector('.pendingNumber')
  pendingNumber.textContent = listArray.length // atribuindo o valor do tamanho do array na variável pendingNumber
  if (listArray.length > 0) {
    // se o tamanho do array for maior que 0
    deleteAllBtn.classList.add('active') // ativa o botão limpar
  } else {
    deleteAllBtn.classList.remove('active') // desativa o botão limpar
  }

  let newLiTag = ''
  listArray.forEach((element, index) => {
    newLiTag += `
    <li> 
      ${element} <span onclick ="deleteTask(${index})" ><i class="fa-solid fa-trash"></i></span>
    </li>`
  })
  todoList.innerHTML = newLiTag //adicionando nova tag li dentro da tag ul
  inputBox.value = '' // uma vez adicionada a tarefa, deixe o campo de entrada em branco
}

// função excluir tarefa
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem('New Todo')
  listArray = JSON.parse(getLocalStorage)
  listArray.splice(index, 1) //exclue ou remove a li específico indexado
  //depois de remover a li atualize o armazenamento local
  localStorage.setItem('New Todo', JSON.stringify(listArray))
  showTasks() // chamando a função showTasks
}

//função de excluir todas as tarefas
deleteAllBtn.onclick = () => {
  listArray = [] // esvazia um array
  // depois de excluir todas as tarefas novamente atualize o armazenamento local
  localStorage.setItem('New Todo', JSON.stringify(listArray)) // transformando a string JSON em um objeto JS
  showTasks() // chamando a função showTasks
}
