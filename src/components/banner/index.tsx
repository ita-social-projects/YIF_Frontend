import React from 'react';
import styles from './banner.module.scss';

const Banner: React.FC = () => {
  const arrow = (
    <svg
      width='55'
      height='41'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0)'>
        <path
          d='M14.9999 23.5501C14.4623 23.5501 13.9247 23.3448 13.5147 22.9351L0.615424 10.0356C-0.205141 9.21503 -0.205141 7.88463 0.615424 7.06439C1.43566 6.24416 2.7658 6.24416 3.58643 7.06439L14.9999 18.4785L26.4135 7.06479C27.234 6.24456 28.564 6.24456 29.3842 7.06479C30.2052 7.88503 30.2052 9.21543 29.3842 10.036L16.4851 22.9355C16.075 23.3452 15.5374 23.5501 14.9999 23.5501Z'
          fill='white'
        />
      </g>
    </svg>
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const elem = document.querySelector(`.${styles.image}`) as HTMLImageElement;
    const x = -event.clientX * 0.02;
    const y = -event.clientY * 0.02;

    elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
  };

  const handleClick = () => {
    const elem = document.getElementById('filter') as HTMLDivElement;

    elem.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.banner} onMouseMove={handleMouseMove}>
      <div className={styles.content}>
        <img
          src='/assets/images/banner.svg'
          alt='img'
          className={styles.image}
        />
        <div className={styles.textContent}>
          <h1>Your IT Future</h1>
          <p>
            Символіка риби містить багато різноманітних, іноді полярно
            протилежних значень. Існують легенди (записи яких збереглися в
            античних храмах), згідно з якими людська раса походить від cтворінь,
            які нагадують амфібій. Їхні тіла були вкриті лускою й дихали вони
            через зябра.
          </p>
          <button className={styles.button} onClick={handleClick}>
            Почни вже
            {arrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
