import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <>
            <nav className='navbar bg-light mb-4 p-0'>
                <div className='container'>
                    {/* <a className='navbar-brand' href="/"> */}
                    <Link to="/home">
                        <div className='d-flex'>
                            <img src={logo} alt="" />
                        </div>
                        <div>
                            Project Management
                        </div>
                    </Link>

                </div>
            </nav>
        </>
    )
}


export default Header;