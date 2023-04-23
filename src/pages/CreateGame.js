import './CreateGame.css';
import {  signOut } from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, list } from 'firebase/storage';
import { Link, useNavigate} from 'react-router-dom';
import { FiUpload, FiCheck } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Dropdown from '../components/Dropdown';


function CreateGame(){
    //State for db
    const[title, setTitle] = useState('');
    const[backdrop, setBackdrop] = useState('');
    const [approvedAudio, setApprovedAudio] = useState('');
    const[answers, setAnswers] = useState('');
    const [cover, setCover] = useState('');
    const [approved, setApproved] = useState(false);
    
    //State for audio storage
    const[audio, setAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');

    const navigate = useNavigate()
    const gamesCollectionRef = collection(db, 'games')
    
    // Dropdown options for backdrop & cover
    // const backdropOptions = [
    //     {label: 'Build a house', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png'},
    //     {label: 'Feed the pig', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig.png'},
    //     {label: 'Pick the apples', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/pick-apples.png'},
    // ]

    // const coverOptions = [
    //     {label: 'Purple monster with party hat.', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+1.png'},
    //     {label: 'Green monster with viking horns.', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+2.png'},
    //     {label: 'Cute monster that looks like a ram.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+3.png'},
    //     {label: 'Red smarty pants monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+4.png'},
    //     {label: 'Blue Frankenstine monster. ',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+5.png'},
    //     {label: 'Green alien monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+6.png'},
    //     {label: 'Purple Stich monster.' ,value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+7.png'},
    //     {label: 'Happy orange monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+8.png'}
    // ]
        
    const backdropOptions = [
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png' alt='Build a house' width='122px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig.png' alt='Feed the pig' width='122px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/pick-apples.png' alt='Pick the apples' width='122px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/pick-apples.png'},
    ]
    const coverOptions = [
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+1.png'alt='cover1' width='80px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+1.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+2.png'alt='cover2' width='80px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+2.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+3.png' alt='cover3'width='80px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+3.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+4.png'alt='cover4' width='80px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+4.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+5.png'alt='cover5' width='80px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+5.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+6.png'alt='cover6' width='80px'/>,value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+6.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+7.png' alt='cover7'width='80px'/> ,value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+7.png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+8.png'alt='cover8' width='80px'/>,value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+8.png'}
    ]
    // BUG WITH NEW SYNTAX, OPTION DOESN'T SHOW AS SELECTED
    const handleBackdropSelect = (option, value) => {
        setBackdrop(option.value);
      };
    const handleCoverSelect = (option, value)=>{
        setCover(option.value);
    }
    // Upload to db
    const onSubmitForm = async () => {
        try{
            await addDoc(gamesCollectionRef, {
            Title: title,
            Backdrop: backdrop,
            Answers:answers,
            Cover: cover,
            Audio: approvedAudio, 
            Approved: false,

        } )
        console.log(audio)
        } catch(err){
            console.error(err)
        }
        
    }
    // Audio upload to storage && and url retrival for db
    let audioRef;
    const uploadAudio = async () => {
        if(!audio) return;
        audioRef = ref(storage, `audios/${audio.name + v4()}`); 
        try{
          await uploadBytes(audioRef, audio).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=> {
                setAudioUrl((url))
            })

          } 
        )} catch(err){
            console.error(err)
        }
        return audioRef
    } 
    useEffect(()=> {
        setAudioUrl(audioRef)
    }, [])
 
    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/')
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
            <div className='form-arrow'><img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/form-arrow.png' alt='arrow pointing at form' style={{maxWidth:"15%"}}/></div>
        </div>
        <hr className='lineForm'></hr>
        <div className='form-activity'>
            <div className='create-game-monster'>
                {/* <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Create+game+monster.png' alt='Blue monster standing on a green hill' style={{maxWidth:"80%"}}/> */}
                <button className='logout' onClick={logout}>Logout</button>
            </div>
            <div className='create-game-form-cont'>                    
            <div className='line-form'><img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Vector+4.png' alt='corner vector' style={{maxWidth:"6%"}}/></div>
                <div className='create-game-form'>
                    <div className='inputs-create-game'>
                        <div>
                            <p className='underline underline-offset-8'>Step 1: Name Your Activity:</p>
                           <input 
                            className="w-80 relative border rounded p-3 shadow bg-white w-full mt-2"
                            placeholder='Ex: Fun with the Short A'
                            onChange={(e)=> setTitle(e.target.value)}
                            /> 
                        </div>

                        <div>
                            <p className='mt-4 underline underline-offset-8'>Step 3: Upload an Audio Prompt: </p>
                            <div className='flex flex-row'>
                            <input
                            className='w-80 relative rounded p-3 shadow bg-white w-full mt-2 text-slate-400'
                            type='file'
                            onChange={(e)=> setAudio(e.target.files[0])}
                            />  
                            <FiUpload className='mt-8 ml-2 text-2xl'onClick={uploadAudio}/> 
                            </div>
                            
                            <p className='mt-4 underline underline-offset-8'> Step 3: Listen & Confirm the Audio </p>
                            <div className='flex flex-row mt-4'>
                            <audio controls src={audioUrl} /> 
                            <FiCheck className='mt-6 ml-2 text-2xl' onClick={(e)=> setApprovedAudio(audioUrl)}
                            />
                            </div>
                        </div>

                        <p className='mt-4 underline underline-offset-8'>Step 4: Add Your Answer </p>
                        <input
                        className='w-80 relative rounded p-3 shadow bg-white w-full mt-2 '
                        placeholder='Seperate answers with a comma!'
                        value={answers}
                        onChange={(e)=> setAnswers(e.target.value)}
                        />
                        <p className='mt-4 underline underline-offset-8'>Step 5: Choose a Background & Cover</p>
                        <div className='flex flex-row mt-4'>
                            <Dropdown
                            options={backdropOptions} 
                            value={backdrop} 
                            onChange={handleBackdropSelect} 
                            />
                            <Dropdown
                            options={coverOptions} 
                            value={cover} 
                            onChange={handleCoverSelect} 
                            />
                        </div>
           
                    </div>
                        <button 
                        onClick={onSubmitForm}
                        className='publish'>Publish</button>
                    </div>
                    <div>
                    

                </div>
            </div>
            <div className='create-game-abby'>
                <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/create+game+abby.png' alt='Smiley girl with colorful circles' style={{maxWidth:"90%"}}/>
            </div>
        
        </div>
    </div>
    )
}
export default CreateGame;