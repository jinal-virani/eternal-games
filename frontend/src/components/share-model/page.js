'use client'

import { useState } from 'react'
import { FaCopy, FaEnvelope, FaFacebookF, FaLinkedinIn, FaReddit, FaRegPaperPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

export default function ShareModal({ open, handleClose, shareUrl }) {

  const [ copied, setCopied ] = useState(false)

  const shareOptions = [
    { name: 'WhatsApp', icon: FaWhatsapp, bg: '#25d366', url: 'https://wa.me/?text=' },
    { name: 'Facebook', icon: FaFacebookF, bg: '#3b5998', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { name: 'Telegram', icon: FaRegPaperPlane, bg: "#37aee2", url: 'https://t.me/share/url?url=' },
    { name: 'Twitter', icon: FaTwitter, bg:"#00aced", url: 'https://twitter.com/intent/tweet?url=' },
    { name: 'LinkedIn', icon: FaLinkedinIn, bg:"#007fb1", url: 'https://www.linkedin.com/shareArticle?url=' },
    { name: 'Reddit', icon: FaReddit, bg:"#ff4500", url: 'https://www.reddit.com/submit?url=' },
    { name: 'Email', icon: FaEnvelope, bg:"#7f7f7f", url: 'mailto:?body=' }
  ]

  const handleShare = (platform) => {
    const appShareUrl = `${platform.url}${encodeURIComponent(shareUrl)}`
    window.open(appShareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
      <>
        <Modal open={open} onClose={handleClose} className="bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <Box className="bg-slate-900 p-6 rounded-lg shadow-lg !max-w-[300px] nm:!max-w-[500px]">
            <div className="flex justify-end items-center">
              <button onClick={handleClose}>
                <IoClose size={24}/>
              </button>
            </div>
            <h2 className="text-lg text-center font-semibold">Share</h2>
            <div className="nm:grid nm:grid-cols-[repeat(auto-fit,minmax(36px,1fr))] flex flex-row items-center justify-center flex-wrap gap-4 mt-6">
              {shareOptions.map(({ name, icon: Icon, bg, url }) => (
                  <button key={name} onClick={() => handleShare({ name, url })} className="flex flex-col items-center">
                    <div style={{ backgroundColor: bg }} className="w-9 h-9 flex items-center justify-center rounded-full">
                      <Icon size={20}/>
                    </div>
                  </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between bg-black/50 p-2 rounded-lg">
              <span className="text-sm text-lime-500 tracking-wide truncate w-5/6">{shareUrl}</span>
              <button onClick={handleCopy} className="p-1 bg-black/50 rounded">
                <FaCopy className='text-slate-500' size={16}/>
              </button>
            </div>
          </Box>
        </Modal>
      </>
  )
}
