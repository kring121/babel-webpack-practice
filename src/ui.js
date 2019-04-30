class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  // show all posts
  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      `
    });

    this.post.innerHTML = output;
  }

  // show alert message
  showAlert(message, className) {
    this.clearAlert();

    //create div
    const div = document.createElement('div');
    // add classes
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.posts-container');
    // get posts
    const posts = document.querySelector('#posts');
    // insert alert div
    container.insertBefore(div, posts);

    // timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000)
  }

  // clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // clear all fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit')
  }

  // clear id hidden value
  clearIdInput() {
    this.idInput.value = '';
  }


  // change form state
  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // remove cancel button if it's there
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // clear id from hidden field
      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
