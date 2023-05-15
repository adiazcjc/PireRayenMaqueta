const dataCars = require("./newCars.json");

export function getCars() {
  return async function (dispatch) {
    try {
      let json = dataCars;
      return dispatch({
        type: "GET_CARS",
        payload: json,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterModel(payload) {
  return {
    type: "FILTER_MODEL",
    payload,
  };
}

export function filterVersion(payload) {
  return {
    type: "FILTER_VERSION",
    payload,
  };
}

export function getClean(){
  return {
    type: 'GET_CLEAN',
}
}
