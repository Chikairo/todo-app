import "./login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0 && isSubmit) {
      navigate("/todo", { state: { name: formValues.username } });
    }
  };

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
      <h3>Sign in</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <div className="field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p className="dont-have-account">Don't have Account? </p>
        <Link to="/" type="submit" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
