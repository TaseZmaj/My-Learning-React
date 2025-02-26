import { useSelector } from "react-redux";

function Customer() {
  //useSelector() pravi subscription do store-ot
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
