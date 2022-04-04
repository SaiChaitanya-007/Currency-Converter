import { useState } from 'react';
import { useHistory,useNavigate  } from "react-router-dom";
import './login.css';

// localStorage.clear();
var registered_users_obj = {list : []};
var registered_users = [];
if(localStorage.getItem("users")!=null){
    registered_users_obj = JSON.parse(localStorage.getItem("users"));
    registered_users = registered_users_obj.list;
}
//rgb(126, 128, 0)

export default function Form() {
 
  // States for registration
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();
  let navigate = useNavigate();
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(false);
  const [forgot, setForgot] = useState(false);
 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      if(registered_users==null){
        registered_users = [];
        }
        console.log(typeof registered_users);
      registered_users.push([name, password]);
      localStorage.setItem("users", JSON.stringify({list : registered_users}));
      console.log("Successfully registered : " + registered_users);
      let path = "app"; 
        // history.push(path);
        navigate(path);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (name === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      console.log("Successfully registered : " + registered_users);
      for(var i=0;i<registered_users.length;i++){
        if(registered_users[i][0]==name && registered_users[i][1]==password){
          setSubmitted(false);
          setDetails(false);
          let path = "app"; 
          navigate(path);
          return;
        }
      }
      setSubmitted(false);
      setDetails(true);
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(false);
    setForgot(true);
    setDetails(false);
    for(var i=0;i<registered_users.length;i++){
        if(registered_users[i][0]==name){
            setSubmitted(false);
            setDetails(false);
            if(forgot){
                if (name === '' || password === '') {
                    setError(true);
                    setForgot(false);
                    return;
                } else {
                    setSubmitted(true);
                    setError(false);
                    registered_users[i][1] = password;
                    localStorage.setItem("users", JSON.stringify({list : registered_users}));
                    let path = "app"; 
                    navigate(path);
                    setForgot(false);
                    return;
                }
            }
            setForgot(true);
        }
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h2>Please enter all the fields</h2>
      </div>
    );
  };

  const wrongDetails = () => {
    return (
      <div
        className="details"
        style={{
          display: details ? '' : 'none',
        }}>
        <h2 >Wrong Details</h2>
      </div>
    );
  };

  const forgotPassword = () => {
    return (
      <div
        className="forgot"
        style={{
          display: forgot ? '' : 'none',
        }}>
        <h2>Type new password and click on "Forgot Password"</h2>
      </div>
    );
  };
 
  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
        {wrongDetails()}
        {forgotPassword()}
      </div>
        <div className='App'>
            <form>
            {/* Labels and inputs for form data */}
            <label className="label">Username</label>
            <input onChange={handleName} className="input"
            value={name} type="text" />
    
            <label className="label">Password</label>
            <input onChange={handlePassword} className="input"
            value={password} type="password" />
    
            <button onClick={handleRegister} className="btn">
            Register
            </button>
            <button onClick={handleLogin} className="btn">
              Login  
            </button>
            <button onClick={handleForgot} className="btn">
            Forgot Password
            </button>
        </form>
        </div>
      
    </div>
  );
}