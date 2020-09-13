import React,{useState} from 'react';
import './dashboard.css';
import {connect} from 'react-redux';
import { updateStateList } from '../actions/actions';

const AddCity = (props) => {
    const [newData,updateNewData] = useState({
        City: '',
        State: props.stateOptions[0],
        District: props.districtOptions[0],
    })

    //Updating the values of the Form
    const updateValue = (e,key) => {
        let dummyData = {...newData};
        dummyData[key] = e.target.value;
        updateNewData(dummyData);
    }

    //Saving the details of the state,district,city where city is mandatory
    const addDetails = () => {
        let dummyData = [...props.stateList];
        if(newData.City){
            dummyData.push(newData);
            props.updateStateList(dummyData);
            props.closeCB && props.closeCB();
        }else{
            alert("Please Enter City");
        }
    }

    return (
        <div>
            <div className='overlay' onClick={() => {props.closeCB()}}></div>
            <div class='add-city'>
                <div className="add-title">ADD NEW INFORMATION (City,State,District)</div>
                <div className='close-icon' onClick={props.closeCB}>X</div>
                <div className="input-text">
                    <div className="tab-title">State :</div>
                    <div className="input-field">
                        <select type='text' value={newData.State} onChange={(e)=>{updateValue(e,'State')}}>
                            {props.stateOptions.map(state => {
                                return (<option name={state}>{state}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-text">
                    <div className="tab-title">District :</div>
                    <div className="input-field">
                        <select type='text' value={newData.District} onChange={(e)=>{updateValue(e,'District')}}>
                            {props.districtOptions.map(district => {
                                return (<option name={district}>{district}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-text">
                    <div className='tab-title'>City :</div>
                    <div className='input-field'><input type='text' value={newData.City} onChange={(e)=>{updateValue(e,'City')}}/></div>
                </div >
                <div onClick={() => {addDetails()}} className="button add-info">SAVE</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state,props) => {
    return {
        stateList: state.stateList,
        stateOptions: state.stateOptions,
        districtOptions: state.districtOptions,
        ...props
    }
}

export default connect(mapStateToProps,{
    updateStateList
})(AddCity)
