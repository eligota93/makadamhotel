import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{const pages=['','/rooms','/massage','/prizren-guide','/gallery','/contact','/privacy-policy','/cookie-policy','/terms'];return pages.map(path=>({url:`https://makadamhotel.com${path}`,lastModified:new Date(),changeFrequency:path===''?'weekly':'monthly',priority:path===''?1:path==='/rooms'?.9:.7}));}
