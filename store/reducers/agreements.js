import {
  ASSIGN_AGREEMENTS,
  ASSIGN_SELECTED_AGREEMENT,
  DELETE_AGREEMENT,
  RESET_SELECTED_AGREEMENT
} from "../types/agreement";
import { keyBy, map } from "lodash";

const initialState = {
  selectedAgreement: {
    bonus: 0,
    oa_weight: 0
  },

  agreements: {},

  fetches: {}
};

export default (state = initialState, { type, data, fetchKey }) => {
  switch (type) {
    case RESET_SELECTED_AGREEMENT:
      return {
        ...state,
        selectedAgreement: initialState.selectedAgreement
      };

    case ASSIGN_SELECTED_AGREEMENT:
      return {
        ...state,
        selectedAgreement: { ...initialState.selectedAgreement, ...data }
      };

    case ASSIGN_AGREEMENTS:
      const currentTime = new Date();

      let dataToAssign = map(data, el => ({ ...el, assignedAt: currentTime }));
      dataToAssign = keyBy(dataToAssign, "_id");

      const fetchData = {
        ids: Object.keys(dataToAssign),

        assignedAt: currentTime
      };

      return {
        ...state,
        agreements: { ...state.agreements, ...dataToAssign },

        fetches: {
          ...state.fetches,
          [fetchKey]: fetchData
        }
      };

    case DELETE_AGREEMENT:
      const agreements = { ...state.agreements };
      delete agreements[data._id];

      return {
        ...state,
        agreements
      };

    default:
      return state;
  }
};
