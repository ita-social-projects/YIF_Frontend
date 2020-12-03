import React,{Fragment} from 'react'
import styles from './dropbox.module.scss';

type Props ={
    university:string[],
    direction:string[],
    speciality:string[],
    a?:number,
    filter1?:()=> void,
    resetFilter?:()=>void,
}

class Dropbox extends React.Component<Props,{}>{
      
       state={
          university:this.props.university,
          direction:this.props.direction,
          speciality:this.props.speciality,
          number:this.props.a,
       }

      render(){
        const {filter1} = this.props;

          return(
            <Fragment>
             <div className={styles.dropbox}>
             <div>
                  <h2>University filter</h2>
             </div>           
            <form  action='#' method='POST'>
            <select name='universities' onClick={filter1} defaultValue={0} >
                <option>Choose university</option>
                <optgroup label="U_G_1">
                    <option value={this.state.university[0]}>{this.state.university[0]}</option>
                    <option value={this.state.university[1]}>{this.state.university[1]}</option>
                </optgroup>
                <optgroup label="U_G_2">
                    <option value={this.state.university[2]}>{this.state.university[2]}</option>
                    <option value={this.state.university[3]}>{this.state.university[3]}</option>
                </optgroup>
            </select>
            
            <select name='direction' defaultValue={0}>
                <option >Choose direction</option>
                <option value={this.state.direction[0]}>{this.state.direction[0]}</option>
                <option value={this.state.direction[1]}>{this.state.direction[1]}</option>
                <option value={this.state.direction[2]}>{this.state.direction[2]}</option>
                <option value={this.state.direction[3]}>{this.state.direction[3]}</option>
            </select>
     
            <select name='speciality' defaultValue={0}>
                <option >Choose speciality</option>
                <option value={this.state.speciality[0]}>{this.state.speciality[0]}</option>
                <option value={this.state.speciality[1]}>{this.state.speciality[1]}</option>
                <option value={this.state.speciality[2]}>{this.state.speciality[2]}</option>
                <option value={this.state.speciality[3]}>{this.state.speciality[3]}</option>
            </select>
            <button type={"submit"}>
                    Submit
            </button>
            </form>
             </div>         
            </Fragment>
          )
      }
}

export default Dropbox;
