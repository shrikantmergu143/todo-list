/* eslint-disable */
import { ActionTypes } from "../actions";

export const initialData = {
    taskList:[]
}

export const allReducers = (state = initialData, action) => {
    switch(action.type) {
        case ActionTypes.SET_STORE_TASK_LIST:
            return{
                ...state,
                taskList:action?.payload,
            }
        default:
        return state;
    }
};
