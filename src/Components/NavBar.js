import React from 'react';
import styled from 'styled-components';
import "../index.css";
import { useStateValue } from '../ContextApi/StateProvider';

const NavBar = () => {
    const [{ menuOpen }, dispatch] = useStateValue();
    const setMenuOpen = () =>{
        if(menuOpen){
            dispatch({
                type: 'SET_MENU_OPEN',
                menuOpen: false
            })
        } else {
            dispatch({
                type: 'SET_MENU_OPEN',
                menuOpen: true
            })
        }
    }
    return (
        <Nav>
            <NavContainer>
                {
                    menuOpen ? (
                        <i className="fas fa-times" onClick={setMenuOpen}></i>
                    ) : (
                        <i className="fas fa-bars" onClick={setMenuOpen}></i>
                    )
                }
                <NavLogoHeader>
                    <NavLogo version="1.0" xmlns="http://www.w3.org/2000/svg" width="139.000000pt" height="140.000000pt"
                        viewBox="0 0 139.000000 140.000000" preserveAspectRatio="xMidYMid meet">
                    
                        <g transform="translate(0.000000,140.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                            <path d="M560 1235 c-198 -55 -343 -217 -387 -430 -51 -252 87 -497 334 -592
                            83 -31 231 -42 314 -23 145 34 281 144 350 284 143 292 7 631 -297 743 -89 32
                            -233 40 -314 18z m255 -69 c28 -7 66 -21 85 -31 48 -24 140 -93 140 -105 0 -6
                            -130 -10 -347 -10 l-347 0 39 41 c51 52 93 77 163 100 69 22 196 24 267 5z
                            m-395 -526 c0 -165 -4 -300 -9 -300 -21 0 -115 116 -144 177 -27 58 -32 82
                            -35 164 -3 70 0 112 13 155 27 97 35 104 110 104 l65 0 0 -300z m200 -45 l0
                            -345 -27 6 c-16 4 -44 12 -63 19 l-35 12 -3 314 c-1 173 0 319 3 326 3 9 25
                            13 65 13 l60 0 0 -345z m188 223 l3 -118 -61 0 -60 0 0 120 0 121 58 -3 57 -3
                            3 -117z m324 75 c11 -27 23 -79 26 -120 l5 -73 -142 0 -141 0 0 120 0 120 115
                            0 116 0 21 -47z m-327 -458 l0 -179 -45 -8 c-25 -5 -51 -6 -57 -3 -10 3 -13
                            49 -13 183 0 98 3 182 7 186 4 4 30 6 58 4 l50 -3 0 -180z m341 153 c-18 -90
                            -114 -222 -205 -280 -25 -15 -49 -28 -53 -28 -4 0 -8 77 -8 170 l0 170 136 0
                            137 0 -7 -32z" />
                        </g>
                    </NavLogo>
                    <NavHeader>Workout</NavHeader>
                </NavLogoHeader>
                <i className="far fa-question-circle nav__help"></i>
            </NavContainer>
        </Nav>
    )
}

const Nav = styled.div`
    height: 56px;
    width: 100%;
    color: #fff;
`

const NavContainer = styled.div`
    display: flex;
    width: 90%;
    height: 56px;
    margin: auto;
    align-items: center;
    justify-content: space-between;

    & > i {
        font-size: 28px;
        //Added width and height to keep i size consistent
        width: 24.5px;
        height: 29px;
        &:hover {
            color: #424242;
        }
    }
`;

const NavLogoHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    justify-content: center;
    width: 150px;
`;

const NavHeader = styled.h1`
    margin: 0;
    font-size: 28px;
`;

const NavLogo = styled.svg`
    height: 40px;
    margin: 0;
`

export default NavBar