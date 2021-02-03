import React from "react";
import styles from "./campaingCard.module.scss";

interface Props {
  start: string;
  end: string;
}

const CampaingCard = (props: Props) => {
  return (
    <div className={styles.card__intro}>
      <h3 className={styles.card__intro__title}>Вступна кампанія</h3>
      <div className={styles.card__intro__data}>
        <div className={styles.card__intro__data__block}>
          <p className={styles.card__intro__data__numbers}>{props.start}</p>
        </div>
        <div
          className={`${styles.card__intro__data__block} ${styles.card__intro__data__block__red}`}
        >
          <p className={styles.card__intro__data__numbers}>{props.end}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaingCard;
