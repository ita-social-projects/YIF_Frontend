import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./specialityPage.module.scss";
import { Header, Footer } from "../../components";
import SpecialityCard from '../../components/specialityCard';
import { requestData } from "../../services/requestDataFunction";
import { APIUrl } from "../../services/endpoints";

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
  const [isFetching, setFetching] = useState(false);
  const [specialityInfo, setSpecialityInfo] = useState({});
  const [universityInfo, setUniversityInfo] = useState({});
  const { id } = useParams<any>();

  useEffect(() => {
    setFetching(true);
      const endpointForSpecialties = `${APIUrl}Specialty/${id}`;
      requestData(endpointForSpecialties, "GET").then((res: any) => {
        setSpecialityInfo(res.data);
      });
      // const endpoint = `${APIUrl}University/`;
      // requestData(endpoint, "GET").then((res: any) => {
      //   console.log(res.data)
      //   setUniversityInfo(res.data);
      // });
      
    setFetching(false);
  }, [id]);
    
    const specialityList = [
      {
        abbreviation: 'ОА',
        id: '64ef8f57-de92-41f4-a034-51e47abfb5de',
        description: 'Національний університет «Острозька академія» — наступник першого вищого навчального закладу ' +
            'східнослов’янських народів — Острозької слов’яно-греко-латинської академії. Заснував академію ' +
            'у 1576 році князь Василь-Костянтин Острозький.',
        subjects:[
          {name: 'Українська мова та література', mark: '150', coefficient: '0,25' },
          {name: 'Математика', mark: '120', coefficient: '0,45' },
          {name: 'Історія', mark: '140', coefficient: '0,35',}
        ],
      },
      {
        abbreviation: 'РДГУ',
        id: 'cc6c95ee-a6b5-4249-b9af-c513edd4078d',
        description: 'Рівненський державний гуманітарний університет (РДГУ) – багатопрофільний заклад вищої освіти, ' +
            'який здійснює підготовку фахівців з педагогічних, природничих, культурно-мистецьких, економічних ' +
            'спеціальностей. Історія РДГУ розпочинається з відкриття Ровенського вчительського інституту в 1940 р., ' +
            'Ровенського інституту культури в 1979 р. та їх об’єднання в 1998 р. у Рівненський державний гуманітарний ' +
            'університет, що дає закладу змогу поєднати багаторічний досвід з інноваційним потенціалом ' +
            'сучасних технологій навчання студентів.',
        subjects:[
          {name: 'Математика', mark: '120', coefficient: '0,45'},
          {name: 'Математика', mark: '110', coefficient: '0,45'},
          {name: 'Історія', mark: '110', coefficient: '0,35',}
        ]
      },
      {
        abbreviation: 'КПІ',
        id: 'c4723684-a978-432b-b2ba-da8e4966d5f4',
        description: 'Заклад вищої освіти інженерного профілю, заснований в Києві у 1898 р., на сьогодні це один із ' +
            'найбільших університетів України за кількістю студентів з широким спектром спеціальностей і освітніх ' +
            'програм для підготовки фахівців з технічних і гуманітарних наук',
        subjects:[
          {name: 'Історія', mark: '160', coefficient: '0,35'},
          {name: 'Математика', mark: '130', coefficient: '0,45'},
          {name: 'Історія', mark: '120', coefficient: '0,35'}
        ]
      }
  ]

  const { name, code }: any = specialityInfo;
  const specialityCardList = specialityList.map((item: any) => {
    return (
      <SpecialityCard
      key={item.id}
      id={item.id}
      abbreviation={item.abbreviation}
      subjects={item.subjects}
      description={item.description}
    />
    );
  });
  

  return (
    
    <>
        <Header />
        <section className={styles.specialityPage} >
              
              <h1 className={styles.title}>{code}<br/> {name} 
                <span className={styles.card__icon}>
                  {starSVG}
                </span>
              </h1>
              
              {specialityCardList}
        </section>
        <Footer />
    </>
  );
};


export default SpecialityPage;

