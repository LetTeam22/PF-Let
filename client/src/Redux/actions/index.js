import axios from 'axios';


import { CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES, GET_BIKES_DETAIL, GET_USER, CREATE_USER, UPDATE_USER, ADD_BOOKING, POST_BOOKINGS, GET_FAMOUS_BIKES, GET_ACCESORIES, ADD_FAVORITE, REMOVE_FAVORITE, GET_ALL_BOOKINGS, POST_EXPERIENCE, GET_ALL_EXPERIENCE, GET_ALL_EXPERIENCES } from './actiontypes'




// POST_BOOKINGS

export const setCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: CURRENT_PAGE, payload })
    }
};

export const setParameters = payload => {
    return dispatch => {
        dispatch({ type: SET_PARAMETERS, payload })
    }
};

export const getBikes = () => {
    return dispatch => axios('/bikes')
        .then(res => dispatch({ type: GET_BIKES, payload: res.data }))
        .catch(err => console.log(err));
};

export const getRenderedBikes = parameters => {

    const arrQuery = []
    if (parameters.filters.type) arrQuery.push(`typeFilter=${parameters.filters.type}`)
    if (parameters.filters.traction) arrQuery.push(`tractionFilter=${parameters.filters.traction}`)
    if (parameters.filters.wheelSize) arrQuery.push(`wheelSizeFilter=${parameters.filters.wheelSize}`)
    if (parameters.filters.color) arrQuery.push(`colorFilter=${parameters.filters.color}`)
    if (parameters.filters.price.min) arrQuery.push(`minPriceFilter=${parameters.filters.price.min}`)
    if (parameters.filters.price.max) arrQuery.push(`maxPriceFilter=${parameters.filters.price.max}`)
    if (parameters.sorts.selected.length) arrQuery.push(`sortsOrder=${parameters.sorts.selected.join()}`)
    if (parameters.sorts.price) arrQuery.push(`priceSort=${parameters.sorts.price}`)
    if (parameters.sorts.rating) arrQuery.push(`ratingSort=${parameters.sorts.rating}`)
    if (parameters.sorts.name) arrQuery.push(`nameSort=${parameters.sorts.name}`)
    if (parameters.search.search) arrQuery.push(`search=${parameters.search.search}`)
    if (parameters.date.from) arrQuery.push(`fromDateFilter=${parameters.date.from}`)
    if (parameters.date.to) arrQuery.push(`toDateFilter=${parameters.date.to}`)
    const query = !arrQuery.length ? '' : '?' + arrQuery.join('&')

    return dispatch => axios.get(`/bikes/rendered${query}`)
        .then(res => dispatch({ type: GET_RENDERED_BIKES, payload: res.data }))
        .catch(err => console.log(err));
};

export const getBikeDetail = bikeId => {
    return dispatch => axios(`/bikes/${bikeId}`)
        .then(res => dispatch({ type: GET_BIKES_DETAIL, payload: res.data }))
        .catch(err => console.log(err));
};

export const getUser = email => {
    return dispatch => axios(`/user/detail?email=${email}`)
        .then(res => dispatch({ type: GET_USER, payload: res.data }))
        .catch(err => console.log(err));
};

export const createUser = user => {
    return dispatch => axios.post('/user/create', user)
        .then(res => dispatch({ type: CREATE_USER, payload: res }))
        .catch(err => console.log(err));
};

export const updateUser = user => {
    return dispatch => axios.put('/user/update', user)
        .then(res => dispatch({ type: UPDATE_USER, payload: res }))
        .catch(err => console.log(err));
};

export const addBooking = payload => {
    return ({
        type: ADD_BOOKING,
        payload
    })
};

export const postBookings = (payload) => {
    console.log(payload)
    return (dispatch) => {
        return axios.post('/bookings', payload)
            .then(dispatch({ type: POST_BOOKINGS, }))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
};


export const getFamousBikes = () => {
    return dispatch => axios('/bikes')
        .then(res => dispatch({ type: GET_FAMOUS_BIKES, payload: res.data }))
        .catch(err => console.log(err));
}

export const getAccesories = () => {
    return (dispatch) => {
        axios('/accesories')
            .then(res => dispatch({ type: GET_ACCESORIES, payload: res.data }))
            .catch(err => console.log(err));
    }
};

export const addFavorite = bikeId => {
    return dispatch => axios(`/bikes/${bikeId}`)
        .then(res => dispatch({ type: ADD_FAVORITE, payload: res.data }))
        .catch(err => console.log(err));
};

export const removeFavorite = idBike => {
    return ({ type: REMOVE_FAVORITE, idBike })
};

// export const getAllBookings = () => {
//     return dispatch => {
//         axios('/bookings')
//         .then(res => dispatch({type: GET_ALL_BOOKINGS, payload: res.data}))
//     }
// }

export const postExperience = (payload) => {
    console.log(payload)
    return (dispatch) => {
        return axios.post('/experience/create', payload)
            .then(dispatch({ type: POST_EXPERIENCE, payload }))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
};

export const getAllExperiences = () =>{
    return dispatch =>{
        axios('/experience/getall')
        .then(res => dispatch({type: GET_ALL_EXPERIENCES, payload: res.data}))
    }
}
