import React, { useState } from 'react';

export const UserContext = React.createContext({
	user: null,
	setUser: null,
});

const useCurrentUser = () => {
	const [user, setUser] = useState(null);

	return {
		user,
		setUser,
	};
};

const withUser = (WrappedComponent) => (props) => {
	const userContext = useCurrentUser();

	return (
		<UserContext.Provider value={userContext}>
			<WrappedComponent {...props} />
		</UserContext.Provider>
	);
};

export default withUser;
