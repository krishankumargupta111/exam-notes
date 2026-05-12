import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { recordStats } from "motion/react";
import api from "./api"

const api=axios.create({
   baseURL:serverUrl})
api.interceptors.request.use((config)=>{
   const token=localStorage.getItem("token")
   if(token){
      config.headers.Authorization=`Bearer${token}`
   }
   return config})
export default api

export const getCurrentUser = async (dispatch) => {
   
  try {
    const result = await api.get(serverUrl + "/api/user/currentuser");

    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const generateNotes = async (payload) => {
   
  try {
    const result = await api.post(
      serverUrl + "/api/notes/generatenotes",
      payload);

    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await api.post(
      serverUrl + "/api/pdf/generate.pdf",
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
