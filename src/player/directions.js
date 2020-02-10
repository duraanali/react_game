import React, { useEffect, useState } from 'react'
import './directions.scss'
import { axiosWithAuth } from '../authentication/axiosAuth'

const Directions = props => {

    const [directions, setDirections] = useState({
        direction: ""
    })

    console.log('directions state', directions)

    //This handles wherever the player moves, sends a post request to the server indicating where the player has moved,
    useEffect(() => {
        axiosWithAuth()
            .post('https://lambdamudgame.herokuapp.com/move/', directions)
            .then(res => {
                console.log('from axios post request', res)
                props.setPlayer({ ...props.player, location: res.data.title, description: res.data.description, ...res.data })
            })
            .catch(err => console.log(err.response))
    }, [directions])

    const directionHandler = (e) => {
        //variable that holds the value on the 'div' clicked
        let buttonClicked = e.target.dataset.name
        // checks which 'div' was clicked
        if (buttonClicked === 'Up') {
            // update's state according to what has been clicked
            setDirections({ ...directions, direction: 'n' })
        }
        // checks which 'div' was clicked
        if (buttonClicked === 'Down') {
            // update's state according to what has been clicked
            setDirections({ ...directions, direction: 's' })
        }
        // checks which 'div' was clicked
        if (buttonClicked === 'Left') {
            // update's state according to what has been clicked
            setDirections({ ...directions, direction: 'w' })
        }
        // checks which 'div' was clicked
        if (buttonClicked === 'Right') {
            // update's state according to what has been clicked
            setDirections({ ...directions, direction: 'e' })
        }
    }

    return (
        <div className='allButtons' onClick={directionHandler}>
            <div className='upButton'>
                <button className='buttons' data-name='Up'>Up</button>
            </div>
            <div className='buttonsbottom'>
                <button className='buttons' data-name='Left'>Left</button>
                <button className='buttons' data-name='Down'>Down</button>
                <button className='buttons' data-name='Right'>Right</button>
            </div>
        </div>
    )
}

export default Directions