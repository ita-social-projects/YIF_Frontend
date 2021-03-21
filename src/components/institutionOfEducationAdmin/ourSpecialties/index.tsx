import React, { useState } from 'react';
import AddSpecialties from './addSpecialties/index';
import OurSpecialtiesList from './ourSpecialtiesList';

const OurSpecialties = () => {
  const [block, setBlock] = useState(0);

  const onChangeBlock = (num: number) => {
    setBlock(num);
  };

  return (
    <>
      {block === 0 ? (
        <OurSpecialtiesList onChangeBlock={onChangeBlock(1)} />
      ) : (
        <AddSpecialties onChangeBlock={onChangeBlock(0)} />
      )}
    </>
  );
};

export default OurSpecialties;
