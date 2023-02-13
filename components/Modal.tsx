import React, { useEffect } from "react";

export const Modal: React.FC<{
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  const detectKeyDown = (e: any) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="text-center fixed z-10 top-0 w-[100%] h-[100vh] bg-[rgba(0,0,0,0.4)] overflow-auto">
          {children}
        </div>
      )}
    </>
  );
};
