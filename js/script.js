// Seleção de elementos
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const priorityInput = document.getElementById('task-priority');
const dateInput = document.getElementById('task-date');

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskItem => {
        const taskData = {
            title: taskItem.querySelector('h3').textContent,
            desc: taskItem.querySelector('p:nth-of-type(1)').textContent,
            priority: taskItem.querySelector('p:nth-of-type(2)').textContent.replace('Prioridade: ', ''),
            date: taskItem.querySelector('p:nth-of-type(3)').textContent.replace('Data: ', ''),
            completed: taskItem.classList.contains('completed')
        };
        tasks.push(taskData);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.title, task.desc, task.priority, task.date, task.completed);
    });
}

// Função para criar o elemento da tarefa
function createTaskElement(title, desc, priority, date, completed = false) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    if (completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
        <div>
            <h3>${title}</h3>
            <p>${desc}</p>
            <p><strong>Prioridade:</strong> ${priority}</p>
            <p><strong>Data:</strong> ${date}</p>
        </div>
        <button class="mark-completed">${completed ? 'Reabrir' : 'Concluir'}</button>
        <button class="delete-task">Eliminar</button>
    `;

    // Adicionar eventos aos botões
    taskItem.querySelector('.mark-completed').addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskItem.querySelector('.delete-task').addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    // Adicionar à lista
    taskList.appendChild(taskItem);
}

// Evento para submissão do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obter valores do formulário
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const priority = priorityInput.value;
    const date = dateInput.value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!title || !desc || !priority || !date) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criar elemento da tarefa
    createTaskElement(title, desc, priority, date);

    // Salvar tarefas no localStorage
    saveTasks();

    // Limpar o formulário
    form.reset();
});

// Carregar tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);