import React from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, Users, Building, Star, ArrowRight, Sparkles, Zap, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Irregular SVG shapes for background
const BgShape1 = () => (
  <motion.svg
    viewBox="0 0 200 200"
    className="absolute w-[600px] h-[600px] -top-40 -right-20 opacity-30"
    initial={{ rotate: 0, scale: 1 }}
    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <path
      fill="url(#gradient1)"
      d="M39.9,-65.7C54.1,-60.5,69.9,-54,78.1,-42.3C86.3,-30.6,86.9,-13.8,84.6,2C82.4,17.8,77.2,32.6,68.3,44.7C59.3,56.8,46.6,66.2,32.4,71.8C18.2,77.5,2.6,79.3,-13.4,77.6C-29.3,75.9,-45.6,70.6,-58.1,60.5C-70.6,50.4,-79.3,35.4,-83.7,18.7C-88.1,2,-88.2,-16.5,-81.8,-31.4C-75.4,-46.2,-62.5,-57.4,-48,-63.4C-33.5,-69.4,-17.7,-70.2,-2.3,-66.6C13.2,-63,25.7,-70.9,39.9,-65.7Z"
      transform="translate(100 100)"
    />
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#93c5fd' }} />
        <stop offset="100%" style={{ stopColor: '#c4b5fd' }} />
      </linearGradient>
    </defs>
  </motion.svg>
);

const BgShape2 = () => (
  <motion.svg
    viewBox="0 0 200 200"
    className="absolute w-[500px] h-[500px] bottom-0 -left-20 opacity-30"
    initial={{ rotate: 0, scale: 1 }}
    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
  >
    <path
      fill="url(#gradient2)"
      d="M42.7,-73.4C55.9,-67.3,67.7,-56.6,76.6,-43.2C85.5,-29.8,91.6,-14.9,90.5,-0.6C89.4,13.6,81.2,27.3,72.1,39.7C63,52.1,53.1,63.3,40.9,70.9C28.7,78.5,14.4,82.5,-0.2,82.8C-14.7,83.2,-29.4,79.8,-42.4,72.6C-55.4,65.3,-66.7,54.2,-74.8,41C-82.9,27.8,-87.8,12.4,-86.8,-2.3C-85.8,-17,-78.9,-31.1,-70.3,-43.6C-61.7,-56.1,-51.4,-67,-39.1,-73.1C-26.8,-79.3,-13.4,-80.7,0.8,-82C15,-83.3,29.5,-79.5,42.7,-73.4Z"
      transform="translate(100 100)"
    />
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#fbcfe8' }} />
        <stop offset="100%" style={{ stopColor: '#ddd6fe' }} />
      </linearGradient>
    </defs>
  </motion.svg>
);

const BgShape3 = () => (
  <motion.svg
    viewBox="0 0 200 200"
    className="absolute w-[400px] h-[400px] top-1/3 right-1/4 opacity-30"
    initial={{ rotate: 0, scale: 1 }}
    animate={{ rotate: 180, scale: [1, 0.9, 1] }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
  >
    <path
      fill="url(#gradient3)"
      d="M37.9,-64.3C49,-56.5,57.9,-45.5,65.9,-33.1C73.9,-20.7,81,-6.9,80.3,6.7C79.7,20.3,71.3,33.7,61.6,44.7C51.9,55.7,41,64.3,28.5,69.1C16,73.9,1.9,74.9,-12.9,73.6C-27.7,72.4,-43.2,69,-56.1,60.4C-69,51.8,-79.3,38.1,-83.7,22.7C-88.1,7.3,-86.6,-9.7,-80.8,-24.5C-75,-39.3,-64.9,-51.8,-52.1,-59.2C-39.3,-66.6,-23.8,-68.9,-9.2,-67.1C5.4,-65.3,26.8,-72.1,37.9,-64.3Z"
      transform="translate(100 100)"
    />
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#bfdbfe' }} />
        <stop offset="100%" style={{ stopColor: '#fae8ff' }} />
      </linearGradient>
    </defs>
  </motion.svg>
);

const FloatingElement = ({ delay, duration, children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

const ActionCard = ({ icon: Icon, title, description, color, link, className }) => (
  <Link to={link}>
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden group glass-card border-white/5 rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8">
        <div className={`relative w-16 h-16 ${color} rounded-2xl overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/10`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center text-red-600 dark:text-red-400 font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
          Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  </Link>
);

const HeroSection = () => {
  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "1000+", color: "bg-red-600" },
    { icon: Users, label: "Job Seekers", value: "50k+", color: "bg-red-600" },
    { icon: Building, label: "Companies", value: "200+", color: "bg-red-600" },
    { icon: Star, label: "Success Rate", value: "95%", color: "bg-red-600" },
  ];

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-mesh-light dark:bg-mesh-dark pt-20">
      {/* Background SVG Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BgShape1 />
        <BgShape2 />
        <BgShape3 />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10">
        <div className="lg:flex items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <FloatingElement delay={0} duration={0.6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center px-5 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-8"
              >
                <Sparkles className="w-5 h-5 text-red-600 mr-2 animate-pulse" />
                <span className="text-sm font-bold text-red-600 tracking-widest uppercase">
                  AI-Powered Career Platform
                </span>
              </motion.div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-gray-900 dark:text-white tracking-tighter">
                Elevate <br />
                <span className="text-red-600">Your Future</span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-lg"
              >
                Transform your job search with intelligent tools, AI resume building, 
                and high-precision matching.
              </motion.p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <FloatingElement
                    key={index}
                    delay={0.4 + index * 0.1}
                    duration={0.5}
                    className="glass-card rounded-2xl p-6 border-white/5"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-red-600/10`}>
                      <stat.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="mt-4 text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  </FloatingElement>
                ))}
              </div>
            </FloatingElement>
          </div>

          {/* Right Content - Action Cards */}
          <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
            <div className="grid gap-6 relative z-10">
              <ActionCard
                icon={Wand2}
                title="AI Resume Builder"
                description="Craft professional resumes with real-time AI suggestions and modern templates."
                color="bg-red-600"
                link="/resume-builder"
                className="lg:ml-12"
              />
              
              <ActionCard
                icon={Target}
                title="ATS Analyzer"
                description="Optimize your visibility with instant ATS compatibility checks and keyword feedback."
                color="bg-gray-800"
                link="/ats-score"
                className="lg:-ml-12"
              />

              <ActionCard
                icon={Zap}
                title="AI Assistant"
                description="Personalized career guidance and interview prep powered by advanced models."
                color="bg-red-600"
                link="/ai-assistant"
                className="lg:ml-12"
              />
            </div>

            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-red-100/40 via-purple-100/40 to-pink-100/40 rounded-full blur-3xl opacity-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
