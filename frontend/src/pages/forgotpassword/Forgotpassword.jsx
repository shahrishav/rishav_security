import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api';

const ForgotPassword = () => {
  const [phonenumber, setPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phonenumber)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      const res = await forgotPasswordApi({ phonenumber });
      if (res.status === 200) {
        toast.success(res.data.message);
        setIsSent(true);
      } else {
        throw new Error(res.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error('Please enter the OTP and the new password');
      return;
    }

    const data = {
      phonenumber,
      otp,
      newPassword,
    };

    try {
      const res = await verifyOtpApi(data);
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        throw new Error(res.data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3 style={styles.heading}>Forgot Password</h3>
        <form onSubmit={handleSendOtp} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="phonenumber" style={styles.label}>Phone Number</label>
            <div className='d-flex'>
              <span style={styles.prefix}>+977</span>
              <input
                disabled={isSent}
                onChange={(e) => setPhone(e.target.value)}
                type='tel'
                className='form-control'
                placeholder='Enter valid phone number'
                value={phonenumber}
                style={styles.formControl}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            style={styles.submitButton}
          >
            Send OTP
          </button>

          {isSent && (
            <>
              <hr />
              <p style={styles.infoText}>OTP has been sent to {phonenumber} ✅</p>
              <div style={styles.formGroup}>
                <label htmlFor="otp" style={styles.label}>OTP</label>
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder='Enter valid OTP Code!'
                  type='text'
                  className='form-control'
                  value={otp}
                  style={styles.formControl}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="newPassword" style={styles.label}>New Password</label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type='password'
                  className='form-control mt-2'
                  placeholder='Set New Password!'
                  value={newPassword}
                  style={styles.formControl}
                  required
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                style={styles.submitButton}
              >
                Verify OTP & Set Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#333',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  formControl: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1.25rem',
    backgroundColor: 'purple',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  prefix: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '8px',
    fontSize: '1rem',
    color: '#fff',
  },
  infoText: {
    textAlign: 'center',
    color: '#fff',
  },
};

export default ForgotPassword;
