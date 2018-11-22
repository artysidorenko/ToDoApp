const test = require('tape');
const { todoFunctions, constTodoArray, placeholderTodo } = require('./logic.js');

const localTodoArray_original = [
  {
    "id": 999,
    "description": "This is a placeholder",
    "done": false
  },
  {
    "id": 747,
    "description": "Zis is another placeholder",
    "done": true
  },
  {
    "id": 911,
    "description": "And this is yet another placeholder",
    "done": false
  }
];

const localTodoArray_sortedId = [
  {
    "id": 747,
    "description": "Zis is another placeholder",
    "done": true
  },
  {
    "id": 911,
    "description": "And this is yet another placeholder",
    "done": false
  },
  {
    "id": 999,
    "description": "This is a placeholder",
    "done": false
  }
];

const localTodoArray_sortedDesc = [
  {
    "id": 911,
    "description": "And this is yet another placeholder",
    "done": false
  },
  {
    "id": 999,
    "description": "This is a placeholder",
    "done": false
  },
  {
    "id": 747,
    "description": "Zis is another placeholder",
    "done": true
  }
];

const localTodoArray_sortedStatus = [
  {
    "id": 747,
    "description": "Zis is another placeholder",
    "done": true
  },
  {
    "id": 999,
    "description": "This is a placeholder",
    "done": false
  },
  {
    "id": 911,
    "description": "And this is yet another placeholder",
    "done": false
  }
];

test('Test addToDo function', function(t) {
  let resultArray = todoFunctions.addTodo(constTodoArray, placeholderTodo);
  t.equal(Array.isArray(resultArray), true, "function should return an array");
  t.equal(constTodoArray.join(""), localTodoArray_original.join(""), "should leave input argument todos unchanged (warning: only tests for joined array equality");
  t.equal(placeholderTodo.hasOwnProperty("id"), true, "input argument todo should have a generated ID");
  t.equal(resultArray[resultArray.length-1], placeholderTodo, "returned array should include the new item at the end")
  t.end();
});

test('Test deleteTodo function', function(t) {

  let resultArray = todoFunctions.deleteTodo(constTodoArray, 999);
  function checkId(array, id) {
    for (obj in array)  {
      if (obj.id == id) {return true;}
    }
    return false;
  }

  t.equal(Array.isArray(resultArray), true, "function should return an array");
  t.equal(constTodoArray.join(""), localTodoArray_original.join(""), "should leave input argument todos unchanged (warning: only tests for joined array equality");
  t.equal(checkId(resultArray, 999), false, "new array should not have any object with deleted id");
  t.end();
});

test('Test markTodo function', function(t) {

  let resultArray = todoFunctions.markTodo(constTodoArray, 999);
  function selectTodo(array, id) {
    return array.filter((e)=> {return e.id==id;})[0]
  }

  t.equal(Array.isArray(resultArray), true, "function should return an array");
  t.equal(constTodoArray.join(""), localTodoArray_original.join(""), "should leave input argument todos unchanged (warning: only tests for joined array equality");
  t.equal(selectTodo(resultArray, 999).done,  !selectTodo(constTodoArray, 999).done, "new array should have an opposite done status on the selected object");
  t.end();
});

test('Test sortTodos function', function(t) {
  let testSort = constTodoArray.sort((a, b)=>{return a.id - b.id;});
  console.log(testSort);

  let idSortFunc = function(a, b) {return a.id - b.id;};
  let descSortFunc = function(a, b) {return a.description - b.description;};
  let statusSortFunc = function(a, b) {return a.done - b.done;};

  t.equal(Array.isArray(todoFunctions.sortTodos(constTodoArray, idSortFunc)), true, "function should return an array");
  t.equal(constTodoArray.join(""), localTodoArray_original.join(""), "should leave input argument todos unchanged (warning: only tests for joined array equality");
  t.equal(todoFunctions.sortTodos(constTodoArray, idSortFunc).join(""), localTodoArray_sortedId.join(""), "new array should be sorted by id a-z");
  t.equal(todoFunctions.sortTodos(constTodoArray, descSortFunc).join(""), localTodoArray_sortedDesc.join(""), "new array should be sorted by description a-z");
  t.equal(todoFunctions.sortTodos(constTodoArray, statusSortFunc).join(""), localTodoArray_sortedStatus.join(""), "new array should be sorted by done status");
  t.end();
});
