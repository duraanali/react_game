import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

//STYLES
import 'semantic-ui-css/semantic.min.css';
import './registerForm.scss';

const RegisterForm = () => {
    //State for login credentials
    const [credentials, setCredentials] = useState({
        username: '',
        password1: '',
        password2: ''
    })
    console.log('state', credentials)

    //updates state as input changes 
    const changeHandler = (e) => {
        const inputCredentials = { ...credentials, [e.target.name]: e.target.value }
        setCredentials(inputCredentials)
    }
    //sends the credentials to the server ands in result, get's a JWT in return
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://lambdamudgame.herokuapp.com/api/registration/', credentials)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err.response))
    }

    return (
        <>
            <Form className='registerForm' onSubmit={submitHandler}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        placeholder='Username'
                        name='username'
                        value={credentials.username}
                        onChange={changeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        placeholder='Password'
                        name='password1'
                        value={credentials.password1}
                        onChange={changeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        placeholder='Confirm Password'
                        name='password2'
                        value={credentials.password2}
                        onChange={changeHandler}
                    />
                </Form.Field>
                {/* <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field> */}
                <Button type='submit'>Register</Button>
            </Form>
        </>
    )
}

export default RegisterForm