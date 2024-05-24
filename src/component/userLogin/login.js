import React, { useState, useEffect } from 'react';
import './login.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import newLogo from "../../assets/logo192.png";
import combinedServices from '../../services/services'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [inputValues, setInputValues] = useState({ 
        email: "",      
        password: ""
    });

    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        phoneNumberError: "",
        passwordError: "",
        dobError: ""
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
    
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
   
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Reset errors
        setErrors({        
            emailError: "",      
            passwordError: "",
      
        });

        // Simple validation (you can improve this)
        let valid = true;        
        if (inputValues.email === "") {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: "Please enter a valid email address" }));
            valid = false;
        }     
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(inputValues.password)) {
            setErrors((prevErrors) => ({ ...prevErrors, passwordError: "Password must be at least 6 characters long, contain at least one letter, one number, and one special character" }));
            valid = false;
        }

        if (valid) {
            // Submit form logic
            console.log("Form submitted successfully", inputValues);    
            inputValues.category = "User"
            // Perform API call or further processing
            try {
                const Response = await combinedServices.userLogin(inputValues);
                if (Response.data.code === 200) {
                    toast("Form Submitted Successfully");
                    localStorage.setItem('token', Response.data.data.token)
                     navigate("/userData");
                } else {
                    toast.error("Form submission failed");
                }
            } catch (error) {
                toast.error("An error occurred during form submission");
            }
        }
    };
    

    return (
        <div className="container-fluid adminLogin fade_wrapper">
            <div className='login_wrapper box_wrapper'>
                <div className='form_logo'>
                    <img src={newLogo} alt="logo" className="small-image" />
                </div>
                <form>                   
                    <div className={`form-group form_grp ${errors.emailError ? 'error' : ''}`}>
                    <label htmlFor="dob">Email</label>
                        <input
                            type="email"
                            className={`form-control form_ctrl ${errors.emailError ? 'error' : ''}`}
                            name="email"
                            value={inputValues.email}
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.emailError}</small>
                    </div>                 
                     <div className={`form-group form_grp ${errors.passwordError ? 'error' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={`form-control form_ctrl ${errors.passwordError ? 'error' : ''}`}
                            name="password"
                            value={inputValues.password}
                            placeholder="Enter Password"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.passwordError}</small>
                    </div>                  
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary loginButtons popFBtn  wd-100">Submit</button>
                </form>
                <div className="signup-link-container">
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
            </div>
        </div>
    );
};
export default UserForm;