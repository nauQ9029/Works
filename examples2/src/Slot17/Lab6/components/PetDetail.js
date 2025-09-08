import React from "react";
import { Modal, Descriptions, Image } from "antd";

export default function PetDetail({ pet, onClose }) {
  return (
    <Modal open={true} onCancel={onClose} footer={null} title={pet.name}>
      <Image src={pet.img} alt={pet.name} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Type">{pet.type}</Descriptions.Item>
        <Descriptions.Item label="Adoption Fee">
          ${pet.adoptionFee}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{pet.age}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
