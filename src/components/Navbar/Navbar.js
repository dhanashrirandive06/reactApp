import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../utilities/Auth';
import { useNavigate } from 'react-router-dom';
import TweetAppService from '../../utilities/TweetAppService';
import axios from 'axios';
import './Navbar.css';
import menuIcon from "../../asset/menu.png"

export function Navbar() {
    const [show, setShow] = useState("hide");

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',

        }
    }

    const auth = useAuth();
    const navigate = useNavigate();
    const service = new TweetAppService();

    const handleLogout = () => {
        setShow("hide");
        auth.logout();
        navigate('/');
    }

    function handleDelete() {
        axios.delete(`http://localhost:29769/api/v1.0/tweets/user/${auth.user}`)
            .then(response => {
                console.log(response);

            })
            .catch(err => {
                console.log(err);

            });


        handleLogout();
    }


    return (


        <div>

            <ul className="header ">
                <a className="navbar-brand" style={{ color: "white" }} >   Tweet App</a>
                {
                    !auth.user && (
                        <li><NavLink style={navLinkStyles} to='/login'>
                            Login
                        </NavLink></li>
                    )
                }
                {

                    auth.user && (
                        <>
                            <li><NavLink style={navLinkStyles} to='/'>
                                Home
                            </NavLink></li>
                            <li><NavLink style={navLinkStyles} to='/alluser'>
                                Alluser
                            </NavLink></li>
                            <li><NavLink style={navLinkStyles} to='/post/tweet'>
                                Post Tweet
                            </NavLink></li>

                            <li><NavLink style={navLinkStyles} to='/profile'>
                                Profile
                            </NavLink></li>



                            <div className="d-inline-block dropdownClass">
                                <div className={show == "show" ? "dropdown dClass" : "dropdown"} onClick={() => {
                                    show == "hide" ? setShow("show") : setShow("hide")
                                    console.log(show)
                                }}>
                                    <img className="btn btn-light " src={menuIcon} width="30" height="30" role="button" id="actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

                                </div>
                                <div className={show}>
                                    <div className="dropdown-menu" aria-labelledby="actions">
                                        <button type="button" className=" dropdown-item btn  mx-2 btn-lg" onClick={handleDelete} >Delete Account</button>

                                        <button type="button" className="dropdown-item btn mx-2 btn-inline btn-lg " onClick={handleLogout}>Logout</button>

                                    </div>
                                </div>
                            </div>



                        </>
                    )


                }





            </ul>

        </div>


        //<nav className='primary-nav'>
        //         <NavLink style={navLinkStyles} to='/'>
        //         Home
        //     </NavLink>
        //     <NavLink style={navLinkStyles} to='/profile'>
        //         Profile
        //     </NavLink>
        //     {
        //         !auth.user && (
        //             <NavLink style={navLinkStyles} to='/login'>
        //             Login
        //             </NavLink>
        //         )
        //     } 
        // </nav> 
    )
}





