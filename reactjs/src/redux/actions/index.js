export const ActionTypes = {
    SET_STORE_TASK_LIST: "SET_STORE_TASK_LIST",
}
export const setStoreTaskList = (payload) =>{
    return{ type:ActionTypes?.SET_STORE_TASK_LIST, payload:payload }
}