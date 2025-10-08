import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config()


export const cleanUp = ()=>{
  cron.schedule("*/15 * * * *", async ()=>{
    try{
      const response = await axios.get(process.env.RENDER_LINK || "");
      console.log("Response", response.data);
    }catch(error){
      console.log("An Error occurred in Cron Job", error || "");
    }
  })
}