import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Host from './Host.jsx';
import HostPage from './HostPage.jsx';
import styles from '../styles/commonStyles.module.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      host: null
    }

    this.renderShortDesc = this.renderShortDesc.bind(this);
    this.fetchData = this.fetchData.bind(this);

  }

  componentDidMount(){
    this.fetchData(this.props.id);
  }

  fetchData(id) {
    ajax({
      url: 'http://13.57.199.59:3001/listings/' + id + '/hosts',
      type: 'GET',
      success: (data) => {
        this.renderShortDesc(data);
        console.log('this is a stare', this.state);
        console.log(data)
      },
      error: function(err) {
        console.log("Failed to get the data from the server ", err);
      }
    })
  }

  renderShortDesc(data) {
    if (data.description && data.description.length > 180) {
      data.descShort = data.description.substr(0, 180);
    }
    if (data.duringStay && data.duringStay.length > 180) {
      data.duringStayLess = data.duringStay.substr(0, 180);
    }

    this.setState({
      host: data
    });
  }


  render() {

    return (
      <div className={styles.hostService}>
        { this.state.host &&

        <Switch>
          <Route exact path='/:id'>
           <Host host={this.state.host} propertyId={this.props.id}/>
          </Route>
          <Route path='/:listingid/host-details/:id' component={HostPage}/>

        </Switch>
        }
      </div>
    )
  }
}

export default App;
