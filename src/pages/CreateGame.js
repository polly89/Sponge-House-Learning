import './CreateGame.css';
import {  signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { useContext, useState } from 'react';

import Dropdown from '../components/Dropdown';

function CreateGame(){
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err){
            console.log(err)
        }
    };
    return (
    <div>
        <div className='header-form'>
            <div className='sub-head'>
                <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'/>
                <Link to='/'>
                    <button className='newActBtn'> Home </button>
                </Link>
            </div>
            <div className='slogan-home'>
                <h1 className='p1'>Keep it</h1>
                <h1 className='p3'>Simple!</h1>
            </div>
        </div>
        <hr className='lineForm'></hr>
        <div className='form-activity'>
        <button onClick={logout}>Logout</button>
        </div>
    </div>
    )
}
export default CreateGame;