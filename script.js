const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");

function saveData() {
    localStorage.setItem("myTasks", taskList.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("myTasks");
    if (savedData) {
        taskList.innerHTML = savedData;
    }
    checkEmpty();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function checkEmpty() {
    if (taskList.children.length === 0) {
        emptyState.style.display = "flex"; 
    } else {
        emptyState.style.display = "none";
    }
}

function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("กรุณากรอกงานที่ต้องทำก่อนน้า");
        return;
    }

    const li = document.createElement("li");
    li.className = "task-item flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all mb-3 group";

    li.innerHTML = `
        <div class="task-content flex items-center gap-3 flex-1">
            <input type="checkbox" class="task-check w-5 h-5 cursor-pointer accent-indigo-600">
            <span class="text-slate-600 font-medium">${taskText}</span>
        </div>
        <button class="delete-btn flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-red-500 bg-white border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
            <span>Delete</span>
        </button>
    `;


    taskList.prepend(li);
    saveData();
    checkEmpty();
    
    inputBox.value = "";
    inputBox.focus();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
        const itemToDelete = e.target.closest(".task-item");
        
        itemToDelete.style.opacity = "0";
        itemToDelete.style.transform = "translateX(20px)";
        
        setTimeout(() => {
            itemToDelete.remove();
            saveData();
            checkEmpty();
        }, 300);
    }
    else if (e.target.classList.contains("task-check")) {
        if (e.target.checked) {
            e.target.setAttribute("checked", "checked");
        } else {
            e.target.removeAttribute("checked");
        }
        saveData();
    }
});

document.addEventListener("DOMContentLoaded", () => {
     showTask();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

});

