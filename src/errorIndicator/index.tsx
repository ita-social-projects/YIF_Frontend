import React, { Component } from 'react';

import errorStyle from './errorIndicator.module.scss';

class ErrorIndicator extends Component<any> {
  render() {
    return (
      <div className={errorStyle.error}>
        <h1>
          Трясця,
          <br /> сторінку
          <br /> не вичвлено
        </h1>
        <p>
          Посилання, за яким ви перейшли, могло бути
          <br /> хибним або сторінку видалено.
        </p>
        <a href='/'>&gt; &nbsp; Повернутися на головну.</a>
      </div>
    );
  }
}

export default ErrorIndicator;
