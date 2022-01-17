import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { useStateValue } from '../ContextApi/StateProvider';
import './components.css';

const signOutFunc = () => {
    window.location.reload();
}

const Menu = () => {
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);

    return (
        <MenuContainer onClick={()=>{
            dispatch({
                type: 'SET_MENU_OPEN',
                menuOpen: false
            })
        }}>    
            <MenuList>
                <MenuItem>
                    <MenuText>
                        <i className="far fa-user"></i>
                        <p style={{fontSize: 13}}>{authUser.emailAddress}</p>
                    </MenuText>
                </MenuItem>
                <MenuItem tabIndex={1}>
                    <Link className="menu__link" to="/home">
                        <MenuText>
                            <i className="fas fa-home"></i>
                            <p>Home</p>
                        </MenuText>
                    </Link>
                </MenuItem>
                <MenuItem tabIndex={2}>
                    <Link className="menu__link" to="/help">
                        <MenuText>
                            <i className="far fa-question-circle menu-question"></i>
                            <p>Help</p>
                        </MenuText>
                    </Link>
                </MenuItem>
                <MenuItem onClick={signOutFunc} tabIndex={3}>
                    <Link className="menu__link" to="/sign-out">
                        <MenuText>
                            <i className="fas fa-sign-out-alt"></i>
                            <p>Sign Out</p>
                        </MenuText>
                    </Link>
                </MenuItem>
            </MenuList>
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
    width: 100%;
    height: 91.5vh;
    position: relative;
    background-color: rgba(50, 50, 50, 0.8);
}
`;

const MenuList = styled.div`
    position: relative;
    width: 50%;
    color: #fff;
    background-color: #424242;
    height: 91.5vh;
`

const MenuItem = styled.div`
    border-bottom: 1px solid #787878;
    &:hover {
        background-color: #787878;
        cursor: pointer;
    }
`

const MenuText = styled.div`
    height: 50px;
    //100% of container
    width: 40%;
    margin-left: 10%;
    display: flex;
    align-items: center;
    & > i {
        margin-top: -6px;
        margin-right: 10px;
    }
`

export default Menu
