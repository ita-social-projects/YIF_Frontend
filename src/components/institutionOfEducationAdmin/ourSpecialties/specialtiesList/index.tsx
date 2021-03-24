import React from 'react';

const OurSpecialtiesList = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <h1>OUR SPECIALTIES</h1>
      <button onClick={props.onChangeBlock}>Add Specialties</button>
    </div>
  );
};

export default OurSpecialtiesList;
