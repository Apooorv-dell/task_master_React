import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { NavLink } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //    call the server and redirect hte user to difernt page
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);

      // this.props.navigate("/space",{replace:true});
      window.location.replace("/space");

      console.log("submitted");

      // console.log(jwt);
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        const error = this.state.errors;
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="text-center text-white">
          <h1 className="display-1 mt-5">Bonjour!</h1>
          <h3 className="display-6 mt-3">Please login to continue</h3>
          <h6 className="mt-4">
            If you have not created an account yet, then please Sign up first
          </h6>
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              <div className="d-flex mt-3 d-flex justify-content-between">
                {this.renderButton("Login")}
                <button className="btn btn-warning">
                  {" "}
                  <NavLink className="nav-link" to="/register">
                    sign up
                  </NavLink>{" "}
                </button>
              </div>
            </form>
            <button></button>
          </div>
          <h6 className="display-3 mt-5">©TaskMaster</h6>
        </div>
      </React.Fragment>
    );
  }
}

// export function LOGINwithRouter(props) {
//   const navigate = useNavigate();

//   return <LoginForm navigate={navigate} />;
// }

export default LoginForm;
