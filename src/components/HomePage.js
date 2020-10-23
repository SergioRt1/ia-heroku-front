import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import ModelPage from "./ModelPage";
import FloatingActionButton from "./FloatingActionButton";
import Modal from "@material-ui/core/Modal";
import NewModel from "./NewModel";


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      openModalNew: false
    }
  }

  handleModalNewOpen = () => {
    this.setState({openModalNew: true});
  };

  handleModalNewClose = () => {
    this.setState({openModalNew: false});
  };

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  logout = (e) => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    this.props.reloadPage()
  }

  addModel = (newModel) => {
    this.setState((state) => {
      return {models: [...state.models, newModel]};
    })
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Models" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Logout" {...a11yProps(2)} onClick={this.logout}/>
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ModelPage/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <div className="right">
          <FloatingActionButton icon={<AddIcon/>} callback={this.handleModalNewOpen}/>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openModalNew}
            onClose={this.handleModalNewClose}
          >
            <NewModel callback={this.addModel} close={this.handleModalNewClose}/>
          </Modal>
        </div>

      </React.Fragment>
    );
  }
}

export default HomePage;
