import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#07080A] backdrop-blur-sm flex justify-center">
  <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="size-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
            VIV
          </div>
          <span className="text-white">Cosinv AI</span>
        </div>
        <p className="text-sm text-gray-400">
          Streamline your workflow with our all-in-one SaaS
          platform. Boost productivity and scale your business.
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
      <div className="space-y-5 lg:ml-28">
        <h4 className="text-lg font-bold text-white">Product</h4>
        <ul className="space-y-2 text-md">
          <li>
            <Link
              href="#features"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Integrations
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              API
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-4 lg:ml-28">
        <h4 className="text-lg font-bold text-white">Resources</h4>
        <ul className="space-y-2 text-md">
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Guides
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Support
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-4 lg:ml-28">
        <h4 className="text-lg font-bold text-white">Company</h4>
        <ul className="space-y-2 text-md">
          <li>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/release-notes"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Release Notes
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms and policy
            </Link>
          </li>
          <li>
            <Link
              to="/help-faq"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Help & FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col gap-4 sm:flex-row justify-center items-center pt-8">
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} COSINV. All rights reserved.
      </p>
      {/* <div className="flex gap-4 justify-center sm:justify-end w-full sm:w-auto">

      </div> */}
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
