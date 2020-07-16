import React from "react";
import {
  Link
} from "react-router-dom";

import styles from '../styles/commonStyles.module.css';
import cohostStyles from '../styles/coHost.module.css';




const CohostListEntry = (props) => (
  <div className={styles.info}>
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Link to={`${props.propertyId}/host-details/${props.host.id}`} >
          <img className={cohostStyles.imageSmall} src={props.host.avatarUrl} />
          {props.host.superhost &&
            <img rel="preconnect" className={cohostStyles.iconSmall} src='https://host-service.s3-us-west-1.amazonaws.com/icon.png' />
          }
        </Link>
      </div>
      <div className={cohostStyles.avatar}>{props.host.name}</div>
    </div>
  </div>
)

export default CohostListEntry;