import React from 'react'
import { Button } from 'react-bootstrap'
import firebase from '../Firebase'
const Header = ({isLoggedIn=false}) => {
    return (
         <div className="app-header">
             <span>
                 To Do List
             </span>
             {
                 isLoggedIn?
             
             <Button onClick={e=>firebase.logout()}>
                 Logout
             </Button>:null
             }
        </div>
    )
}


export default Header
