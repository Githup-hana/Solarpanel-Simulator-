import React, { useState } from "react";

const SolarPanelSimulator = () => {
  const [city, setCity] = useState("");
  const [panelPower, setPanelPower] = useState(0);
  
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handlePanelPowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPanelPower(Number(e.target.value));
  };
  return (
    <div>
      <h2>🌞 Solarpanel-Simulator</h2>
      <input type="text" 
      value={city}
      onChange={handleCityChange}
      placeholder="Gib eine Stadt ein..." />
      <input type="number"
      value={panelPower}
      onChange={handlePanelPowerChange}
      placeholder="Panel-Leistung (Watt)" />
    </div>
  );
};

export default SolarPanelSimulator;
