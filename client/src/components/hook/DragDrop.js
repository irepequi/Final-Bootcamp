import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", " PNG", " PDF"];

function DragDrop({setFile, setMessage}) {
 
  const handleChange = (file) => {
    setFile(file);
    setMessage(file.name);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;
