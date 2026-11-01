import React from "react";  
import { Link } from "react-router-dom";

interface ErrorDisplayProps {  
    message: string; 
    className?: string; 
}  

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, className }) => {  
    return (  
        <div className={`flex flex-col w-full items-center justify-center h-full py-20 text-center ${className}`}>  
            <h1 className="text-2xl font-bold text-red-600">Oops! An Error Occurred</h1>  
            <p className="mt-4 text-gray-700">{message}</p>  
            {/* Optional: Add a link to return to the homepage or other helps */}  
            <Link to="/" className="mt-6 text-blue-500 hover:underline">  
                Go back to Home  
            </Link>  
        </div>  
    );  
};  

export default ErrorDisplay;