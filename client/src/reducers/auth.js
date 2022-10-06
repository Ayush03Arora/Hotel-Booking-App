

export const authReducer = (state, action) => {
  let userState;

  if(window.localStorage.getItem("auth")){ 
    userState = JSON.parse(window.localStorage.getItem("auth"));
  } else {
    userState = null;
  }

  state=userState;
  console.log(state);
    switch(action.type) {
        case "LOGGED_IN_USER":
        return{...state, ...action.payload}; 
        case "LOGOUT":
        return action.payload;
        default :
        return state;
    }
    };