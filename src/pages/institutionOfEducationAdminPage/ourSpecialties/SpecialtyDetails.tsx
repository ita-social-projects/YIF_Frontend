import React, { useState } from 'react';
import styles from './ourSpecialties.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Delete from '../../../components/common/icons/Delete';
import Edit from '../../../components/common/icons/Edit';
import Tabs from '../../../components/Tabs/Tabs';
import Tab from '../../../components/Tabs/Tab';

interface Props {
  code: number;
  name: string;
  id: string;
  paymentForm: string;
  paymentFormDetails: any;
  // educationForm: string;
  description: string;
  educationalProgramLink: string;
}

// const EducationFormTab: React.FC<Props> = ({ educationForm }: any) => {
//   return <div>{educationForm}</div>;
// };

const SpecialtyDetails: React.FC<Props> = ({
  code,
  name,
  id,
  paymentForm,
  paymentFormDetails,
  // educationForm,
  description,
  educationalProgramLink,
}: any) => {
  const [opened, setOpened] = useState(false);
  const handleClick = (e: any) => {
    setOpened(!opened);
  };

  const { path } = useRouteMatch();

  return (
    <li className={styles.acc_item__subitem}>
      <h3 className={styles.acc_item__subtitle}>
        {code} {name}
      </h3>
      <Delete />
      <Edit />

      <Tabs>
        {paymentFormDetails.map((form: any, index: any) => (
          <Tab title={form.paymentForm} key={index}>
            <div className={styles.acc_item__block}>
              <div>
                <Tabs>
                  {form.educationFormDetails.map((item: any, index: any) => (
                    <Tab title={item.educationForm} key={index}>
                      {/* {item.examRequirements} */}
                      <table>
                        <tr>
                          <th>Вимоги до ЗНО</th>
                          <th>Мінімум балів</th>
                          <th>Коефіцієнт</th>
                        </tr>
                        {item.examRequirements.map((item: any, index: any) => (
                          <tr>
                            <td>{item.examName} </td>
                            <td>{item.minimumScore}</td>
                            <td>{item.coefficient}</td>
                          </tr>
                        ))}
                      </table>
                      <div className={styles.acc_item__block}>
                        <p>
                          <strong>Форма навчання:</strong> {item.educationForm}
                        </p>
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
            <div className={styles.acc_item__block}>
              <p>
                <strong>Оплата:</strong> {form.paymentForm}
              </p>
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
          <strong>Опис:</strong>
          <span
            className={`${styles.acc_item__underline}`}
            key={id}
            onClick={(e) => handleClick(e)}
            data-testid='check-open'
          >
            {' '}
            <span className={`${styles.read__more__show}`}> згорнути</span>
            <span className={`${styles.read__more__hide}`}>
              {' '}
              натисніть, щоб приховати
            </span>{' '}
          </span>
        </div>
        <div className={styles.read__more__details}>
          <p className={`${styles.read__more__details__description}`}>
            {description}
          </p>
        </div>
        <div className={styles.delete__icon}></div>
        <Link
          id='edit-btn'
          to={`${path}/edit`}
          className={` ${styles.animatedButton}`}
        >
          Редагувати
        </Link>
      </div>
    </li>
  );
};

export default SpecialtyDetails;
