import React, { useState } from 'react';
import styles from './ourSpecialties.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Delete from '../../../components/common/icons/Delete';
import Edit from '../../../components/common/icons/Edit';
import Tabs from '../../../components/Tabs/Tabs';
import Tab from '../../../components/Tabs/Tab';
import ExamRequirementsCard from '../../../components/examRequirementsCard';

interface Props {
  code: number;
  name: string;
  id: string;
  // paymentForm: string;
  paymentFormDetails: any;
  // educationForm: string;
  description: string;
  // educationalProgramLink: string;
}

// const EducationFormTab: React.FC<Props> = ({ educationForm }: any) => {
//   return <div>{educationForm}</div>;
// };

const SpecialtyDetails: React.FC<Props> = ({
  code,
  name,
  id,
  // paymentForm,
  paymentFormDetails,
  // educationForm,
  description,
}: // educationalProgramLink,
any) => {
  const [opened, setOpened] = useState(false);
  const handleClick = (e: any) => {
    setOpened(!opened);
  };

  const { path } = useRouteMatch();

  return (
    <li className={styles.acc_item__subitem}>
      <div className={styles.acc_item__subitem_container}>
        <h3 className={styles.acc_item__subtitle}>
          {code} {name}
        </h3>
        <div className={styles.acc_item__actionItems}>
          <Link id='edit-btn' to={`${path}/edit`}>
            <Edit />
          </Link>
          <Delete />
        </div>
      </div>

      <Tabs tabsStyle={styles.tabs} tabsContainer={styles.tabs__container}>
        {paymentFormDetails.map((form: any, index: any) => (
          <Tab
            title={form.paymentForm}
            key={index}
            tabStyle={styles.tabs__tab}
            tabStyle_active={styles.tabs__tab_active}
          >
            <div>
              <Tabs
                tabsStyle={`${styles.tabs} ${styles.tabs_inner} )
                 `}
                tabsContainer={styles.tabs__container_inner}
              >
                {form.educationFormDetails.map((item: any, index: any) => (
                  <Tab
                    title={item.educationForm}
                    key={index}
                    tabStyle={styles.tabs__tab}
                    tabStyle_active={styles.tabs__tab_active}
                  >
                    <ExamRequirementsCard
                      examRequirements={item.examRequirements}
                      card__content={styles.card__content}
                      card__content__line={styles.card__content__line}
                      card__content_title={styles.card__content_title}
                      card__content__line_title={
                        styles.card__content__line_title
                      }
                    />

                    <div className={styles.acc_item__block}>
                      <p>
                        <strong className={styles.acc_item__subtitle}>
                          Оплата:
                        </strong>{' '}
                        {form.paymentForm.toLowerCase()}
                      </p>
                    </div>
                    <div className={styles.acc_item__block}>
                      <p>
                        <strong className={styles.acc_item__subtitle}>
                          Форма навчання:
                        </strong>{' '}
                        {item.educationForm.toLowerCase()}
                      </p>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </Tab>
        ))}
      </Tabs>
      <div
        className={`${styles.acc_item__block} ${styles.read__more} ${
          opened ? `${styles.read__more__opened}` : null
        }`}
      >
        <div>
          <strong className={styles.acc_item__subtitle}>Опис: </strong>
          <span
            className={`${styles.acc_item__underline}`}
            key={id}
            onClick={(e) => handleClick(e)}
            data-testid='check-open'
          >
            {' '}
            <span className={`${styles.read__more__show}`}>
              {' '}
              натисніть, щоб відкрити
            </span>
            <span className={`${styles.read__more__hide}`}>згорнути</span>{' '}
          </span>
        </div>
        <div className={styles.read__more__details}>
          <p className={`${styles.read__more__details__description}`}>
            {description}
          </p>
        </div>
        {/* <div className={styles.delete__icon}></div> */}
        {/* <Link
          id='edit-btn'
          to={`${path}/edit`}
          className={` ${styles.animatedButton}`}
        >
          Редагувати
        </Link> */}
      </div>
    </li>
  );
};

export default SpecialtyDetails;
