import React from "react";
import './oauth.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/user.redux.js";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:8000/api/auth/google-signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                }),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log('Google Sign-In failed:', data.message);
                return;
            }
            else {
                dispatch(signInSuccess(data));
                console.log('Google Sign-In successful');
                console.log(data);
                navigate("/student-dashboard");
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="social-buttons-signin">
            <button className="social-btn google-btn-signin" aria-label="Sign in with Google" onClick={handleGoogleSignIn}>
                <span className="google-logo-signin"><img src="/google-color-svgrepo-com.svg" alt="Google logo" width="18" height="18" /></span>
                <span className="google-text-signin">Continue with Google</span>
            </button>
        </div>
    );
}