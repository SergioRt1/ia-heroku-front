import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardInfo from "./CardInfo";
import {Typography} from "@material-ui/core";

class ModelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      loading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onDeleteCard = (id) => {
    const models = this.state.models;

    this.setState({
      models: models.filter(model => model.renderId === id),
    });
  }

  loadData = async () => {
    try {
      this.setState({loading: true})
      //Todo const models = await AxiosInstance.getInstance().get("/models")
      const models = [{
        name: "Model 1",
        description: "ML for amazing things",
        file: "ML.xml"
      }]
      this.setState({loading: false, models: this.mapToCartInfo(models)})
    } catch (e) {
      console.log(e)
    }
  }

  mapToCartInfo = (models) => {
    return models.map((model) => {
      return {title: model.name, description: model.description, secondary: model.file}
    })
  }

  render() {
    return (
      <div>
        <CssBaseline/>
        <Typography variant={"h4"}>User models</Typography>
        <br/>
        {this.state.loading ?
          <CircularProgress size={100} style={{position: "relative", left: "50%", right: "50%"}}/>
          :
          <>
            {this.state.models.map((model, id) => {
              model.renderId = id;
              return (<CardInfo info={model} key={id} onDelete={this.onDeleteCard}/>);
            })}
          </>
        }
      </div>
    );
  }
}

export default ModelPage;
