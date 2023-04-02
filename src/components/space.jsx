import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import NavBar from "./navbar";
import auth from "../services/authService";
import { getSpace, setSpace, deleteSpace } from "../services/spaceService";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class Space extends Form {
  state = {
    data: {
      title: "",
    },
    errors: {},
    spaces: [],
    user: auth.getCurrentUser(),
  };
  schema = {
    title: Joi.string().required().label("title"),
  };
  async componentDidMount() {
    const user = auth.getCurrentUser();
    const { data: spaces } = await getSpace(user);
    this.setState({ spaces: spaces });
  }

  handleDelete = async (space) => {
    const originalSpaces = this.state.spaces;

    const spaces = originalSpaces.filter((m) => m._id !== space._id);
    this.setState({ spaces });

    try {
      await deleteSpace(space._id);
      toast.success("space deleted");
    } catch (ex) {
      if (ex.respone && ex.respone.status === 404) {
        toast.warning("this  is already been deleted");
        this.setState({ spaces: originalSpaces });
      }
    }
  };

  doSubmit = async (e) => {
    //    call the server and redirect hte user to difernt page
    try {
      const { user, data } = this.state;
      const { data: space } = await setSpace(data, user);
      const spaces = [space, ...this.state.spaces];
      this.setState({ spaces });
      toast("Great! New space created.");
      data.title = "";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.title = ex.response.data;
        this.setState({ errors });
      }
    }

    console.log("submitted");
  };

  render() {
    const user = this.state.user;
    const { spaces } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />

        <section className="vh-100 ">
          <NavBar user={user} />
          <div className="container py-4  ">
            <div className=" row d-flex justify-content-center align-items-center">
              <div className="card mb-2">
                <div className="card-body">
                  <h1 className="text-center">Spaces</h1>
                  <form
                    className="d-flex justify-content-center align-items-center mb-4 "
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInputS("title", "Title")}
                    {this.renderButton("Add")}
                  </form>
                </div>
              </div>

              <div className="card ">
                <div className="card-body p-2  ">
                  <ul
                    className="list-group p-3 overflow-auto"
                    style={{ height: 450 }}
                  >
                    {this.state.spaces.map((space) => (
                      <li
                        className="list-group-item  d-flex justify-content-between mb-3 "
                        key={space._id}
                      >
                        <div className="d-flex">
                          <h5>
                            {" "}
                            <span class="badge badge-secondary bg-info m-2">
                              {space.code}
                            </span>
                            {space.title}{" "}
                          </h5>
                          <NavLink to={`/space/${space.title}`}>
                            <i className="bi bi-box-arrow-in-right "></i>
                          </NavLink>
                        </div>

                        {user.email === space.createdBy && (
                          <div className="align-self-end">
                            <i
                              className="bi bi-backspace-fill "
                              onClick={() => this.handleDelete(space)}
                            ></i>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Space;
