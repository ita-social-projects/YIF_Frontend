import React from 'react';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import InstitutionOfEducationBlock from '../../institutionOfEducationBlock';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';
import TabContent from './TabContent';

// import { useAuth } from '../../../services/tokenValidator';
// import { requestSecureData } from '../../../services/requestDataFunction';



const AddInstitutionOfEducationAdmin = () => {
  const { path } = useRouteMatch();
  const { id, name, abbreviation, site, address, phone, email, description } = {
    id: 'e2bd4ad9-060b-4d53-8222-9f3e5efbcfc7',
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
    site: 'https://nuwm.edu.ua/',
    address: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
    phone: '380362633209',
    email: 'mail@nuwm.edu.ua',
    description:
      'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу.',
  };
// Копі на ремув
    // const removeAdminInstitutionOfEducation = async (id: string) => {
    // const endpoint = `${APIUrl}SuperAdmin/DeleteInstitutionOfEducationAdmin/${id}`;
    // const currentToken = await getToken();

    // requestSecureData(endpoint, 'DELETE', currentToken)
    //   .then((res: any) => {
    //     const statusCode = res.statusCode.toString();
    //     if (statusCode.match(/^[23]\d{2}$/)) {
    //       setSortedInstitutionOfEducationAdmins(
    //         setNewInstitutionOfEducationAdminsState(
    //           sortedInstitutionOfEducationAdmins,
    //           id,
    //           'removeAdmin'
    //         )
    //       ); // sorted state
    //       setInstitutionOfEducationAdmins(
    //         setNewInstitutionOfEducationAdminsState(
    //           institutionOfEducationAdmins,
    //           id,
    //           'removeAdmin'
    //         )
    //       ); // main state

  //         setSuccess(
  //           defineSuccessMessage(true, res.statusCode, res.data.message)
  //         );
  //         setTimeout(() => {
  //           setSuccess(defineSuccessMessage());
  //         }, 3000);
  //       } else {
  //         setError(defineErrorMessage(true, res.statusCode, res.data.message));
  //         setTimeout(() => {
  //           setError(defineErrorMessage());
  //         }, 3000);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(
  //         defineErrorMessage(
  //           true,
  //           error.statusCode,
  //           'Щось пішло не так, спробуйте знову.'
  //         )
  //       );
  //       setTimeout(() => {
  //         setError(defineErrorMessage());
  //       }, 3000);
  //     });
  // };
  // // кінець коду на ремув
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <InstitutionOfEducationBlock
          name={name}
          abbreviation={abbreviation}
          site={site}
          address={address}
          phone={phone}
          email={email}
          description={description}
          imagePath={'https://nuwm.edu.ua/images/news/489x300/16990.jpg'}
        />


        <Link
          className={`${styles.animatedButton} ${styles.buttonLink}`}
          to={`${path}/edit/${id}`}
        >
          Редагувати
        </Link>
        <div className={styles.admin}>
          <h2 className={styles.admin__title}>Адмін</h2>
          <div className={styles.admin__line}>
            <p className={styles.admin__line__name}>Shanna@melissa.tv22222</p>
            <div className={styles.admin__line__icons}>
              <Unlock handleClick={() => {}} />
              ///
              {/* <Delete handleClick={ removeAdminInstitutionOfEducation(id)} /> */}
              
            </div>
          </div>
          <div className={styles.admin__buttons}>
            <TabContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstitutionOfEducationAdmin;
