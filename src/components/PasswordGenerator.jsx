import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { ImArrowRight2 } from "react-icons/im";
import { toast } from "react-hot-toast";
import {
  checkboxOptions,
  randomCharacters,
} from "../data/PasswordGeneratorData";

const PasswordGenerator = () => {
  const [checkedValue, setCheckedValue] = useState([]);
  const [rangeValue, setRangeValue] = useState(0);
  const [generatedPassword, setGeneratedPassword] = useState([]);

  //* Random characters that will be generated
  const randomUppercase = randomCharacters[0];
  const randomLowercase = randomCharacters[1];
  const randomNumbers = randomCharacters[2];
  const randomSymbols = randomCharacters[3];

  //* Range value handler
  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleRangeInput = (e) => {
    if (rangeValue > e.target.value) {
      const storedText = [...generatedPassword];
      storedText.pop();
      setGeneratedPassword(storedText);
    }
  };

  useEffect(() => {
    if (rangeValue < 1) {
      setGeneratedPassword([]);
    }
  }, [rangeValue]);

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

  //* Password generator button
  const handleGeneratePassword = () => {
    let generatedUppercase;
    let generatedLowercase;
    let generatedNumbers;
    let generatedSymbols;

    if (checkedValue.length > 0) {
      if (checkedValue.includes("uppercase")) {
        generatedUppercase = [...Array.from({ length: rangeValue })].map(
          () =>
            randomUppercase[Math.floor(Math.random() * randomUppercase.length)]
        );
      }
      if (checkedValue.includes("lowercase")) {
        generatedLowercase = [...Array.from({ length: rangeValue })].map(
          () =>
            randomLowercase[Math.floor(Math.random() * randomLowercase.length)]
        );
      }
      if (checkedValue.includes("numbers")) {
        generatedNumbers = [...Array.from({ length: rangeValue })].map(
          () => randomNumbers[Math.floor(Math.random() * randomNumbers.length)]
        );
      }
      if (checkedValue.includes("symbols")) {
        generatedSymbols = [...Array.from({ length: rangeValue })].map(
          () => randomSymbols[Math.floor(Math.random() * randomSymbols.length)]
        );
      }

      const result = [
        generatedUppercase,
        generatedLowercase,
        generatedNumbers,
        generatedSymbols,
      ];
      setGeneratedPassword(
        result
          .flat()
          .sort(() => 0.5 - Math.random())
          .slice(0, +rangeValue)
          .reverse()
      );
    } else {
      toast.error("Please select the characters you want to generate");
      return;
    }
    if (+rangeValue === 0) {
      toast.error("Please select character length");
      return;
    }
  };

  //* Copy to clipboard
  const handleCopyPassword = async () => {
    if (generatedPassword.length > 0) {
      try {
        await navigator.clipboard.writeText(generatedPassword.join(""));
        toast.success("Password copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy, please try again");
      }
    } else {
      toast.error("Input text is empty");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-[0.7rem] mx-[1.4rem] w-[27rem] md:mt-[2rem] md:w-[23rem]">
        <p className="text-almost-white text-lg text-center font-semibold">
          Password Generator
        </p>
        <div className="flex justify-between items-center mt-5 bg-light-blue h-[3rem] px-5 ">
          <p className="text-almost-white font-bold text-xl flex items-start justify-start">
            {generatedPassword.length === 0 ? (
              "P4$W0rD!"
            ) : (
              <span className="text-white">{generatedPassword}</span>
            )}
          </p>
          <FaRegCopy
            onClick={handleCopyPassword}
            className="text-neon-green cursor-pointer hover:text-white transition duration-75"
            size={17}
          />
        </div>
        <div className="bg-light-blue mt-5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-white text-sm">Character Length</p>
            <p className="text-neon-green text-2xl">{rangeValue}</p>
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
            <div className="h-5 flex gap-1 items-center justify-center">
              <span className="mr-2 text-white font-bold text-lg">
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
            <button
              onClick={handleGeneratePassword}
              className="border border-neon-green bg-neon-green h-[3rem] font-bold text-dark-blue flex items-center justify-center gap-3 text-sm hover:bg-light-blue hover:text-neon-green transition duration-50"
            >
              GENERATE
              <ImArrowRight2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
