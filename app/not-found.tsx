import Link from 'next/link';import SiteChrome from './site-chrome';
export default function NotFound(){return <SiteChrome><section className="not-found"><p className="kicker">404 · LOST IN THE OLD TOWN</p><h1>This street leads somewhere else.</h1><p>The page you’re looking for has moved or no longer exists.</p><Link className="btn wine" href="/">Return home →</Link></section></SiteChrome>}
