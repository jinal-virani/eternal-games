import React from 'react'
import Link from 'next/link'
import { sidebarCategories, sidebarFeatures } from '../../helper/helper'
import { FaTags } from 'react-icons/fa6'

const SideBar = ({ isOpen, onClose }) => {
  if (!isOpen && onClose) return null

  return (
      <aside className={`sidebar bg-slate-900/90 px-4 text-white w-max absolute xs:top-19 nm:top-18 overflow-auto pb-24 transition-transform transform ${isOpen ?
          'translate-x-0 ' :
          '-translate-x-full'}`}>
        <div className="border-b-2 py-4 border-slate-700">
          {
            sidebarFeatures.map((item, index) =>
                <div key={index}>
                  <Link href={item.link}>
                    <div className="flex items-center pl-4 py-2 gap-6 ">
                      <div className="text-slate-400 text-lg">{item.icon}</div>
                      <div className="text-white">{item.title}</div>
                    </div>
                  </Link>
                </div>
            )
          }
        </div>
        <div className="py-2">
          <div className="py-4">
            {
              sidebarCategories.map((categories, index) =>
                  <div key={index}>
                    <div className="flex items-center pl-4 py-2 gap-6">
                      <div className="text-slate-400 text-lg">{categories.icon}</div>
                      <div className="text-white">{categories.title}</div>
                    </div>
                  </div>
              )}
          </div>
        </div>
        <div>
          <div className="flex items-center pl-4 py-2 gap-6 border-t-2 border-slate-700">
            <div className="text-slate-400 text-lg"><FaTags/></div>
            <div className="text-white">Tags</div>
          </div>
          <div className="flex items-center justify-center my-2">
            <a href="mailto:test@test.com&body=Hello!">
              <button className="px-6 py-3 bg-primary hover:bg-darkPrimary hover:shadow-sm hover:shadow-lightPrimary transition-colors rounded-full">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </aside>
  )
}

export default SideBar
