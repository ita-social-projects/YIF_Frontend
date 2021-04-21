import React from 'react';
import NewPasswordForm from '../../components/newPasswordForm';
import { Header } from '../../components';
import styles from '../newPasswordPage/newPasswordPage.module.scss';

function NewPasswordPage() {
  return (
    <>
      <Header />
      <NewPasswordForm />
    </>
  );
}

export default NewPasswordPage;
