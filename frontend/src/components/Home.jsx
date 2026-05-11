import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import TestimonialsSection from './TestimonialsSection'
import AIAssistant from './AIAssistant'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();

  console.log("Home rendered");
  const { user } = useSelector(store => store.auth);
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Decorative elements animation
  const decorativeVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="relative min-h-screen bg-mesh-light dark:bg-mesh-dark text-gray-900 dark:text-gray-100 overflow-hidden"
    >
      {/* Decorative Elements */}

      
      <motion.div
        variants={decorativeVariants}
        animate="animate"
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        variants={decorativeVariants}
        animate="animate"
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
      />

      {/* Content Sections */}
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="relative glass-card"
      >
        <HowItWorks />
      </motion.div>

      <motion.div variants={sectionVariants}
        className="relative glass-card">
        <CategoryCarousel />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="relative glass-card"
      >
        <LatestJobs />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <TestimonialsSection />
      </motion.div>

      {/* Fixed Position AI Assistant */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <AIAssistant />
        </motion.div>
      </div>

      {/* Additional Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl" />
      </div>
    </motion.div>
  )
}

export default Home;
