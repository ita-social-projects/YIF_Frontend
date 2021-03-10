import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './specialityPage.module.scss';
import { Header, Footer } from '../../components';
import SpecialityCard from '../../components/specialityCard';
import { requestData } from '../../services/requestDataFunction';
import { APIUrl } from '../../services/endpoints';

const starSVG = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5252 1.71854C23.7756 1.19408 24.2921 0.862061 24.8579 0.862061C25.4236 0.861959 25.9403 1.19398 26.1907 1.71843L31.9877 13.8608C32.5328 15.0025 33.5864 15.794 34.8052 15.977L47.7663 17.925C48.3262 18.0092 48.7912 18.4146 48.9662 18.9709C49.1408 19.5271 48.9952 20.1378 48.5901 20.5461L39.2121 29.9986C38.3302 30.8875 37.9278 32.168 38.1358 33.4229L40.3486 46.7673C40.4442 47.3438 40.215 47.9263 39.7573 48.2698C39.2997 48.6138 38.6929 48.659 38.1922 48.3868L26.5992 42.0866C25.5092 41.4942 24.2069 41.4942 23.1166 42.0868L11.5247 48.3867C11.0239 48.6589 10.4171 48.6133 9.95952 48.2696C9.50181 47.9258 9.27271 47.3431 9.36827 46.7669L11.5821 33.4235C11.7904 32.1682 11.3879 30.8875 10.5058 29.9984L1.12721 20.5462C0.722183 20.1379 0.576284 19.5272 0.751127 18.971C0.92597 18.4148 1.39104 18.0094 1.95089 17.9251L14.9116 15.9772C16.1304 15.794 17.1841 15.0026 17.7292 13.8607L23.5252 1.71854Z"
      fill="#B4C3D3"
    />
  </svg>
);

const SpecialityPage = () => {
  const [specialityList, setSpecialityList] = useState([
    {
      id: '',
      universityAbbreviation: '',
      universityId: '',
      specialtyCode: '',
      specialtyName: '',
      examRequirements: [],
      educationFormToDescriptions: [],
      paymentFormToDescriptions: [],
    },
  ]);

  const [isFetching, setFetching] = useState(false);
  const { id } = useParams<any>();

  useEffect(() => {
    setFetching(true);
    const endpointForSpecialties = `${APIUrl}Specialty/Descriptions/${id}`;
    requestData(endpointForSpecialties, 'GET').then((res: any) => {
      setSpecialityList(res.data);
      //console.log(res.data);
    });
    setFetching(false);
  }, [id]);

  const name = specialityList[0].specialtyName;
  const code = specialityList[0].specialtyCode;
  const specialityCardList = specialityList.map((item: any, index: number) => {
    return (
      <SpecialityCard
        key={index}
        code={item.specialtyCode}
        universityAbbreviation={item.universityAbbreviation}
        examRequirements={item.examRequirements}
        educationFormToDescriptions={item.educationFormToDescriptions}
        paymentFormToDescriptions={item.paymentFormToDescriptions}
        universityId={item.universityId}
      />
    );
  });

  return (
    <>
      <Header />
      <section className={styles.specialityPage}>
        <h1 className={styles.title}>
          {code}
          <br /> {name}
          <span className={styles.card__icon}>{starSVG}</span>
        </h1>
        {specialityCardList}
      </section>
      <Footer />
    </>
  );
};

export default SpecialityPage;
