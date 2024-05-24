import React, { useState, useEffect } from 'react';
import './userForm.css'
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
        name: "",
        email: "",
        phone_number: "",
        dob: "",
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
        const { name, value, files } = e.target;
        if (name === "image") {
            setImage(files[0]);
        } else {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Reset errors
        setErrors({
            nameError: "",
            emailError: "",
            phoneNumberError: "",
            dobError: "",
            passwordError: "",
            imageError: ""
        });

        // Simple validation (you can improve this)
        let valid = true;
        if (inputValues.name === "") {
            setErrors((prevErrors) => ({ ...prevErrors, nameError: "Please enter a valid name" }));
            valid = false;
        }
        if (inputValues.email === "") {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: "Please enter a valid email address" }));
            valid = false;
        }
        if (!/^\d{10}$/.test(inputValues.phone_number)) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneNumberError: "Please enter a valid 10-digit phone number" }));
            valid = false;
        }  
   
        if (image === null) {
            setErrors((prevErrors) => ({ ...prevErrors, imageError: "Please select an image" }));
            valid = false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(inputValues.password)) {
            setErrors((prevErrors) => ({ ...prevErrors, passwordError: "Password must be at least 6 characters long, contain at least one letter, one number, and one special character" }));
            valid = false;
        }

        if (valid) {
            // Submit form logic
            console.log("Form submitted successfully", inputValues, image);
            inputValues['image']=image ;
            // Prepare form data
            const formData = new FormData();
            formData.append("name", inputValues.name);
            formData.append("email", inputValues.email);
            formData.append("phone_number", inputValues.phone_number);
            formData.append("dob", inputValues.dob);
            formData.append("password", inputValues.password);
            formData.append("image", image);
            console.log("Form submitted successfully", inputValues, image);
            // Perform API call or further processing
            try {
                const paymentStatusResponse = await combinedServices.saveUserData(formData);
                if (paymentStatusResponse.data.code === 200) {
                    toast("Form Submitted Successfully");
                     navigate("/");
                     setInputValues({
                        name: "",
                        email: "",
                        phone_number: "",
                        dob: "",
                        password: ""
                    })

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
                    <div className={`form-group form_grp ${errors.nameError ? 'error' : ''}`}>
                    <label htmlFor="name" className="label-size">Name</label>
                        <input
                            type="text"
                            className={`form-control form_ctrl ${errors.nameError ? 'error' : ''}`}
                            name="name"
                            value={inputValues.name}
                            placeholder="Enter Name"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.nameError}</small>
                    </div>
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
                    <div className={`form-group form_grp ${errors.phoneNumberError ? 'error' : ''}`}>
                    <label htmlFor="dob">Phone Nmber</label>
                        <input
                            type="text"
                            className={`form-control form_ctrl ${errors.phoneNumberError ? 'error' : ''}`}
                            name="phone_number"
                            value={inputValues.phone_number}
                            placeholder="Enter Phone Number"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.phoneNumberError}</small>
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
                    <div className={`form-group form_grp ${errors.imageError ? 'error' : ''}`}>
                        <label htmlFor="image">Select Image</label>
                        <input
                            type="file"
                            className={`form-control form_ctrl ${errors.imageError ? 'error' : ''}`}
                            name="image"
                            onChange={handleChange}
                        />
                        <small className='error_msg'>{errors.imageError}</small>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary loginButtons popFBtn  wd-100">Submit</button>
                </form>
                
            </div>
        </div>
    );
};
export default UserForm;