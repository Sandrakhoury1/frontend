import React from 'react';
import './Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CardItem from '../components/CardItem';
import Customer from '../images/image-1.jpeg';
import Balance from '../images/5.png';
import Pic from '../images/About.png';
import Feedback from '../images/Testimonials.png';
import Time from '../images/time.jpeg';


function Home () {
    return (
        <>
        <Navbar />
        <div className='hero-container'>
            <h1 className='animate__animated animate__backInLeft'>Welcome To We Support</h1>
            <div className='hero-btns'>
            <button className='animate__animated animate__backInLeft btns'
                onClick={() => {window.location.href = '/complaints'}}>
            Complaints
            </button>
            <button className='animate__animated animate__backInRight btns'
                onClick={() => {window.location.href = '/about'}}>
            Who Are We?
            </button>
            </div>
        </div>
        <div className='cards'>
            <h1>Check Our Services!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                <div className='cards__items'>
            <CardItem
              src={Customer}
              text='We are ready to serve you'
              label='Customer Service'
            /> 
            <CardItem
              src={Balance}
              text='We provide expertise, commitment, and value to our clients'
              label='Balance'
            />
          </div>
          <div className='cards__items'>
            <CardItem
              src={Pic}
              text='We Support is a full-service firm offering the best customer service for all businesses'
              label='Company Profile'
            />
            <CardItem
              src={Feedback}
              text='We provide the best customer experience'
              label='Feedbacks'
            />
            <CardItem
              src={Time}
              text='We solve your problems right away'
              label='Improve Time'
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
);
}

export default Home;