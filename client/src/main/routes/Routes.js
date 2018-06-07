import React from "react";
import {Route} from "react-router-dom";
import ClientsContainer from "../../features/clients/ClientsContainer";
import Dashboard from "../../features/dashboard/Dashboard";
import Support from "../../features/support/Support";
import ComponentContainer from "../../features/component/ComponentContainer";
import AdapterContainer from "../../features/adapter/AdapterContainer";
import ContactContainer from "../../features/contact/ContactContainer";
import AssetContainer from "../../features/asset/AssetContainer";
import LogContainer from "../../features/logs/LogContainer";


class Routes extends React.Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/clients' component={ClientsContainer}/>
        <Route path='/adapters' component={AdapterContainer}/>
        <Route path='/contacts' component={ContactContainer}/>
        <Route path='/assets' component={AssetContainer}/>
        <Route path='/apis' component={ComponentContainer}/>
        <Route path='/logs' component={LogContainer}/>
        <Route path='/support' component={Support}/>
      </div>
    );
  }
}

export default Routes;