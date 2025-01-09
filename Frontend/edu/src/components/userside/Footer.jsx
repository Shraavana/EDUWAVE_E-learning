import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "About EduWave", links: ["About Us", "Careers", "Contact Us"] },
            { title: "Legal", links: ["Terms of Use", "Privacy Policy", "Cookie Policy"] },
            { title: "Support", links: ["Help Center", "FAQs", "Community"] },
          ].map((section, index) => (
            <div key={index}>
              <h5 className="uppercase mb-6 font-bold">{section.title}</h5>
              <ul className="mb-4">
                {section.links.map((link) => (
                  <li key={link} className="mt-2">
                    <a href="#" className="hover:text-[#B0FC35] transition duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className="uppercase mb-6 font-bold">Connect with Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#B0FC35] transition duration-300">
                <Facebook />
              </a>
              <a href="#" className="text-white hover:text-[#B0FC35] transition duration-300">
                <Twitter />
              </a>
              <a href="#" className="text-white hover:text-[#B0FC35] transition duration-300">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} EduWave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

