import React from "react";
import PropType from 'prop-types';
import PropTypes from "prop-types";

function UserProfile(props) {
    return (
        <div>
            <h1>{props.username}</h1>
            <p>Age: {props.age}</p>
            <p>Email: {props.email}</p>
        </div>
    );
}

UserProfile.propTypes = { 
    username: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string.isRequired
};

// Default type
UserProfile.defaultProps = {
    age: 30 // Default age if not provided
};
console.log("PropTypes identified for UserProfile.")
export default UserProfile;