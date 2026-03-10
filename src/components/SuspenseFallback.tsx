import { useContext } from "react";
import { LangContext } from "./language";
import { placeholderMessages } from "../assets/constants";

/**
 * @component SuspenseFallback
 * @description Reusable fallback for React.Suspense boundaries. Displays a
 * translated loading message with a pulse animation and tertiary-colored border.
 */
const SuspenseFallback = () => {
  const { currentLang } = useContext(LangContext);

  const message = placeholderMessages.find(
    (m) => m.context === "loadingComponent"
  )!.content[currentLang];

  return (
    <div className="w-full h-125 flex items-center justify-center">
      <div className={`
        text-(--color-tertiary)
        border border-(--color-tertiary)/30
        rounded-lg
        px-6 py-3
        text-xl
        animate-pulse
      `}>
        {message}
      </div>
    </div>
  );
};

export default SuspenseFallback;
