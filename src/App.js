import React from 'react';
import './App.scss';
import RegisterForm from './register/registerForm'
import LoginForm from './login/loginForm'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './authentication/PrivateRoute'
import MainGame from './game/game'


const App = () => {
  return (
    <Router className="App">
      <Route path='/register' component={RegisterForm} />
      <Route path='/login' component={LoginForm} />
      <PrivateRoute path='/game' component={MainGame} />
    </Router>
  );
}

export default App;
