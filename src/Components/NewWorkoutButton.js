import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NewWorkoutButton = () => {
    return (
        <Link to="/new-workout" className='link'>
            <ButtonContainer>
                <ButtonHeader><i className="far fa-plus-square"></i>New Workout</ButtonHeader>
            </ButtonContainer>
        </Link>
    )
}

const ButtonContainer = styled.div`
    width: 215px;
    border-radius: 8px;
    background-color: #0088cc;
    height: 50px;
    color: #fff;
    text-decoration: none;
    text-align: center;

    &:hover {
        background-color: #fff;
        color: #0088cc;
    }
`

const ButtonHeader = styled.h3`
    margin: auto;
    padding-top: 14px;
`

export default NewWorkoutButton
