import { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser("Mario Estima");
  }, []); // executa apenas uma vez, ao montar o componente

  return <div className="bg-red-500">Dashboard {user}</div>;
};

export default Dashboard;
