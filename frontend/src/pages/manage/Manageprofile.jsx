import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EditProfile() {
  const [firstName, setFirstName] = useState('Prosiya');
  const [lastName, setLastName] = useState(' Shrestha');
  const [dob, setDob] = useState('23/08/2002');
  const [email, setEmail] = useState('pro123@gmail.com');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src="/assets/images/logo.png" alt="Logo" style={styles.logo} />
        </div>
        <h1 style={styles.title}>Event Craft</h1>
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Search" style={styles.searchInput} />
        </div>
        <Link to="/login" className="logout-button" style={styles.button}>Logout</Link>
      </header>
      <main style={styles.main}>
        <div style={styles.profileContainer}>
          <h2>Edit Profile</h2>
          <div style={styles.profilePictureContainer}>
            <img src="/assets/images/user.jpg" alt="Profile" style={styles.profilePicture} />
          </div>
          <div style={styles.field}>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} 
            style={styles.input} />
            </div>
            <div style={styles.field}>
              <label>Last Name:</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label>Date of Birth:</label>
              <input type="text" value={dob} onChange={e => setDob(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label>Email:</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
            </div>
            <button style={styles.saveButton}>Save</button>
          </div>
        </main>
        <footer style={styles.footer}>
          <a href="#contact" style={styles.footerLink}>Contact us</a>
          <a href="#about" style={styles.footerLink}>About us</a>
          <a href="#home" style={styles.footerLink}>Home</a>
        </footer>
      </div>
    );
  }

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f1f1f1',
      padding: '10px 20px',
    },
    logoContainer: {
      width: '40px',
      height: '40px',
    },
    logo: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
    },
    title: {
      margin: 0,
    },
    searchContainer: {
      flexGrow: 1,
      marginLeft: '10px',
    },
    searchInput: {
      width: '100%',
      padding: '5px',
    },
    button: {
      padding: '5px 10px',
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    },
    profileContainer: {
      width: '400px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      textAlign: 'center',
    },
    profilePictureContainer: {
      width: '100px',
      height: '100px',
      margin: '20px auto',
    },
    profilePicture: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
    },
    field: {
      margin: '10px 0',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
    },
    saveButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#6a0dad',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginTop: '20px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: '#f1f1f1',
    },
    footerLink: {
      margin: '0 10px',
      textDecoration: 'none',
    },
  };
  
  export default EditProfile;