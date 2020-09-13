import axios from 'axios';

export const setStateList = (data = {}) => {
    return (dispatch) => {
        axios.get('https://api.jsonbin.io/b/5f5c76a5302a837e9564b5ca')
        .then((res) =>{
                let { data } = res;
                let district = [];
                let state = [];
                data.map(item => {
                    if(!district.includes(item.District)){
                        district.push(item.District);
                    }
                    if(!state.includes(item.State)){
                        state.push(item.State);
                    }
                })
                district.sort();
                state.sort();
                dispatch({
                    type: 'SET_STATE_LIST',
                    payload: {
                        data: data,
                        stateOptions: state,
                        districtOptions: district
                    }
                });
            }
        )

    }
}

export const setSelectedMenu = (data = {}) => {
    return (dispatch => {
        dispatch({
            type: 'SET_MENU_ITEM',
            payload: data
        })
    })
}

export const updateShortListItems = (data = {}) => {
    return (dispatch => {
        dispatch({
            type: 'UPDATE_SHORT_LIST',
            payload: data
        })
    })
}

export const updateStateList = (data = {}) => {
    return (dispatch => {
        dispatch({
            type:'UPDATE_STATE_LIST',
            payload: data
        })
    })
}