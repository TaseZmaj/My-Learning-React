//createSlice:
//1. Avtomatski kreira action creators od nashite reducers
//2. Olesnuva pishuvanje na reduceri-te -> vekje ne ni treba switch
//statement i default case e handled
//3. Mozeme da go "mutate-nuvame" state-ot vnatre vo reduceri -> sintaksicki,
//nalikuva taka, no ne se mutatenuva stvarno, tuku Immer library ovozmozuva taka
//da go kucas
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 50,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//ovoj Slice - "accountSlice" zema funkcija na Reducer i na Action creators
const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    //SHABLON - ako sakas action creator-ov da revieve-ne povekje od eden
    //argument, morash vaka da ja pishesh logikata, treba da ti
    //prepare-nesh podatocite.  Mozesh isto taka da go napravis na nacin
    //kako sho passnuvash 1 argument vo funkcijata ko objekt {}, no ako odberes
    //da ne go pravis toa, ova e shablonot:
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        //koga ne pravis nishto, SHABLON e da return;-nesh samo, ne return state
        //ako ubavo razbrav, ovie tehnicki se void funkcii

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      //EDEN DOWNSIDE na state muatition-ov, state.loan=0; odma se izvrshuva,
      //ne se batched state updates-ot, sto znaci deka poslednata linija nema da
      //se odzeme nishto od balance, ke bide balance -=0,
      // state.loan = 0;
      // state.loanPurpose = "";
      // state.balance -= state.loan;

      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//mozesh i samiot vaka da si pishesh deposit funkcija i da ja export-nesh
//ke raboti i vaka, ama treba da ja remove-nesh od export const gore
//Tuka NE go koristis avtomatskiot action creator shto go koristi
//Redux toolkit, tuku koristis tvoj sopstven action creator
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

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

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       //vo Redux e preporacano namesto Error, da returnesh samo state
//       return state;
//   }
// }

// // Action creators
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async (dispatch, getState) => {
//     dispatch({ type: "account/convertingCurrency" });

//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates["USD"];

//     //tuka lici ko da treba return{type: "account/deposit", payload....} da napravis
//     //no dispatch treba.  Isto taka nishto ne te zapira da imas povekje dispatches tuka
//     dispatch({
//       type: "account/deposit",
//       payload: converted,
//     });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
