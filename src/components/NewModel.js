import React from 'react';
import {AxiosInstance} from "../AxiosInstance";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class NewModel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: "", description: "", file: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      "name": this.state.title,
      "description": this.state.description,
      "file": this.state.file,
      "owner": localStorage.getItem('username')
    };
    const newModel = await AxiosInstance.getInstance().post("/models", data);
    this.props.callback(newModel);
    this.setState({description: "", name: "", email: "", status: "", dueDate: new Date()});
  }

  render() {
    return (
      <Paper className="paper">
        <Typography variant="h5">New Model</Typography>
        <br/>
        <form className="form" onSubmit={this.handleSubmit}>
          <TextField required label="Name" fullWidth
                     value={this.state.name}
                     onChange={event => this.setState({name: event.target.value})}/>
          <TextField required label="Description" fullWidth
                     value={this.state.description}
                     onChange={event => this.setState({description: event.target.value})}/>
          <TextField required label="File" fullWidth
                     value={this.state.file}
                     onChange={event => this.setState({file: event.target.value})}/>
          <br/><br/>

          <Button type="submit" color="primary" variant="contained" fullWidth>
            Create
          </Button>
        </form>
      </Paper>
    );
  }

}

export default NewModel;
