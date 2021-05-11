import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './specialityPage.module.scss';
import { Header, Footer } from '../../components';
import SpecialityCard from '../../components/specialityCard';
import { requestData } from '../../services/requestDataFunction';
import { APIUrl } from '../../services/endpoints';
import Spinner from '../../components/common/spinner';
import Star from '../../components/common/icons/Star/star';

const SpecialityPage = () => {
  const [specialityList, setSpecialityList] = useState([
    {
      id: '',
      institutionOfEducationAbbreviation: '',
      institutionOfEducationId: '',
      specialtyCode: '',
      specialtyName: '',
      description: '',
      educationalProgramLink: '',
      examRequirements: [],
      educationForm: '',
      paymentForm: '',
    },
  ]);

  const [isFetching, setFetching] = useState(true);
  const { id } = useParams<any>();

  useEffect(() => {
    const endpointForSpecialties = `${APIUrl}Specialty/Descriptions/${id}`;
    requestData(endpointForSpecialties, 'GET').then((res: any) => {
      const newList = res.data.map((item: any) => {
        const itemDescription = item.descriptions[0];
        return {
          id: item.id,
          institutionOfEducationAbbreviation:
            item.institutionOfEducationAbbreviation,
          institutionOfEducationId: item.institutionOfEducationId,
          specialtyCode: item.specialtyCode,
          specialtyName: item.specialtyName,
          description: itemDescription.description,
          educationalProgramLink: itemDescription.educationalProgramLink,
          examRequirements: itemDescription.examRequirements,
          educationForm: itemDescription.educationForm,
          paymentForm: itemDescription.paymentForm,
        };
      });
      setSpecialityList(newList);
      setFetching(false);
    });
  }, [id]);

  const name = specialityList[0].specialtyName;
  const code = specialityList[0].specialtyCode;
  const specialityCardList = specialityList.map((item: any, index: number) => {
    return (
      <SpecialityCard
        key={index}
        code={item.specialtyCode}
        institutionOfEducationAbbreviation={
          item.institutionOfEducationAbbreviation
        }
        institutionOfEducationId={item.institutionOfEducationId}
        examRequirements={item.examRequirements}
        educationForm={item.educationForm}
        paymentForm={item.paymentForm}
        educationalProgramLink={item.educationalProgramLink}
        description={item.description}
      />
    );
  });

  return (
    <>
      <Header />
      <section className={styles.specialityPage}>
        {isFetching ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              {code}
              <br /> {name}
              <Star />
            </h1>
            {specialityCardList}
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default SpecialityPage;
