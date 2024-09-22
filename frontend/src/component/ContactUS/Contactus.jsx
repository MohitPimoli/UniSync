import React, { useState } from 'react';
import './ContactC.css';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data: ', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Let’s have a talk</h1>
        <div className="flamingo"></div> {/* Flamingo image styling */}
      </div>

      {/* Contact Info & Form Section */}
      <div className="contact-details">
        <div className="meet-us">
          <h2>Meet us</h2>
          <p><i className="fas fa-phone"></i> +91 8193921510</p>
          <p><i className="fas fa-envelope"></i> noreply.unisync@gmail.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Haldwani, Nanital - 263139</p>
        </div>

        <div className="pitch-us">
          <h2>Pitch us</h2>
          <form onSubmit={handleSubmit}>
            <p>Hello,</p>
            <p>
              my name is <input
                type="text"
                placeholder="your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              and my e-mail address is <input
                type="email"
                placeholder="your e-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              I would like to discuss about <input
                type="text"
                placeholder="this project"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </p>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
