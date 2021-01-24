import React, { useEffect } from "react";
import styles from "./dropbox.module.scss";
import { ReactComponent as Arrow } from "./arrow.svg";
import { useDispatch,useSelector} from 'react-redux';
import { chooseDirection, chooseSpeciality, chooseUniversity } from "../../../store/reducers/dropboxReducer";
import { selectData,selectChosenData } from '../../../store/reducers/dropboxReducer';
import { isConstructSignatureDeclaration } from "typescript";

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
   const state = useSelector(selectData);

    // dynamic uploading data to our dropbox from props
  const addElementsNew = (element: Element, data: string[]) => {
    for (let i: number = 0; i < data.length; i++) {
      let li: Element = document.createElement("li");
      li.innerHTML = data[i];
      element.appendChild(li);
    }
  };

  const ElementsUpdate = (element: Element, data: string[]) => {
    for (let i: number = 0; i < data.length; i++) {
      const li = element.querySelectorAll("li");
      const liLength: number = li.length;
      //console.log(li.length);
      if (li.length - 1 === data.length) {
        li[i + 1].innerHTML = data[i];
      }else
      if (li.length - 1 < data.length) {
        let liNew: Element = document.createElement("li");
        element.appendChild(liNew);
        li[i + 1].innerHTML = data[i];
      }else
      if (li.length - 1 > data.length) {
        let difference = li.length - 1 - data.length;
        for (let j: number = 0; j < difference; j++) {
          element.removeChild(li[liLength - 1 - j]);
          li[i + 1].innerHTML = data[i];
        }
      }
    }
  };

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
      li[i].addEventListener("click", () => {        
        input[keyId].value = li[i].innerHTML;
        //which action we must call
        switch(action){
            case 'chooseUniversity':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseUniversity(''))
                }
                else{
                    dispatch(chooseUniversity(input[keyId].value))
                }
            }
            break;
            case 'chooseSpeciality':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseSpeciality(''))
                }
                else{
                    dispatch(chooseSpeciality(input[keyId].value))
                }
            }
            break;
            case 'chooseDirection':{
                if(input[keyId].value===listTitle){
                    dispatch(chooseDirection(''))
                }
                else{
                    dispatch(chooseDirection(input[keyId].value))
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

    //show dropbox that we need
    listBox[keyId].classList.toggle(styles.show_list_box);
    input[keyId].classList.toggle(styles.gray_color_text);
    arrow[keyId].classList.toggle(styles.arrow_up);
  };
    
    useEffect(()=>{
        const ul = document.querySelectorAll(`.${styles.combolist_li}`);
        addElementsNew(ul[keyId],data);
        ElementsUpdate(ul[keyId],data);     //didMount
        select(reduxMethod);              //didMount   
    })


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
                onClick={showHideList}
                onChange={()=>{console.log('onChange')}}
              ></input>
              <div className={styles.arrow} onClick={showHideList}>
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

