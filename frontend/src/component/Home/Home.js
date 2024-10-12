import React from "react";
import { BsArrowRight } from "react-icons/bs";
import "./Home.css";

const Home = () => {
    let userId = sessionStorage.getItem("Id");
    let redirect = "SignUp";
    if(userId) {
        redirect = "todo";
    }
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
            <p>
                < h1>Organize your < br /> work and life, finally.</h1 >
                Become focused, organized, and calm with todo app. The World's #1 task manager app.<br/><br/>
                <a href={"/#/"+redirect} className="make-btn">Create new Task <BsArrowRight /></a>
            </p>
            </div>
        </div>
    );
};
export default Home;