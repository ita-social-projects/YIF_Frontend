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
          Існують легенди (записи яких збереглися в античних храмах), згідно з
          якими людська раса походить від cтворінь, які нагадують амфібій. Їхні
          тіла були вкриті лускою й дихали вони через зябра.У низці міфів риби
          виконують функцію деміурга, тобто беруть участь у створенні світу:
          наприклад, риба приносить із дна першоствореного океану мул, з якого
          створюється суходіл.
        </p>
        <div className={styles.aboutUs__advantages}>{Items}</div>
      </div>
    </section>
  );
};

export default AboutUs;
