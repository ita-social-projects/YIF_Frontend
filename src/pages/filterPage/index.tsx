import React,{useState,useEffect} from 'react';
import { useLocation,useParams, Link } from "react-router-dom";

interface State {
  detail: any;
}

const FilterPage:React.FC<State>=()=>{

  const location:any = useLocation();
  
  if(location.state.statusCode===200){
    var UnivCard = location.state.data.responseList.map((item:any)=>{
      return(
        <div>
         <hr></hr> 
        <p>Ім'я</p>
        {item.name}
        <p>Адреса</p>
        {item.address}
        <p>Абревіатура</p>
        {item.abbreviation}
        <p>Телефон</p>
        {item.phone}
        <p>Опис</p>
        {item.description}
        <hr></hr>
        </div>
      )
    });
  }

  return(
    <div>
      <Link to='/'>Повернутися на головну</Link>
      <h1>Результати пошуку</h1>
        {location.state.statusCode===200? UnivCard: location.state.data.message}
    </div>
  )
}
export default FilterPage;
