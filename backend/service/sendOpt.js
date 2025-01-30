const axios = require('axios')

const sendOtp = async (phone, otp) => {

    // setting state
    let isSent = false;

    // Url to send otp
    const url = 'https://api.managepoint.co/api/sms/send'

    // payload to send
    const payload = {
        'apiKey' : 'f601949c-c422-4ef2-850e-0cba5015dac3',
        'to' : phone,
        'message' : `Your verification code is ${otp}`
    }

    try {
        const res = await axios.post(url, payload)
        if(res.status === 200){
            isSent = true;
        }
        
    } catch (error) {
        console.log('Error Sending OTP' , error.message)
    }

    return isSent;



}

module.exports = sendOtp;