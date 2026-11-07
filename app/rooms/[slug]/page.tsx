"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {BOOKING_URL} from "../../site-chrome";
import {rooms,image} from "../data";

function Arrow({back=false}:{back?:boolean}){return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={back?{transform:"rotate(180deg)"}:undefined}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>}
function Close(){return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>}

export default function RoomShowroom(){
 const {slug}=useParams<{slug:string}>();
 const room=rooms.find(r=>r.slug===slug);
 const [active,setActive]=useState(1),[lightbox,setLightbox]=useState(false),[copied,setCopied]=useState(false);
 useEffect(()=>{if(!lightbox||!room)return;const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setLightbox(false);if(e.key==="ArrowRight")setActive(v=>v%room.count+1);if(e.key==="ArrowLeft")setActive(v=>(v-2+room.count)%room.count+1)};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[lightbox,room]);
 if(!room)return <main className="showroom-missing"><img src="/makadam-logo.png" alt="Makadam Hotel"/><h1>Room not found.</h1><a href="/#rooms">Return to rooms</a></main>;
 const move=(direction:number)=>setActive(v=>(v-1+direction+room.count)%room.count+1);
 const copyLink=async()=>{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),1800)};
 return <main className="showroom-page">
  <header className="showroom-header"><a href="/" className="showroom-logo"><img src="/makadam-logo.png" alt="Makadam Hotel home"/></a><a href="/#rooms" className="showroom-back"><Arrow back/>ALL ROOMS</a><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="showroom-book">BOOK NOW<Arrow/></a></header>
  <section className="room-cinema" aria-label={`${room.name} gallery`}>
   <div className="room-cinema-visual"><button className="room-cinema-image" onClick={()=>setLightbox(true)} aria-label="Open current photograph full screen"><img key={active} src={image(room,active)} alt={`${room.name}, photograph ${active} of ${room.count}`}/></button><div className="room-cinema-shade" aria-hidden="true"/><button className="room-cinema-prev" onClick={()=>move(-1)} aria-label="Previous room photograph"><Arrow back/></button><button className="room-cinema-next" onClick={()=>move(1)} aria-label="Next room photograph"><Arrow/></button><div className="room-cinema-index"><span>{String(active).padStart(2,"0")}</span><i/><span>{String(room.count).padStart(2,"0")}</span></div></div>
   <div className="room-cinema-copy"><p>MAKADAM HOTEL · PRIZREN OLD TOWN</p><h1>{room.name}</h1><p>{room.description}</p></div>
  </section>
  <section className="room-editorial-info">
   <div className="room-editorial-main"><p className="showroom-label">THE ROOM</p><h2>Everything you need,<br/>in the heart of Prizren.</h2><p>Every stay includes air conditioning, Smart TV, free Wi-Fi, fresh towels, free toiletries, coffee and tea, and access to parking.</p><div className="room-editorial-facts"><div><small>CAPACITY</small><strong>{room.guests}</strong></div><div><small>SLEEPING</small><strong>{room.bed}</strong></div><div><small>FEATURE</small><strong>{room.feature}</strong></div><div><small>BATHROOM</small><strong>Private bathroom</strong></div><div><small>ROOM SIZE</small><strong>{room.size}</strong></div></div></div>
   <aside className="room-editorial-book"><p className="showroom-label">RESERVE DIRECT</p><h2>Your Prizren stay starts here.</h2><p>Select your dates and complete your reservation securely online.</p><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">CHECK AVAILABILITY<Arrow/></a><button onClick={copyLink}>{copied?"LINK COPIED":"SHARE THIS ROOM"}</button></aside>
  </section>
  <footer className="showroom-footer"><img src="/makadam-logo.png" alt="Makadam Hotel"/><p>Where history lives.</p><a href="/">RETURN TO HOTEL</a></footer>
  {lightbox&&<div className="showroom-lightbox" role="dialog" aria-modal="true" aria-label={`${room.name} full-screen gallery`}><button className="showroom-lightbox-close" onClick={()=>setLightbox(false)} aria-label="Close full-screen gallery"><Close/></button><img src={image(room,active)} alt={`${room.name} enlarged photograph ${active}`}/><button onClick={()=>move(-1)} aria-label="Previous photograph"><Arrow back/></button><button onClick={()=>move(1)} aria-label="Next photograph"><Arrow/></button><span>{active} / {room.count}</span></div>}
 </main>
}
