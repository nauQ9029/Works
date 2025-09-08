import React, { useContext, useState } from "react";
import { PetContext } from "../contexts/PetContext";
import { Slider, Typography } from "antd";

const { Title } = Typography;

export default function Filter() {
  const { dispatch } = useContext(PetContext);
  const [fee, setFee] = useState(100);

  const handleChange = (value) => {
    setFee(value);
    dispatch({ type: "FILTER_BY_FEE", payload: value });
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <Title level={5}>Filter by max adoption fee: ${fee}</Title>
      <Slider min={0} max={150} step={10} onChange={handleChange} value={fee} />
    </div>
  );
}
