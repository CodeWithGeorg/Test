import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/constants';

/**
 * Footer Component
 * Application footer with links and copyright information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.PLACE_ORDER, label: 'Place Order' },
    { to: ROUTES.LOGIN, label: 'Login' },
    { to: ROUTES.SIGNUP, label: 'Sign Up' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Academic MVP</h3>
            <p className="text-gray-300 text-sm">
              Your trusted platform for academic orders and services. 
              We provide quality solutions for all your academic needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Email: support@academicmvp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Academic Street, Education City</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Academic MVP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
