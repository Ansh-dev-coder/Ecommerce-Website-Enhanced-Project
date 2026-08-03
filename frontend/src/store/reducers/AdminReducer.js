import React from 'react'


const initialState={
    analytics:{}
}

export  const AdminReducer = (state = initialState,action) => {
  switch(action.type){
    case  "FETCH_ANALYTICS" :
      return{
        ...state,
        analytics : action.payload
      }
      default:
        return state;
  }
}

