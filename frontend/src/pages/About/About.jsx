import React from 'react'
import './About.css';
import NavBar from '@/components/NavBar/NavBar';

const About = () => {
  return (
    <div className='w-full h-full flex items-center justify-center font-sans text-3xl font-semibold'>
        <NavBar />
        <div className='flex items-center justify-center flex-col text-center'>
        <p className='text-tertiary flex items-center justify-center w-2/4 mt-8 mb-5'>
        Cognito <span className='text-primary'>.io</span> &nbsp; is your one-stop shop for the latest tech news, reviews, and insights.
        </p>

        <p className='text-tertiary flex items-center justify-center w-2/4 mt-8 mb-5'>
        We're dedicated to breaking down complex tech topics into easy-to-understand articles. Whether you're a tech enthusiast, a business owner, or simply curious about the digital world, we've got you covered.
        </p>

        <p className='text-tertiary flex items-center justify-center w-2/4 mt-8 mb-5'>
        Our mission is to inform, inspire, and empower our readers to make informed decisions about technology.
        </p>

        <p className='text-tertiary flex items-center justify-center w-2/4 mt-8 mb-5'>
        Join our community of tech lovers and stay ahead of the curve.
        </p>
        </div>
    </div>
  )
}

export default About