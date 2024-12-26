"use client";

import Toolbar from "@/components/Toolbar";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const phoneticMapping: any = {
    // Basic characters (standard keys)
    a: "ا",
    b: "ب",
    c: "چ",
    d: "د",
    e: "ے",
    f: "ف",
    g: "گ",
    h: "ہ",
    i: "ی",
    j: "ج",
    k: "ک",
    l: "ل",
    m: "م",
    n: "ن",
    o: "و",
    p: "پ",
    q: "ق",
    r: "ر",
    s: "س",
    t: "ت",
    u: "و",
    v: "و",
    w: "و",
    x: "ایکس",
    y: "ے",
    z: "ز",

    // Shift-based characters (Shift + key)
    A: "آ",
    B: "بھ",
    C: "خ",
    D: "ڈ",
    E: "ئی",
    F: "فہ",
    G: "گہ",
    H: "ح",
    I: "ئی",
    J: "جھ",
    K: "کھ",
    L: "ڵ",
    M: "ں",
    N: "ں",
    O: "ؤ",
    P: "ں",
    Q: "قہ",
    R: "ڑ",
    S: "ش",
    T: "ٹ",
    U: "ؤ",
    V: "ۓ",
    W: "ۓ",
    X: "ژ",
    Y: "ے",
    Z: "ذ",

    // Numbers (using Persian-Indic digits)
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
    "0": "٠",

    // Punctuation
    ".": "۔",
    ",": "،",
    "?": "؟",
    "!": "!",
    ";": "؛",
    ":": ":",
    "'": "‘",
    '"': "“",
    "(": "(",
    ")": ")",
    "-": "-",
    _: "_",
    "+": "+",
    "=": "=",
    "/": " /",
    "\\": "\\",
    "[": "[",
    "]": "]",
    "{": "{",
    "}": "}",
    "&": "و", // Ampersand
    "%": "%",
    $: "$",
    "#": "#",
    "@": "@",

    // Alt-based shortcuts (Alt key combinations)
    "alt + a": "آ", // Alt + a
    "alt + b": "ب", // Alt + b
    "alt + c": "ک", // Alt + c
    "alt + d": "ڈ", // Alt + d
    "alt + e": "ی", // Alt + e
    "alt + f": "فہ", // Alt + f
    "alt + g": "گہ", // Alt + g
    "alt + h": "ح", // Alt + h
    "alt + i": "ئی", // Alt + i
    "alt + j": "جھ", // Alt + j
    "alt + k": "کھ", // Alt + k
    "alt + l": "ڵ", // Alt + l
    "alt + m": "ں", // Alt + m
    "alt + n": "ں", // Alt + n
    "alt + o": "ؤ", // Alt + o
    "alt + p": "پ", // Alt + p
    "alt + q": "قہ", // Alt + q
    "alt + r": "ڑ", // Alt + r
    "alt + s": "ش", // Alt + s
    "alt + t": "ٹ", // Alt + t
    "alt + u": "ؤ", // Alt + u
    "alt + v": "ۓ", // Alt + v
    "alt + w": "ۓ", // Alt + w
    "alt + x": "ژ", // Alt + x
    "alt + y": "ے", // Alt + y
    "alt + z": "ذ", // Alt + z

    // Control keys (not part of phonetic mapping but handled separately)
    space: " ",
    backspace: "",
    enter: "\n",
  };
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useState("بیدار گل");
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0.1);
  const [contentDimensions, setContentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const textareaRef: any = useRef(null);
  let typedBuffer = ""; // Buffer to hold typed characters

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Run the updateContentDimensions on initial render and when the value changes
    updateContentDimensions();
  }, [value]);

  const updateContentDimensions = () => {
    if (textareaRef.current) {
      const { scrollHeight, scrollWidth } = textareaRef.current;
      console.log(scrollHeight, scrollWidth);
      setContentDimensions({ width: scrollWidth, height: scrollHeight });
    }
  };

  const handleKeyPress = (e: any) => {
    const key = e.key;
    const isShiftPressed = e.shiftKey;
    const isAltPressed = e.altKey;

    // Handle Alt combinations first
    const altKeyCombination = `alt + ${key.toLowerCase()}`;
    const urduChar = isAltPressed
      ? phoneticMapping[altKeyCombination] // Check for Alt-based mapping
      : isShiftPressed
      ? phoneticMapping[key.toUpperCase()] // Shift-based mapping
      : phoneticMapping[key]; // Normal mapping

    if (urduChar) {
      e.preventDefault();
      setValue((prev) => prev + urduChar); // Add character to text
      typedBuffer = ""; // Clear buffer
    } else if (typedBuffer.length > 2) {
      typedBuffer = ""; // Clear buffer if no match
    }
  };

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    isMounted && (
      <div className="flex justify-center items-center min-h-[100dvh]">
        <div>
          <div className="">
            <div className="grid grid-cols-[auto,1fr] gap-4">
              <Toolbar
                value={value}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                contentDimensions={contentDimensions}
              />
              <textarea
                ref={textareaRef}
                onKeyDown={handleKeyPress}
                onChange={handleOnChange}
                style={{
                  direction: "rtl",
                  fontFamily: "Jameel Noori Nastaleeq",
                  fontSize: `${fontSize}px`,
                  boxSizing: `border-box`,
                  width: "100%",
                  maxWidth: "600px",
                  minWidth: "600px",
                  overflow: `auto`,
                  letterSpacing: `${letterSpacing}px`,
                }}
                className="w-full min-w-full h-[400px] p-4 border-2 border-gray-300 rounded-lg selection:bg-zinc-200 appearance-none focus:outline-none"
                value={value}
              ></textarea>
            </div>
            <div className="text-sm flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Font size:</div>
                <input
                  className="tracking-wide appearance-none focus:outline-none border-b p-1 selection:bg-zinc-200"
                  type="number"
                  min={10}
                  max={72}
                  onChange={(e: any) => setFontSize(Number(e.target.value))}
                  value={fontSize}
                />
              </div>
              <input
                type="range"
                className="w-full"
                onChange={(e: any) => setFontSize(Number(e.target.value))}
                value={fontSize}
                min={10}
                max={72}
              />
            </div>
            <div className="text-sm flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="font-semibold">Spacing:</div>
                <input
                  className="tracking-wide appearance-none focus:outline-none border-b p-1 selection:bg-zinc-200"
                  type="number"
                  min={-10}
                  max={10}
                  onChange={(e: any) =>
                    setLetterSpacing(Number(e.target.value))
                  }
                  value={letterSpacing}
                />
              </div>
              <input
                type="range"
                className="w-full"
                onChange={(e: any) => setLetterSpacing(Number(e.target.value))}
                value={letterSpacing}
                min={-10}
                max={10}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
