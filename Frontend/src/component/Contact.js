// import React, { useState, useEffect } from "react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaRegEdit,
//   FaCommentDots,
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaTwitter,
// } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./Navbar";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const isValidEmail = (email) => {
//     const regex = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i;
//     return regex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidEmail(formData.email)) {
//       toast.error("❌ Please enter a valid email.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/form/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("✅ Message sent successfully!");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         toast.error(data.message || "❌ Submission failed.");
//       }
//     } catch (error) {
//       toast.error("❌ Server error. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @media (max-width: 768px) {
//         .contact-container {
//           flex-direction: column;
//         }
//       }

//       .contact-social a:hover {
//         color: #9c5c34;
//         transform: scale(1.1);
//       }

//       input:focus, textarea:focus {
//         border-color: #9c5c34;
//         box-shadow: 0 0 8px rgba(156, 92, 52, 0.3);
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   return <>
//   <Navbar/>
//     <div style={styles.page}>
//       <ToastContainer />
//       <div style={styles.container} className="contact-container">
//         {/* Left Column with Image */}
//         <div style={styles.left}>
//           <div style={styles.overlay}>
//             <h2 style={styles.heading}>Get in Touch</h2>
//             <p style={styles.text}>
//               We're here to help you find your perfect fit. Drop us a message —
//               fashion advice or feedback, we're all ears!
//             </p>
//             <div style={styles.socials} className="contact-social">
//               <a href="#" style={styles.icon}><FaFacebook /></a>
//               <a href="#" style={styles.icon}><FaInstagram /></a>
//               <a href="#" style={styles.icon}><FaLinkedin /></a>
//               <a href="#" style={styles.icon}><FaTwitter /></a>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Contact Form */}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           {[
//             { label: "Full Name", icon: <FaUser />, name: "name", type: "text", placeholder: "Enter full name" },
//             { label: "Email", icon: <FaEnvelope />, name: "email", type: "email", placeholder: "Enter email address" },
//             { label: "Subject", icon: <FaRegEdit />, name: "subject", type: "text", placeholder: "Enter subject" },
//           ].map((field, idx) => (
//             <div style={styles.group} key={idx}>
//               <label style={styles.label}>{field.label}</label>
//               <div style={styles.inputWrapper}>
//                 <span style={styles.inputIcon}>{field.icon}</span>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={field.placeholder}
//                   required
//                   style={styles.input}
//                 />
//               </div>
//             </div>
//           ))}

//           <div style={styles.group}>
//             <label style={styles.label}>Message</label>
//             <div style={styles.inputWrapper}>
//               <FaCommentDots style={styles.inputIcon} />
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Type your message..."
//                 required
//                 rows="3"
//                 style={styles.textarea}
//               ></textarea>
//             </div>
//           </div>

//           <button type="submit" style={styles.button}>Send Message</button>
//         </form>
//       </div>
//     </div>
//   </>
// };

// const styles = {
//   page: {
//     background: "linear-gradient(to right, #fce8dd, #f8e0cf)",
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "60px 30px",
//     fontFamily: "'Poppins', sans-serif",
//   },
//   container: {
//     display: "flex",
//     flexDirection: "row",
//     //width: "80%",
//     //maxWidth: "800px",
//     borderRadius: "20px",
//     backdropFilter: "blur(14px)",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     gap: "40px",
//      maxHeight: "550px",  
//             // reduced padding
//   width: "95%",
//   maxWidth: "750px",       
//     overflow: "hidden",
//   },
//   left: {
//     flex: 1,
//     backgroundImage: "url('/assets/contact1.jpg')", // Replace with actual path
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "30px",
//   },
//   overlay: {
//     backgroundColor: "rgba(255, 255, 255, 0.7)",
//     padding: "30px",
//     borderRadius: "12px",
//     textAlign: "center",
//     color: "#5D432C",
//   },
//   heading: {
//     fontSize: "32px",
//     fontWeight: "700",
//     fontFamily: "'Playfair Display', serif",
//     marginBottom: "16px",
//     color: "#7c4a36",
//   },
//   text: {
//     fontSize: "15px",
//     marginBottom: "24px",
//     lineHeight: "1.5",
//   },
//   socials: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "16px",
//   },
//   icon: {
//     fontSize: "22px",
//     color: "#5D432C",
//     transition: "0.3s",
//   },
//   form: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: "18px",
//     padding: "30px",
//     backgroundColor: "rgba(255, 255, 255, 0.05)",
//   },
//   group: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//   },
//   label: {
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#5D432C",
//   },
//   inputWrapper: {
//     display: "flex",
//     alignItems: "center",
//     border: "1px solid rgba(156,92,52,0.2)",
//     backgroundColor: "rgba(255,255,255,0.08)",
//     borderRadius: "10px",
//     padding: "10px 14px",
//   },
//   inputIcon: {
//     color: "#5D432C",
//     fontSize: "16px",
//     marginRight: "10px",
//   },
//   input: {
//     flex: 1,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     color: "#5D432C",
//     fontSize: "15px",
//   },
//   textarea: {
//     flex: 1,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     color: "#5D432C",
//     fontSize: "15px",
//     resize: "vertical",
//     minHeight: "60px",
//     maxHeight: "100px",
//   },
//   button: {
//   padding: "14px 28px",
//   backgroundImage: "url('/assets/contact1.jpg')", // Replace with your image path
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   color: "#7c4a36",
//   fontWeight: "600",
//   fontSize: "16px",
//   border: "none",
//   borderRadius: "12px",
//   cursor: "pointer",
//   transition: "0.3s ease",
//   boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
// }


