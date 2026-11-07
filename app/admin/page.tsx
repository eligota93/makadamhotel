import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { reviews } from "../../db/schema";
import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import AdminClient from "./ui";

export default async function AdminPage(){
 const user=await requireChatGPTUser("/admin");
 if(user.email.toLowerCase()!=="eligota93@gmail.com")return <main style={{padding:40,fontFamily:"Poppins,sans-serif"}}><h1>Access restricted</h1><p>This dashboard is available only to the Makadam Hotel administrator.</p></main>;
 let rows:typeof reviews.$inferSelect[]=[];try{rows=await (await getDb()).select().from(reviews).orderBy(desc(reviews.createdAt)).limit(100)}catch{}
 return <AdminClient initialReviews={rows} email={user.email} signout={chatGPTSignOutPath("/")}/>;
}
