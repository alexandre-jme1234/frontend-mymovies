import styles from '../styles/Movie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Movie (props) {

    const heart = [];
    const [isLiked, setIsLiked] = useState(false);
    
        if(isLiked) {
            heart.push(<FontAwesomeIcon icon={faHeart} style={{ 'color': 'red' }}/>)
            props.handleSubmit(props.title);
        } else {
            heart.push(<FontAwesomeIcon icon={faHeart} />)
        }

    const stars = [];
    let n = 7;
    for (let i=0; i<9; i++) {
        if(n<=i) {
            stars.push(<FontAwesomeIcon icon={faStar} style={{ 'color': '#f1c40f' }}/>)
        } else {
            stars.push(<FontAwesomeIcon icon={faStar} />)
        }
    }
    return (
        <div className={styles.cardContainer}>
            <img style={{'border-radius': '5px'}} src={props.poster} height='70%' width='auto'/>
            <div className={styles.textContainer}>
            <div onClick={() => setIsLiked(!isLiked)} className={styles.heartButton}>
            {heart}
            </div> 
            <div style={{'font-size': '15px'}}>{props.title}</div>
            <div style={{'font-size': '10px'}}>{props.overview}</div>
            <div className={styles.notationStars}>
                {stars}
            </div>
            </div>
        </div>
    )
}

export default Movie;