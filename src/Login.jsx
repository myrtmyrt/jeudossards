import {useForm} from "react-hook-form";
import {auth} from "./firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import background from "./assets/background.png";
import { TwoSeventyRingWithBg } from "react-svg-spinners";
import {toast} from "react-toastify";

const errorCodes = {
    'auth/user-not-found': 'Invalid email address',
    'auth/wrong-password': 'Invalid password',
    'auth/too-many-requests': 'Too many login attempts, please try again later',

}

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // set form errors
                console.error(errorCode, errorMessage)
                if (errorCodes[errorCode]) {
                    toast.error(errorCodes[errorCode])
                } else {
                    toast.error(errorMessage)
                }
                setLoading(false)
            });
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <img src={background} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5 bg-[#FFFFFFAA] backdrop-blur-sm p-10 rounded-2xl w-64 h-56">
                <input type="email" placeholder="email" {...register("email", {required: true})} className="border-b border-b-green-900 text-black p-1 focus:outline-0 focus:border-2 transition-all"/>
                <input type="password" placeholder="password" {...register("password", {required: true})} className="border-b border-b-green-900 text-black p-1 focus:outline-0 focus:border-2 transition-all"/>
                <button type="submit" value="Submit" className="rounded-lg bg-green-800 hover:bg-green-700 transition disabled:opacity-50 text-white px-10 py-1 flex gap-3" disabled={loading}>
                    Login {loading && <TwoSeventyRingWithBg color={"white"}/>}
                </button>
            </form>
        </div>
    )
}

export default Login
