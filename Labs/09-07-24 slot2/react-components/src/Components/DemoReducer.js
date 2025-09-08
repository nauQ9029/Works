import React, { useReducer } from "react";

const inititalState = {
    count: 0,
}

function counterReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1};
        case 'decrement':
            return { count: state.count -1 };
        default:
            return state;
    }
}

function CounterReducer() {
    const [state, dispatch] = useReducer(counterReducer, inititalState);
    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick = {() => dispatch({type: 'increment'})}>Increment</button>
            <button onClick = {() => dispatch({type: 'decrement'})}>Decrement</button>
        </div>
    )
}
export default CounterReducer;