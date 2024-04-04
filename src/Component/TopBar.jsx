import React from "react";
import styles from "./Question.module.css";

const TopBar = ({ topProgressPercent }) => {
  const foregroundStyle = {
    width: `${topProgressPercent}%`,
  };

  return (
    <div className={styles.progressMeterContainer}>
      <div className={styles.progressMeter}>
        <div className={styles.foregroundP} style={foregroundStyle}></div>
      </div>
    </div>
  );
};

export default TopBar;
