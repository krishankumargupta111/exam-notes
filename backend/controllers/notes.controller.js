import Notes from "../models/notes.model.js"
import { generateGeminiResponse } from "../sevices/gemini.services.js";
import {buildPrompt} from "../utils/promptBuilder.js"

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt regenerationCount",
      )
      .sort({ createdAt: -1 });
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: `getcurrentuser notes
    error ${error}`,
    });
  }
};
export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.json({
  content: notes.content,
  topic: notes.topic,
  createdAt: notes.createdAt,
  regenerationCount: notes.regenerationCount,
});
  } catch (error) {
    return res.status(500).json({
      message: `getsingle notes 
    error ${error}`,
    });
  }
};


export const regenerateNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }

    if (notes.regenerationCount >= 1) {
      return res.status(400).json({
        message: "You can regenerate notes only once",
      });
    }

    const prompt = buildPrompt({
      topic: notes.topic,
      classLevel: notes.classLevel,
      examType: notes.examType,
      revisionMode: notes.revisionMode,
      includeDiagram: notes.includeDiagram,
      includeChart: notes.includeChart,
    });

    const airesponse = await generateGeminiResponse(prompt);


    notes.content = airesponse;

    
    notes.regenerationCount = 1;

    await notes.save();

    return res.status(200).json({
      data: airesponse,
      noteId: notes._id,
      regenerationCount: notes.regenerationCount,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "notes regeneration failed",
      message: error.message,
    });
  }
};
