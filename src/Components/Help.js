import React from 'react';
import styled from 'styled-components';

const Help = () => {
    return (
        <HelpContainer>
            <HelpHeader><i className="fas fa-info-circle"></i> Help</HelpHeader>
            <HelpStep>Step 1: After signing in, you are directed to the home screen</HelpStep>
            <HelpStep>Step 2: Click the new workout icon</HelpStep>
            <HelpStep>Step 3: Enter a title and description for workout and click the 'Create Workout' button.</HelpStep>
            <HelpStep>Step 4: After creating a workout, you are redirected to the home screen, click your newly created workout.</HelpStep>
            <HelpStep>Step 5: Below your workout info, you are shown the 'Add Exercise', 'Edit Workout', and 'Delete' buttons. Click the green 'Add Exercise' button.</HelpStep>
            <HelpStep>Step 6: After clicking the 'Add Exercise' button, a form will appear. Enter a name for an exercise and click 'Add Exercise' to submit form.</HelpStep>
            <HelpStep>Step 7: To edit your workout's name or description, click the 'Edit Workout' button. To delete your workout and it's contents, click the 'Delete' button.</HelpStep>
            <HelpStep>Step 8: Click your newly created exercise, you will be shown a page that displays your exercise's name, 'Edit Exercise'/'Delete Exercise' buttons, and a form so you can add repetitions/sets</HelpStep>
            <HelpStep>Step 9: To add sets/repetitions for your exercise, enter a number greater than 0 in the form and click "Log set".</HelpStep>
            <HelpStep>Step 10: To edit or delete your repetitions/set, click the 'Edit' button(a form will appear on screen) and to delete your repetitions/set, click 'Delete'. </HelpStep>
        </HelpContainer>
    )
}

const HelpContainer = styled.div`
    width: 90%;
    color: #fff;
    background-color: #777;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 15px;
    border-radius: 4px;
    text-align: center;
`;

const HelpHeader = styled.h2`
    padding-top: 7px;
    margin-bottom: -10px;
`

const HelpStep = styled.p`
    border-top: 1px solid #bdbdbd;
    padding-top: 7px;
    padding-bottom: 7px;
`



export default Help
