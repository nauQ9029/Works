import React, { Component } from "react";

class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "John Doe", age: 21, count: 0 };
  }
  incrementAge = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrementAge = () => {
    this.setState({ count: this.state.count -1})
  }

  render() {
    return (
        <>
        <div><h1>Count: {this.state.count}</h1></div>
        <div><h1>Name: {this.props.name}, Age: {this.props.age}</h1></div>
        <button onClick =  {this.incrementAge}> + </button>
        <button onClick =  {this.decrementAge}> - </button>
        </>
    )
  }
}

export default HelloWorld;
