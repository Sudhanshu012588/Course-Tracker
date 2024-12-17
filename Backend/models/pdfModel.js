import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    name:String,
    filePath:String,
});

export const pdf = mongoose.model("pdf",pdfSchema)