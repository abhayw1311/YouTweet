import React from "react";
import { Logo, Button, Input } from "./index"; // Custom components
import { useForm } from "react-hook-form";// Hook for form handling
import { useNavigate } from "react-router-dom";// Hook for navigation
import { getCurrentUser, userLogin } from "../store/Slices/authSlice.js";// Redux actions for authentication
import { Link } from "react-router-dom";// Component for navigation links
import { useDispatch, useSelector } from "react-redux";// Hooks for Redux state management
import LoginSkeleton from "../skeleton/loginSkeleton.jsx";// Loading component

function Login() {
    const { // Destructuring form handling functions and errors from useForm hook
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    // Initializing navigation and dispatch functions
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Extracting loading state from Redux store
    const loading = useSelector((state) => state.auth?.loading);
    // Function to handle form submission
    const submit = async (data) => {
        // Check if username input is an email
        const isEmail = data.username.includes("@");
        // Prepare login data based on the type of input
        const loginData = isEmail ? { email: data.username, password: data.password } : data;
        // Dispatch login action and get the current user
        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        // Navigate to home page if user is authenticated
        if (user && response?.payload) {
            navigate("/");
        }
    };
    // Render loading skeleton if loading state is true
    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <>
            <div className="w-full h-screen text-white p-3 flex justify-center items-start">
                <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
                    <div className="flex items-center gap-2 mt-5">
                        <Logo />
                    </div>

                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 p-2"
                    >
                        <Input
                            label="Username / email : "
                            type="text"
                            placeholder="example@gmail.com"
                            {...register("username", {
                                required: "username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="1kd074fjw0"
                            {...register("password", {
                                required: "password is required",
                            })}
                        />
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-purple-500"
                            className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-purple-600 cursor-pointer hover:opacity-70"
                            >
                                SignUp
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
