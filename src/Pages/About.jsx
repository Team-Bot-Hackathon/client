import React from 'react'
import { useDispatch } from 'react-redux'
import { setBanner } from '../store/user';

function About() {
    const dispatch=useDispatch();
    dispatch(setBanner(true))
    return (
        <div>
            About
        </div>
    )
}

export default About
