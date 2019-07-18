import {
  RESET_SELECTED_AGREEMENT,
  ASSIGN_SELECTED_AGREEMENT,
  ASSIGN_AGREEMENTS,
  DELETE_AGREEMENT
} from "../types/agreement";
import api from "~/services/BackendApi";

export const resetSelectedAgreement = () => async dispatch => {
  dispatch({
    type: RESET_SELECTED_AGREEMENT
  });
};

export const assignSelectedAgreement = data => async dispatch => {
  dispatch({
    type: ASSIGN_SELECTED_AGREEMENT,
    data
  });
};

export const fetchAgreementById = (id, useCache = true) => async (
  dispatch,
  getState
) => {
  const cachedData = getState().agreements.agreements[id];

  if (!cachedData || !useCache) {
    try {
      let { data, status } = await api.agreements.fetchById(id);

      if (status === 200) {
        return dispatch({
          type: ASSIGN_AGREEMENTS,
          data: [data]
        });
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    return;
  }

  throw new Error("error in action fetchAgreementById");
};

export const fetchMyAgreements = () => async dispatch => {
  try {
    let { data, status } = await api.agreements.fetchMy();

    if (status === 200) {
      return dispatch({
        type: ASSIGN_AGREEMENTS,
        data,
        fetchKey: "my"
      });
    }
  } catch (e) {
    console.log(e);
  }

  throw new Error("error in action fetchTeamAgreements");
};

export const createAgreement = agreement => async dispatch => {
  try {
    let { data, status } = await api.agreements.create(agreement);

    if (status === 200) {
      return dispatch({
        type: ASSIGN_AGREEMENTS,
        data: [data],
        fetchKey: "lastCreated"
      });
    }
  } catch (e) {
    console.log(e);
  }

  throw new Error("error in action createAgreement");
};

export const updateAgreement = agreement => async dispatch => {
  try {
    let { data, status } = await api.agreements.update(agreement);

    if (status === 200) {
      return dispatch({
        type: ASSIGN_AGREEMENTS,
        data: [data],
        fetchKey: "lastUpdated"
      });
    }
  } catch (e) {
    console.log(e);
  }

  throw new Error("error in action updateAgreement");
};

export const deleteAgreement = agreement => async dispatch => {
  try {
    let { data, status } = await api.agreements.deleteAgreement({
      _id: agreement._id
    });

    if (status === 200) {
      return dispatch({
        type: DELETE_AGREEMENT,
        data,
        fetchKey: "lastDeleted"
      });
    }
  } catch (e) {
    console.log(e);
  }

  throw new Error("error in action deleteAgreement");
};
