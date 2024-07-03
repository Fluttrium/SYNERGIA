"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  title: string;
  description: string;
  link: string;
  file: FileList;
}

export default function Admin() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl);
        setMessage(`File uploaded successfully with ID: ${result.itemId}`);
        reset();
      } else {
        setMessage(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="container mx-auto mt-28">
      <main className="main">
        <h1 className="title">Add New Item</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            required
          />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            rows={4}
            {...register("description", { required: true })}
            required
          ></textarea>
          <br />
          <label htmlFor="link">Link:</label>
          <br />
          <input
            type="text"
            id="link"
            {...register("link", { required: true })}
            required
          />
          <br />
          <label htmlFor="file">Image:</label>
          <input
            type="file"
            id="file"
            {...register("file", { required: true })}
            accept="image/*"
            required
          />
          <br />
          <button type="submit">Upload Image</button>
        </form>
        {message && <p>{message}</p>}
        {imageUrl && (
          <div>
            <p>Image uploaded successfully:</p>
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
        )}
      </main>
    </div>
  );
}
