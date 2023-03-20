import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const PasswordGenerator = () => {
  const [checkedValue, setCheckedValue] = useState([]);
  const [rangeValue, setRangeValue] = useState(0);
  const [generatedText, setGeneratedText] = useState([]);

  //* Random characters that will be generated

  const characters = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "1234567890",
    "!@#$%^&*()",
  ];

  const uppercaseCharacters = characters[0];
  const lowercaseCharacters = characters[1];
  const numbers = characters[2];
  const symbols = characters[3];

  const allCharacters =
    characters[Math.floor(Math.random() * characters.length)];
  const randomCharacters =
    allCharacters[Math.floor(Math.random() * allCharacters.length)];
  const randomUppercase =
    uppercaseCharacters[Math.floor(Math.random() * uppercaseCharacters.length)];
  const randomLowercase =
    lowercaseCharacters[Math.floor(Math.random() * lowercaseCharacters.length)];
  const randomNumbers = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSymbols = symbols[Math.floor(Math.random() * symbols.length)];

  //* Checkbox options
  const checkboxOptions = [
    {
      type: "checkbox",
      value: "uppercase",
      details: "Include Uppercase Letters",
    },
    {
      type: "checkbox",
      value: "lowercase",
      details: "Include Lowercase Letters",
    },
    {
      type: "checkbox",
      value: "numbers",
      details: "Include Numbers",
    },
    {
      type: "checkbox",
      value: "symbols",
      details: "Include Symbols",
    },
  ];

  //* Range value handler
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleRangeInput = (e) => {
    if (rangeValue < e.target.value) {
      if (checkedValue.includes("uppercase")) {
        setGeneratedText([...generatedText, randomUppercase]);
      }
      if (checkedValue.includes("lowercase")) {
        setGeneratedText([...generatedText, randomLowercase]);
      }
      if (checkedValue.includes("numbers")) {
        setGeneratedText([...generatedText, randomNumbers]);
      }
      if (checkedValue.includes("symbols")) {
        setGeneratedText([...generatedText, randomSymbols]);
      }
      if (checkedValue.length === 0 || checkedValue.length === 4) {
        setGeneratedText([...generatedText, randomCharacters]);
      }
    } else {
      const storedText = [...generatedText];
      storedText.pop();
      setGeneratedText(storedText);
    }
  };
  console.log(generatedText);
  //* Checkbox value handler
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedValue((prev) => [...prev, value]);
    } else {
      setCheckedValue((prev) => {
        return [...prev.filter((val) => val !== value)];
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="my-[5rem] mx-[1.4rem] w-[27rem] md:m-[7rem] md:w-[23rem]">
        <p className="text-almost-white text-lg text-center font-semibold">
          Password Generator
        </p>
        <div className="flex justify-between items-center mt-5 bg-light-blue h-[3rem] px-5 ">
          <p className="text-almost-white font-bold text-xl flex items-start justify-start">
            {generatedText.length === 0
              ? "P4$W0rD!"
              : generatedText.length > 0 &&
                generatedText.map((text, idx) => (
                  <span className="text-white" key={idx}>
                    {text}
                  </span>
                ))}
          </p>
          <FaRegCopy
            className="text-neon-green cursor-pointer hover:text-white transition duration-75"
            size={17}
          />
        </div>
        <div className="bg-light-blue mt-5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-white text-md">Character Length</p>
            <p className="text-neon-green text-xl">{rangeValue}</p>
          </div>
          <input
            min={0}
            max={20}
            onInput={handleRangeInput}
            onChange={handleRangeChange}
            className="slider"
            type="range"
            value={rangeValue}
          />
          <div className="text-white text-sm mt-5">
            {checkboxOptions.map((checkbox) => (
              <div
                className="flex items-center justify-start gap-5 mt-3"
                key={checkbox.value}
              >
                <input
                  className="checkbox"
                  type={checkbox.type}
                  value={checkbox.value}
                  onChange={handleCheckboxChange}
                />
                <p>{checkbox.details}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 bg-dark-blue h-[3rem] px-5 ">
            <p className="text-almost-white text-sm font-bold">STRENGTH</p>
            <div className="flex gap-1">
              <span className="mr-2 text-white font-bold h-5">
                {rangeValue === 0 && ""}
                {rangeValue >= 1 && rangeValue <= 9 && "WEAK"}
                {rangeValue >= 10 && rangeValue <= 15 && "MEDIUM"}
                {rangeValue >= 16 && "STRONG"}
              </span>
              <span
                className={`${
                  rangeValue >= 1
                    ? "bg-yellow border-2 border-yellow h-5 w-2"
                    : "border-2 bg-none border-white h-5 w-2"
                }`}
              ></span>
              <span
                className={`${
                  rangeValue >= 5
                    ? "bg-yellow border-2 border-yellow h-5 w-2"
                    : "border-2 bg-none border-white h-5 w-2"
                }`}
              ></span>
              <span
                className={`${
                  rangeValue >= 10
                    ? "bg-yellow border-2 border-yellow h-5 w-2"
                    : "border-2 bg-none border-white h-5 w-2"
                }`}
              ></span>
              <span
                className={`${
                  rangeValue >= 16
                    ? "bg-yellow border-2 border-yellow h-5 w-2"
                    : "border-2 bg-none border-white h-5 w-2"
                }`}
              ></span>
            </div>
          </div>
          <div className="grid mt-5">
            <button className="border border-neon-green bg-neon-green h-[3rem] font-bold text-dark-blue flex items-center justify-center gap-4 text-sm hover:bg-light-blue hover:text-neon-green transition duration-50">
              GENERATE
              <FiArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
