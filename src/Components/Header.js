import React from 'react'

const Header = () => {
    return (
        <div>
            <NavBar />
                { menuOpen ? (
                    <Menu />
                    ) : (
                        null
                    )
                }
        </div>
    )
}

export default Header
