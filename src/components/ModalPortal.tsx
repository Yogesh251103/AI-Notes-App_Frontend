import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('modal portal called')
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

export default ModalPortal;