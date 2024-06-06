import React from "react";
import SecondsCounter from "./SecondsCounter.jsx";

//create your first component
const Home = () => {
    return (
        <div className="Contador text-center">
			<SecondsCounter seconds={3434}/>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
        </div>
    );
};

export default Home;
