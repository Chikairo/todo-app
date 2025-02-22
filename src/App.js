/*import Signup from "./components/signup/Signup";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";*/
import TodoApp from "./components/todoapp/Todo";

function App() {
  /* const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/todo",
      element: <TodoApp />,
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );*/

  return <TodoApp />

}

export default App;
