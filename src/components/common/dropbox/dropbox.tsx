import React, { useEffect } from "react";
import styles from "./dropbox.module.scss";
import { ReactComponent as Arrow } from "./arrow.svg";
import { useDispatch } from 'react-redux';
import { chooseDirection, chooseSpeciality, chooseUniversity,setSpeciality,setDirection,setUniversity } from "../../../store/reducers/dropboxReducer";
import { requestData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';

type Props = {
  data: string[]; // data from Props witch needed to upload in dropbox
  keyId: number; // unique keyId witch indentify for what dropbox we will upload data
  listName: string; // needed for naming our input
  listTitle: string; // optional - needed for naming 'reset - state' filed
  width?: number; // optional - for setting custom width of our dropbox
  inputWidth?: number; // optional - for setting custom width of our input
  reduxMethod:string; //
  placeholder:string; 
};

const DropboxElement:React.FC<Props>=({data,keyId,listName,listTitle,width,inputWidth,reduxMethod,placeholder})=>{  
   const dispatch = useDispatch();

  const ElementsUpdate = (element: Element, data: string[],listTitle:string) => {
    const li = element.querySelectorAll("li");
    
    // removing all previous elements li
    for(let index:number = 0; index<li.length;index++){
      element.removeChild(li[index]);
    }
    //adding first value for reseting filter
    let liFirst: Element = document.createElement("li");
    liFirst.innerHTML = listTitle;
    element.appendChild(liFirst);
     
    //adding all others li accoding to the data length
     for (let i: number = 0; i < data.length; i++) {
      let liCreate: Element = document.createElement("li");
      liCreate.innerHTML = data[i];
      element.appendChild(liCreate);
    }
      
  };

  const requestNewData=(endpoint:string,action:string,numberOfDropbox:number,resetInputValue?:boolean)=>{
    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    requestData(endpoint,'GET')
                .then((res:any)=>{
                  let names:string[]=res.data;
                  if(res.statusCode===200){
                    switch(action){
                      case 'setUniversity': dispatch(setUniversity(names));
                      break;
                      case 'setSpeciality': dispatch(setSpeciality(names));
                      break;
                      case 'setDirection': dispatch(setDirection(names));
                      break;
                  }
                  if(resetInputValue){  
                    input[numberOfDropbox].value = '';
                  }
                  }
                  if(res.statusCode===404){
                      // 0 - direction input
                      // 1 - speciality input
                      // 2 - university input
                      input[numberOfDropbox].value = res.data.message;
                      let names:string[]=[res.data.message,];
                      switch(action){
                        case 'setUniversity': dispatch(setUniversity(names));
                        break;
                        case 'setSpeciality': dispatch(setSpeciality(names));
                        break;
                        case 'setDirection':  dispatch(setDirection(names));
                        break;
                    }
                  }
                })
                .catch((err:any)=>{
                  console.log(err);
                })
  }

  // function that will call if we click on option in dropbox
  const select = (action:string) => {
    
    const list = document.querySelectorAll(`.${styles.combolist_li}`);
    const listBox = document.querySelectorAll(`.${styles.list_box}`);
    const arrow = document.querySelectorAll(`.${styles.arrow}`);
    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    const li = list[keyId].querySelectorAll(
      `.${styles.combolist_li} li`
    );

    for (let i: number = 0; i < li.length; i++) {
      li[i].addEventListener("click",() => {
        console.log('added');        
        input[keyId].value = li[i].innerHTML;
        //which action we must call
        switch(action){
            case 'chooseUniversity':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseUniversity(''));
                    requestNewData(`${APIUrl}University/Abbreviations`,'setUniversity',2,true);
                    /*
                    requestNewData(`${APIUrl}Specialty/Names`,'setSpeciality',1,true);
                    requestNewData(`${APIUrl}Direction/Names`,'setDirection',0,true);
                    */
                }
                else{
                    dispatch(chooseUniversity(input[keyId].value))
                    // 0 - direction
                    // 1 - speciality
                    // 2 - university
                    requestNewData(`${APIUrl}Specialty/Names?UniversityAbbreviation=${input[keyId].value}`,'setSpeciality',1);
                    requestNewData(`${APIUrl}Direction/Names?UniversityAbbreviation=${input[keyId].value}`,'setDirection',0);
                }
                
            }
            break;
            case 'chooseSpeciality':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseSpeciality(''));
                    requestNewData(`${APIUrl}Specialty/Names`,'setSpeciality',1,true);
                    /*
                    requestNewData(`${APIUrl}University/Abbreviations`,'setUniversity',2,true);
                    requestNewData(`${APIUrl}Direction/Names`,'setDirection',0,true);
                    */
                }
                else{
                    dispatch(chooseSpeciality(input[keyId].value))
                    // 0 - direction
                    // 1 - speciality
                    // 2 - university
                    requestNewData(`${APIUrl}University/Abbreviations?SpecialityName=${input[keyId].value}`,'setUniversity',2);
                    requestNewData(`${APIUrl}Direction/Names?SpecialityName=${input[keyId].value}`,'setDirection',0);
                }
                
            }
            break;
            case 'chooseDirection':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseDirection(''));
                    requestNewData(`${APIUrl}Direction/Names`,'setDirection',0,true);
                    /*
                    requestNewData(`${APIUrl}University/Abbreviations`,'setUniversity',2,true);
                    requestNewData(`${APIUrl}Specialty/Names`,'setSpeciality',1,true);
                    */
                }
                else{
                    dispatch(chooseDirection(input[keyId].value))
                    // 0 - direction
                    // 1 - speciality
                    // 2 - university
                    requestNewData(`${APIUrl}University/Abbreviations?DirectionName=${input[keyId].value}`,'setUniversity',2);
                    requestNewData(`${APIUrl}Speciality/Names?DirectionName=${input[keyId].value}`,'setSpeciality',1);
                }
            }
            break;
        }
        listBox[keyId].classList.remove(styles.show_list_box);
        input[keyId].classList.remove(styles.gray_color_text);
        arrow[keyId].classList.remove(styles.arrow_up);
      });
    }

  };

  // function that will make our option list hide/visible
  /*
  const showHideList = () => {
    const combolistLi = document.querySelectorAll(`.${styles.combolist_li}`);
    const listBox = document.querySelectorAll(`.${styles.list_box}`);
    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    const arrow = document.querySelectorAll(`.${styles.arrow}`);

    //hide all(before) dropboxes
    for (let c: number = 0; c < keyId; c++) {
      listBox[c].classList.remove(styles.show_list_box);
      input[c].classList.remove(styles.gray_color_text);
      arrow[c].classList.remove(styles.arrow_up);
    }

    //hide all(after) dropboxes
    for (let c: number = keyId + 1; c < combolistLi.length; c++) {
      listBox[c].classList.remove(styles.show_list_box);
      input[c].classList.remove(styles.gray_color_text);
      arrow[c].classList.remove(styles.arrow_up);
    }
    
    //set dynamic heigth for opened dropbox
    const liCount = listBox[keyId].querySelectorAll("li");
    if(liCount.length<=3){
      document.body.style.setProperty('--heigth', `${3.40*liCount.length}rem`);
    }else
    if(liCount.length>3){
      document.body.style.setProperty('--heigth', `${13.13}rem`);
    }
    
    //show dropbox that we need
    listBox[keyId].classList.toggle(styles.show_list_box);
    input[keyId].classList.toggle(styles.gray_color_text);
    arrow[keyId].classList.toggle(styles.arrow_up);
 
  };
*/
  const showListBox =()=>{
    //const combolistLi = document.querySelectorAll(`.${styles.combolist_li}`);
    const listBox = document.querySelectorAll(`.${styles.list_box}`);
    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    const arrow = document.querySelectorAll(`.${styles.arrow}`);

      //set dynamic heigth for opened dropbox
      const liCount = listBox[keyId].querySelectorAll("li");
      if(liCount.length<=3){
        document.body.style.setProperty('--heigth', `${3.40*liCount.length}rem`);
      }else
      if(liCount.length>3){
        document.body.style.setProperty('--heigth', `${13.13}rem`);
      }

      //show dropbox that we need
      listBox[keyId].classList.add(styles.show_list_box);
      input[keyId].classList.add(styles.gray_color_text);
      arrow[keyId].classList.add(styles.arrow_up);
    
  }

  const hideListBox =()=>{
    const combolistLi = document.querySelectorAll(`.${styles.combolist_li}`);
    const listBox = document.querySelectorAll(`.${styles.list_box}`);
    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    const arrow = document.querySelectorAll(`.${styles.arrow}`);
    
    //hide all(after) dropboxes
    for (let c: number = keyId; c < combolistLi.length; c++) {
      listBox[c].classList.remove(styles.show_list_box);
      input[c].classList.remove(styles.gray_color_text);
      arrow[c].classList.remove(styles.arrow_up);
    }
  }
  
  
  const clickMechanich = (event: any) => {

    const input = document.querySelectorAll<HTMLInputElement>(
      `.${styles.dropbox_title} input`
    );
    const arrow = document.querySelectorAll(`.${styles.arrow}`);
    //const filed = document.querySelectorAll<HTMLDivElement>(`.${styles.dropbox_title}`);

    let insideInput = input[keyId].contains(event.target);
    //let insideArrow = arrow[keyId].contains(event.target);
    //let insideFiled = filed[keyId].contains(event.target);
    
    if((insideInput)) {
      showListBox();
    }else
    if ((!insideInput)) {
      hideListBox();
    } 
  };

    useEffect(()=>{
        const ul = document.querySelectorAll(`.${styles.combolist_li}`);
        ElementsUpdate(ul[keyId],data,listTitle);
        select(reduxMethod); 
    },) 
    
    useEffect(() => {
      document.addEventListener('click', clickMechanich, true);
      return () => {
      document.removeEventListener('click', clickMechanich, true);
    };
      
    }, []);
    

    
    return(
        <div className={styles.box}>
        <ul className={styles.dropboxMenu} style={{ width: `${width}rem` }}>
          <li className={styles.input_li}>
            <div className={styles.dropbox_title}>
              <input
                type='text'
                name={listName}
                style={{ width: `${inputWidth}rem` }}
                placeholder={`Обери ${placeholder}`}
                readOnly
                //onClick={showHideList}
              ></input>
              <div className={styles.arrow} /*onClick={showHideList}*/ >
                <Arrow />
              </div>
            </div>
            <div className={styles.list_box}>
              <ul className={styles.combolist_li}>
                <li>{listTitle}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    )
}

export default DropboxElement;

