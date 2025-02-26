const initialStateAccount = {
  balance: 50,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      //vo Redux e preporacano namesto Error, da returnesh samo state
      return state;
  }
}

// Action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //THUNK MIDDLEWARE SHABLON - ako pisheme vaka funcion
  //Redux ke ja poznae kako middleware thunk i ke znae deka
  //treba da se execute-ne ovaa akcija pred da se dispatch-ne
  //data-ta vo store
  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates["USD"];

    //tuka lici ko da treba return{type: "account/deposit", payload....} da napravis
    //no dispatch treba.  Isto taka nishto ne te zapira da imas povekje dispatches tuka
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
