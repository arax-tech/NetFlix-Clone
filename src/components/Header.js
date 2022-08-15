import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='nav'>
            <img className='nav__logo' src="/logo.png" alt="" />
            <Link to="/login" className='nav__login__button'>Sign In</Link>
        </div>
    )
}

export default Header
