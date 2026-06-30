import {FaPhone , FaEnvelope,FaMapMarkedAlt} from 'react-icons/fa';

const Contact=()=>{
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80")',
            }}
        >
        <div className="bg-white/95 shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-4xl font-bold text-center mb-6">
                Contact Us
            </h1>
            <p className="text-gray-600 text-center mb-4">
                We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input type="text" required
                     className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input type="email" required
                     className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                     rows="4" required
                     className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                    Send Message
                </button>          
            </form>

            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold">
                    Contact Information</h2>
                <div className="flex flex-col items-center space-y-3 mt-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaPhone className="text-blue-500" />
                        <span>+91 992 798 1838</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaEnvelope className="text-blue-500" />
                        <span>saxenaansh27@gmail.com</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaMapMarkedAlt className="text-blue-500" />
                        <span>123 Main Street, City, Country</span>
                    </div>

                </div>
            </div>
        </div>
        </div> 
    )
}
export default Contact;