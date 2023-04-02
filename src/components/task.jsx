import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { useParams, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {
  getTask,
  setTask,
  deleteTask,
  takeTask,
  completeTask,
} from "../services/taskService";
import { getCurrentUser } from "../services/authService";

class Task extends Form {
  state = {
    data: {
      task: "",
    },

    errors: {},
    tasks: [],
    user: getCurrentUser(),
  };
  schema = {
    task: Joi.string().required().label("task").min(3),
  };
  async componentDidMount() {
    const { data: tasks } = await getTask(this.props.id);

    this.setState({ tasks });
  }

  doSubmit = async () => {
    //    call the server and redirect hte user to difernt page

    try {
      const { data } = this.state;
      const { data: task } = await setTask(data.task, this.props.id);
      const tasks = [task, ...this.state.tasks];

      this.setState({ tasks });
      toast("Great! New task created.");

      this.state.data.task = "";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.task = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("submitted");
  };

  handleDelete = async (task) => {
    const originalTasks = this.state.tasks;

    const tasks = originalTasks.filter((m) => m._id !== task._id);
    this.setState({ tasks });
    try {
      await deleteTask(task._id);
      toast.success("task deleted");
    } catch (ex) {
      if (ex.respone && ex.respone.status === 404) {
        toast.warning("this task  is already been deleted");
        this.setState({ tasks: originalTasks });
      }
    }
  };

  handleTaken = async (task) => {
    const user = getCurrentUser();
    try {
      await takeTask(task._id);
      const { data: tasks } = await getTask(this.props.id);
      this.setState({ tasks });
      toast.success("task assigned ");
    } catch (ex) {
      if (ex.respone && ex.respone.status === 404) {
        toast.warning("this tasked is already assigned");
      }
    }
  };
  handleComplete = async (task) => {
    try {
      await completeTask(task._id);
      const { data: tasks } = await getTask(this.props.id);

      this.setState({ tasks });
      toast.success("completed");
    } catch (ex) {
      if (ex.respone && ex.respone.status === 404) {
        toast.warning("this tasked is complted");
      }
    }
  };

  render() {
    const { tasks, user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />

        <section className="vh-100">
          <div className="container py-3  ">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="col ">
                <div className="card rounded-3 p-3">
                  <NavLink className="nav-link" to="/space">
                    <i class="bi bi-arrow-bar-left" style={{fontSize:30}}></i>
                    
                  </NavLink>{" "}
                  <div className="card-body  ">
                    <div className="d-flex">

                    <h3 className="text-center my-3 pb-3"> {this.props.id}</h3>

                    </div>

                    <form
                      className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                      onSubmit={this.handleSubmit}
                    >
                      {this.renderInputS("task", "Task")}
                      {this.renderButton("Add")}
                    </form>

                    <table className="table mb-4">
                      <thead>
                        <tr>
                          <th scope="col">Task</th>
                          <th scope="col">Status</th>
                          <th scope="col">createdBy</th>
                          <th scope="col">takenBy</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task) => (
                          <tr key={task._id}>
                            <td style={{ width: 300 }} className="text-break">
                              {task.title}
                            </td>

                            {task.isComplete ? (
                              <td className="text-success">completed</td>
                            ) : (
                              <td className="text-info">In progress</td>
                            )}

                            <td> {task.createdBy}</td>
                            <td>
                              {task.takenBy === "will@gmail.com" ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => this.handleTaken(task)}
                                >
                                  take
                                </button>
                              ) : (
                                task.takenBy
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger ms-1"
                                onClick={() => this.handleDelete(task)}
                              >
                                Delete
                              </button>
                            </td>
                            <td>
                              {task.isComplete ? (
                                <span className="">well done</span>
                              ) : (
                                <button
                                  onClick={() => this.handleComplete(task)}
                                  className="btn btn-success ms-1"
                                  disabled={!(user.email === task.takenBy)}
                                >
                                  complete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const TaskWrapper = () => {
  const { id } = useParams();
  return <Task id={id} />;
};

export default TaskWrapper;
