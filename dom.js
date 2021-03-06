// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application


(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    { id: -3, description: 'Placeholder' },
    { id: -2, description: 'Another Placeholder' },
    { id: -1, description: 'A Third and Final Placeholder' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');

    // you will need to use addEventListener
    // add span holding description
    var descriptionNode = document.createElement('span');
    descriptionNode.textContent = todo.description;
    todoNode.appendChild(descriptionNode);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent = "✘";
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement('button');
    markButtonNode.textContent = "✔";
    markButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);

    // add classes for css

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      //var description = ?; // event.target ....
      event.preventDefault();
      var newTodo = {
        description: event.target.description.value,
        done: false
      };

      // hint: todoFunctions.addTodo
      var newState = todoFunctions.addTodo(state, newTodo); // ?? change this!
      update(newState);
    });
  }

  //you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      let thisTodoNode = createTodoNode(todo);
      if (todo.done == true) {
        thisTodoNode.classList.add("todo-done");
      }
      else {
        thisTodoNode.classList.remove("todo-done");
      }
      todoListNode.appendChild(thisTodoNode);
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
