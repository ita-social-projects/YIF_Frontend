import React from 'react';
import styles from './aboutUs.module.scss';
import AdvantagesBlock from './advantagesBlock/index';

const AboutUs: React.FC = () => {
  const advantagesArr: { url: string; title: string; id: number }[] = [
    {
      url: 'assets/images/aboutUs1.svg',
      title: 'Залишайся вдома',
      id: 1,
    },
    {
      url: 'assets/images/aboutUs2.svg',
      title: 'Працюй віддалено',
      id: 2,
    },
    {
      url: 'assets/images/aboutUs3.svg',
      title: 'Розвивайся',
      id: 3,
    },
  ];

  const Items = advantagesArr.map((item) => {
    const { url, title, id } = item;
    return <AdvantagesBlock key={id} url={url} title={title} />;
  });

  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <h2 className={styles.aboutUs__title}>Про нас</h2>
        <p className={styles.aboutUs__desc}>
          Ми надаємо можливість абітурієнтам ознайомитись із переліком
          навчальних закладів, які надають освіту в нашому регіоні. <br />
          Також Ви можете отримати детальну інформацію про наявні спеціальності
          та детальну інформацію, <br />
          необхідну для вступу до університету.
        </p>
        <div className={styles.aboutUs__advantages}>{Items}</div>
      </div>
    </section>
  );
};

export default AboutUs;
