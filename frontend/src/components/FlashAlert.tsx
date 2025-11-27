import { useState, useEffect } from "react";
import "./FlashAlert.css";

// Props para el componente FlashAlert
interface FlashAlertProps {
  // Mensaje a mostrar en la alerta
  mensaje: string;
  // Tipo de alerta para determinar el estilo visual
  tipo: "success" | "error" | "info" | "warning";
  // Duración en milisegundos antes de que la alerta desaparezca automáticamente
  duracion?: number;
  // Callback ejecutado cuando se cierra la alerta
  onClose: () => void;
}

/**
 * Componente de alerta flotante con cierre automático (Componente reutilizado de otro proyecto)
 *
 * Muestra un mensaje temporal en la esquina superior derecha de la pantalla, se cierra
 * automáticamente después del tiempo establecido o el usuario puede cerrarla
 * manualmente con el botón de cerrar.
 *
 */
const FlashAlert = ({
  mensaje,
  tipo,
  duracion = 3000,
  onClose,
}: FlashAlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duracion > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [duracion, onClose]);

  if (!visible) return null;

  // Retorna el icono correspondiente según el tipo de alerta
  const getIcon = () => {
    switch (tipo) {
      case "success":
        return "✓";
      case "error":
        return "!";
      case "info":
        return "ℹ";
      case "warning":
        return "⚠";
    }
  };

  return (
    <div className={`flash-alert flash-alert-${tipo}`}>
      <div className="flash-alert-content">
        <span className="flash-alert-icon">{getIcon()}</span>
        <span className="flash-alert-message">{mensaje}</span>
      </div>
      <button
        className="flash-alert-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default FlashAlert;
