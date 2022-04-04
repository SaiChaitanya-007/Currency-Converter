import { Routes ,Route, BrowserRouter as Router,useRoutes } from 'react-router-dom';
import 'react-dropdown/style.css';
import './App.css';
import './login.css';
import Main from './main';
import Form from "./login"

const App = () => {
  return useRoutes([
    { path: "/", element: <Form /> },
    { path: "app", element: <Main /> },
  ]);
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
