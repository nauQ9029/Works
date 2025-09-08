import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ManageServices.css'
import { updateService, deleteService } from "./serviceService";
import { useState } from "react";
import { uploadToCloudinary } from '../../../services/cloudinaryConfig'

function ServiceCard({ service, fetchServices }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        serviceId: service.serviceId,
        vendorId: service.vendorId,
        title: service.title,
        description: service.description,
        price: service.price,
        imageDemo: service.imageDemo,
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = async(service) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await deleteService(service.serviceId)

            fetchServices()
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = async () => {
        try {
            let imageUrl = formData.imageDemo;


            if (imageFile) {
                setUploading(true);
                imageUrl = await uploadToCloudinary(imageFile);
                setUploading(false);
            }

            await updateService({
                ...service,
                ...formData,
                imageDemo: imageUrl,
            });

            alert("Cập nhật thành công!");
            setIsEditing(false);
            fetchServices()
        } catch (err) {
            alert("Lỗi khi cập nhật");

            setIsEditing(false);
        }
    };

    return (
        <div className="service-card">
            <div className="service-image">
                <img src={service.imageDemo} alt={service.title} />

                <div className="category-label">{service.category || "Dịch vụ cưới"}</div>

            </div>

            <div className="service-info">
                {isEditing && (
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} /></div>
                )}
                <div className="title-price-row">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </>
                    ) : (
                        <>
                            <h4>{service.title}</h4>
                            <div className="price-group">
                                <span className="price">
                                    From <b>{service.price.toLocaleString()}₫</b>
                                </span>
                                <span className="per-event">per event</span>
                            </div>
                        </>
                    )}
                </div>

                {isEditing ? (
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="location">{service.description}</p>
                )}

                <div className="wrap-div">
                    <p className="availability">Available from 2025-05-20</p>
                    <a
                        href={`/service-detail/${service.serviceId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="folder-link"
                    >
                        <p className="location pink">View detail</p>
                    </a>
                </div>
                <div className="actions">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="edit-btn">Save</button>
                            <button onClick={() => setIsEditing(false)} className="delete-btn">Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(service)} className="delete-btn">Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ServiceCard