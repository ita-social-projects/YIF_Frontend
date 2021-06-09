import React, { Component } from 'react';
import Header from '../../components/header';
import errorStyle from './errorPage.module.scss';

class ErrorIndicator extends Component<any> {
  render() {
    return (
      <>
        <Header />
        <section className={errorStyle.error}>
          <h2>
            Трясця,
            <br /> сторінку
            <br /> не виявлено...
          </h2>
          <p>
            Посилання, за яким ви перейшли, могло бути
            <br /> хибним або сторінку видалено.
          </p>
          <a className={errorStyle.btn} href='/'>
            &gt; &nbsp; Повернутися на головну.
          </a>
        </section>
      </>
    );
  }
}

export default ErrorIndicator;
