class toDoList {
  constructor() {
   this.mainNode = document.getElementById('root');
   this.createMainNodeHeader();
   this.createInputContainer();
   this.todos = [];
   this.fetchTodos();
  }

  /**
   * This function creates an app header.
   */
  createMainNodeHeader() {
    this.mainNode.innerHTML = `
      <div class="header">
          <div class="header-margin"></div>
          <p class="title">ToDo List</p>
      </div>`;
  }

  /**
   * This function creates a task input container.
   */
  createInputContainer() {
    const container = document.createElement('div');
    container.classList.add('input-container');

    const inputMargin = document.createElement('div');
    inputMargin.classList.add('input-margin');

    const inputNode = document.createElement('input');

    const addButton = document.createElement('div');
    addButton.classList.add('add-btn');

    addButton.addEventListener('click', () => {
      const data = {
        content: inputNode.value
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch(`http://localhost:3000/to-do-list/backend/task-list`, options)
        .then(response => response.json())
        .then(this.fetchTodos())
        .catch(err => console.log(err));

      inputNode.value = "";
    });

    container.append(addButton, inputMargin, inputNode);

    this.mainNode.append(container);
  }

  /**
   * This function fetches todos from the server and puts them
   * into 'todos' variable.
   */
  fetchTodos() {
    fetch(`http://localhost:3000/to-do-list/backend/task-list`)
      .then(response => response.json())
      .then(json => {
        this.todos = json;
      });
  }
}

document.addEventListener('DOMContentLoaded', e => {
  new toDoList();
});