import React from 'react'
import './sidebar.scss'
import Player from '../player/player'

const Sidebar = props => {
    console.log('PROPS FROM SIDEBAR', props)

    return (
        <div className='sidebar'>
            <div className='roomInfo'>
                <Player props={props.props} rooms={props.rooms} />
            </div>
            <div className='playerInfo'>
                <div className='inventoryTitle'>Player's Inventory
                    <div className='inventory'>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                        <div className='inventoryTiles'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar