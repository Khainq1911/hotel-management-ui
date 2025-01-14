import { useToast } from "~/hooks/useContext";

export const ToastConfigs = () => {
  const toast = useToast();

  const showToast = ({
    severity = "info",
    summary = "",
    detail = "",
    life = 3000,
  }) => {
    toast.current?.show({ severity, summary, detail, life });
  };

  return { showToast };
};
