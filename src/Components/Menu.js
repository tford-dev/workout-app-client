import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import './components.css';

const Menu = () => {
    return (
        <MenuContainer>
            <MenuItem>
                <Link className="menu__link" to="/home">
                    <MenuText>
                        <i className="fas fa-home"></i>
                        <p>Home</p>
                    </MenuText>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link className="menu__link" to="/help">
                    <MenuText>
                        <i className="far fa-question-circle menu-question"></i>
                        <p>Help</p>
                    </MenuText>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link className="menu__link" to="/sign-out">
                    <MenuText>
                        <i className="fas fa-sign-out-alt"></i>
                        <p>Sign Out</p>
                    </MenuText>
                </Link>
            </MenuItem>
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
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

const StyledLink = styled(Link)`
    text-decoration: none;
`

export default Menu
