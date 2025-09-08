// Higher Order Component

const withMessage = (WrappedComponent) => {
    return (props) => (
        <div>
            <p>This is a message from the HOC!</p>
            <WrappedComponent {...props} />
        </div>
    );
};

const User = ({ name }) => {
    return <h2>User: {name}</h2>;

};

const UserWithMessage = withMessage(User);

export default UserWithMessage;