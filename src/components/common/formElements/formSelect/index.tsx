import React, { FC, useEffect, useState } from 'react';
import classes from './formSelect.module.scss';
import {FieldProps} from "formik";
import useCustomSelect from "./useCustomSelect";
import { APIUrl } from '../../../../services/endpoints'

interface CustomInputProps {
  label: string;
  name: string;
  options: string;
}

const FormSelect: FC<CustomInputProps & FieldProps> = (props) => {
  const { label, field, name, options, ...rest} = props;
  const {
    getSchoolList,
    container,
    toggling,
    onOptionClicked,
    isOpen,
    selectedOption
  } = useCustomSelect();

  const [isLoaded, setIsLoaded] = useState(false);
  const [listSchool, setListSchool] = useState([]);
  const [ value, setValue ] = useState('')
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  //let url = `${APIUrl}/School/GetAllSchoolNamesAsStringsAsync`;
  let url: string = `http://localhost:5000/api/School/GetAllSchoolNamesAsStringsAsync`;

  useEffect ( () => {

    getSchoolList( url  )
        .then(data => {
          setIsLoaded(true);
            setListSchool(data);
        })
        .catch(error => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
        });
        console.log("Error Reading data " + error);
      });

 },[]);

  let defaultOption = listSchool[0];

  const iconSchool = (
      <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.22108 18.7867H2.58313V22.4854H7.22108V18.7867ZM3.46375 19.6674H4.4618V21.6047H3.46375V19.6674ZM6.34046 21.6047H5.34242V19.6674H6.34046V21.6047Z" fill="#AFBECF"/>
        <path d="M2.58313 27.182H7.22108V23.4834H2.58313V27.182ZM6.34046 26.3014H5.34242V24.364H6.34046V26.3014ZM3.46375 24.364H4.4618V26.3014H3.46375V24.364Z" fill="#AFBECF"/>
        <path d="M27.4168 18.7867H22.7789V22.4854H27.4168V18.7867ZM23.6595 19.6674H24.6575V21.6047H23.6595V19.6674ZM26.5362 21.6047H25.5382V19.6674H26.5362V21.6047Z" fill="#AFBECF"/>
        <path d="M22.7789 27.182H27.4168V23.4834H22.7789V27.182ZM26.5362 26.3014H25.5382V24.364H26.5362V26.3014ZM23.6595 24.364H24.6575V26.3014H23.6595V24.364Z" fill="#AFBECF"/>
        <path d="M22.045 16.9081V17.7887H29.1194V28.18H21.0763V21.1057H20.1957V28.18H18.2583V24.364H19.1977V21.6047H10.8023V24.364H11.7417V28.18H0.880626V22.5147H0V29.0607H30V16.9081H22.045ZM17.3777 28.18H15.4403V24.364H17.3777V28.18ZM11.683 22.4854H18.317V23.4834H11.683V22.4854ZM12.6223 24.364H14.5597V28.18H12.6223V24.364Z" fill="#AFBECF"/>
        <path d="M0.880626 17.7887H8.92368V27.2114H9.80431V14.2431L15 9.04734L20.1957 14.2431V20.1664H21.0763V15.1237L22.045 16.0924L24.0767 14.0607L15.4403 5.42432V3.69864H19.1977V0H14.5597V5.42432L5.92333 14.0607L7.95499 16.0924L8.92368 15.1237V16.9081H0V21.5754H0.880626V17.7887ZM15.4403 0.880629H18.317V2.81801H15.4403V0.880629ZM7.16865 14.0607L15 6.22933L22.8314 14.0607L22.045 14.847L15 7.80202L7.95499 14.847L7.16865 14.0607Z" fill="#AFBECF"/>
        <path d="M12.6517 18.7867H13.591V19.6674H12.6517V18.7867Z" fill="#AFBECF"/>
        <path d="M14.5303 18.7867H15.4697V19.6674H14.5303V18.7867Z" fill="#AFBECF"/>
        <path d="M16.409 18.7867H17.3483V19.6674H16.409V18.7867Z" fill="#AFBECF"/>
        <path d="M17.319 14.5304C17.319 13.2517 16.2787 12.2114 15 12.2114C13.7213 12.2114 12.681 13.2517 12.681 14.5304C12.681 15.809 13.7213 16.8493 15 16.8493C16.2787 16.8493 17.319 15.809 17.319 14.5304ZM15 15.9687C14.2069 15.9687 13.5617 15.3234 13.5617 14.5304C13.5617 13.7373 14.2069 13.092 15 13.092C15.7931 13.092 16.4384 13.7373 16.4384 14.5304C16.4384 15.3234 15.7931 15.9687 15 15.9687Z" fill="#AFBECF"/>
      </svg>
  );

  return (
      <>
        <div className={classes.mainWrapper} ref={ container }>
          <div className={classes.label}>Школа</div>
          <div className={classes.wrapper}>
            <div className={classes.selected} onClick={toggling}>
              <div className={classes.icon}>{iconSchool}</div>
              {selectedOption || defaultOption}
            </div>
            {isOpen && (
                <div className={classes.wrapperItem}>
                  <ul className={classes.itemList}>
                    {
                      listSchool.map((option, index) => {
                        return (
                            <li onClick={
                            onOptionClicked(option)}
                                key={index}
                                data-name={option}
                                {...rest} {...props}
                                className={classes.item}>
                              {option}
                            </li>
                        )
                      })
                    }
                  </ul>
                </div>
            )}
          </div>
        </div>
      </>
  )
}

export default FormSelect;
