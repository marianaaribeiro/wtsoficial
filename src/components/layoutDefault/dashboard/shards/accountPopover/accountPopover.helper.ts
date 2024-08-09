import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../../hooks/useAuth";

const useAccountPopoverHelper = (onClose: () => void) => {
  const router = useNavigate();
  const auth = useAuth();

  const handleSignOut = useCallback(() => {
    onClose?.();
    auth?.signOut && auth?.signOut()
    router("mailManagerWEB/login");
  }, [onClose, auth, router]);

  return {
    handleSignOut,
    auth,
  };
};

export default useAccountPopoverHelper;
