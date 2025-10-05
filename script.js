const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const filter = document.getElementById("filter");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const filterValue = filter.value;

  tasks
    .filter(t => t.text.toLowerCase().includes(search))
    .filter(t => {
      if (filterValue === "completed") return t.completed;
      if (filterValue === "pending") return !t.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task" + (task.completed ? " completed" : "");
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${index})">✔️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert("Vui lòng nhập công việc!");
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  const li = taskList.children[index];
  li.style.transform = "translateX(50px)";
  li.style.opacity = "0";
  setTimeout(() => {
    tasks.splice(index, 1);
    saveAndRender();
  }, 250);
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", renderTasks);
filter.addEventListener("change", renderTasks);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderTasks();
