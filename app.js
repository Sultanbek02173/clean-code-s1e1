//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

// DOM elements
const taskInput = document.getElementById("new-task"); // Add a new task input
const addButton = document.getElementsByTagName("button")[0]; // First button (Add)
const incompleteTaskHolder = document.getElementById("incompleteTasks"); // #incompleteTasks (ul)
const completedTasksHolder = document.getElementById("completed-tasks"); // #completed-tasks (ul)

// Create a new task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    // Create elements for each task item
    const checkBox = document.createElement("input"); // Checkbox
    const label = document.createElement("label"); // Label for the task
    const editInput = document.createElement("input"); // Text input for editing task
    const editButton = document.createElement("button"); // Edit button
    const deleteButton = document.createElement("button"); // Delete button
    const deleteButtonImg = document.createElement("img"); // Image for the delete button

    label.innerText = taskString; // Set task name
    label.className = 'task';

    // Configure the checkbox
    checkBox.type = "checkbox";

    // Configure the text input
    editInput.type = "text";
    editInput.className = "task";

    // Configure the edit button
    editButton.innerText = "Edit"; // Default to "Edit"
    editButton.className = "edit";

    // Configure the delete button
    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    // Append elements to list item
    listItem.append(checkBox, label, editInput, editButton, deleteButton);

    return listItem;
}

// Add a new task
const addTask = () => {
    if (!taskInput.value) return; // Prevent creating empty tasks

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = ""; // Clear input after adding task
}

// Edit an existing task
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value; // Update label with input value
        editBtn.innerText = "Edit"; // Change button back to "Edit"
    } else {
        editInput.value = label.innerText; // Set input value to label text
        editBtn.innerText = "Save"; // Change button to "Save"
    }

    listItem.classList.toggle("editMode"); // Toggle edit mode
}

// Delete a task
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem); // Remove task from the list
}

// Mark task as completed
const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem); // Move task to completed section
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task as incomplete
const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem); // Move task back to incomplete section
    bindTaskEvents(listItem, taskCompleted);
}

// Bind task events (edit, delete, checkbox)
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask; // Bind edit task event
    deleteButton.onclick = deleteTask; // Bind delete task event
    checkBox.onchange = checkBoxEventHandler; // Bind task completion/incompletion
}

// Initialize existing tasks
const initializeTasks = () => {
    // Loop over incomplete tasks and bind events
    [...incompleteTaskHolder.children].forEach(item => {
        bindTaskEvents(item, taskCompleted);
    });

    // Loop over completed tasks and bind events
    [...completedTasksHolder.children].forEach(item => {
        bindTaskEvents(item, taskIncomplete);
    });
}

// AJAX placeholder function (if needed in future)
const ajaxRequest = () => {
    console.log("AJAX Request");
}

// Set up event listeners
addButton.onclick = addTask; // Click handler for adding task
addButton.addEventListener("click", ajaxRequest);

// Initialize tasks when the page loads
initializeTasks();

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.