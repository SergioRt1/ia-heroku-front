import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {AxiosInstance} from "../AxiosInstance";
import "./../styles/CardInfo.css"


class CardInfo extends React.Component {
  delete = async () => {
    //Todo await AxiosInstance.getInstance().delete(`/${this.props.path}`)
    this.props.onDelete(this.props.key)
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className="layout">
          <Card className="margin" elevation={4}>
            <CardContent>
              <div className="gridCard">
                <div>
                  <Typography variant="h6">
                    {this.props.info.title}
                  </Typography>
                </div>
                <IconButton onClick={this.delete}>
                  <Delete/>
                </IconButton>
              </div>
              <Typography variant="body1">
                {this.props.info.description}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {this.props.info.secondary}
              </Typography>
            </CardContent>
          </Card>
        </main>
      </React.Fragment>
    );
  }
}

export default CardInfo;
