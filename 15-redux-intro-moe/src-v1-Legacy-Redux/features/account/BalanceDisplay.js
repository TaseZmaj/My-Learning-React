import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

//Connect API - shablon
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

//classic Redux (legacy) connect API
export default connect(mapStateToProps)(BalanceDisplay);
