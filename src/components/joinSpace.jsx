import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { joinSpace } from "../services/spaceService";

class JoinSpace extends Form {
  state = {
    data: {
      code: "",
    },
    errors: {},
  };
  schema = {
    code: Joi.string().required().label("Code").min(6).max(6),
  };

  doSubmit = async () => {
    //    call the server and redirect hte user to difernt page
    try {
      const user = this.props.user;

      await joinSpace(user, this.state.data.code);

      window.location.reload();

      this.state.data.code = "";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.code = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
  };

  render() {
    return (
      <React.Fragment>
        <form
          className="d-flex align-items-center"
          onSubmit={this.handleSubmit}
        >
          {this.renderInputS("code", "Code")}
          {this.renderButton("Join")}
        </form>
      </React.Fragment>
    );
  }
}

export default JoinSpace;
