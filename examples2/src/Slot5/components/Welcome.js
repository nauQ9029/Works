// Functional component
import React from "react";
import { useState } from "react";

function Welcome(props) {
    const [count, setCount] = useState(0);
    return <h1>Hello, {props.name}</h1>
}

export default Welcome;