import { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

const ProtectedFeature = ({ children, message = "Sign in to access this feature" }) => {
    const { user } = useSelector(store => store.auth);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(!user);

    useEffect(() => {
        if (!user) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [user, location.pathname]);

    if (!user) {
        return <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} />;
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {children}
        </Suspense>
    );
};

export default ProtectedFeature;
