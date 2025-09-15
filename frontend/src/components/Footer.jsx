import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-600 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-100 text-sm leading-relaxed">
            We connect fans with their favorite celebrities by offering 
            personalized messages and unforgettable experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-100 text-sm space-y-4">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/influencers" className="hover:text-white transition">Influencers</Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link to="/complaints" className="hover:text-white transition">Complaints</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-200 transition">Facebook</a>
            <a href="#" className="hover:text-gray-200 transition">Twitter</a>
            <a href="#" className="hover:text-gray-200 transition">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-200 text-sm mt-10 border-t border-gray-400 pt-6">
        © {new Date().getFullYear()} <span className="font-semibold">Celebrity Shoutout</span>. All rights reserved.
      </div>
    </footer>
  );
}
