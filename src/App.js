import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [numberType, setNumberType] = useState("random");
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState("");

  // Function to generate numbers based on the selected type
  const generateNumbers = () => {
    setError("");
    let newNumbers = [];

    switch (numberType) {
      case "random":
        newNumbers = generateRandomNumbers(5);
        break;
      case "even":
        newNumbers = generateEvenNumbers(5);
        break;
      case "prime":
        newNumbers = generatePrimeNumbers(5);
        break;
      case "fibonacci":
        newNumbers = generateFibonacciNumbers(5);
        break;
      default:
        setError("Invalid number type selected.");
        return;
    }

    // Ensure numbers are unique
    setNumbers([...new Set([...numbers, ...newNumbers])]);
  };

  // Function to generate random numbers
  const generateRandomNumbers = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
  };

  // Function to generate even numbers
  const generateEvenNumbers = (count) => {
    return Array.from({ length: count }, (_, i) => (i + 1) * 2);
  };

  // Function to generate prime numbers
  const generatePrimeNumbers = (count) => {
    const primes = [];
    let num = 2;

    while (primes.length < count) {
      if (isPrime(num)) primes.push(num);
      num++;
    }

    return primes;
  };

  // Function to check if a number is prime
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Function to generate Fibonacci numbers
  const generateFibonacciNumbers = (count) => {
    const fib = [0, 1];
    for (let i = 2; i < count; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib.slice(0, count);
  };

  return (
    <div className="container">
      <h1>Number Generator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="random">Random</option>
        <option value="even">Even</option>
        <option value="prime">Prime</option>
        <option value="fibonacci">Fibonacci</option>
      </select>
      <button onClick={generateNumbers}>Generate Numbers</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
