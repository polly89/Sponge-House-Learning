import './CreateGame.css';
import {  signOut } from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, list } from 'firebase/storage';
import { Link, useNavigate} from 'react-router-dom';
import { FiLogOut, FiPlus, FiUpload, FiCheck } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import Dropdown from '../components/Dropdown';

function CreateGame(){
    const[title, setTitle] = useState('');
    const[backdrop, setBackdrop] = useState('');
    const[audio, setAudio] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [approvedAudio, setApprovedAudio] = useState('');
    const[category, setCategory] = useState('');
    const[answers, setAnswers] = useState('');
    const [detractors, setDetractors] = useState('');
    const [cover, setCover] = useState('');
    const [approved, setApproved] = useState(false);

    const navigate = useNavigate()
    const gamesCollectionRef = collection(db, 'games')
    
    const options = [
        {label: 'Build a house', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/build-a-house-3+(1).png'},
        {label: 'Feed the pig', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/feed-the-pig.png'},
        {label: 'Pick the apples', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/pick-apples.png'},
    ]

    const coverOptions = [
        {label: 'Purple monster with party hat.', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+1.png'},
        {label: 'Green monster with viking horns.', value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+2.png'},
        {label: 'Cute monster that looks like a ram.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+3.png'},
        {label: 'Red smarty pants monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+4.png'},
        {label: 'Blue Frankenstine monster. ',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+5.png'},
        {label: 'Green alien monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+6.png'},
        {label: 'Purple Stich monster.' ,value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+7.png'},
        {label: 'Happy orange monster.',value: 'https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Title+8.png'}
    ]
        
    const handleBackdropSelect = (option) => {
        setBackdrop(option);
      };

    
    const handleCoverSelect = (option)=>{
        setCover(option);
    }
    const onSubmitForm = async () => {
        try{
            await addDoc(gamesCollectionRef, {
            Title: title,
            Backdrop: backdrop,
            Category:category,
            Answers:answers,
            Detractors: detractors,
            cover: cover,
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
            </div>
            <div className='create-game-form-cont'>
                <div className='create-game-form'>
                    <div className='line-form'> <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/Vector+4.png' alt='corner vector' style={{maxWidth:"6%"}}/></div>
                    
                    <div className='inputs-create-game'>
                        <input 
                        placeholder='Enter a title'
                        onChange={(e)=> setTitle(e.target.value)}
                        />

                        <div 
                        className='category-selection'
                        onChange={(e)=> setCategory(e.target.value)}
                        >
                            <p>Choose a category: </p>
                            <input
                            type='radio'
                            value={category}
                            name='cateogry'
                            /> Reading
                            <input
                            type='radio'
                            value={category}
                            name='cateogry'
                            /> Math
                            <input
                            type='radio'
                            value={category}
                            name='cateogry'
                            /> Science
                            <input
                            type='radio'
                            value={category}
                            name='cateogry'
                            /> History
                        </div>
                        
                        <Dropdown 
                        options={options} 
                        value={backdrop} 
                        onChange={handleBackdropSelect} 
                        />

                        <input
                        className='answer'
                        placeholder='Seperate answers with a comma!'
                        value={answers}
                        onChange={(e)=> setAnswers(e.target.value)}
                        />
                        <input
                        className='detractor'
                        placeholder='Seperate detractors with a comma!'
                        value={detractors}
                        onChange={(e)=> setDetractors(e.target.value)}
                        />

                        <Dropdown 
                        options={coverOptions} 
                        value={cover} 
                        onChange={handleCoverSelect} 
                        />

                        <input
                        className='audio-upload'
                        type='file'
                        onChange={(e)=> setAudio(e.target.files[0])}
                        />
                        <FiUpload onClick={uploadAudio}/>
                        <dvi>
                          <audio controls src={audioUrl} /> 
                          <FiCheck onClick={(e)=> setApprovedAudio(audioUrl)}/>
                        </dvi>
                        
                        
                        
                    </div>
                
                        <button onClick={onSubmitForm}>Publish</button>
                    </div>
                    <div>
                    

                </div>
            </div>
            <div className='create-game-abby'>
                <img src='https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/create+game+abby.png' alt='Smiley girl with colorful circles' style={{maxWidth:"90%"}}/>
            </div>
        <button onClick={logout}>Logout</button>
        </div>
    </div>
    )
}
export default CreateGame;