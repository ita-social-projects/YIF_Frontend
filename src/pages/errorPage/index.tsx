import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import errorStyle from './errorPage.module.scss';

class ErrorIndicator extends Component<any> {
  render() {
    return (
      <>
        <Header />
        <div className={errorStyle.error}>
          <h1>
            Трясця,
            <br /> сторінку
            <br /> не виявлено...
          </h1>
          <p>
            Посилання, за яким ви перейшли, могло бути
            <br /> хибним або сторінку видалено.
          </p>
          <Link className={errorStyle.btn} to='/'>
            &gt; &nbsp; Повернутися на головну.
          </Link>
        </div>
      </>
    );
  }
}

export default ErrorIndicator;
