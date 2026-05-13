import { serverUrl } from "../config.js";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { recordStats } from "motion/react";


const api=axios.create({
   baseURL:serverUrl})
api.interceptors.request.use((config)=>{
    console.log("INTERCEPTOR RUNNING");
   const token=localStorage.getItem("token")
    console.log("TOKEN:", token);
   if(token){
      config.headers.Authorization=`Bearer ${token}`
   }
   return config})
export default api

export const getCurrentUser = async (dispatch) => {
   
  try {
    const result = await api.get("/api/user/currentuser");

    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const generateNotes = async (payload) => {
   
  try {
    const result = await api.post("/api/notes/generatenotes",
      payload);

    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await api.post("/api/pdf/generate.pdf",
      { result },
      { responseType: "blob"}
    );

    console.log(response);
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF download failed");
  }
};
