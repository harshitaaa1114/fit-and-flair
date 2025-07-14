import React from "react";
import { auth, provider } from "../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserHome from "../pages/UserHome";

const GoogleSignIn = () => {
     const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const response = await fetch("http://localhost:3000/user/google-signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: user.email,
                    name: user.displayName,
                }),
            });

            const data = await response.json();
            console.log(" Backend response:", data);

            if (data.message === "Google Sign-in Success") {
                alert("Sign In Success");
                setTimeout(() => {
            navigate("/user/home");
          }, 1000);
              
            } else {
                alert(" Sign In Failed");
            }
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            alert(" Something went wrong!");
        }
    };

    return (
        <button onClick={handleGoogleLogin} style={{ padding: '10px 20px' }}>
            Sign in with Google
        </button>
    
    );
};


export default GoogleSignIn;