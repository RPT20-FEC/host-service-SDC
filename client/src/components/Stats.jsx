import React, { useState } from "react";
import styles from '../styles/commonStyles.module.css';



const Stats = (props) => (
  <div className={styles.statsContainer}>
    <div className={styles.statsData}>
      <img rel="preconnect" className="star" src='https://host-service.s3-us-west-1.amazonaws.com/star.png' />
      {props.reviews} Reviews </div>
    {props.verified &&
    <div className={styles.statsData}>
      <img rel="preconnect" className="check" src='https://host-service.s3-us-west-1.amazonaws.com/verified.png' />Verified </div>
      }
    {props.superhost &&
      <div className={styles.statsData}>
        <img rel="preconnect" className='superhost-stats' src='https://host-service.s3-us-west-1.amazonaws.com/statsHostIcon.png' /> Superhost </div>
      }
  </div>
)

export default Stats;