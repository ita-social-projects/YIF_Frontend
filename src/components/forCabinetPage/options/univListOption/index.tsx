import React, { Fragment } from 'react';
import style from './univListOption.module.scss';
//import { UniversityCard } from '../../../index';

const UnivListOption = () => {
  return (
    <Fragment>
      <section className={style.universityListSection}>
        <div className={style.container}>
          {/* <UniversityCard
            liked={true}
            shortTitle='НУВГП'
            link='nuwm.edu.ua'
            adress='Україна, 33028, м. Рівне, вул. Соборна, 11'
            description="Університет визнаний в Україні та за її межами єдиний в державі вищий навчальний заклад, який готує фахівців для галузі водного господарства, з потужною матеріально-технічною базою, висококваліфікованим кадровим потенціалом, багатотисячною студентською сім'єю."
            introStart='01.07.2021'
            introDeadline='21.08.2021'
          /> */}
        </div>
      </section>
    </Fragment>
  );
};

export default UnivListOption;
