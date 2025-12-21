import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      "service_pdf9ymo",
      "template_vhduyv3",
      form.current,
      "vCwOaTQBBdQFTgP5b"
    )
    .then((result) => {
      alert("Message received! I'll get back to you shortly.");
      console.log(result.text);
      setIsSending(false);
      e.target.reset();
    })
    .catch((error) => {
      alert("Something went wrong. Please try again or reach out via email directly.");
      console.log(error.text);
      setIsSending(false);
    });
  };

  const contactData = [
    {
      title: "Email",
      data: "afzalabdullah066@gmail.com",
      link: "mailto:afzalabdullah066@gmail.com",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    },
    {
      title: "WhatsApp",
      data: "(+92) 311 6702805",
      link: "https://api.whatsapp.com/send/?phone=923116702805&text&type=phone_number&app_absent=0",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    },
    {
      title: "LinkedIn",
      data: "Abdullah Afzal",
      link: "https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    }
  ];

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section__label">Collaborate</span>
          <h2 className="section__title">Let's Create Together</h2>
          <p className="section__subtitle">I'm currently available for freelance work and full-time opportunities.</p>
        </div>

        <div className="contact__container grid">
          <div className="contact__info">
            <h3 className="contact__column-title">Connect with me</h3>
            <div className="contact__cards">
              {contactData.map((contact, idx) => (
                <div className="contact__card" key={idx}>
                  <div className="contact__card-icon">{contact.icon}</div>
                  <div className="contact__card-body">
                    <h4 className="contact__card-title">{contact.title}</h4>
                    <span className="contact__card-data">{contact.data}</span>
                  </div>
                  <a href={contact.link} target="_blank" rel="noreferrer" className="contact__card-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__form-wrapper">
            <h3 className="contact__column-title">Drop me a message</h3>
            <form ref={form} onSubmit={sendEmail} className="contact__form">
              <div className="contact__form-grid">
                <div className="contact__form-div">
                  <input
                    type="text"
                    name="pname"
                    className="contact__form-input"
                    placeholder=" "
                    required
                  />
                  <label className="contact__form-label">Name</label>
                </div>

                <div className="contact__form-div">
                  <input
                    type="email"
                    name="email"
                    className="contact__form-input"
                    placeholder=" "
                    required
                  />
                  <label className="contact__form-label">Email</label>
                </div>
              </div>

              <div className="contact__form-div contact__form-area">
                <textarea
                  name="message"
                  className="contact__form-input"
                  placeholder=" "
                  required
                ></textarea>
                <label className="contact__form-label">Project Details</label>
              </div>

              <button className={`button button--large ${isSending ? 'is-sending' : ''}`} disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
                {!isSending && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="button__icon"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
