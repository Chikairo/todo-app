import { useState, useEffect } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "username is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (!emailValidation.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "passsword is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form className="addUserForm" >
        <div className="inputGroup">
          <div className="field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="username"
              autoComplete="off"
              value={formValues.username}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            <p>{formErrors.username}</p>
          </div>

          <div className="field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={formValues.email}
              placeholder="Enter your Email"
              onChange={handleChange}
            />
            <p>{formErrors.email}</p>
          </div>

          <div className="field">
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={formValues.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
            <p>{formErrors.password}</p>
          </div>
          
          <Link to="/todo">
            <button type="submit" className="btn btn-success" onChange={handleSubmit}>
              Sign Up
            </button>
          </Link>
        </div>
      </form>
      <div className="login">
        <p className="have-account">Already have an Account? </p>
        <Link to="/login" type="submit" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
