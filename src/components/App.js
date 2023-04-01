import { useEffect, useState } from "react";
import { getList, postList, deleteList, updateList } from "../api";
import TodoList from "./TodoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // getting todo list items
    const getTodoLists = async () => {
      // set loading to be true
      setLoading(true);
      const response = await getList();
      if (response.success) {
        // slicing the list items to 10 items out of 200 received from API service
        const data = response.data.slice(0, 10);
        // setting list items in state
        setLists(
          data.map((list) => {
            return {
              ...list,
              // adding edit property to every item which will be set true on click of edit button(pencil button )
              edit: false,
            };
          })
        );
      }
      // set loading to be false after fetching list items
      setLoading(false);
    };
    getTodoLists();
  }, []);
  const handlelistAdd = async (e) => {
    // adding a new item to list on click of enter after entering the task title in Add a task input bar
    if (e.key === "Enter") {
      // if task title empty show error
      if (e.target.value === "") {
        toast.error("Task title should not be empty", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const response = await postList(e.target.value);
      if (response.success) {
        // if repsonse is success showing appropriate notification
        toast.success("Task added successfully", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        // adding data received from API to lists in state
        const data = response.data;
        setLists([data, ...lists]);
      } else {
        // if failed,showing error
        toast.error("ERROR while adding task", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const handleUpdate = async (id, title, userID, completed) => {
    // upadting item if completed or not and on changing of title on click of edit button (pencil button)
    const response = await updateList(id, title, userID, completed);
    if (response.success) {
      // if repsonse is success showing appropriate notification
      toast.success("Task edited successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      const data = response.data;
      const listItem = lists.filter((list) => {
        return list.id === id;
      })[0];
      // updating list item with data recived from API service
      listItem.title = data.title;
      listItem.completed = data.completed;
      const newLists = [...lists];
      // setting new list in state
      setLists(newLists);
    } else {
      // if failed,showing error
      toast.error("ERROR while editing task item", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      handleEdit(id, false);
    }
  };
  const handleDelete = async (id) => {
    // deleting item from list on click of delete button (trash icon)
    const response = await deleteList(id);
    console.log(response);
    if (response.success) {
      // if repsonse is success showing appropriate notification
      toast.success("Task deleted successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      // deleting item from lists in state 
      setLists(
        lists.filter((list) => {
          return list.id !== id;
        })
      );
    } else {
      // if failed,showing error
      toast.error("ERROR while deleting task", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleEdit = async (id, edit) => {
    // on click of edit button setting edit property of item to be true/false 
    const listItem = lists.filter((list) => {
      return list.id === id;
    })[0];
    listItem.edit = edit;
    const newLists = [...lists];
    setLists(newLists);
  };
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <div className="App">
        <h1>Todo List App</h1>
        <div id="task-container">
          <input
            className="new-task"
            id="add"
            onKeyDown={handlelistAdd}
            placeholder="Add a task"
          />
          {lists.map((list, index) => {
            return (
              <TodoList
                list={list}
                key={`list-${index}`}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
