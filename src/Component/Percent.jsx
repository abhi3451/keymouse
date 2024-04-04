import React from "react";
import styles from "./Question.module.css";
const Percent = ({ progressPercent }) => {
  return (
    <div className={styles.percentwrapper}>
      <div className={styles.percentageIndicator}>
        <div>{`Score: ${progressPercent.toFixed(2)}%`}</div>
        <div>Max Score: 100%</div>
      </div>
      <div className={styles.percentMeter}>
        <div className={styles.background}></div>
        <div
          className={styles.foreground}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Percent;
