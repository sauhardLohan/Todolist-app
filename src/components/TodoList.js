import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TodoList(props) {
  const { list, handleUpdate, handleDelete, handleEdit } = props;
  const { id, userID, completed, title, edit } = list;
  const handleChangeTitle = async (e) => {
    // after entering edit mode on click of enter change the title if not empty
    if (e.key === "Enter") {
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
      // calling handleUpdate function to update the changed title
      await handleUpdate(id, e.target.value, userID, completed);
      // setting edit mode false for the list item
      handleEdit(id, false);
    }
  };
  return (
    // removed property for tasks that are added through createProduct, which is to edit, because the tasks added are dummy
    // objects and are not actually added to API service
    <div className="todo-list">
      <ul id="list-item">
        <li>
          {id <= 200 ? (
            edit ? (
              <input
                defaultValue={title}
                id="edit"
                onKeyDown={handleChangeTitle}
              />
            ) : (
              <div id="list-item-info">
                <input
                  type="checkbox"
                  id={`task-${id}`}
                  checked={completed}
                  onChange={() => {
                    handleUpdate(id, title, userID, !completed);
                  }}
                />
                <label htmlFor={`task-${id}`}>{title}</label>
              </div>
            )
          ) : (
            <p>{title}</p>
          )}

          <div>
            {edit ? null : (
              <div>
                {id <= 200 && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10147/10147889.png"
                    alt="edit-icon"
                    className="task-icons"
                    style={{ marginRight: 15 }}
                    data-id="12"
                    onClick={() => {
                      handleEdit(id, true);
                    }}
                  />
                )}

                <img
                  src="https://cdn-icons-png.flaticon.com/512/6096/6096937.png"
                  alt="delete-icon"
                  className="task-icons"
                  data-id="12"
                  onClick={() => {
                    handleDelete(id);
                  }}
                />
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TodoList;
