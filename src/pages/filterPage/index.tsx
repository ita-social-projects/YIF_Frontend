import React from 'react';
import { Redirect } from "react-router-dom";
type Props={
    data?:object; 
}

class filterPage extends React.Component<Props,{}>{
    
    async fetchFilterData() {
      await fetch('http://YIFbackendserver',{
                method: 'POST',
                body: JSON.stringify('data'),
                headers:{
                    'UniversityFilter': 'aplication/json'
                },
                })
                .then((res) => {
                    return res.json();    
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((err)=>{
                    console.log(err);
                    return <Redirect to="/404" /> 
                })
    }

    componentDidMount(){
        this.fetchFilterData();
    }

    render(){
        return(
            <div>
                Succsesfully done POST
            </div>
            
        )
    }


}
export default filterPage;
