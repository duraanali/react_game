import React, { useState } from 'react'
import './rooms.scss'

const Rooms = props => {
    // console.log('from rooms', props.rooms)
    let array2DRooms = []
    let grid = []
    let rooms = [
        {
            title: "Outside Cave Entrance",
            description: "North of you, the cave mount beckons",
            pk: 1,
            n_to: 2,
            s_to: 0,
            e_to: 0,
            w_to: 0,
            coords: {
                x: '',
                y: '',
            }
        },
        {
            title: "Foyer",
            description: "Dim light filters in from the south. Dusty↵passages run north and east.",
            pk: 2,
            n_to: 3,
            s_to: 1,
            e_to: 4,
            w_to: 0,
            coords: {
                x: '',
                y: '',
            }
        },
        {
            title: "Grand Overlook",
            description: "A steep cliff appears before you, falling↵into the darkness. Ahead to the north, a light flickers in↵the distance, but there is no way across the chasm.",
            pk: 3,
            n_to: 0,
            s_to: 2,
            e_to: 0,
            w_to: 0,
            coords: {
                x: '',
                y: '',
            }
        },
        {
            title: "Narrow Passage",
            description: "The narrow passage bends here from west↵to north. The smell of gold permeates the air.",
            pk: 4,
            n_to: 5,
            s_to: 0,
            e_to: 0,
            w_to: 2,
            coords: {
                x: '',
                y: '',
            }
        },
        {
            title: "Treasure Chamber",
            description: "You've found the long-lost treasure↵chamber! Sadly, it has already been completely emptied by↵earlier adventurers. The only exit is to the south.",
            pk: 5,
            n_to: 0,
            s_to: 4,
            e_to: 0,
            w_to: 0,
            coords: {
                x: '',
                y: '',
            }
        }
    ]

    // function that creates our 2d array
    const the2DArray = () => {
        // variable that holds our primary array
        let sub_arr = []
        // for loop used to come up with numbers for position x in our sub arrays
        for (let i = 0; i <= 9; i++) {
            // for loop used to come up with numbers for position y in our sub arrays
            for (let j = 0; j <= 9; j++) {
                // we push our sub array created to our primary array var
                sub_arr.push({ x: j, y: i })
                // variable that creates the grid with x and y coordinates
                let new_room = <div className='invisibleRooms' x={i} y={j}></div>
                // and we push the div to the grid 
                grid.push(new_room)
            }
        }
        // we assign our dummy variable to be our primary array
        return array2DRooms = sub_arr
    }
    the2DArray()

    // This function is that set's the coordinates of the rooms respectively
    const coordsSetter = (array2d, rooms) => {
        // we set the first room in a var
        let first_room = rooms[0]
        // we grab the position in the grid where we want to set the first room
        let array2d_coords = array2d[54]
        // here we will hold the new rooms with coordinates assigned to them
        let new_rooms = []

        // we hard code the coordinates of the first room 
        first_room.coords.x = array2d_coords.x
        first_room.coords.y = array2d_coords.y

        // double loop to iterate over the rooms and compare them
        for (let i = 0; i < rooms.length; i++) {
            for (let j = 0; j < rooms.length; j++) {
                // we check if there is a room that has the north set to a primary key of another room
                if (rooms[i].n_to === rooms[j].pk) {
                    // if it does, we set that room on the north's coordinate to be equal to the current room, substracting 1 from y to place it in the grid above the current room.
                    rooms[j].coords.x = rooms[i].coords.x
                    rooms[j].coords.y = rooms[i].coords.y - 1
                    // we push the room we found to the new rooms variable with it's respective coordinates
                    new_rooms.push(rooms[j])
                }
                // we check if there is a room that has the west set to a primary key of another room
                else if (rooms[i].w_to === rooms[j].pk) {
                    // if it does, we set that room on the west's coordinate to be equal to the current room, substracting 1 from x to place it in the grid to the left of the current room.
                    rooms[j].coords.x = rooms[i].coords.x - 1
                    rooms[j].coords.y = rooms[i].coords.y
                    // we push the room we found to the new rooms variable with it's respective coordinates
                    new_rooms.push(rooms[j])
                }
                // we check if there is a room that has the south set to a primary key of another room
                else if (rooms[i].s_to === rooms[j].pk) {
                    // if it does, we set that room on the south's coordinate to be equal to the current room, adding 1 to x to place it in the grid at the bottom of the current room.
                    rooms[j].coords.x = rooms[i].coords.x
                    rooms[j].coords.y = rooms[i].coords.y + 1
                    // we push the room we found to the new rooms variable with it's respective coordinates
                    new_rooms.push(rooms[j])
                }
                // we check if there is a room that has the east set to a primary key of another room
                else if (rooms[i].e_to === rooms[j].pk) {
                    // if it does, we set that room on the west's coordinate to be equal to the current room, adding 1 to y to place it in the grid to the right of the current room.
                    rooms[j].coords.x = rooms[i].coords.x + 1
                    rooms[j].coords.y = rooms[i].coords.y
                    // we push the room we found to the new rooms variable with it's respective coordinates
                    new_rooms.push(rooms[j])
                }
            }
        }

        // this variable hold the new rooms with no duplicates
        let unique_rooms = []
        // This for loop makes sure there is no rooms repetitive in the new rooms
        for (let i = 0; i < new_rooms.length; i++) {
            if (unique_rooms.indexOf(new_rooms[i]) === -1) {
                unique_rooms.push(new_rooms[i])
            }
        }
        // this is the second double for loop, and it is to go over the grid and place the rooms in it respectively
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < unique_rooms.length; j++) {
                // this checks if the rooms match the coordinates in the grid, if they do, it places the room in the grid
                if (array2d[i].x === unique_rooms[j].coords.x && array2d[i].y === unique_rooms[j].coords.y) {
                    let new_room = <div className='visibleRooms' x={unique_rooms[j].coords.x} y={unique_rooms[j].coords.y}>{unique_rooms[j].title}</div>
                    grid[i] = new_room
                }
            }
        }
        return grid
    }

    return coordsSetter(array2DRooms, rooms)
}

export default Rooms