import React,{useEffect,useState} from 'react';
import AddCity from './AddCity';
import {updateShortListItems,updateStateList} from '../actions/actions';
import {connect} from 'react-redux';
import './dashboard.css';

const AllListing = (props) => {
    let listData = props.selectedMenuItem == 'ALL' ? props.stateList : props.shortlistedList;
    let isShortListed = props.selectedMenuItem == 'ALL' ? false : true;
    const [isAdd,updateAddStatus] = useState(false);
    const [searchText,updateSearchText] = useState('');
    
    //Filtering the data as per the search Text since the text is a state variable the re render runs again.
    if(searchText && listData.length > 0){
        let dummyList = [];
        listData.map(data => {
            if(data.City.includes(searchText) || data.State.includes(searchText) || data.District.includes(searchText))
                dummyList.push(data);
        });
        listData = dummyList;
    }
    
    const checkShortList = (data) => {
        let isPresent = false;
        props.shortlistedList.length > 0 && props.shortlistedList.map((item) => {
            if(item.City == data.City){
                isPresent = true;
            }
        })
        return isPresent;
    }

    const shortListOperation = (options ={}) =>{
        let {action = 'add', data ={}, index } = options;
        let dummyShortListData = [...props.shortlistedList];
        let msg = action == 'add' ? 'ShortListed':'Removed from ShortListing'
        if(action == 'add'){
            dummyShortListData.push(data);
        }else{
            dummyShortListData.splice(index,1);
        }
        props.updateShortListItems(dummyShortListData);
        alert(msg);
    }

    const removeStateData = (options = {}) =>{
        let {index} = options;
        let dummyStateData = [...props.stateList];
        dummyStateData.splice(index,1);
        props.updateStateList(dummyStateData);
        alert('City Deleted');
    }

    const searchList = (e) => {
        let text  = e.target.value;
        updateSearchText(text);
    }

    //For table cells the data is rendered and for shortlist and all table cells
    const getAllTableData = () =>{
        if(listData.length > 0){
            let dummyDetail =  listData.map((data,index) => {
                return (
                    <div className='table-data'>
                        <div className="table-cell">{data.State}</div>
                        <div className="table-cell">{data.District}</div>
                        <div className="table-cell">{data.City}</div>
                        <div className="table-cell">
                            {!isShortListed && <>
                                {!checkShortList(data) && <div className="button" onClick={()=>{shortListOperation({action:'add',data})}}>ShortList</div>}
                                <div className="button delete" onClick={() => {removeStateData({index})}}>Delete</div>
                            </>}
                            {isShortListed && <>
                                <div className="button" onClick={() => {shortListOperation({action:'remove',index})}}>Remove</div>
                            </>}
                        </div>
                    </div>            
                )
            })
            return dummyDetail;   
        }
    }

    let detailsHtml = getAllTableData(listData);

    return (
        <div>
            <div className='table-container'>
                {!isShortListed && listData.length > 0 && <div className='button add-city-btn' onClick = {() => {updateAddStatus(true)}}>+ Add City</div>}
                {(listData.length > 0 || searchText )  && <div className="search-input">
                    <input type='text' placeholder="Search List by City, State, District" value={searchText} onChange={(e) => {searchList(e)}} />
                </div>}
                {listData.length > 0 && <div className='table-title'>
                    <div className="table-cell">STATE</div>
                    <div className="table-cell">DISTRICT</div>
                    <div className="table-cell">CITY</div>
                    <div className="table-cell">ACTION</div>
                </div>} 
                <div className='table-data-container'>
                    {detailsHtml}
                </div>   
                {listData.length == 0 && <div style={{textAlign:'left',marginLeft:'34%'}}>
                    {isShortListed ? <div className="no-results">Nothing ShortListed</div>:searchText ? <div className="no-result">No Search Match Foud...</div>:<div className="no-results">Data Loading...</div>}    
                </div>}
                {isAdd && <AddCity closeCB={()=>{updateAddStatus(false)}}/>}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state,props) => {
    return {
        stateList: state.stateList,
        shortlistedList: state.shortListedList,
        selectedMenuItem: state.selectedMenuItem,
        ...props
    }
}

export default connect(mapStateToProps,{
    updateShortListItems,
    updateStateList
})(AllListing)
