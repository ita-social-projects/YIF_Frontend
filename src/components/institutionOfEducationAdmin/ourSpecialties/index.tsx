import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from '../../../components/accordion';
import styles from './ourSpecialties.module.scss';
const deleteIcon = (
  <svg 
    width="22" 
    height="27" 
    viewBox="0 0 22 27" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0.46875C8.16406 0.46875 7.34375 0.632813 6.75 1.21875C6.15625 1.80469 5.96875 2.63672 5.96875 3.5H2C1.44922 3.5 1 3.94922 1 4.5H0V6.5H22V4.5H21C21 3.94922 20.5508 3.5 20 3.5H16.0312C16.0312 2.63672 15.8438 1.80469 15.25 1.21875C14.6562 0.632813 13.8359 0.46875 13 0.46875H9ZM9 2.53125H13C13.5469 2.53125 13.7188 2.66016 13.7812 2.71875C13.8438 2.77734 13.9688 2.94141 13.9688 3.5H8.03125C8.03125 2.94141 8.15625 2.77734 8.21875 2.71875C8.28125 2.66016 8.45312 2.53125 9 2.53125ZM2 7.5V23.5C2 25.1523 3.34766 26.5 5 26.5H17C18.6523 26.5 20 25.1523 20 23.5V7.5H2ZM6 10.5H8V22.5H6V10.5ZM10 10.5H12V22.5H10V10.5ZM14 10.5H16V22.5H14V10.5Z" fill="#EC615B"/>
  </svg>
);
const OurSpecialties = () => {
  
  const specialtyList = [
    {
    direction: 'Інформаційні технології',
    details: [
      {
        name: "Комп'ютерні науки",
        code: '124',
        paymentForm: 'бюджет, контракт',
        educationForm: 'денна, заочна, вечірня',
        description: 'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        educationalProgramLink: 'example.com',
      },
      {
        name: 'Інженерія програмного забезпечення (Інтернет речей)',
        code: '122',
        paymentForm: 'бюджет, контракт',
        educationForm: 'денна, вечірня',
        description: 'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        educationalProgramLink: 'example.com',
      },
      {
        name: 'Соціальні та поведінкові науки',
        code: '123',
        paymentForm: 'бюджет, контракт',
        educationForm: 'денна',
        description: 'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        educationalProgramLink: 'example.com',
      }
      ]
    },
    {
    direction: 'Математика та статистика',
    details: [
      {
        name: 'Математика',
        code: '121',
        paymentForm: 'бюджет, контракт',
        educationForm: 'денна, заочна, вечірня',
        description: 'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        educationalProgramLink: 'example.com',
      }
    ]
    }
  ]
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened(!opened);
  const specialityCardList = () =>
  specialtyList.map((item: any, key) => {
    const { direction, details }: any = item;
    return ( 
      <AccordionItem
          key={key}
          headerContent={
            <>
              <h3 className={styles.acc_item__name}>{direction}</h3>
            </>
          }
          headerStyle={styles.acc_item__header}
          bodyStyle={styles.acc_item__body}
          bodyContent={
            details.map((item: any, index: number) => (
              <li key={item.code} className={styles.acc_item__subitem}>
                <h3 className={styles.acc_item__subtitle}>
                  {item.code} {item.name}
                </h3>
                <div className={styles.acc_item__block}>
                  <p><strong>Оплата:</strong> {item.paymentForm}</p>
                </div>
                <div className={styles.acc_item__block}>
                  <p><strong>Форма навчання:</strong> {item.educationForm}</p>
                </div>
                <div className={`${styles.acc_item__block} ${styles.read__more} ${opened ? `${styles.read__more__opened}` : null}`}>
                  <p><strong>Опис:</strong>  
                    <span className={`${styles.acc_item__underline}` } key={index} onClick={() => handleClick()} data-testid='check-open'> натисніть, щоб показати </span>
                  </p>
                    <div className={styles.read__more__details}>
                      <p>
                        <strong>Освітня програма:</strong> {item.educationalProgramLink}
                      </p>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.delete__icon}>
                      {deleteIcon} <br /> видалити
                    </div>
                    <Link id='edit-btn' to={`/editSpecialty`} className={` ${styles.animatedButton}`}>
                        Редагувати
                    </Link>
                </div>
              </li>
            ))}
        /> 
        
    );
  });
  
  return (
    <section className={styles.specialityAdminPage}>
      <div className={styles.specialityAdminPage__top}>
        <h1 className={styles.specialityAdminPage__title}>Спеціальності</h1>
        <Link id='edit-btn' to={`/addSpecialty`} className={` ${styles.animatedButton}`}>Додати спеціальність
        </Link>
      </div>
      <div>{specialityCardList()}</div>
    </section>
  );
}

export default OurSpecialties;
