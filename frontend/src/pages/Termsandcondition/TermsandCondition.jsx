import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <h2 style={styles.title}>Terms and Conditions</h2>
        <p style={styles.introText}>
          Welcome to Event Craft, your go-to platform for booking venues for various categories such as events, weddings, birthdays, and meetings. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully. If you do not agree with these terms and conditions, you should not use our website.
        </p>
        <div style={styles.termsContainer}>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>1. Acceptance of Terms</h3>
            <p style={styles.termText}>By using Event Craft, you agree to these terms and conditions and any other policies or guidelines we may post on the site.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>2. Privacy</h3>
            <p style={styles.termText}>Your privacy is important to us. Please review our Privacy Policy for information on how we collect, use, and disclose your personal information.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>3. Changes to Terms</h3>
            <p style={styles.termText}>We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the site following any changes signifies your acceptance of those changes.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>4. Registration and Account Security</h3>
            <p style={styles.termText}>You must provide accurate and complete information during the registration process and keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>5. Venue Listings</h3>
            <p style={styles.termText}>Event Craft provides a platform for venue owners to list their venues and for users to browse and book them. Venue owners are responsible for the accuracy and completeness of their venue listings. Event Craft is not responsible for any disputes or issues arising from venue listings or bookings.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>6. Use of the Website</h3>
            <p style={styles.termText}>You agree to use the website for lawful purposes and in a way that does not infringe the rights of or restrict the use and enjoyment of the site by any third party. You must not use the site to distribute any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>7. Booking Venues</h3>
            <p style={styles.termText}>All bookings are subject to the terms and conditions of the respective venue owner. Event Craft is not responsible for any cancellations, rescheduling, or changes to bookings. Please contact the venue owner directly for any issues related to bookings.</p>
          </div>
          <div style={styles.termBox}>
            <h3 style={styles.termTitle}>8. Termination</h3>
            <p style={styles.termText}>We reserve the right to terminate or suspend your account and access to the site at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users of the site, us, or third parties, or for any other reason.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    backgroundColor: '#660000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url("/assets/images/bgg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#660000',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '50px',
  },
  logoText: {
    marginLeft: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navSection: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#660000',
  },
  logoutButton: {
    color: '#fff',
    backgroundColor: '#660000',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
  main: {
    flex: 1,
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  introText: {
    marginBottom: '40px',
    fontSize: '18px',
  },
  termsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  termBox: {
    backgroundColor: '#444',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  termTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  termText: {
    fontSize: '16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#660000',
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default TermsAndConditions;
