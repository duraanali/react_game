import React, { useCallback, useState } from 'react'
import Rooms from '../rooms/rooms'
import './map.scss'

const GameMap = props => {

    console.log('MAP ROOMS in MAP', props.rooms)

    return (
        <div className='gameMap'>
            <div className='grid'>
                <Rooms rooms={props.rooms} setRooms={props.setRooms} />
            </div>

        </div>
    )
}

export default GameMap