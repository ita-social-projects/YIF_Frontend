import React from "react";
import Header  from '../../components/header/index';
import RegistrationForm from "../../components/registrationForm/registrationForm";


const RegistrationPage: React.FC = () => {
  return (
      <>
        <Header/>
        <RegistrationForm/>
      </>
  )
}

export default RegistrationPage;