import React from 'react'
import './home.css'
import Navb from '../Components/Navb'

const Home = () => {
  return (
    <>
    <Navb />
    <div className="front">
            <div className="page">
                <h1 className="heading">Your Own Password Manager</h1>
                <p className="title">Save and Organize Your Passwords</p>
            </div>
        </div>
        </>
  )
}

export default Home
