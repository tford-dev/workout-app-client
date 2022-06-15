import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Workout = (props) => {
    return (
        <Link to={`/workouts/${props.id}`} className='menu__link' tabIndex={1}>
            <WorkoutContainer>
                <WorkoutContentContainer>
                    <WorkoutSection style={{borderBottom: '1px solid #bdbdbd', width: '100%'}}>
                        <i className="fas fa-dumbbell"></i>
                        <h3>{props.title}</h3>
                    </WorkoutSection>
                    <WorkoutSection>
                        <i className="far fa-calendar-alt"></i>
                        <p>{props.time}</p>
                    </WorkoutSection>
                </WorkoutContentContainer>
            </WorkoutContainer>
        </Link>
    )
}

const WorkoutContainer = styled.div`
    width: 215px;
    border-radius: 8px;
    background-color: #777;
    color: #fff;
    text-decoration: none;

    &:hover {
        background-color: #787878;
    }
`;

const WorkoutContentContainer = styled.div`
    width: 90%;
    margin: auto;
`;

const WorkoutSection = styled.div`
    display: flex;
    height: 25px;
    align-items: center;
`;

export default Workout
