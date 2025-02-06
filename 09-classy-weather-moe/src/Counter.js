import React from "react";

class Counter extends React.Component {
  //kaj Class based components imame eden golem State object za
  //razlika od function based components kaj shto sekoj state se deklarira
  //posebno
  constructor(props) {
    super(props);

    this.state = { count: 5 };
    //poradi nacinot na koj shto raboti Javascript, treba da
    //go pishesh ova za da raboti funkcijata dole - MANUAL BINDING
    //Bidejki: Javascript koga ja povikuva funkcijata pravi kopija od istata
    //a kopijata ne znae vo toj slucaj shto e "this", a ti sakas da znae.
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
    // this.setState({ count: 10 });
  }
  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
