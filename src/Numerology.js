import React, { useState } from "react";
import axios from "axios";

function NumerologyForm() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState("");
  const [myNumber, setMyNumber] = useState("Nr:");
  const [result, setResult] = useState();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [middleNameError, setMiddleNameError] = useState("");

  const handleNameChange = (name, value) => {
    const regex = /^[A-Za-z]*$/;

    if (regex.test(value)) {
      if (name === "first") {
        setFirstNameError("");
        setFirstName(value);
      }
      if (name === "last") {
        setLastNameError("");
        setLastName(value);
      }
      if (name === "middle") {
        setMiddleNameError("");
        setMiddleName(value);
      }
    } else {
      if (name === "first") {
        setFirstName(value);
        setFirstNameError("Text can only contain English letters.");
      }
      if (name === "middle") {
        setMiddleName(value);
        setMiddleNameError("Text can only contain English letters.");
      }
      if (name === "last") {
        setLastName(value);
        setLastNameError("Text can only contain English letters.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://the-numerology-api.p.rapidapi.com/personality_number";
      const params = {
        first_name: firstName,
        middle_name: middleName ? middleName : " ",
        last_name: lastName,
      };
      const headers = {
        "X-RapidAPI-Key": "02f6a7a332msh92b0feca5aeeb9ep170aa0jsn4657182d3a9b",
        "X-RapidAPI-Host": "the-numerology-api.p.rapidapi.com",
        "content-type": "application / json",
      };

      const response = await axios.get(url, {
        params: params,
        headers: headers,
      });

      setMyNumber(
        "Nr:" + " " + JSON.stringify(response.data.personality_number)
      );
      setResult(response.data.summary);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const inputStyle = {
    margin: 10,
    height: 40,
    width: 300,
    background: "none",
    border: "none",
    borderBottom: "1px solid #6536c9",
    color: "white",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => handleNameChange("first", e.target.value)}
        required
        placeholder="First name"
        style={inputStyle}
      />
      {firstNameError && (
        <div style={{ color: "red", fontSize: 14 }}>{firstNameError}</div>
      )}
      <input
        type="text"
        value={middleName}
        onChange={(e) => handleNameChange("middle", e.target.value)}
        placeholder="Middle name"
        style={inputStyle}
      />
      {middleNameError && (
        <div style={{ color: "red", fontSize: 14 }}>{middleNameError}</div>
      )}
      <input
        type="text"
        value={lastName}
        onChange={(e) => handleNameChange("last", e.target.value)}
        required
        placeholder="Last name"
        style={inputStyle}
      />
      {lastNameError && (
        <div style={{ color: "red", fontSize: 14 }}>{lastNameError}</div>
      )}
      <button
        type="submit"
        disabled={firstNameError || lastNameError || middleNameError}
        style={{
          width: 300,
          margin: 20,
          height: 50,
          borderRadius: 5,
          backgroundColor: "#6536c9",
          color: "white",
        }}
      >
        Free numerology reading
      </button>
      <div>
        <textarea
          value={result}
          readOnly
          style={{
            width: 400,
            height: 200,
            height: 200,
            fontSize: 14,
            fontFamily: "sans-serif",
          }}
        />
      </div>
    </form>
  );
}

export default NumerologyForm;
