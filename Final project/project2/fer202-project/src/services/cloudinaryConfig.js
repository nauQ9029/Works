export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hatde-image"); 
  formData.append("cloud_name", "dvyu4f7lq");       

  const res = await fetch("https://api.cloudinary.com/v1_1/dvyu4f7lq/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url; 
};
