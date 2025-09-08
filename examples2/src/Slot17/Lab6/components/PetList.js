import React, { useContext, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import PetCard from "./PetCards";
import PetDetail from "./PetDetail";
import { Row, Col } from "antd";

export default function PetList() {
  const { state } = useContext(PetContext);
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {state.filteredPets.map((pet) => (
          <Col key={pet.id} xs={24} sm={12} md={8} lg={6}>
            <PetCard pet={pet} onClick={setSelectedPet} />
          </Col>
        ))}
      </Row>
      {selectedPet && (
        <PetDetail pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  );
}
