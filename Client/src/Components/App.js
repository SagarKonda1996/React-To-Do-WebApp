import { Button,Container } from "react-bootstrap";
import {useEffect,useState} from 'react';
import AppLayout from "./AppLayout";
import firebase from './Firebase';
import Login from './Login'
import Body from './Body'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [content, setContent] = useState();

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .getAccessToken()
          .then(d => {
            localStorage.setItem('accessToken', d);
            setContent(<AppLayout Body={<Body />} isLoggedIn={true}/>)
          })
          .catch(e => console.log(e));
      } else {
        console.log("here")
        setContent(<AppLayout Body={<Login/>} />);
      }
    });
  }, []);
  return (
    <>
          <ToastContainer />

    <Container fluid className="app-layout">
      {content}
    </Container>
    </>
  );
}

export default App;
