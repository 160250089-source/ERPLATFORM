import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const AuthModal = ({ isOpen, onClose, message = "Sign in to access this feature" }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-in fade-in zoom-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Authentication Required
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {message}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Sign In
                    </Button>
                    <div className="relative flex items-center my-4">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <Button
                        onClick={handleSignup}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Create Account
                    </Button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                    Join us to unlock all features and opportunities!
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
