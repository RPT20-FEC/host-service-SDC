import React, { useState } from "react";
import Description from './Description.jsx';
import Profile from './Profile.jsx';
import Stats from './Stats.jsx';
import CohostList from './CohostList.jsx';
import SendMessage from './SendMessage.jsx';
import styles from '../styles/commonStyles.module.css';
import hostStyles from '../styles/host.module.css';


const Host = (props) => (
  <div>
    <Profile host={props.host} propertyId={props.propertyId}/>

    <div className={styles.container}>
      <div className={styles.info}>
        <Stats superhost={props.host.superhost} reviews={props.host.reviews} verified={props.host.verified}/>

        <Description className='desc' less={props.host.descShort} more={props.host.description}/>
        {(props.host.coHost && props.host.coHost.length>0) &&
          <CohostList id={props.host.id} propertyId={props.propertyId} />
        }
        {props.host.duringstay &&
        <div className='headline-during-stay'>
          <div className= {styles.bold} >During your stay</div>
          <Description classname='during-stay' less={props.host.duringStayLess} more={props.host.duringstay}/>
        </div>
        }
        {props.host.superhost &&
          <div className='superhost-true'>
          <div className= {styles.bold}>{props.host.name} is a Superhost</div>
          <div className="superhost-desc">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
          </div>
        }
      </div>
      <div className={styles.info}>
        <div className='lang'>Language: {props.host.languages}</div>
        <div className='resp-rate'>Response rate: {props.host.responserate}%</div>
        <div className='resp-time'>Response time: {props.host.responsetime}</div>
        <SendMessage name={props.host.name} responsetime={props.host.responsetime} />
        <div className={hostStyles.note}>
          <img rel="preconnect" className={hostStyles.noteIcon} src='https://host-service.s3-us-west-1.amazonaws.com/paymentNote.png' />
          <p className={hostStyles.noteWarning}>To protect your payment, never transfer money or communicate outside of the Airbnb website or app. </p>
        </div>
      </div>
    </div>
  </div>
)

export default Host;