import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import auth from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username").min(3),
    name: Joi.string().required().label("Name").min(3),
    password: Joi.string().required().label("Password").min(5),
  };
  doSubmit = async () => {
    //    call the server and redirect hte user to difernt page
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);

      // this.props.navigate("/space", { replace: true });
      window.location.replace("/space");
      toast.success("Registered Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="text-white text-center">
          <h1 className="display-1 mt-5">Register</h1>
          <h3 className="display-6 mt-3">Create New Account</h3>
          <h6 className="mt-4">
            If you have created an account, then please login
          </h6>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password", "password")}

              <div className="d-flex mt-3 d-flex justify-content-between">
                {this.renderButton("Sign up")}
                <button className="btn btn-warning">
                  {" "}
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>{" "}
                </button>
              </div>
            </form>
          </div>
          <h6 className="display-3 mt-5">©TaskMaster</h6>
        </div>
      </React.Fragment>
    );
  }
}

// export function REGISTERwithRouter(props) {
//   const navigate = useNavigate();

//   return <RegisterForm navigate={navigate} />;
// }

export default RegisterForm;
