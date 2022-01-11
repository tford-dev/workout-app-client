/* eslint-disable */ 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';

//Component that nests a UI component that requires authentication
export default ({ component: Component, ...rest }) => {
    const [initialState, dispatch] = useStateValue();

    return (
        <div>
            {initialState.authenticatedUser ? (
                <Component />
            ) : (
                <Redirect to={{
                    pathname: "/sign-in",
                }}/>
            )}
        </div>
    );
};