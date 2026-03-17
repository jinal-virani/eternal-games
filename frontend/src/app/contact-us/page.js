'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/navbar/page'
import Footer from '../../components/footer/page'
import Link from 'next/link'
import { GoogleAnalytics } from '@next/third-parties/google'
import { EMAIL } from '../../helper/constant'

export default function ContactUs() {
  const [ contactInfo, setContactInfo ] = useState({
    name: '',
    // email: '',
    subject: '',
    message: ''
  })
  const [ formFilled, setFormFilled ] = useState(false)
  const [ formSubmitted, setFormSubmitted ] = useState(false)

  useEffect(() => {
    document.title = `Contact Us - EternalGames`
  }, [])

  function composeEmail(email, subject, username, message) {
    const adminEmail = email;
    const subjectText = subject;
    const body = `Hello Admin,\n\nI am ${username}, I have a question related to ${message}.`

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(body)}`;

    window.open(gmailLink, "_blank");

    // const body = `Hello Admin,\n\nI am ${username}, I have a question related to ${message}.`
    // const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    // window.open(mailtoLink, '_blank')
  }

  const handleSubmit = () => {
    // const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo?.email)
    const isValidForm =
        contactInfo?.name?.trim() &&
        // isValidEmail &&
        contactInfo?.subject?.trim() &&
        contactInfo?.message?.trim()

    if (!isValidForm) {
      setFormFilled(true)
    } else {
      setFormFilled(false)
      // Simulate form submission
      setTimeout(() => {
        composeEmail(EMAIL, contactInfo?.subject, contactInfo?.name, contactInfo?.message)
        setFormSubmitted(true)
        setContactInfo({
          name: '',
          // email: '',
          subject: '',
          message: ''
        })
      }, 1000)
    }
  }

  return (
      <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
        <Header/>
        <div className="container mx-auto px-4 py-16">

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* Image container with animation */}
            <div
                className="lg:w-1/2 w-full bg-contain bg-no-repeat bg-center rounded-lg h-[400px] md:h-[500px]"
                style={{ backgroundImage: 'url(\'/trans-logo-full.png\')' }}
            />

            {/* Form container with animation */}
            <div className="lg:w-1/2 w-full max-w-lg mx-auto space-y-6">
              <div className="space-y-4">
                <input
                    className="h-12 pl-4 rounded-lg w-full text-black "
                    type="text"
                    placeholder="Your Name"
                    value={contactInfo?.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                />
                {/*<input*/}
                {/*    className="h-12 pl-4 rounded-lg w-full text-black "*/}
                {/*    type="email"*/}
                {/*    placeholder="Email Address"*/}
                {/*    value={contactInfo?.email}*/}
                {/*    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}*/}
                {/*/>*/}
                <input
                    className="h-12 pl-4 rounded-lg w-full text-black "
                    type="text"
                    placeholder="Subject"
                    value={contactInfo?.subject}
                    onChange={(e) => setContactInfo({ ...contactInfo, subject: e.target.value })}
                />
                <textarea
                    className="pt-3 pl-4 rounded-lg w-full text-black h-40  resize-none"
                    placeholder="Message"
                    value={contactInfo?.message}
                    onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                />
              </div>

              {formFilled && (
                  <p className="text-red-500 text-sm animate-pulse">
                    Please fill out all fields correctly.
                  </p>
              )}

              <button
                  className={`bg-lime-500 py-3 text-white font-bold text-xl rounded-lg w-full
                ${formSubmitted ? 'opacity-70' : 'hover:bg-lime-600 hover:shadow-lg hover:shadow-lime-500/30'}`}
                  onClick={handleSubmit}
                  disabled={formSubmitted}
              >
                {formSubmitted ?
                  'Submited'
                : 'Submit' }
              </button>
            </div>
          </div>

          <div className="mt-16 text-center mb-14">
            <p className="text-4xl text-white font-bold mb-4">Contact Us</p>
            <Link target={'_blank'}
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Support&body=Hello! I need help with...`}
                className="relative inline-block text-xl font-medium hover:text-lime-500 group"
            >
              {EMAIL}
              <span
                  className="absolute left-0 bottom-0 h-[2px] w-0 bg-lime-500 transition-all duration-300 group-hover:w-full"
              />
            </Link>
          </div>
        </div>
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ" />
      </div>
  )
}
