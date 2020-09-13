import React from 'react';
import {setSelectedMenu} from '../actions/actions';
import './navigation-pane.css';
import {connect} from 'react-redux';

const NavigationPane= (props) =>  {
    let menuItem = [
        'ALL',
        'SHORT LISTED'
    ]
    
    const selectMenu = (menuItem)=>{
        props.setSelectedMenu({
            menuItem
        })
    }

    //Mapping the HTML for the NAVIGATION PANE ON THE LEFT
    let menuDisplay = menuItem.map(menu => {
        let menuClass = 'menu-item';
        if(menu == props.selectedMenuItem){
            menuClass += ' selected-menu'; 
        }
        return (
            <div className = {menuClass} onClick={()=>{selectMenu(menu)}}>
                {menu}
            </div>
        )
    })

    return (
        <div className='navigation-panel'>
            <div className="title-nav">STATE SELECTOR INFO</div>
            {menuDisplay}
            <div className='water-mark'>Created By Varun Mukherjee</div>
        </div>
    )
}

const mapStateToProps = (state,props) => {
    return {
        selectedMenuItem: state.selectedMenuItem,
        ...props
    }
}

export default connect(mapStateToProps,{
    setSelectedMenu
})(NavigationPane)
