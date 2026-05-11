import React from 'react'
import { motion } from 'motion/react'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios'
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {

      const response = await signInWithPopup(auth, provider)

      const User = response.user
      const name = User.displayName
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }
      {withCredentials: true})
     
      
      console.log(result.data)
      await dispatch(setUserData(result.data.user))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className='max-w-7xl mx-auto mt-8
      rounded-2xl
      bg-black/80 backdrop-blur-xl
      border border-white/10
      px-8 py-6
      shadow-[0_20px_45px_rgba(0,0,0,0,6)]'>
        <h1 className='text-2xl font-bold
        bg-linear-to-r from-white via-gray-300 to-white
        bg-clip-text text-transparent'>ExamNotes AI</h1>
        <p className='text-sm text-gray-300 mt-1'>AI-powered exam-oriented notes & revision
        </p>
      </motion.header>
      <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20
items-center'>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}>
          <h1 className='text-5xl lg:text-6xl font_extrabold leading-tight
bg-linear-to-br from-black/90 via-black/60 to-black/90
bg-clip-text text-transparent'>Unlock Smart <br />AI Notes
          </h1>
          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              scale: 1.07
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='mt-10 px-10 py-3 rounded-xl
  flex items-center gap-3
  bg-linear-to-br from-black/90 via-black/80 to-black/90
  border border-white/10
  text-white font-semibold text-lg
  shadow-[0_25px_60px_rgba(0,0,0,0,7)]'>
            <FcGoogle size={22} />
            Continue wih Google
          </motion.button>
          <p className='mt-6 max-w-xl text-lg
  bg-linear-to-br from-gray-700 via-gray-700
  bg-clip-text text-transparent'>
            You get <span className='font-semibold'>50 Free Credit</span> to create
            exam notes,project notes,charts,graphs and
            download clean PDFs - intantly using AI,
          </p>
          <p className='mt-4 text-sm text-gray-500'>Start with 50 free credits upgrade
            anytime for more credits instant access
          </p>
        </motion.div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <Feature icons="🎁" title="50 Free Credits" des="start with 50 credits to generate
  notes without paying"/>
          <Feature icons="📝" title="Exam notes" des="High-yield,revision-ready exam-oriented
notes"/>
          <Feature icons="📁" title="Project Notes" des="well-structured documentation for assignments
   & projects"/>
          <Feature icons="📊" title="charts & graphs" des="auto generated 
  "/>
          <Feature icons="⬇" title="Free pdf download" des="Download clean,printable
  PDF's instantly"/>

        </div>



      </main>
    </div>
  )
}
function Feature({ icons, title, des }) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        rotateX: 8,
        rotateY: -8,
        scale: 1.07
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className='reltive rounded-2xl p-6
    bg-linear-to-br from-black/90 via-black/80 to-black/90
    backdrop-blur-2xl
    border border-white/10
    shadow-[0_30px_80px_rgba(0,0,0,0.7)]
    text-white'
      style={{ transformStyle: "preserve-3d" }}>

      <div className='relative z-10' style={{ transform: "translateZ(30px)" }}>
        <div className='text-4xl mb-3'>{icons}</div>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <p className='text-gray-300 text-sm leading-relaxed'>{des}</p>
      </div>

    </motion.div>
  )
}

export default Auth
