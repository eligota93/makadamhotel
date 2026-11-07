"use client";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

export const BOOKING_URL="https://app.thelobbyboy.com/online_reservation/select_dates_and_rooms/80";
export function track(event:string){ if(typeof window!=="undefined"){ const w=window as Window & {dataLayer?:unknown[]}; w.dataLayer=w.dataLayer||[]; w.dataLayer.push({event}); } }

const links=[['/','Home'],['/rooms','Rooms'],['/gallery','Gallery'],['/massage','Massage & Physiotherapy'],['/prizren-guide','Prizren Guide'],['/contact','Contact']];

export default function SiteChrome({children}:{children:ReactNode}){
 const [menu,setMenu]=useState(false); const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const fn=()=>setScrolled(scrollY>20);addEventListener('scroll',fn);return()=>removeEventListener('scroll',fn)},[]);
 return <><header className={`site-header ${scrolled?'scrolled':''}`}><Link href="/" className="brand-logo" aria-label="Makadam Hotel home"><img src="/makadam-logo.png" alt="Makadam Hotel"/></Link><nav className={menu?'open':''}>{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setMenu(false)}>{label}</Link>)}<a className="mobile-book" href={BOOKING_URL} target="_blank">Book your stay</a></nav><div className="header-side"><a href={BOOKING_URL} target="_blank" className="book-top" onClick={()=>track('booking_header')}>Book your stay <span>↗</span></a><button className="hamburger" aria-label="Toggle menu" onClick={()=>setMenu(v=>!v)}><i/><i/></button></div></header><main>{children}</main><a className="whatsapp" href="https://wa.me/38349100868?text=Hello%20Makadam%20Hotel%2C%20I%20would%20like%20to%20ask%20about%20a%20stay." target="_blank" onClick={()=>track('whatsapp')} aria-label="Contact Makadam Hotel on WhatsApp">W<span>WhatsApp</span></a><footer><div><Link href="/" className="brand-logo footer-logo" aria-label="Makadam Hotel home"><img src="/makadam-logo.png" alt="Makadam Hotel"/></Link><p>In the heart of Prizren’s Old Town,<br/>one minute from Shadërvan Square.</p></div><div><small>EXPLORE</small>{links.slice(1).map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div><div><small>CONTACT</small><a href="tel:+38349100868">+383 49 100 868</a><a href="mailto:hotelmakadam@gmail.com">hotelmakadam@gmail.com</a><a href="https://instagram.com/makadamhotel" target="_blank">Instagram ↗</a><a href="https://facebook.com/makadamhotel" target="_blank">Facebook ↗</a></div><div className="footer-bottom"><span>© 2026 Makadam Hotel</span><span>Prizren · Kosovo</span></div></footer></>;
}
