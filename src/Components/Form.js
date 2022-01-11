/* eslint-disable */ 
import React from 'react';
import styled from 'styled-components';

export default (props) => {
	const {
		cancel,
		errors,
		submit,
		submitButtonText,
		elements,
	} = props;

	function handleSubmit(event) {
		event.preventDefault();
		submit();
	}

	function handleCancel(event) {
		event.preventDefault();
		cancel();
	}

  return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="container sign-form">
					<ErrorsDisplay errors={errors} />
					{elements()}
						<ButtonContainer>
							<FormSubmit type="submit" value={submitButtonText} />
							<FormCancel onClick={handleCancel}>Cancel</FormCancel>
						</ButtonContainer>
				</div>
			</form>
		</div>
  );
}

//function to display errors when invalid/empty values are in submitted in a required input
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
        if (errors.length) {
            errorsDisplay = (
                <div className="error">
                    <h3>Validation errors</h3>
                        <div>
                            <ul>
								{/*Loops through errors from required inputs*/}
                                {errors.map((error, i) => <li key={i}>{error}</li>)}
                            </ul>
                        </div>
                </div>
        );
	errors.length = 0;
}
  return errorsDisplay;
}

const ButtonContainer = styled.div``;

const FormSubmit = styled.input`
	border: none;
	height: 25px;
	color: #fff;
	background-color: #000;
	border-radius: 5px;
	margin-right: 5px;
	cursor: pointer;
`;

const FormCancel = styled.button`
	border: none;
	height: 25px;
	color: #fff;
	background-color: #000;
	border-radius: 5px;
	margin-left: 5px;
	cursor: pointer;
`;