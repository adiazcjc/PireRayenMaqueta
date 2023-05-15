const initialState = {
  cars: [],
  allCars: [],
  models: [],
  versions: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CARS":
      return {
        ...state,
        cars: action.payload,
      };
    case "FILTER_MODEL":
      var arrayCars = [];
      var autos = state.cars;
      if (action.payload) {
        arrayCars = autos.filter((el) => el.marca === action.payload);
      }
      return {
        ...state,
        models: arrayCars,
      };
    case "FILTER_VERSION":
      var arrayVersion = [];
      var array2 = [];
      var version = state.models;
      if (action.payload) {
        arrayVersion = version[0].modelo.filter(
          (el) => el.name === action.payload
        );
      }
      if (arrayVersion) {
        array2 = arrayVersion[0].version;
      }
      return {
        ...state,
        versions: array2,
      };
    case "GET_CLEAN":
      return {
        ...state,
        models: [],
        allCars: [],
        models: [],
        versions: [],
      };

    default:
      return state;
  }
}

export default rootReducer;
