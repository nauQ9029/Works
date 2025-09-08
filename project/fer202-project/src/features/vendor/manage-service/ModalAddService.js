import { uploadToCloudinary } from "../../../services/cloudinaryConfig";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addService } from "./serviceService";
import './ModalAddService.css'

const ModalAddService = ({ fetchServices, show, onClose }) => {
    const categories = useSelector((state) => state.categories.data);
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log(categories)
    }, [])
    const [formData, setFormData] = useState({
        vendorId: user.id,
        serviceCategoryId: "",
        title: "",
        description: "",
        price: "",
        imageDemo: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.imageDemo;

            if (imageFile) {
                setUploading(true);
                imageUrl = await uploadToCloudinary(imageFile);
                setUploading(false);
            }

            await addService({
                ...formData,
                imageDemo: imageUrl,
                price: Number(formData.price),
            });

            alert("Thêm dịch vụ thành công!");
            onClose(); // Đóng modal
            fetchServices();
        } catch (err) {
            console.error("Lỗi khi thêm dịch vụ:", err);
            alert("Có lỗi xảy ra!");
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content-add">
                <h4>Thêm Dịch Vụ Mới</h4>
                <form onSubmit={handleSubmit}>
                    <select
                        name="serviceCategoryId"
                        value={formData.serviceCategoryId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Chọn danh mục dịch vụ --</option>
                        {categories.map((cate) => (
                            <option key={cate.serviceCategoryId} value={cate.serviceCategoryId}>
                                {cate.categoryName}
                            </option>
                        ))}
                    </select>
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="submit" className="upload-btn " disabled={uploading} >
                        {uploading ? "Uploading..." : "Add Service"}
                    </button>
                    <button type="button" onClick={onClose} className="cancel-btn ">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalAddService;