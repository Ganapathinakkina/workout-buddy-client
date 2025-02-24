import React, { useState } from 'react'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { PiPhoneCallFill } from 'react-icons/pi'
import emailjs from "emailjs-com";
import { useMediaQuery } from 'react-responsive'
import "./Contact.css"


const SERVICE_ID = "service_yri6s36";
const TEMPLATE_ID = "template_ae6sikj";
const PUBLIC_KEY = "GfbwuaxkSzcwAuIoP";

const Contact = () => {

  // const { isDarkMode } = useDarkMode();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 510px)" });


  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      newErrors.phone = "phone is optional";

    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      newErrors.phone = "phone is optional";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          current_year: new Date().getFullYear(),
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Failed to send message:", error);
          setStatus("Failed to send the message. Please try again.");
        }
      );

    setTimeout(() => {
      setStatus("");
    }, 4000);
  };

  return (
    <div className='contactPage'>
      <h1>Contact Us</h1>
      <div className="content">
        <p>We’d love to hear from you! Whether you have questions about our workouts, need support, or just want to share your fitness journey, we’re here to help.
          Have a question or a suggestion? Fill out the form below, and we’ll get back to you as soon as possible.</p>
      </div>
      <div className="formContent">
        <div className="contact_info">
          <div className="info">
            <h2>Contact Information</h2>
            <p>Say something to start a live chat!</p>
          </div>
          <div className="details">
            <div className="icons">
              <PiPhoneCallFill size={isSmallScreen ? 19 : 22} />
              <MdEmail size={isSmallScreen ? 19 : 22} />
              <MdLocationOn size={isSmallScreen ? 23 : 26} />
            </div>
            <div className="icons_info">
              <h2>+91 9133036250</h2>
              <h2>gananakkina@gmail.com</h2>
              <h2>Madhapur, Hyderabad, Telangana, 500081, India</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="form_details">
            <label htmlFor="first_name">
              <span>First Name</span>
              <input id="first_name" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </label>
            <label htmlFor="last_name">
              <span>Last Name</span>
              <input id="last_name" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </label>
          </div>
          <div className="form_details">
            <label htmlFor="email">
              <span>Email:</span>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}              </label>
            <label htmlFor="phone">
              <span>Phone:</span>
              <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p style={{ color: "orange" }} className="error">{errors.phone}</p>}
            </label>
          </div>
          <div className="subject">
            <label htmlFor="">Subject: </label>
            <div className="options">
              <label><input id="subject-project-inquiry" name="subject" type="radio" value="Project Inquiry" onChange={handleChange} /><span>Project Inquiry</span></label>
              <label><input id="subject-collaboration" name="subject" type="radio" value="Collaboration Opportunity" onChange={handleChange} /><span>Collaboration Opportunity</span></label>
              <label><input id="subject-feedback" name="subject" type="radio" value="Feedback or Suggestions" onChange={handleChange} /><span>Feedback or Suggestions</span></label>
              <label><input id="subject-general-inquiry" name="subject" type="radio" value="General Inquiry" onChange={handleChange} />General Inquiry</label>
            </div>
            {errors.subject && <p className="error">{errors.subject}</p>}
          </div>
          <div className="message">
            <label htmlFor="message">
              Message:
              <textarea id="message" name="message" rows="5" cols="100" maxLength="5000" placeholder="Your Message" value={formData.message} onChange={handleChange} />
              {errors.message && <p className="error">{errors.message}</p>}
            </label>
          </div>

          <div className="submit">
            <button type="submit">Send</button>
          </div>
          {status && (
            <p
              className="status"
              style={{
                fontSize: isSmallScreen ? "1.2rem" : "1.4rem",
                color: status.includes("successfully") ? "green" : "red",
              }}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Contact