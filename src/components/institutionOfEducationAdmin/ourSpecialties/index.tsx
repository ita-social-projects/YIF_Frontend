import React, { useState } from 'react';
import AddSpecialties from './addSpecialties/index';
import OurSpecialtiesList from './specialtiesList/index';

const OurSpecialties = () => {
  const [block, setBlock] = useState('add');

  const onChangeBlock = (num: string) => {
    setBlock(num);
  };

  return (
    <>
      {block === 'list' ? (
        <OurSpecialtiesList onChangeBlock={() => onChangeBlock('add')} />
      ) : block === 'add' ? (
        <AddSpecialties onChangeBlock={() => onChangeBlock('list')} />
      ) : null}
    </>
  );
};

export default OurSpecialties;
