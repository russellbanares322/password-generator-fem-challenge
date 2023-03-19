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

  //TODO If the checked value array is empty then generate random number but if the length > 0 generate characters depending on the values inside of the array//

  useEffect(() => {
    if (rangeValue > 0) {
      const randomCharacters =
        characters[Math.floor(Math.random() * characters.length)];
      const letterIndex = Math.floor(Math.random() * randomCharacters.length);
      const uppercaseLetters = randomCharacters[letterIndex].substring(
        0,
        rangeValue
      );

      setGeneratedText([...generatedText, uppercaseLetters]);
    } else {
      const storedText = [...generatedText];
      const removedText = storedText.slice(0, rangeValue);
      setGeneratedText(removedText);
    }
  }, [rangeValue]);
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
              : generatedText.map((text, idx) => (
                  <p className="text-white" key={idx}>
                    {text}
                  </p>
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
