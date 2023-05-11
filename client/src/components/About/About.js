// -> About.js
import React from "react";

export default function About() {
    return (
        <div className="container">
            <h2 className="center">How to Use</h2>
            <h3>
                This website was created using React.js. <br /> Please click the
                tabs on the navigation bar to use the functions of the website.{" "}
                <br /> The <span style={{ color: "#ffff" }}>Champions</span> tab
                will display out all the existing champions cards and access to
                details inside. <br /> The{" "}
                <span style={{ color: "#ffff" }}>Players</span> tab will allow
                you to use the Riot API to search up individual player ranks and
                other information.
            </h3>
        </div>
    );
}
