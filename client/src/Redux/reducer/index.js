import { CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES, GET_BIKES_DETAIL, GET_USER, CREATE_USER } from '../actions/actiontypes';

const  initialState = {
    allBikes: [],
    renderedBikes: [],
    paginate: {
        bikesPerPage: 9,
        currentPage: 1,
    },
    parameters: {
        filters: {
          type: '',
          traction: '',
          wheelSize: '',
          color: '',
          price: {
            min: '',
            max: ''
          }
        },
        sorts: {
          price: '',
          rating: '',
          name: ''
        },
        search: ''
    },
    bikeDetail: [],
    accesories: [],
    user: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

            case CURRENT_PAGE:
                return {
                    ...state,
                    paginate: { ...state.paginate, currentPage: action.payload }
                }
            case SET_PARAMETERS:
                return {
                    ...state,
                    parameters: action.payload
                }
            case GET_BIKES:
                return {
                    ...state,
                    allBikes: action.payload
                }
            case GET_RENDERED_BIKES:
                return {
                    ...state,
                    renderedBikes: action.payload,
                }
            case GET_BIKES_DETAIL:
                return {
                    ...state,
                    bikeDetail: action.payload
                }
            case GET_USER:
                return {
                    ...state,
                    user: action.payload
                }
            case CREATE_USER:
                return {
                    ...state,
                    user: action.payload.user
                }
        default: return state
    }
}


export default rootReducer;