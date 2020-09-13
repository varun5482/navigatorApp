const initialState = {
    stateList : [],
    stateOptions: [],
    districtOptions: [],
    selectedMenuItem: 'ALL',
    shortListedList: []
}

const rootReducer = (state = initialState, action) => {
    let dummyState = {...state};
    switch(action.type){
        case 'SET_STATE_LIST':
            dummyState.stateList = action.payload.data;
            dummyState.stateOptions = action.payload.stateOptions;
            dummyState.districtOptions = action.payload.districtOptions;
            return dummyState;
        case 'SET_MENU_ITEM':
            dummyState.selectedMenuItem = action.payload.menuItem;
            return dummyState;
        case 'UPDATE_SHORT_LIST':
            dummyState.shortListedList = action.payload;
            return dummyState;
        case 'UPDATE_STATE_LIST':
            dummyState.stateList = action.payload;
            return dummyState;
        default:
            return state;
    }
}

export default rootReducer;