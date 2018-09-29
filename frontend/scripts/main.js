class toDoList {
  constructor() {
   this.mainNode = document.getElementById('root');
   this.createMainNodeHeader();
  }

  createMainNodeHeader() {
    this.mainNode.innerHTML = `
      <div class="header">
          <div class="header-margin"></div>
          <p class="title">ToDo List</p>
      </div>`
  }
}

document.addEventListener('DOMContentLoaded', e => {
  new toDoList();
});