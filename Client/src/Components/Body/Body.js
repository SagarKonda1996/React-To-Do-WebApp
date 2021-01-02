import React from 'react'
import { Container } from 'react-bootstrap'
import RouterOutlet from '../../Routes'

const Body = props => {
    return (
        <>
        <Container fluid className="App-body">
            <RouterOutlet/>
        </Container>
        </>
    )
}

export default Body
