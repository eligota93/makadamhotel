import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { reviews } from "../../../../db/schema";
import { getChatGPTUser } from "../../../chatgpt-auth";
export async function PATCH(request:Request){const user=await getChatGPTUser();if(user?.email.toLowerCase()!=="eligota93@gmail.com")return Response.json({error:"Unauthorized"},{status:401});try{const {id,status}=await request.json() as {id:number;status:string};const db=await getDb();if(status==="deleted")await db.delete(reviews).where(eq(reviews.id,id));else if(["approved","rejected","pending"].includes(status))await db.update(reviews).set({status}).where(eq(reviews.id,id));else return Response.json({error:"Invalid status"},{status:400});return Response.json({ok:true})}catch{return Response.json({error:"Update failed"},{status:500})}}
