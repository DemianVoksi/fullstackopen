import React from 'react';
import '../index.css';

const Notification = ({ message }) => {
	function identifyMessageType() {
		if (message.type === 'add' || message.type === 'edit') {
			return 'success';
		} else if (message.type === 'delete' || message.type === 'error') {
			return 'error';
		}
	}

	if (message.type === null) {
		return null;
	}

	return <div className={identifyMessageType()}>{message.content}</div>;
};

export default Notification;
