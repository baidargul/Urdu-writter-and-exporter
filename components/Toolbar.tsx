import { exportAsImageToClipboard } from "@/libs/SVG";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  value: string;
  fontSize: number;
  letterSpacing: number;
  contentDimensions: {
    width: number;
    height: number;
  };
};

const Toolbar = (props: Props) => {
  const functions = {
    copyText: async () => {
      try {
        await navigator.clipboard.writeText(props.value);
        alert("Text copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy text: ", error);
        alert("Failed to copy text");
      }
    },
    copySVG: async () => {
      exportAsImageToClipboard(
        props.value,
        props.fontSize,
        props.letterSpacing,
        props.contentDimensions
      );
    },
  };

  return (
    <div className="p-2 rounded-md border border-zinc-300 bg-white">
      <div className="grid grid-cols-2 items-center gap-1">
        {/* Copy Text */}
        <button
          onClick={functions.copyText}
          className="p-1 rounded border border-transparent hover:border-zinc-300 text-zinc-500"
          title="Copy Text"
        >
          <Copy size={20} />
        </button>

        {/* Copy SVG */}
        <button
          onClick={functions.copySVG}
          className="p-1 rounded border border-transparent hover:border-zinc-300 text-lime-600"
          title="Copy Image"
        >
          <Copy size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
