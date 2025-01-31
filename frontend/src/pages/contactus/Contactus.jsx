import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div style={styles.app}>

      <main style={styles.mainContent}>
        <section style={styles.contactSection}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.text}>
            Have questions or need assistance? Reach out to us through any of the following ways:
          </p>
          <div style={styles.contactDetails}>
            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>Email</h3>
              <p style={styles.contactText}>welcometoeventcraft@gmail.com</p>
            </div>
            <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>Telephone</h3>
            <p style={styles.contactText}>01-4456789</p>
              <h3 style={styles.contactTitle}>Phone</h3>
              <p style={styles.contactText}>9812345678</p>
            </div>
            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>Address</h3>
              <p style={styles.contactText}>
                Boudha<br />
                Kathmandu<br />
              </p>
            </div>
          </div>
          <div style={styles.contactForm}>
            <h3 style={styles.contactTitle}>Send us a Message</h3>
            <form>
              <input type="text" placeholder="Your Name" style={styles.input} required />
              <input type="email" placeholder="Your Email" style={styles.input} required />
              <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
              <button type="submit" style={styles.submitButton}>Send</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url("/assets/images/bgg.jpg")',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#660000', // Header color
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '50px',
    marginRight: '10px' // Added margin to the right of the logo image
  },
  logoText: {
    fontSize: '1.25rem',
    color: '#fff',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  userActions: {
    display: 'flex',
    gap: '10px'
  },
  button: {
    backgroundColor: '#660000',
    border: '1px solid #660000',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
    textAlign: 'center',
  },
  contactSection: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#f5f5f5',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#f3f3f3',
    maxWidth: '700px',
    margin: '0 auto'
  },
  contactDetails: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  contactItem: {
    flexBasis: '30%',
    maxWidth: '300px',
    margin: '1rem',
    backgroundColor: '#444',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  contactTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#f5f5f5'
  },
  contactText: {
    fontSize: '1rem',
    color: '#f3f3f3'
  },
  contactForm: {
    backgroundColor: '#444',
    padding: '4rem',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px'
  },
  submitButton: {
    backgroundColor: '#660000',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#660000' // Footer color to match the header
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none'
  },
};

export default ContactUs;
