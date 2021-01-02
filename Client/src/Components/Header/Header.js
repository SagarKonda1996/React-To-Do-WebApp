import React from 'react'
import { Button } from 'react-bootstrap'
import firebase from '../Firebase'
const Header = props => {
    return (
         <div className="app-header">
             <span>
                 To Do List
             </span>
             <Button onClick={e=>firebase.logout()}>
                 Logout
             </Button>
        </div>
    )
}


export default Header
