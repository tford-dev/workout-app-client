import React from 'react';
import styled from 'styled-components';

const AppError = () => {
    return (
        <AppErrorContainer>
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error. Please try again.</p>
        </AppErrorContainer>
    )
}

const AppErrorContainer = styled.div`
    color: #fff;
    width: 90%;
    margin: auto;
`;

export default AppError
