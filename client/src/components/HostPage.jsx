import React from "react";
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { useParams} from "react-router";
import Profile from './Profile.jsx';
var moment = require('moment');


import styles from '../styles/commonStyles.module.css';
import hostStyles from '../styles/host.module.css';

const HostPage = (props) => {

  const [host, setHost] = useState(0);
  let { id } = useParams();

  useEffect(() => {

    console.log('here is host id from params, ', id)
    $.ajax({
      url: 'http://13.57.199.59:3001/hosts/' + id,
      type: 'GET',
      success: (data) => {
        setHost(data[0]);
      },
      error: function(err) {
      }
    })

  }, []);

  return (

  <div className={hostStyles.mainStyles} >
    <div className={hostStyles.infoHost}>
      <div className={hostStyles.avatar}>
        <img className={hostStyles.imageProfile}  src={host.avatarUrl} />

        {host.superhost &&
          <img rel="preconnect" className={hostStyles.iconProfile} src='https://host-service.s3-us-west-1.amazonaws.com/icon.png' />
        }
      </div>

      <div className={hostStyles.statsData} >
        <img rel="preconnect" className={hostStyles.star} src='https://host-service.s3-us-west-1.amazonaws.com/profile-reviews.png' /> {host.reviews} Reviews
      </div>
      {host.verified &&
        <div className={hostStyles.statsData} >
          <img rel="preconnect" className={hostStyles.check} src='https://host-service.s3-us-west-1.amazonaws.com/profile-ver.PNG' /> Verified
        </div>
      }
      {host.superhost &&
        <div className={hostStyles.statsData} >
          <img rel="preconnect" className={hostStyles.superhostStats} src='https://host-service.s3-us-west-1.amazonaws.com/icon-super-profile.png' /> Superhost
        </div>
      }

    </div>
    <div className={hostStyles.descDetails} >
      <div className={hostStyles.name}  >Hi, I'm {host.name}</div>
      <div className={styles.date}  >Joined in {moment(host.joined_at).format("MMMM YYYY")}</div>
      <img rel="preconnect" className={hostStyles.quote} src='https://host-service.s3-us-west-1.amazonaws.com/quote.jpg' />
      <div className={styles.descText}>{host.description} </div>
      <div rel="preconnect" className='lang'><img src='https://host-service.s3-us-west-1.amazonaws.com/lang-icon.PNG'/>   Speaks {host.languages}</div>
      <div rel="preconnect" className='location'><img src='https://host-service.s3-us-west-1.amazonaws.com/loc--icon.png'/>   Lives in {host.location}</div>
    </div>
  </div>
  )
}

export default HostPage;
