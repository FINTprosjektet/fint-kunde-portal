import AdapterApi from "../../api/AdapterApi";
import {
  addAdapterToComponentSuccess,
  createAdapterSuccess,
  deleteAdapterSuccess,
  fetchAdapersSuccess,
  fetchAdaptersError, removeAdapterFromComponentSuccess,
  updateAdapterSuccess
} from "../actions/adapter";


export function deleteAdapterFromComponent(adapter, component, org) {

  return function (dispatch) {
    return AdapterApi.deleteAdapterFromComponent(adapter, component, org).then(() => {
      dispatch(removeAdapterFromComponentSuccess(adapter));
      return;
    }).catch(error => {
      throw(error);
    })
  };
}

export function deleteAdapter(adapter, org) {
  return function (dispatch) {
    return AdapterApi.deleteAdapter(adapter, org).then(() => {
      dispatch(deleteAdapterSuccess(adapter));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function addAdapterToComponent(adapter, component, org) {
  return function (dispatch) {
    return AdapterApi.addAdapterToComponent(adapter, component, org).then(responseAdapter => {
      dispatch(addAdapterToComponentSuccess(responseAdapter));
      return responseAdapter;
    }).catch(error => {
      throw(error);
    });
  }
}

export function updateAdapter(adapter, org) {

  return function (dispatch) {
    return AdapterApi.updateAdapter(adapter, org).then(responseAdapter => {
      dispatch(updateAdapterSuccess(responseAdapter));
      return responseAdapter;

    }).catch(error => {
      throw(error);
    });
  };
}

export function createAdapter(adapter, org) {

  return function (dispatch) {
    return AdapterApi.createAdapter(adapter, org).then(responseAdapter => {
      dispatch(createAdapterSuccess(responseAdapter));
      return responseAdapter;
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchAdapters(org) {

  return (dispatch) => {
    return AdapterApi.getAdapters(org).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchAdapersSuccess(json));
      }
      else {
        dispatch(fetchAdaptersError());
      }
    })
  }
}
