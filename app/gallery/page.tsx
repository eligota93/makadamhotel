"use client";
import {useState} from 'react';
import SiteChrome from '../site-chrome';
const photos=['/hero/morning.webp','/hero/sunset.webp','/hero/night.webp','/rooms/102/01.webp','/rooms/201/01.webp','/rooms/301/01.webp'];
export default function Gallery(){const [open,setOpen]=useState<string|null>(null);return <SiteChrome><section className="page-hero"><p className="kicker pale">THE HOTEL IN MOMENTS</p><h1>Gallery.</h1><p>A growing collection of views, details and atmosphere from Makadam and Prizren. More hotel photographs will be added soon.</p></section><section className="gallery-grid wrap">{photos.map((p,i)=><button key={p} onClick={()=>setOpen(p)} className={i%3===0?'wide':''}><img src={p} alt={`Makadam Hotel gallery image ${i+1}`}/><span>0{i+1}</span></button>)}</section>{open&&<div className="lightbox" onClick={()=>setOpen(null)}><button aria-label="Close">×</button><img src={open} alt="Makadam Hotel"/></div>}</SiteChrome>}
