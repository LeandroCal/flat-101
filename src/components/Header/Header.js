import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.scss'

import Logo from '../../assets/images/logo.jpg'
import { ReactComponent as Search } from '../../assets/icons/search.svg'

function Header() {
    const history = useNavigate()

    return (
        <header className="header">
            <div className="header-logo" onClick={() => history('/')}>
                <img src={Logo} alt="Logo" />
            </div>
            <div className="header-icons">
                <Search />
            </div>
        </header>
    )
}

export default Header
