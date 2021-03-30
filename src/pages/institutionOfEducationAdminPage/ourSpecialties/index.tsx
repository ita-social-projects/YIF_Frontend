import React from 'react';
import { Link } from 'react-router-dom';
import AccordionItem from '../../../components/accordion';
import styles from './ourSpecialties.module.scss';
import SpecialtyDetails from './SpecialtyDetails';

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
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
          educationalProgramLink: 'example.com',
        },
        {
          name: 'Інженерія програмного забезпечення (Інтернет речей)',
          code: '122',
          paymentForm: 'бюджет, контракт',
          educationForm: 'денна, вечірня',
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
          educationalProgramLink: 'example.com',
        },
        {
          name: 'Соціальні та поведінкові науки',
          code: '123',
          paymentForm: 'бюджет, контракт',
          educationForm: 'денна',
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
          educationalProgramLink: 'example.com',
        },
      ],
    },
    {
      direction: 'Математика та статистика',
      details: [
        {
          name: 'Математика',
          code: '121',
          paymentForm: 'бюджет, контракт',
          educationForm: 'денна, заочна, вечірня',
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
          educationalProgramLink: 'example.com',
        },
      ],
    },
  ];

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
          bodyContent={details.map((item: any, index: number) => (
            <SpecialtyDetails
              key={index}
              code={item.code}
              name={item.name}
              id={item.id}
              paymentForm={item.paymentForm}
              educationForm={item.educationForm}
              educationalProgramLink={item.educationalProgramLink}
              description={item.description}
            />
          ))}
        />
      );
    });

  return (
    <section className={styles.specialityAdminPage}>
      <div className={styles.specialityAdminPage__top}>
        <h1 className={styles.specialityAdminPage__title}>Спеціальності</h1>
        <Link
          id='edit-btn'
          to={`/addSpecialty`}
          className={` ${styles.animatedButton}`}
        >
          Додати спеціальність
        </Link>
      </div>
      <div>{specialityCardList()}</div>
    </section>
  );
};

export default OurSpecialties;
