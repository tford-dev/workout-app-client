import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';

const Exercise = (props) => {
    return (
        <ExerciseContainer tabIndex={1}>
            <Link to={`/workouts/${props.workoutId}/exercises/${props.id}`} className='link'>
                <p>{props.title}</p>
            </Link>
        </ExerciseContainer>
    )
}

const ExerciseContainer = styled.div`
    width: 47%;
    background-color: #0088cc;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #787878;
    }
`;

export default Exercise
