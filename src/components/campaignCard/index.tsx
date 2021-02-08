import React from "react";
import styles from "./campaingCard.module.scss";

interface Props {
  start: string;
  end: string;
}

const CampaingCard = (props: Props) => {

  const startOfCampaign = new Date(props.start);
  const endOfCampaign = new Date(props.end);

  const yearStart = startOfCampaign.getFullYear();
  const monthStart = startOfCampaign.getMonth();
  const dayStart = startOfCampaign.getDate();

  const yearEnd = endOfCampaign.getFullYear();
  const monthEnd = endOfCampaign.getMonth();
  const dayEnd = endOfCampaign.getDate();

  return (
    <div className={styles.card__intro}>
      <h3 className={styles.card__intro__title}>Вступна кампанія</h3>
      <div className={styles.card__intro__data}>
        <div className={styles.card__intro__data__block}>
          <p className={styles.card__intro__data__numbers}>{dayStart}.{monthStart}.{yearStart}</p>
        </div>
        <div
          className={`${styles.card__intro__data__block} ${styles.card__intro__data__block__red}`}
        >
          <p className={styles.card__intro__data__numbers}>{dayEnd}.{monthEnd}.{yearEnd}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaingCard;
