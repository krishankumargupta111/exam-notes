import dotenv from "dotenv"
dotenv.config()
const Gemini_URL=process.env.GEMINI
export const generateGeminiResponse=async(prompt)=>{
    try{

    
    const response=await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            contents:[
                {
                    parts:[
                        {
                            text:prompt
                        }
                        
                    ]
                }
            ]
            
        })
})
if(!response.ok){
    const err=await response.text();
    throw new Error(err);
}
const data=await response.json()

const text=data.candidates?.[0]?.content?.parts?.[0]?.text;
if(!text){
    throw new Error("no text returned from gemini")
}
const cleanText=text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();
return JSON.parse(cleanText)


    }
    catch(error){
        console.log("gemini fetch error",error.message)
        throw new Error("gemini api fetch failed")
    }
}