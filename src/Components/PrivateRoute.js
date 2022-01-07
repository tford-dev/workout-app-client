/* eslint-disable */ 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';

//Component that nests a UI component that requires authentication
export default ({ component: Component, ...rest }) => {
    const [initialState, dispatch] = useStateValue();
    return (
        <Consumer>
            {initialState => (
                <Route
                {...rest}
                //If the user is authenticated, user is allowed access to desired route
                render={props => initialState.authenticatedUser ? (
                    <Component {...props} />
                    //If user is not authenticated, they are redirected to "/signin" route
                    ) : (
                    <Redirect to={{
                        pathname: "/signin",
                        state: {from: props.location},
                    }}/>
                    )
                }
                />
            )}
        </Consumer>
    );
};