import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom'
import styles from "./universityPage.module.scss";
import { Header, Footer } from "../../components";
import ErrorBoundry from "../../errorBoundry";
import AccordionItem from "../../components/accordion";
import CampaingCard from "../../components/campaignCard";
import Spinner from "../../components/common/spinner";
// import { requestData } from '../../services/requestDataFunction';
// import { APIUrl } from '../../services/endpoints';

// interface ParamTypes {
//     id: string
// }

const UniversityPage = () => {
  const [isFetching, setFetching] = useState(false);
  // const [universityInfo, setUniversityInfo] = useState(null)
  // const { id } = useParams<ParamTypes>();

  // useEffect(() => {
  //     const endpoint = `${APIUrl}University/${id}`;
  //     setFetching(true);
  //     requestData(endpoint, 'GET').then((res: any) => {

  //         const UniversityInfo = res.data.responseList.map((item: any) => {
  //             return {
  //                 id: item.id,
  //                 abbreviation: item.abbreviation,
  //                 site: item.site,
  //                 address: item.address,
  //                 description: item.description,
  //                 startOfCampaign: item.startOfCampaign,
  //                 endOfCampaign: item.endOfCampaign,
  //                 email: item.email,
  //                 phoneNumber: item.phoneNumber,
  //                 name: item.name,
  //                 specialtiesOfUniversity: item.specialtiesOfUniversity,
  //                 liked: false
  //             };
  //         });
  //         setUniversityInfo(UniversityInfo);
  //         setFetching(false);
  //     });
  // }, [id])

  const abbreviation = "НУВГП";
  const name =
    "Національний університет водного господарства та природокористування";
  const site = "nuwm.edu.ua";
  const address = "Україна, 33028, м. Рівне, вул. Соборна, 11";
  const phoneNumber = "+38 (066) 666 66 66";
  const email = "something@nuwee.com";
  const description =
    "Символіка риби містить багато різноманітних, іноді полярно протилежних значень. З часів глибокої давнини риба асоціювалась із Вчителями, світовими Спасителями, праотцями, мудрістю. До символу риби мають відношення індуїстський Вішну, єгипетський Гор, халдейський Оаннес, а також Христос. Учні, послідовники, які живуть у «воді вчення», часто уподібнюються рибам. Існують легенди (записи яких збереглися в античних храмах), згідно з якими людська раса походить від cтворінь, які нагадують амфібій. Їхні тіла були вкриті лускою й дихали вони через зябра.У низці міфів риби виконують функцію деміурга, тобто беруть участь у створенні світу: наприклад, риба приносить із дна першоствореного океану мул, з якого створюється суходіл, або ж служить опорою землі. Вода є символом жіночого початку, тому риба стає атрибутом багатьох Великих богинь (Атаргатис, Іштар, Астарти, Афродити). Вона може символізувати не лише плодючість, багатство, чуттєву любов, але й такі негативні аспекти деяких богинь, як пиха й жадібність.";
  const startOfCampaign = "01.07.2021";
  const endOfCampaign = "21.08.2021";
  const liked = true;

  const specialtiesOfUniversity = [
    {
      id: 12,
      name: "Інформаційні технології",
      specialties: [
        {
          id: 121,
          name: "Інженерія програмного забезпечення (Інтернет речей)",
        },
        { id: 122, name: "Комп'ютерні науки" },
        { id: 123, name: "Комп'ютерні науки (Прикладна інформатика)" },
        { id: 124, name: "Комп’ютерна інженерія" },
        { id: 125, name: "Інформаційні системи та технології" },
      ],
    },
    {
      id: 14,
      name: "Електрична інженерія",
      specialties: [
        {
          id: 141,
          name: "Електроенергетика, електротехніка та електромеханіка",
        },
        {
          id: 142,
          name:
            "Електроенергетика, електротехніка та електромеханіка (Smart-енергетика та електромобільність)",
        },
        {
          id: 143,
          name:
            "Електроенергетика, електротехніка та електромеханіка (Енергетичний менеджмент та енергоефективні технології)",
        },
      ],
    },
    {
      id: 15,
      name: "Автоматизація та приладобудування",
      specialties: [
        {
          id: 151,
          name: "Автоматизація та комп’ютерно-інтегровані технології",
        },
        {
          id: 152,
          name:
            "Автоматизація та комп’ютерно-інтегровані технології (Робототехніка та штучний інтелект)",
        },
      ],
    },
  ];

  const starSVG = (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M23.5252 1.71854C23.7756 1.19408 24.2921 0.862061 24.8579 0.862061C25.4236 0.861959 25.9403 1.19398 26.1907 1.71843L31.9877 13.8608C32.5328 15.0025 33.5864 15.794 34.8052 15.977L47.7663 17.925C48.3262 18.0092 48.7912 18.4146 48.9662 18.9709C49.1408 19.5271 48.9952 20.1378 48.5901 20.5461L39.2121 29.9986C38.3302 30.8875 37.9278 32.168 38.1358 33.4229L40.3486 46.7673C40.4442 47.3438 40.215 47.9263 39.7573 48.2698C39.2997 48.6138 38.6929 48.659 38.1922 48.3868L26.5992 42.0866C25.5092 41.4942 24.2069 41.4942 23.1166 42.0868L11.5247 48.3867C11.0239 48.6589 10.4171 48.6133 9.95952 48.2696C9.50181 47.9258 9.27271 47.3431 9.36827 46.7669L11.5821 33.4235C11.7904 32.1682 11.3879 30.8875 10.5058 29.9984L1.12721 20.5462C0.722183 20.1379 0.576284 19.5272 0.751127 18.971C0.92597 18.4148 1.39104 18.0094 1.95089 17.9251L14.9116 15.9772C16.1304 15.794 17.1841 15.0026 17.7292 13.8607L23.5252 1.71854Z'
        fill='#B4C3D3'
      />
    </svg>
  );

  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.universityPage}>
          {isFetching ? (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <>
              <h1 className={styles.title}>{abbreviation}</h1>
              <div className={`container" ${styles.universityPage__container}`}>
              <div
        className={
          liked
            ? `${styles.card__icon} ${styles.card__icon__liked}`
            : `${styles.card__icon}`
        }
      >
        {starSVG}
      </div>
                <h2 className={styles.universityPage__subtitle}>{name}</h2>
                <div>
                  <div className={styles.universityPage__main_info}>
                    <ul>
                      <li>
                        <b>Сайт:</b>{" "}
                        <a href={`https://${site}`} target="_blank">
                          {site}
                        </a>
                      </li>
                      <li>
                        <b>Адреса:</b> {address}
                      </li>
                      <li>
                        <b>Приймальна комісія:</b>
                      </li>
                      <li>
                        <b>Телефон:</b>{" "}
                        <a href={`tel:${phoneNumber}`} target="_blank">
                          {phoneNumber}
                        </a>
                      </li>
                      <li>
                        <b>Ел. пошта:</b>{" "}
                        <a href={`mailto:${email}`} target="_blank">
                          {email}
                        </a>
                      </li>
                    </ul>

                    <CampaingCard start={startOfCampaign} end={endOfCampaign} />
                  </div>
                </div>
                <p className={styles.universityPage__description}>
                  <b>Опис:</b> {description}
                </p>
                <h3 className={styles.universityPage__subtitle}>Напрями:</h3>
                <ul>
                  {specialtiesOfUniversity.map((item) => (
                    <AccordionItem key={item.id} {...item} />
                  ))}
                </ul>
              </div>
            </>
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversityPage;
