import React from 'react'
import Header from '../components/Header/Header'

export default function Layout({ children }) {
    return (
        <div className="">
            <Header />
            <div className="p-30">{children}</div>
        </div>
    )
}
