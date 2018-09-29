class toDoList {
  constructor() {
   this.mainNode = document.getElementById('root');
   this.createMainNodeHeader();
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