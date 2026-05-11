import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import useGeminiAI from '../../hooks/useGeminiAI';

const suggestionPrompts = [
  {
    title: "Resume Tips",
    prompts: [
      "How can I make my resume stand out?",
      "What are the key elements of a professional resume?",
      "How to write an effective resume summary?",
    ]
  },
  {
    title: "Interview Preparation",
    prompts: [
      "Common interview questions and answers",
      "How to prepare for behavioral interviews?",
      "Tips for virtual interviews",
    ]
  },
  {
    title: "Career Advice",
    prompts: [
      "How to switch careers successfully?",
      "Tips for career growth and advancement",
      "How to negotiate salary?",
    ]
  }
];

const Message = ({ type, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex items-start gap-4 ${type === 'user' ? 'flex-row-reverse' : ''} mb-6`}
  >
    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
      type === 'user' ? 'bg-red-600 shadow-lg shadow-red-500/20' : 'bg-gray-800 shadow-lg'
    }`}>
      {type === 'user' ? (
        <User className="w-5 h-5 text-white" />
      ) : (
        <Bot className="w-5 h-5 text-white" />
      )}
    </div>
    <div className={`flex-1 max-w-[80%] ${type === 'user' ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block px-5 py-3 rounded-2xl ${
        type === 'user' 
          ? 'bg-red-600 text-white shadow-xl shadow-red-500/10' 
          : 'glass-card border-white/5'
      }`}>
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  </motion.div>
);

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Hello! I\'m your AI career assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const { generateContent, loading } = useGeminiAI();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateContent(input.trim());
      const assistantMessage = {
        type: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request at the moment. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-mesh-light dark:bg-mesh-dark py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-2">
            <Sparkles className="w-4 h-4 text-red-600 mr-2 animate-pulse" />
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
              Powered by Prep4Job AI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            AI Career <span className="text-red-600">Assistant</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Get personalized guidance, resume reviews, and interview prep with our state-of-the-art AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Suggestions Sidebar */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
             <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest px-2">Suggestions</h3>
             <div className="space-y-4">
                {suggestionPrompts.map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-4 rounded-2xl border-white/5"
                  >
                    <h4 className="text-[15px] font-bold text-red-600 mb-3 flex items-center">
                       <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                       {category.title}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {category.prompts.map((prompt, promptIdx) => (
                        <button
                          key={promptIdx}
                          onClick={() => handleSuggestionClick(prompt)}
                          className="text-left text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/5"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="glass-card rounded-3xl flex flex-col h-[700px] border-white/5 overflow-hidden shadow-2xl">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-2 scrollbar-hide">
                <AnimatePresence>
                  {messages.map((message, idx) => (
                    <Message key={idx} type={message.type} content={message.content} />
                  ))}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                      </div>
                      <span className="text-sm font-medium animate-pulse">Assistant is thinking...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/5 border-t border-white/5 backdrop-blur-xl">
                <div className="relative group">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about your career..."
                    className="w-full bg-white/50 dark:bg-gray-900/50 rounded-2xl p-5 pr-16 focus:ring-2 focus:ring-red-500 border-white/10 dark:text-white resize-none text-base placeholder:text-gray-500 transition-all"
                    rows="2"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className={`absolute right-3 bottom-3 p-3 rounded-xl transition-all ${
                      loading || !input.trim()
                        ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed opacity-50'
                        : 'bg-red-600 hover:bg-red-700 text-white red-glow shadow-lg'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 