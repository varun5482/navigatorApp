import React,{ useEffect } from 'react'
import {connect} from 'react-redux';
import NavigationPane from './NavigationPane';
import Dashboard from './Dashboard'
import {setStateList} from '../actions/actions';

const ParentComponent = (props) => {

    useEffect(()=>{
        //Fetching and setting the data in REDUX from the API
        props.setStateList();
    },[]);

    return (
        <div style={{overflowX:'hidden'}}>
            <NavigationPane />   
            <Dashboard />
        </div>
    )
}

const mapStateToProps = (state,props) => {
    return {
        states: state.stateList,
        ...props
    }
}


export default connect(mapStateToProps,{
    setStateList
})(ParentComponent)
