const C = (props) => {
    return <h1>{props.name}</h1>
}

const B = (props) => {
    return (
        <C name = {props.name}/>
    )
}

const DemoNoContext  = (props) => {
    return (
        <div>
            <B name = {props.name}/>
        </div>
    );
}

export default DemoNoContext