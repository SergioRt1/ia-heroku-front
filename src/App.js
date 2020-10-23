import React from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {AxiosInstance} from "./AxiosInstance";
import Login from "./components/Login";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import SingIn from "./components/SingIn";
import HomePage from "./components/HomePage";

const theme = createMuiTheme({
  palette: {
    common: {black: "#000", white: "#fff"},
    background: {
      paper: "rgb(141,234,212)",
      default: "#c0faf3"},
    primary: {
      light: "rgb(0,64,255)",
      main: "rgb(10,171,186)",
      dark: "rgb(44,58,198)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#4269f7",
      main: "#001aff",
      dark: "#030dd2",
      contrastText: "#fff"
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn')
    };
    this.reloadPage = this.reloadPage.bind(this);
    AxiosInstance.setCallback(this.reloadPage)
  }

  reloadPage = () => {
    this.setState({isLoggedIn: localStorage.getItem('isLoggedIn')})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.state.isLoggedIn === 'true' ?
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <HomePage reloadPage={this.reloadPage}/>}/>
            </Switch>
          </BrowserRouter>
          : <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Login reloadPage={this.reloadPage}/>}/>
              <Route exact path="/sing-in" render={() => <SingIn/>}/>
            </Switch>
          </BrowserRouter>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
