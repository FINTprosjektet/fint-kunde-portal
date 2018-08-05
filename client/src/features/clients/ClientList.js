import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import AutoHideNotification from "../../common/AutoHideNotification";
import ClientView from "./view/ClientView";
import {withContext} from "../../data/context/withContext";

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  componentList: {
    width: '75%',
  },
  title: {
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit,
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
});

class ClientList extends Component {
  editClient = (client) => {
    this.setState({
      open: true,
      clientToEdit: client,
    });
  };
  onCloseEdit = () => {
    this.setState({open: false});
  };
  updateClient = (client) => {
    const {currentOrganisation} = this.props.context;
    this.props.updateClient(client, currentOrganisation.name);
  };
  deleteClient = (client) => {
	const {currentOrganisation} = this.props.context;
    this.props.deleteClient(client, currentOrganisation.name);
    this.setState({
      notify: true,
      clientDeletedName: client.name,
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      clients: this.props.clients,
      clientToEdit: null,
      open: false,
      notify: false,
      clientDeletedName: null,
    };

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={`Client ${this.state.clientDeletedName} ble slettet!`}
          onClose={this.onCloseNotification}

        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <Typography variant="headline" className={classes.title}>Klienter</Typography>
            <Divider/>
            <List>
              {this.props.clients.map((client) =>
                <ListItem className={classes.listItem} key={client.dn}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <ClientIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={client.shortDescription}
                    secondary={client.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.editClient(client)}>
                      <Edit/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.deleteClient(client)}>
                      <Delete/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </div>
        <ClientView
          open={this.state.open}
          client={this.state.clientToEdit}
          onClose={this.onCloseEdit}
          updateClient={this.updateClient}
        />
      </div>
    );
  }

}

ClientList.propTypes = {
  clients: PropTypes.array.isRequired
};


export default withStyles(styles)(withContext(ClientList));

