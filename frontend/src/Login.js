import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:2000/login', {
      email: this.state.email,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // this.props.history.push('/dashboard');
      this.props.navigate("/dashboard");
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <div className="section" style={{ marginTop: '200px' }}>
        <div>
          <h2>Please, Login into your account</h2>
        </div>

        <div className="container">
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /><br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className="button_style"
            variant="contained"
            color="#3f51b5"
            size="small"
            disabled={this.state.email === '' && this.state.password === ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/register"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);