import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const handleMouseMove = (e) => {
    setMousePosition([e.clientX, e.clientY]);
  };

  useEffect(() => {
    document.addEventListener("pointermove", handleMouseMove);

    return () => {
      document.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition