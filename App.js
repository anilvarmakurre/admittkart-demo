import { AiFillSignal, AiOutlineWifi } from "react-icons/ai";
import { BsBatteryFull } from "react-icons/bs";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, getAuth,signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import './App.css'

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [phone,setPhone]=useState("");
  
  
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify()  {
    if (!window.recaptchaVerifier) {
    
    const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {size: "invisible",
callback: (response) => {
  console.log(response)
 
  onSignup();
  
},
"expired-callback": () => {
  console.log("time is over")
},});
    
    }
  }

  

  function onSignup() {
    setPhone(ph.slice(2,))
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    
    console.log(phone)
    const formatPh = "+" + ph;
    console.log(formatPh)

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        
      });
  }

  const startAgain=()=>{
    setShowOTP(false);
    setUser(null);
  }
 
  function onOTPVerify() {
   
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        
      })
      .catch((err) => {
        console.log(err);
        
      });
  }
  const renderSuccessPage=()=>{
    return(
      <div className="login-bg">
        <img src="https://res.cloudinary.com/dpedvkbnr/image/upload/v1695673130/Artboard_1_mhe603.png" alt="success"/>
        <div className="text-container">
        <h1>Welcome To Admitkart</h1>
        <p>In order to provide you with a custom experience,<br/><span className="span">we need to ask you a few questions.</span></p>
        </div>
        <button className="login-button button" type="button" onClick={startAgain}>Get Started</button>
  <p className="para-2">*This will only take 5 min.</p>      
  
      </div>
    )

  }

  const renderInitialPage=()=>{

    
  return (
    <div  className='login-bg'  >
        <img  className="logo-image" src="https://res.cloudinary.com/dpedvkbnr/image/upload/v1695673100/AK_logo_hhuh38.png" alt="company-logo"/>
        <div className='login-inner'>
          <p className="title">Welcome Back</p>
          <p className="para-normal">Please sign in to your account</p>
         <div className="input-container">
          <label className="label" htmlFor="input">Enter Contact Number</label>
         <PhoneInput  id ="input" country={"in"} value={ph}  onChange={setPh} />
         </div>
          <p className="login-para para-normal">We will send you a one time SMS message,Charges may apply</p>
        </div>
        <button className="login-button" type="button" onClick={onSignup}>Sign in with OTP</button>
        <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      </div>
  );
};
  

  const resendButton=()=>{
    setShowOTP(false);
    setUser(null)
  }

  const renderOTPpage=()=>{
    return(
      <div className="login-bg">
        <div className="otp-inner">
        <div className="otp-top-container">
          <p>9:45</p>
          <div className="icon-container">
<AiFillSignal/>
<AiOutlineWifi/>
<BsBatteryFull/>
          </div>
        </div>
        <img className="otp-image" src="https://res.cloudinary.com/dpedvkbnr/image/upload/v1695673143/undraw_confirmed_81ex_rdtkzi.png" alt="otp-logo"/>
        <div className="text-container">
        <p className="verify-para">Please verify Mobile Number</p>
      <button className="change-button" type="button">Change Phone number</button>
        </div>
      
        <p>An OTP Sent to +91{phone}</p>
        <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <p>Didn't receive the code ?<button  className="resend-button" type="button" onClick={resendButton}>Resend</button></p>
                <button type="button" className="login-button" onClick={onOTPVerify}>verify</button>

        </div>
        
      </div>
    )
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (renderSuccessPage()) : (showOTP ? (renderOTPpage() ) : (renderInitialPage())
        )}
      </div>
    </section>
  );
};

export default App;
