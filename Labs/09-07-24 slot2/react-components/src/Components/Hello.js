import React from "react";

class Hello extends React.Component {
    // render() {
    //     return <h1>Hello, {this.props.name}, {this.props.age} years old.</h1>;
    // }

    // constructor(props) {
    //     super(props);
    //     this.state = { favoritecolor: "red" };
    // }
    // static getDerivedStateFromProps(props, state) {
    //     return { favoritecolor: props.favcol };
    // }
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({ favoritecolor: "black" })
    //     }, 1000)
    // }
    // render() {
    //     return (
    //         <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    //     );
    // }

    constructor(props) {
        super(props);
        this.state = {favoritecolor: "red"};
      }
      static getDerivedStateFromProps(props, state) {
        return {favoritecolor: props.favcol };
      }
      changeColor = () => {
        this.setState({favoritecolor: "blue"});
      }
      render() {
        return (
          <div>
          <h1>My Favorite Color is {this.state.favoritecolor}</h1>
          <button type="button" onClick={this.changeColor}>Change color</button>
          </div>
        );
      }

      
}
export default Hello;
