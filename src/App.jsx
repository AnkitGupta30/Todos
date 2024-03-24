import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const toggleFinished = () =>{
    setShowFinished(!showFinished)
  }
 
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);
  

  const setLocalStorage = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    setLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    setLocalStorage();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    setLocalStorage();
  };

  return (
    <div>
      <NavBar />
      <div className="mt-14 md:container md:mx-auto mx-3 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 ">
        <h1 className="font-bold text-center text-xl">Manage your list at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add List</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-full outline-none rounded-full px-5 py-1"
          />
          <button
          disabled={todo.length<=3}
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md text-sm font-bold disabled:bg-violet-700"
          >
            Save
          </button>
        </div>
        <input className="my-3" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Lists</h2>
        <div className="todos">
          {todos.length == 0 && <div className="m-2">No List To Display</div>}
          {todos.map((item) => {
           return (showFinished || !item.isCompleted) &&
            <div key={item.id} className="todo md:w-1/2 flex justify-between my-3">
              <div className="flex gap-5">
                {" "}
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  checked={item.isCompleted}
                  type="checkbox"
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex h-full ">
                <button
                  onClick={(e) => {
                    handleEdit(e, item.id);
                  }}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"
                >
                  <FaEdit/>
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold"
                >
                  <AiFillDelete/>
                </button>
              </div>
              
            </div>
})}
        </div>
      </div>
    </div>
  );
};

export default App;
