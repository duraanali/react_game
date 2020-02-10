import React, { useEffect, useState } from 'react'
import './game.scss'
import { axiosWithAuth } from '../authentication/axiosAuth'
import Directions from '../player/directions'
import Map from '../map/map'
import Sidebar from './sidebar'

const MainGame = () => {
    //all the rooms in our game
    const [rooms, setRooms] = useState()
    console.log('rooms', rooms)

    const [player, setPlayer] = useState({
        name: '',
        inventory: []
    })
    console.log('PLAYER', player)

    //This function is what set's the initial location of the player on state
    const currentLocationTracker = () => {
        let room_name;
        rooms.forEach(room => {
            room_name = room.title

            if (player.location === room_name) {
                // console.log('matching room', room.fields.n_to)
                setPlayer({
                    ...player,
                    location: room_name
                })
            }
        })
    }

    //Runs everytime the player's location get's updated 
    useEffect(() => {
        if (rooms !== undefined && player.n_to === 0 && player.s_to === 0 && player.e_to === 0 && player.w_to === 0) {
            currentLocationTracker()
        }
    })

    //fetchs all the rooms in our database
    useEffect(() => {
        axiosWithAuth()
            .get('https://lambdamudgame.herokuapp.com/rooms/')
            .then(res => {
                const rooms = res.data.rooms
                console.log('ROOMS IN USEEFFECT', rooms)
                setRooms(rooms)
            })
            .catch(err => console.log(err.response))
    }, [])

    //fetchs the player's current status on state
    useEffect(() => {
        axiosWithAuth()
            .get('https://lambdamudgame.herokuapp.com/init/')
            .then(res => {
                // console.log('AXIOS INIT GET', res.data)
                setPlayer({ ...player, name: res.data.name, location: res.data.title, players: res.data.players, description: res.data.description })
            })
            .catch(err => console.log(err.response))
    }, [])

    return (
        <div className='gameCanvas'>
            <div>
                <div className='mapArea'>
                    <Map rooms={rooms} setRooms={setRooms} player={player} />
                </div>
                <div className='bottomDiv'>
                    <div className='playersContainer'>
                        <div className='username'>Username: {player.name}</div>
                        <div className='playersTitle'>Player's in current room</div>
                        <div className='listOfPlayers'>
                            {player.players !== undefined ?
                                player.players.map(player => {
                                    return <div className='players'>{player}</div>
                                })
                                : null}
                        </div>
                    </div>
                    <Directions rooms={rooms} player={player} setPlayer={setPlayer} />
                </div>
            </div>
            <div className='sidebarArea'>
                <Sidebar props={player} rooms={rooms} />
            </div>
        </div>
    )
}

export default MainGame