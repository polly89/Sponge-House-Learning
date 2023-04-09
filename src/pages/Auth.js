import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Auth.css'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

        console.log(auth?.currentUser?.email)
        
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err){
            console.log(err)
            setPassword('')
            setEmail('')
        }
        // <Navigate to='/createGame'/>
    };
    const signInWithGoogle= async() => {
        try{
            await signInWithPopup(auth, googleProvider)
        } catch (err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className='header-auth'>
                <div className='sub-head'>
                    <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'/>
                    <Link to='/'>
                        <button className='newActBtn'> Home </button>
                    </Link>  
                </div>
            </div>
            <hr className='lineAuth'></hr>
            <div className='lowerBottom'>
            <img className='bubble' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/CTA.png' alt='Create an account or sign in to create a game'/>
                <div className='CTA'></div>
                <div className='auth-form-cont'>
                    <div className='form-auth'>
                        <input 
                        placeholder='Email...'
                        onChange={(e)=> setEmail(e.target.value)}
                        className='email-input'
                        />
                        <input 
                        placeholder='Password...'
                        type='password'
                        onChange={(e)=> setPassword(e.target.value)}
                        className='pass-input'
                        />
                        <div>
                        <button onClick={signIn} className='auth-btn' >Sign In</button>
                        <button onClick={signInWithGoogle} className='reroute-button'>Sign in with Google</button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;