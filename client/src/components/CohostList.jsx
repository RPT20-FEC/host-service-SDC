import React from "react";
import CohostListEntry from './CohostListEntry.jsx';
import { ajax } from 'jquery';
import { useState, useEffect } from 'react';
import styles from '../styles/commonStyles.module.css';




const CohostList = (props) => {

  const [cohosts, setCohost] = useState(0);

  useEffect(() => {
    ajax({
      url: 'http://18.144.49.171:3001/hosts/' + props.id + '/co-hosts',
      type: 'GET',
      success: (data) => {
        console.log('got cohost data ', data)
        setCohost(data);
      },
      error: function(err) {
        console.log("Failed to get the data from the server ", err);
      }
    })

  }, []);

  return (
    <div>
      <div className={styles.bold}> Co-hosts </div>
        <div className={styles.container}>

          {Array.from(cohosts).map(host =>
            <CohostListEntry host={host} key={host.id} propertyId={props.propertyId}/>
          )}

        </div>
    </div>
  );
}

export default CohostList;
