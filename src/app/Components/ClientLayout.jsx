"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import FloatingCart from "./FloatingCart"
import Footer from "./Footer"

export default function ClientLayout({ children }) {
    const pathname = usePathname()
    const isAdminPage = pathname.startsWith('/admin')
    const isAuthPage = pathname === '/login'

    return (
        <>
            {!isAdminPage && <Navbar />}
            {children}
            {!isAdminPage && !isAuthPage && <FloatingCart />}
            {!isAdminPage && <Footer />}
        </>
    )
}