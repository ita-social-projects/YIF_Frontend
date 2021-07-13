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
          paymentFormDetails: [
            {
              paymentForm: 'Бюджет',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Українська мова',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Українська література',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
            {
              paymentForm: 'Контракт',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Історія України',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Хімія',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
          ],
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
          educationalProgramLink: 'example.com',
        },
        {
          name: 'Інженерія програмного забезпечення (Інтернет речей)',
          code: '122',
          paymentFormDetails: [
            {
              paymentForm: 'Бюджет',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Українська мова',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Українська література',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
            {
              paymentForm: 'Контракт',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Історія України',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Хімія',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
          ],
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        },
        {
          name: 'Соціальні та поведінкові науки',
          code: '123',
          paymentFormDetails: [
            {
              paymentForm: 'Бюджет',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Українська мова',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Українська література',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
            {
              paymentForm: 'Контракт',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Історія України',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Хімія',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
          ],
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
        },
      ],
    },
    {
      direction: 'Математика та статистика',
      details: [
        {
          name: 'Математика',
          code: '121',
          paymentFormDetails: [
            {
              paymentForm: 'Бюджет',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Українська мова',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Українська література',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
            {
              paymentForm: 'Контракт',
              educationFormDetails: [
                {
                  educationForm: 'Денна',
                  examRequirements: [
                    {
                      examName: 'Історія України',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
                {
                  educationForm: 'Заочна',
                  examRequirements: [
                    {
                      examName: 'Хімія',
                      minimumScore: 130,
                      coefficient: 0.3,
                    },
                    {
                      examName: 'Математика',
                      minimumScore: 180,
                      coefficient: 0.5,
                    },
                    {
                      examName: 'Фізика',
                      minimumScore: 110,
                      coefficient: 0.2,
                    },
                  ],
                },
              ],
            },
          ],
          description:
            'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
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
              paymentFormDetails={item.paymentFormDetails}
              description={item.description}
            />
          ))}
        />
      );
    });

  return (
    <section className={styles.specialityAdminPage}>
      <div className={styles.specialityAdminPage__top}>
        <h1 className={styles.specialityAdminPage__title}>
          Наші спеціальності
        </h1>
        <Link
          id='edit-btn'
          to={`/institutionOfEducationAccount/addSpecialties`}
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
