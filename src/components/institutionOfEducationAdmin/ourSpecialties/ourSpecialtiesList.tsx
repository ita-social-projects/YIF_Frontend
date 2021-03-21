import React from 'react';

const OurSpecialtiesList = (props: any) => {
  return (
    <>
      <h1>OUR SPECIALTIES</h1>
      <button onClick={props.onChangeBlock}>Add Specialties</button>
    </>
  );
};

export default OurSpecialtiesList;
