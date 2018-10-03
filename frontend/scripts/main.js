{
  class toDoList {
    constructor() {
      this.mainNode = document.getElementById('root');
      this.createMainNodeHeader();
      this.createTodosContainer();
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
     * This function creates a container for all todos.
     */
    createTodosContainer() {
      const container = document.createElement('div');
      container.classList.add('todos-container');

      this.mainNode.append(container);
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
        if (inputNode.value === "") {
          inputNode.placeholder = "Task content cannot be empty!";
          return null;
        }
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
          .then(() => this.fetchTodos())
          .catch(err => console.log(err));

        inputNode.placeholder = "";
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
          this.mapTodos();
        });
    }

    /**
     * This function clears todos container and maps over todos array
     * to create a proper HTML node for each one of them.
     */
    mapTodos() {
      document.getElementsByClassName('todos-container')[0].innerHTML = "";
      this.todos.forEach(todo => this.mapTodo(todo));
      return null;
    }

    /**
     * This function takes a single todo and creates a proper HTML node for it,
     * appending it to todos container afterwards
     *
     * @param {Object} todo - a specific todo
     * @param {String} todo.content - content of a todo
     * @param {Boolean} todo.finished - a boolean indicating todo's completion
     * @param {String} todo._id - an automatically generated id for a todo
     * @returns {null}
     */
    mapTodo(todo) {
      let todoCopy = todo;

      const targetNode = document.getElementsByClassName('todos-container')[0];

      const container = document.createElement('div');
      container.classList.add('todo');

      const todoMargin = document.createElement('div');
      todoMargin.classList.add('todo-margin');

      const content = document.createElement('p');
      content.classList.add('content', todoCopy.finished ? 'crossed' : 'content');
      content.setAttribute('contenteditable', true);
      content.innerText = todoCopy.content;

      content.addEventListener('focusout', () => {
        todoCopy.content = content.innerText;
        const options = {
          method: "PUT",
          body: JSON.stringify(todoCopy),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        fetch(`http://localhost:3000/to-do-list/backend/task-list?todoId=${todoCopy._id}`, options)
          .then(response => response.json())
          .then(json => {
            this.todos = json;
          })
          .then(() => this.fetchTodos())
          .catch(err => console.log(err));
      });

      const trashButton = document.createElement('div');
      trashButton.classList.add('trash-btn', todoCopy.finished ? 'grey' : 'black');

      trashButton.addEventListener('click', () => {
        const options = {
          method: "DELETE"
        };

        fetch(`http://localhost:3000/to-do-list/backend/task-list?todoId=${todoCopy._id}`, options)
          .then(response => response.json())
          .then(() => {
            this.fetchTodos();
          })
          .catch(err => console.log(err));
      });

      const checkButton = document.createElement('div');
      checkButton.classList.add('check-btn', todoCopy.finished ? 'finished' : 'unfinished');

      checkButton.addEventListener('click', () => {
        todoCopy.finished = !todoCopy.finished;
        console.log(todoCopy);
        const options = {
          method: "PUT",
          body: JSON.stringify(todoCopy),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        fetch(`http://localhost:3000/to-do-list/backend/task-list?todoId=${todoCopy._id}`, options)
          .then(response => response.json())
          .then(json => {
            this.todos = json;
          })
          .then(() => this.fetchTodos())
          .catch(err => console.log(err));
      });

      container.append(checkButton, todoMargin, content, trashButton);

      targetNode.append(container);

      return null;
    }
  }

  document.addEventListener('DOMContentLoaded', e => {
    new toDoList();
  });
}