import React from 'react';
import { Redirect } from "react-router-dom";
type Props={
    data?:object; 
}

class FilterPage extends React.Component<Props,{}>{
    render(){
        return(
            <div>
                Succsesfully done POST
            </div>
            
        )
    }

}
export default FilterPage;

