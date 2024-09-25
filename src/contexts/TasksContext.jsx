import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";

const TasksContext = createContext();
const intialState = {
  tasks: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "tasks/loaded":
      return { ...state, isLoading: false, tasks: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "task/created":
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.payload],
      };
    case "task/completed":
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "task/deleted":
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      case "task/edited":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, isEditing: true }
              : task
          ),
        };
      case "task/updated":
        return {
          ...state,
          isLoading: false,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, ...action.payload }
              : task
          ),
        };
      case "tasks/cleared":
      return {
        ...state,
        isLoading: false,
        tasks: [], 
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
function TasksProvider({ children }) {
  const [editedId, setEditedId] = useState(null);
  const [{ tasks, isLoading, error }, dispatch] = useReducer(
    reducer,
    intialState
  );

  useEffect(function () {
    async function fetchTasks() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/tasks`);
        const data = await res.json();
        dispatch({ type: "tasks/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchTasks();
  }, []);

  async function createTask(newTask) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "task/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error  creating  the city...",
      });
    }
  }
  async function deleteTask(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "task/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error  deleteing  the city...",
      });
    }
  }
  async function editTask(id) {
    
    try {
      const res = await fetch(`${BASE_URL}/tasks/${id}`);
      const data = await res.json();
      dispatch({ type: "task/edited", payload: { ...data, isEditing: true } });
      setEditedId(id);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the task...",
      });
    }
  }
  
  async function updateTask(updatedTask) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/tasks/${updatedTask.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      
      dispatch({ type: "task/updated", payload: { ...data, isEditing: false } });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error updating the task...",
      });
    }
  }
  
  async function clearTasks() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/tasks`);
      const tasks = await res.json();
  
      if (tasks.length === 0) {
        dispatch({ type: "tasks/cleared" });
        return;
      }
  
      const deletePromises = tasks.map((task) =>
        fetch(`${BASE_URL}/tasks/${task.id}`, {
          method: "DELETE",
        })
      );
  
      await Promise.all(deletePromises);
  
      dispatch({ type: "tasks/cleared" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the tasks...",
      });
    }
  }
  
  const toggleComplete = useCallback(async function toggleComplete(id) {
    try {
      const res = await fetch(`${BASE_URL}/tasks/${id}`);
      const data = await res.json();
      dispatch({ type: "task/completed", payload: data.id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        createTask,
        deleteTask,
        toggleComplete,
        editTask,
        updateTask,
        clearTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { TasksProvider, useTasks };
