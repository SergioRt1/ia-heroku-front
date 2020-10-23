import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import brain from '../static/icon.png';
import CircularProgress from "@material-ui/core/CircularProgress";
import {AxiosInstance} from "../AxiosInstance";
import './../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", errorMessage: "", loading: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    AxiosInstance.getInstance().post("/login", user).then(() => {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('username', this.state.username);
      this.props.reloadPage();
    }).catch((error) => {
      console.log(error);
      this.setState({username: "", password: "", errorMessage: "Wrong credentials", loading: false});
    });
  }


  render() {
    return (
      <React.Fragment>

        <CssBaseline/>
        <main className="layout">
          <Paper elevation={5} className="paper">
            <Typography variant="h4">
              IA Heroku
            </Typography>
            <img src={brain} alt="logo" className="img"/>
            <Typography color="error" gutterBottom>{this.state.errorMessage}</Typography>
            <form className="form" onSubmit={this.handleSubmit}>
              <TextField required label="Username" fullWidth
                         onChange={event => this.setState({username: event.target.value})}/>
              <TextField required label="Password" type="password" fullWidth
                         onChange={event => this.setState({password: event.target.value})}/>
              <br/><br/>
              <Button type="submit" color="primary" variant="contained" fullWidth disabled={this.state.loading}>
                Login
              </Button>
            </form>
            <br/>
            <Link to={"/sing-in"}>Create account</Link>
            {this.state.loading && <CircularProgress style={{marginTop: "4%"}}/>}
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default Login;
