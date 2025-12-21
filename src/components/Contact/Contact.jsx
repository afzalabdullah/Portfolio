import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_pdf9ymo",
      "template_vhduyv3",
      form.current,
      "vCwOaTQBBdQFTgP5b"
    )
    .then((result) => {
      alert("Email sent successfully!");
      console.log(result.text);
    })
    .catch((error) => {
      alert("Failed to send email. Please try again.");
      console.log(error.text);
    });

    e.target.reset();
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Inbox</span>
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">Have a project in mind? Let's talk about it.</p>
        </div>

        <div className="contact__container">
          <div className="contact__content">
            <h3 className="contact__title">Contact Information</h3>
            
            <div className="contact__info">
              <div className="contact__card">
                <span className="contact__card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <h3 className="contact__card-title">Email</h3>
                <span className="contact__card-data">afzalabdullah066@gmail.com</span>
                <a href="mailto:afzalabdullah066@gmail.com" className="contact__card-button">
                  Write me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>

              <div className="contact__card">
                <span className="contact__card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <h3 className="contact__card-title">WhatsApp</h3>
                <span className="contact__card-data">(+92) 311 6702805</span>
                <a href="https://api.whatsapp.com/send/?phone=923116702805&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="contact__card-button">
                  Write me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>

              <div className="contact__card">
                <span className="contact__card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </span>
                <h3 className="contact__card-title">LinkedIn</h3>
                <span className="contact__card-data">Abdullah Afzal</span>
                <a href="https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/" target="_blank" rel="noreferrer" className="contact__card-button">
                  Write me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contact__content">
            <h3 className="contact__title">Send me a Message</h3>
            <form ref={form} onSubmit={sendEmail} className="contact__form">
              <div className="contact__form-div">
                <label className="contact__form-tag">Name</label>
                <input
                  type="text"
                  name="pname"
                  className="contact__form-input"
                  placeholder="Insert your name"
                  required
                />
              </div>

              <div className="contact__form-div">
                <label className="contact__form-tag">Email</label>
                <input
                  type="email"
                  name="email"
                  className="contact__form-input"
                  placeholder="Insert your email"
                  required
                />
              </div>

              <div className="contact__form-div contact__form-area">
                <label className="contact__form-tag">Message</label>
                <textarea
                  name="message"
                  className="contact__form-input"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>

              <button className="button button--large">
                Send Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="button__icon"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