// };

// export default ContactPage;

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaRegEdit,
  FaCommentDots,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) => {
    const regex = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error("❌ Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/form/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "❌ Submission failed.");
      }
    } catch (error) {
      toast.error("❌ Server error. Please try again.");
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (max-width: 768px) {
        .contact-container {
          flex-direction: column !important;
        }
      }

      .contact-social a:hover {
        color: #9c5c34;
        transform: scale(1.1);
      }

      input:focus, textarea:focus {
        border-color: #9c5c34;
        box-shadow: 0 0 8px rgba(156, 92, 52, 0.3);
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <ToastContainer />
        <div style={styles.container} className="contact-container">
          {/* Left Column with Image */}
          <div style={styles.left}>
            <div style={styles.overlay}>
              <h2 style={styles.heading}>Get in Touch</h2>
              <p style={styles.text}>
                We're here to help you find your perfect fit. Drop us a message — fashion advice or feedback, we're all ears!
              </p>
              <div style={styles.socials} className="contact-social">
                <a href="#" style={styles.icon}><FaFacebook /></a>
                <a href="#" style={styles.icon}><FaInstagram /></a>
                <a href="#" style={styles.icon}><FaLinkedin /></a>
                <a href="#" style={styles.icon}><FaTwitter /></a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {[
              { label: "Full Name", icon: <FaUser />, name: "name", type: "text", placeholder: "Enter full name" },
              { label: "Email", icon: <FaEnvelope />, name: "email", type: "email", placeholder: "Enter email address" },
              { label: "Subject", icon: <FaRegEdit />, name: "subject", type: "text", placeholder: "Enter subject" },
            ].map((field, idx) => (
              <div style={styles.group} key={idx}>
                <label style={styles.label}>{field.label}</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>{field.icon}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            ))}

            <div style={styles.group}>
              <label style={styles.label}>Message</label>
              <div style={styles.inputWrapper}>
                <FaCommentDots style={styles.inputIcon} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  required
                  rows="3"
                  style={styles.textarea}
                ></textarea>
              </div>
            </div>

            <button type="submit" style={styles.button}>Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to right, #fce8dd, #f8e0cf)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    maxWidth: "800px",
    borderRadius: "20px",
    backdropFilter: "blur(14px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    gap: "30px",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    backgroundImage: "url('/assets/contact1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#5D432C",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "16px",
    color: "#7c4a36",
  },
  text: {
    fontSize: "15px",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  icon: {
    fontSize: "22px",
    color: "#5D432C",
    transition: "0.3s",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5D432C",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(156,92,52,0.2)",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "10px 14px",
  },
  inputIcon: {
    color: "#5D432C",
    fontSize: "16px",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#5D432C",
    fontSize: "15px",
  },
  textarea: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#5D432C",
    fontSize: "15px",
    resize: "vertical",
    minHeight: "60px",
    maxHeight: "100px",
  },
  button: {
    padding: "14px 28px",
    backgroundImage: "url('/assets/contact1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#7c4a36",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
};

export default ContactPage;
