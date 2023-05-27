import React, { useState } from "react";
import './ContactUs.css';
import emailjs from "emailjs-com";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    if (name && email && message) {
    event.preventDefault();

    emailjs.sendForm('service_y9uq65l', 'template_a5ic8sv', event.target, 'NBk9kBIKUiW_p3ESR')
      .then((response) => {
        console.log(response.text);
      }, (error) => {
        console.log(error.text);
      });

    setName('');
    setEmail('');
    setMessage('');
    } else {
      alert ("Please fill in all fields");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="contact-form__input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="contact-form__input"
        />
        <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="contact-form__textarea"
        ></textarea>
        <button type="submit" className="contact-form__submit-btn">
        Submit
        </button>
    </form>
    );
  };
        
export default ContactUs;