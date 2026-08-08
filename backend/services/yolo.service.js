import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const detectAnimals = async (imagePath) => {
  const form = new FormData();

  form.append("file", fs.createReadStream(imagePath));

  const response = await axios.post(
    "http://127.0.0.1:8000/detect",
    form,
    {
      headers: form.getHeaders(),
    }
  );

  return response.data;
};