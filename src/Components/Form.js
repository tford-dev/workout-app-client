/* eslint-disable */ 
import React from 'react';
import styled from 'styled-components';

export default (props) => {
	const {
		cancel,
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


const ButtonContainer = styled.div`
	text-align: center;
`;

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