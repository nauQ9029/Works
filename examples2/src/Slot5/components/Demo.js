import react, { Component } from "react";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Goodbye, World",
      name: "John Doe",
      age: 21,
    };
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.message}, {this.state.name}! {this.state.age}
        </h1>
      </div>
    );
  }
}

export default Demo;
