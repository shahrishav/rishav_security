import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    console.log('Verification Code:', verificationCode);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Reset password</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            style={styles.input}
          />
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your confirmation password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
    container: {
      backgroundImage: 'url("../../../public/assets/images/bg.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      padding: '2em',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '2em',
      marginBottom: '0.5em',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      alignSelf: 'flex-start',
      marginLeft: '1em',
      marginTop: '1em',
    },
    input: {
      padding: '1em',
      margin: '0.5em 0',
      borderRadius: '5px',
      border: 'none',
      width: '200%', // Make input fields longer
      maxWidth: '900px', // Maximum width for input fields
    },
    button: {
      padding: '1em 2em',
      backgroundColor: '#5e2be8', // Purple button
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '1em',
      width: '170%', // Make button longer
      maxWidth: '900px', // Maximum width for button
    },
  };

export default ResetPassword;
