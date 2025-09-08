import React from "react";
import { Card } from "antd";

export default function PetCard({ pet, onClick }) {
  return (
    <Card
      hoverable
      style={{ width: 400, margin: 16 }}
      cover={
        <img
          alt={pet.name}
          src={pet.img}
          style={{ height: 400, objectFit: "cover" }}
        />
      }
      onClick={() => onClick(pet)}
    >
      <Card.Meta
        title={pet.name}
        description={`Adoption Fee: $${pet.adoptionFee}`}
      />
    </Card>
  );
}
