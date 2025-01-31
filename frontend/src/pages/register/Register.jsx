// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import styled from "styled-components";
// import { registerUserApi } from "../../apis/Api";
// import "../register/register.css";

// const BackgroundContainer = styled.div`
//   width: 99vw; /* To avoid horizontal scrollbar */
//   height: 100vh; /* Adjust as needed */
//   overflow: hidden;
// `;

// const StyledContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

// const StyledCard = styled.div`
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   border-radius: 20px;
//   padding: 3rem;
//   width: 400px;
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
// `;

// const StyledInput = styled.div`
//   position: relative;
//   margin-bottom: 1.5rem;

//   input {
//     width: 100%;
//     padding: 1rem 1rem 1rem 3rem;
//     border: none;
//     border-radius: 50px;
//     background: rgba(255, 255, 255, 0.8);
//     font-size: 1rem;
//     transition: all 0.3s ease;

//     &:focus {
//       outline: none;
//       box-shadow: 0 0 0 2px #4ecdc4;
//     }
//   }

//   svg {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #ff6b6b;
//   }
// `;

// const PasswordToggle = styled.button`
//   position: absolute;
//   right: 1rem;
//   top: 50%;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #ff6b6b;
//   padding: 0;
//   margin: 0;
// `;

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phonenumber, setPhonenumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const data = {
//       fname: firstName,
//       lname: lastName,
//       email: email,
//       phone: phonenumber,
//       password: password,
//     };

//     registerUserApi(data)
//       .then((res) => {
//         if (res.status === 200) {
//           setTimeout(() => {
//             toast.success(res.data.message);
//             window.location.href = "/login";
//           }, 1000);
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           toast.error(err.response.data.message || "Something went wrong");
//         } else {
//           toast.error("Something went wrong");
//         }
//       });
//   };

//   return (
//     <BackgroundContainer>
//       <StyledContainer>
//         <StyledCard>
//           <h3 className="text-center mb-3" style={{ color: "black" }}>
//             Welcome Back!
//           </h3>
//           <form onSubmit={handleSubmit}>
//             <StyledInput>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </StyledInput>
//             <StyledInput>
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </StyledInput>
//             <StyledInput>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </StyledInput>
//             <StyledInput>
//               <input
//                 type="tel"
//                 placeholder="Phonenumber"
//                 value={phonenumber}
//                 onChange={(e) => setPhonenumber(e.target.value)}
//               />
//             </StyledInput>
//             <StyledInput>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <PasswordToggle
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible size={20} />
//                 ) : (
//                   <AiOutlineEye size={20} />
//                 )}
//               </PasswordToggle>
//             </StyledInput>
//             <StyledInput>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Re-enter password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <PasswordToggle
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible size={20} />
//                 ) : (
//                   <AiOutlineEye size={20} />
//                 )}
//               </PasswordToggle>
//             </StyledInput>
//             <div className="mb-3 form-check">
//               <input type="checkbox" className="form-check-input" id="terms" />
//               <label className="form-check-label" htmlFor="terms">
//                 I've read and agree with Terms of Service and our Privacy Policy
//               </label>
//             </div>
//             <button type="submit" className="btn btn-primary w-100 mb-2">
//               Sign up
//             </button>
//             <div className="text-center mb-2">OR</div>
//             <button type="button" className="btn btn-danger w-100 mb-2">
//               Sign up with Google
//             </button>
//             <p className="text-center mt-3">
//               Already have an account? <Link to="/login">Log in</Link>
//             </p>
//           </form>
//         </StyledCard>
//       </StyledContainer>
//     </BackgroundContainer>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { registerUserApi } from "../../apis/Api";
import "../register/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      fname: firstName,
      lname: lastName,
      email: email,
      phone: phonenumber,
      password: password,
    };

    registerUserApi(data)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            toast.success(res.data.message);
            window.location.href = "/login";
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div className="background-container">
      <div className="styled-container">
        <div className="styled-card">
          <h3 className="text-center mb-3" style={{ color: "black" }}>
            Welcome Back!
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="styled-input">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="styled-input">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="styled-input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="styled-input">
              <input
                type="tel"
                placeholder="Phonenumber"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="styled-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <div className="styled-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                I've read and agree with Terms of Service and our Privacy Policy
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">
              Sign up
            </button>
            <div className="text-center mb-2">OR</div>
            <button type="button" className="btn btn-danger w-100 mb-2">
              Sign up with Google
            </button>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
