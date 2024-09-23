import React from "react";
import { BsArrowRight } from "react-icons/bs";
import "./Home.css";

const Home = () => {
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
            <p>
                < h1>Organize your < br /> work and life, finally.</h1 >
                Become focused, organized, and calm with todo app. The World's #1 task manager app.<br/><br/>
                <a href="/todo" className="make-btn">Create new Task <BsArrowRight /></a>
            </p>
            </div>
        </div>
    );
};
export default Home;