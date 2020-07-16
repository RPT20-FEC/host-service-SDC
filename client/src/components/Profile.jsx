import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HostPage from './HostPage.jsx';
import App from './App.jsx';
var moment = require('moment');

import styles from '../styles/commonStyles.module.css';
import hostStyles from '../styles/host.module.css';


const Profile = (props) => (
  <div>
    <div className={styles.top}>
      <div className={styles.avatar} >
        <Link to={`${props.propertyId}/host-details/${props.host.id}`} >
          <img className={styles.image} src={props.host.avatarurl} />
          {props.host.superhost &&
          <img link rel="preconnect" className={styles.icon} src='https://host-service.s3-us-west-1.amazonaws.com/icon.png' />
          }
        </Link>
      </div>
      <div className={styles.title}>
        <h2 className={styles.name} >Hosted by {props.host.name}</h2>
        <div className={styles.date} >Joined in {moment(props.host.joined_at).format("MMMM YYYY")}</div>
      </div>
    </div>
  </div>
)

export default Profile;