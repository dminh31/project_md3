import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { failedNoti, successNoti } from '../../util'
export default function Login() {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                input
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("currentUser", JSON.stringify(response.data.currentUser));
            successNoti(response.data.message);
            
            console.log(response.data.currentUser.role)
            if (response.data.currentUser.role === 1) {
                navigate("/admin")
            } else {
                setTimeout(() => {
                    navigate("/")
                }, 1000);
                
            }
        } catch (error) {
            failedNoti(error.response.data.message);
        }
    }

    return (
        <div className='w-full !h-screen  flex justify-around '>
            <div className='relative w-full h-full flex flex-col'>
                <img className='w-full h-screen object-cover' src='https://phunugioi.com/wp-content/uploads/2021/11/Background-phong-canh.jpg' />
            </div>


            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-[50px] justify-between items-center  '>
                <h1 className=' text-xl text-[#060606] font-semibold mr-auto'>Interactive Brand</h1>

                <div className='w-full flex flex-col max-w-[500px] mt-2 '>
                    <div className=' w-full flex flex-col mb-2'>
                        <h3 className='text-4xl font-semibold mb-3 '>Login</h3>
                        <p className='text-base mb-2'>You're Welcome! Please Enter Your Information Details.</p>
                    </div>
                </div>

                <div className='w-full flex flex-col'>
                    <input
                        type="text"
                        placeholder='Email'
                        className='w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none '
                        name='email'
                        value={input.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none '
                        name='password'
                        value={input.password}
                        onChange={handleChange}
                    />

                </div>

                <div className='w-full flex justify-between items-center'>
                    <div className='w-full flex '>
                        <input
                            type="checkbox"
                            className='w-4 h-4 mr-2 ' />
                        <p className='text-sm'>Remember Me</p>
                    </div>
                    {/* <Link to={"/"}><p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Go To Home</p></Link> */}
                </div>

                <div className='w-full flex flex-col my-4'>
                    <button className='w-full text-white my-2 bg-[#060606] font-semibold  rounded-md p-4 text-center flex items-center justify-center'
                        onClick={handleLogin}>
                        Login
                    </button>

                </div>

                <div className='w-full flex items-center justify-center relative py-2 '>
                    <div className='w-full h-[1px] bg-black'></div>
                    <p className='absolute text-lg text-black/80 bg-[#f5f5f5]'>or</p>
                </div>

                <div className='w-full text-[#060606] my-2 bg-white border border-black font-semibold rounded-md p-4 text-center flex items-center justify-center'>
                    Register with Google
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-[#060606]'>Don't have a account?
                        {/* <Link to={"/register"}><span className='font-semibold underline underline-offset-2 cursor-pointer '> Register here</span> </Link> */}
                    </p>
                </div>
            </div>
        </div>
    )
}
