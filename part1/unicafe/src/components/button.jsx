import React from 'react';

const Button = ({ handle, buttonType }) => {
	return <button onClick={handle}>{buttonType}</button>;
};

export default Button;
