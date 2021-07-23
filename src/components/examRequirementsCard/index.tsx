import React from 'react';

interface Props {
  examRequirements: any[];
  card__content: string;
  card__content__line: string;
  card__content__line_title: string;
  card__content_title: string;
}

const ExamRequirementsCard: React.FC<Props> = ({
  examRequirements,
  card__content,
  card__content__line,
  card__content__line_title,
  card__content_title,
}: any) => {
  return (
    <ul className={card__content}>
      <li className={`${card__content__line_title} ${card__content__line}`}>
        <div className={card__content_title}>
          <h3>Вимоги до ЗНО:</h3>
        </div>
        <div className={card__content_title}>
          <h3>Miнiмум Балів</h3>
        </div>
        <div className={card__content_title}>
          <h3>Коефiцiент</h3>
        </div>
      </li>
      {examRequirements.map((item: any, index: any) => (
        <li key={index} className={card__content__line}>
          <div>{item.examName}</div>
          <div>{item.minimumScore}</div>
          <div>{item.coefficient}</div>
        </li>
      ))}
    </ul>
  );
};

export default ExamRequirementsCard;
