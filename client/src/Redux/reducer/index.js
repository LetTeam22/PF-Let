
import {
    CURRENT_PAGE, SET_PARAMETERS, GET_BIKES, GET_RENDERED_BIKES,
    GET_BIKES_DETAIL, GET_USER, CREATE_USER, ADD_BOOKING, POST_BOOKINGS,
    UPDATE_USER, GET_FAMOUS_BIKES, GET_ACCESORIES, ADD_FAVORITE, REMOVE_FAVORITE,
    GET_ALL_BOOKINGS, GET_ALL_USERS, SET_BIKES_DETAIL, POST_EXPERIENCE,
    GET_ALL_EXPERIENCES, GET_DISABLED_DATES, GET_USER_BOOKINGS,
    GET_ALL_FAVORITES, UPDATE_BOOKING, UPDATE_EXPERIENCE, UPDATE_ACCESORIE,
    UPDATE_BIKE, BOOKING_TO_QUALIFY, SEND_MP_INFO, CHECKOUT_BOOKINGS, BIKE_RATING
} from '../actions/actiontypes';

const initialState = {
    allBikes: [],
    renderedBikes: [],
    paginate: {
        bikesPerPage: 9,
        currentPage: 1,
    },
    parameters: {
        filters: {
            selected: [],
            labels: [],
            ids: [],
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
            selected: [],
            labels: [],
            ids: [],
            price: '',
            rating: '',
            name: ''
        },
        search: {
            selected: [],
            search: ''
        },
        date: {
            from: '',
            to: '',
            bikeIds: '',
            disabledDates: [],
            timeZone: 'T00:00:00.000-03:00'
        }
    },
    bikeDetail: [],
    accesories: [],
    user: {},
    allUsers: [],
    bookings: [],
    allBookings: [],
    famousBikes: [],
    favorites: [],
    allExperiences: [],
    userBookings: [],
    mpInfo: '',
    checkoutBookings: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case CURRENT_PAGE:
            return {
                ...state,
                paginate: { ...state.paginate, currentPage: action.payload }
            }
        case SET_PARAMETERS:
            const emptyParameters = {
                filters: { selected: [], labels: [], ids: [], type: '', traction: '', wheelSize: '', color: '', price: { min: '', max: '' } },
                sorts: { selected: [], labels: [], ids: [], price: '', rating: '', name: '' }, search: { selected: [], search: '' }
            }
            if (action.payload === 'resetAll') action.payload = { ...emptyParameters, date: { ...state.parameters.date } }
            if (action.payload === 'resetAllPlusDates') action.payload = { ...emptyParameters, date: { ...state.parameters.date, from: '', to: '' } }
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
            }
        case UPDATE_USER:
            return {
                ...state,
            }
        case ADD_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload]
            }
        case POST_BOOKINGS:
            return {
                ...state,
                bookings: [],
            }
        case GET_ACCESORIES:
            return {
                ...state,
                accesories: action.payload
            }
        case GET_FAMOUS_BIKES:
            const orderBikes = action.payload.sort((a, b) => {
                if (a.rating > b.rating) return -1;
                if (b.rating > a.rating) return 1;
                return 0;
            });
            const principalBikes = orderBikes.slice(0, 12);
            return {
                ...state,
                famousBikes: principalBikes
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(f => f.idBike !== action.idBike)
            }
        case POST_EXPERIENCE:
            return {
                ...state
            }
        case GET_ALL_EXPERIENCES:
            return {
                ...state,
                allExperiences: action.payload
            }
        case GET_ALL_BOOKINGS:
            return {
                ...state,
                allBookings: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case SET_BIKES_DETAIL:
            return {
                ...state,
                bikeDetail: action.payload
            }
        case GET_DISABLED_DATES:
            return {
                ...state,
                parameters: { ...state.parameters, date: { ...state.parameters.date, disabledDates: action.payload } }
            }
        case GET_USER_BOOKINGS:
            if (action.payload.msg) action.payload = []
            return {
                ...state,
                userBookings: action.payload
            }
        case GET_ALL_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            }
        case UPDATE_BOOKING:
            return {
                ...state
            }
        case UPDATE_EXPERIENCE:
            return {
                ...state
            }
        case UPDATE_ACCESORIE:
            return {
                ...state
            }
        case UPDATE_BIKE:
            return {
                ...state
            }
        case BOOKING_TO_QUALIFY:
            return {
                ...state,
                userBookings: state.userBookings.find(b => b.idBooking === action.idBooking)
            }
        case SEND_MP_INFO:
            return {
                ...state,
                mpInfo: action.payload
            }
        case CHECKOUT_BOOKINGS:
            return {
                ...state,
                checkoutBookings: action.payload
            }
        case BIKE_RATING: 
            return {
                ...state
            }
        default: return state
    }
}

export default rootReducer;

