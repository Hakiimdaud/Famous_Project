export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-red-600 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-200 text-sm">
            We connect fans with their favorite celebrities by offering personalized messages and unforgettable experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Celebrities</a></li>
            <li><a href="#" className="hover:text-white">How It Works</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Facebook</a>
            <a href="#" className="hover:text-gray-300">Twitter</a>
            <a href="#" className="hover:text-gray-300">Instagram</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300 text-sm mt-8 border-t border-gray-500 pt-6">
        © {new Date().getFullYear()} Celebrity Shoutout. All rights reserved.
      </div>
    </footer>
  );
}
