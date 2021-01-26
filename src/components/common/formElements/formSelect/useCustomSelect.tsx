import React, {useEffect, useState} from "react";
import useProfile from "../../../../services/useProfile";
import {APIUrl} from "../../../../services/endpoints";

const useCustomSelect = () => {

const useClickOutside = (initialIsVisible: boolean) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const container = React.createRef<HTMLDivElement>();

  const handleClickOutside = (event: Event) => {
    if (container.current && !container.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { container, isComponentVisible, setIsComponentVisible };
}
  //const url = `http://localhost:5000/api/Users/SetCurrentProfile`;
  const url = `${APIUrl}Users/SetCurrentProfile`;
  const { handleSchoolChange } = useProfile(url);

const [isOpen, setIsOpen] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
let { container, isComponentVisible } = useClickOutside(true);
const [value, setValue] = useState(null);


const toggling = () => {
  setIsOpen(!isOpen);
}

const onOptionClicked = (value: any) => () => {
  console.log(value)
  setSelectedOption(value);
  setValue(value);
  handleSchoolChange(value);
  setIsOpen(false);
};

  const getSchoolList = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok){
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

return {
  onOptionClicked,
  toggling,
  useClickOutside,
  getSchoolList,
  container,
  selectedOption,
  isOpen,
  value,
}

}

export default useCustomSelect;