import React from "react";
import Footer from "../components/Footer";
import "./About.css";
import James from '../images/employee1.png';
import Justin from '../images/employee2.png';
import Sky from '../images/employee3.jpg';
import Navbar from "../components/Navbar";
 
function About() {
  return (
    <div>
      <Navbar />
      <div className="about-us-container">
      <h1 className='animate__animated animate__slideInRight'>About Us</h1>
        <div className="about">
          <h6 className="animate__animated animate__slideInLeft">
            We are a customer complaints management company that aims to provide
            excellent customer service and resolve complaints efficiently.
          </h6>
        </div>
       </div>
       <div className="about-us-content">
        <p className="about-us-page__description"> 
          <h6 className="about-title">Our Mission</h6>  
          Our mission is to empower businesses with cutting-edge tools and technology
          to streamline the complaints management process. We strive to be the go-to 
          platform for businesses of all sizes and industries, offering comprehensive 
          solutions to effectively manage and resolve customer complaints in a timely and professional manner.
        </p>
        <p className="about-us-page__description">
          <h6 className="about-title">Our Expertise</h6>
          With years of experience in the field, our team of experts has developed a deep understanding 
          of the challenges and complexities associated with managing customer complaints. We leverage 
          our expertise to provide you with innovative and customized solutions that meet your unique requirements. 
          Our approach is customer-centric, focusing on delivering exceptional service to both businesses and their customers.
        </p>
        <p className="about-us-page__description">
          <h6 className="about-title">Why Choose Us ?</h6>
          <li>Efficient Complaints Management: Our platform is designed to streamline the complaints management process, ensuring quick and effective resolution, minimizing the impact on your business reputation.</li>
          <li>Customized Solutions: We understand that each business is unique, and we offer tailored solutions to meet your specific needs, regardless of your industry or size.</li>
          <li>Experienced Team: Our team consists of experienced professionals who are well-versed in complaints management and are dedicated to providing top-notch service to our customers.</li>
        </p>
        </div>
      <div className="about-us-page__employee-section">
        <h2 className="about-us-page__employee-section-title">Our Team</h2>
        <div className="about-us-page__employees">
          <div className="employee">
          <img src = {Sky} alt = "Sky James" className="employee-image" />
          <h3 className="employee-name">Sky James</h3>
          <p className="employee-position">CEO</p>
          </div>
          <div className="employee">
          <img src = {James} alt = "James Johnson" className="employee-image" />
          <h3 className="employee-name">James Johnson</h3>
          <p className="employee-position">COO</p>
          </div>
          <div className="employee">
          <img src = {Justin} alt = "Justin Clark" className="employee-image" />
          <h3 className="employee-name">Justin Clark</h3>
          <p className="employee-position">CFO</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;