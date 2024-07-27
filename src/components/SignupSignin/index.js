import React, { useState } from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth,db, provider } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,getDoc} from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    //authenticate the user
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setPassword("");
            setConfirmPassword("");
            setEmail("");
            createDoc(user);
            navigate('/dashboard');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("password", password);
    setLoading(true);
    if (email !== "" && password !== ""){
      signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      toast.success("User Logged In!");
      console.log("User logged in",user);
      setLoading(false);
      navigate('/dashboard');
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      toast.error(errorMessage);
    });
    }else{
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    //make sure doc with uid doesnt exist.
    //create doc
  if (!user) return;
  const userRef = doc(db,"users",user.uid);
  const userData = await getDoc(userRef);
  if(!userData.exists()){
    try{
      await setDoc(doc(db, "users",user.uid), {
  name: user.displayNmae ? user.displayName : name,
  email:user.email,
  photoURL: user.photoURL ? user.photoURL:"",
  createdAt:new Date(),
});
toast.success("Doc Created");
setLoading(false);
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
  }else{
    toast.error("Doc already exist");
    setLoading(false);
  }
  }

  function googleAuth(){
    setLoading(true);
    try{
      signInWithPopup(auth,provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user>>>",user);
    createDoc(user);
    navigate('/dashboard');
    toast.success("User Authenticated!");
    setLoading(false);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });
    }catch(e){
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className='signup-wrapper'>
          <h2 className='title'>Login on <span style={{ color: "var(--theme)" }}>Pennywise.</span></h2>
          <form>
            <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"abc@gmail.com"} />
            <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"abc@123"} />
            <Button disabled={loading}
              text={loading ? "Loading..." : "Login Using email and Password"} onClick={loginUsingEmail}></Button>
            <p className='p-login'> or </p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google"} blue={true}></Button>
            <p className='p-login'style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't have an account already? Click Here</p>
          </form>
        </div>
      ) : (
        <div className='signup-wrapper'>
          <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Pennywise.</span></h2>
          <form>
            <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} />
            <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"abc@gmail.com"} />
            <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"abc@123"} />
            <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"abc@123"} />
            <Button disabled={loading}
              text={loading ? "Loading..." : "Signup Using email and Password"} onClick={signupWithEmail}></Button>
            <p className='p-login'> or </p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"} blue={true}></Button>
            <p className='p-login'style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have an account already? Click Here</p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
