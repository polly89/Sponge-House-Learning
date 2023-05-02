import './CreateGame.css';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link, useNavigate} from 'react-router-dom';
import { FiUpload, FiCheck } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Dropdown from '../components/Dropdown';


function CreateGame(){
    const navigate = useNavigate()
    const gamesCollectionRef = collection(db, 'games')
    
    //State for db
    const[title, setTitle] = useState('');
    const[backdrop, setBackdrop] = useState('');
    const [approvedAudio, setApprovedAudio] = useState('');
    const[answers, setAnswers] = useState('');
    const [cover, setCover] = useState('');
    
    //State for audio storage
    const[audio, setAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');

    // Options for backdrop and cover    
    const backdropOptions = [
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png' alt='Build a house' width='122px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png'},
        {label: <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig+(1).png' alt='Feed the pig' width='122px'/>, value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig+(1).png'},
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

    // Upload audio to storage and retrieve the url 
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

    // Upload game to db
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
        navigate('/')
        } catch(err){
            console.error(err)
        }   
    }
    
    // Logout functionality
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
                <Link to='/'>
                    <img className='logo' src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/FunLogo.png' alt='Sponge House Learning Logo'style={{maxHeight: '55px', marginTop: '.5vh'}}/>
                </Link>
                <Link to='/'>
                    <button className='newActBtn hover:bg-sky-500 active:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 'onClick={logout} > Logout </button>
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
                <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Create+game+monster.png' alt='Blue monster standing on a green hill' style={{maxWidth:"80%"}}/>
            </div>
            <div className='create-game-form-cont'>                    
            <div className='line-form'><img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Vector+4.png' alt='corner vector' style={{maxWidth:"6%"}}/></div>
                <div className='create-game-form'>
                    <div className='inputs-create-game'>
                        <div>
                            <p className='underline underline-offset-8'>Step 1: Name Your Activity:</p>
                           <input 
                            className="w-80 relative border rounded p-3 shadow bg-white w-full mt-2 hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                            placeholder='Ex: Fun with the Short A'
                            onChange={(e)=> setTitle(e.target.value)}
                            /> 
                        </div>

                        <div>
                            <p className='mt-4 underline underline-offset-8'>Step 3: Upload an Audio Prompt: </p>
                            <div className='flex flex-row'>
                            <input
                            className='w-80 relative rounded p-3 shadow bg-white w-full mt-2 text-slate-400 hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'
                            type='file'
                            onChange={(e)=> setAudio(e.target.files[0])}
                            />  
                            <FiUpload className='rounded-full mt-8 ml-2 text-2xl hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'onClick={uploadAudio}/> 
                            </div>
                            
                            <p className='mt-4 underline underline-offset-8'> Step 3: Listen & Confirm the Audio </p>
                            <div className='flex flex-row mt-4'>
                            <audio controls src={audioUrl} className='rounded-full hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300' /> 
                            <FiCheck className='rounded-full mt-6 ml-2 text-2xl hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300' onClick={(e)=> setApprovedAudio(audioUrl)}
                            />
                            </div>
                        </div>

                        <p className='mt-4 underline underline-offset-8'>Step 4: Add Your Answer </p>
                        <input
                        className='w-80 relative rounded p-3 shadow bg-white w-full mt-2 hover:bg-sky-200 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'
                        placeholder='Ex: pat'
                        value={answers}
                        onChange={(e)=> setAnswers(e.target.value)}
                        />
                        <p className='mt-4 underline underline-offset-8'>Step 5: Choose a Background & Cover</p>
                        <div className='flex flex-row mt-4'>
                            <Dropdown
                            options={backdropOptions} 
                            value={backdrop} 
                            onChange={(option, value)=>setBackdrop(option.value)} 
                            />
                            <Dropdown
                            options={coverOptions} 
                            value={cover} 
                            onChange={(option, value)=>setCover(option.value)} 
                            />
                        </div>
                    </div>
                        <button 
                        onClick={onSubmitForm}
                        className='publish hover:bg-sky-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>Publish</button>
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

// TO DOS:
// FIX BUG SO THAT THE OPTIONS ON THE DROPDOWN DISPLAY ONCE THEY'VE BEEN SELECTED
// ADD REROUTE TO PUBLISH ONCE MODAL HAS BEEN CREATED
