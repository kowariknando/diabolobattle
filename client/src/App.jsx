import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "",
    cleanness: "",
    creativity: "",
    presentation: "",
    additionalPoints: ""
  });

  const [people, setPeople] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields (additionalPoints is optional)
    if (
      !formData.name ||
      formData.difficulty === "" ||
      formData.cleanness === "" ||
      formData.creativity === "" ||
      formData.presentation === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // IMPORTANT: Updated to /people/add
      const response = await fetch("/people/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          difficulty: Number(formData.difficulty),
          cleanness: Number(formData.cleanness),
          creativity: Number(formData.creativity),
          presentation: Number(formData.presentation),
          additionalPoints: formData.additionalPoints
            ? Number(formData.additionalPoints)
            : undefined
        })
      });

      if (response.ok) {
        const newPerson = await response.json();
        setPeople((prevPeople) => [...prevPeople, newPerson]);
        setFormData({
          name: "",
          difficulty: "",
          cleanness: "",
          creativity: "",
          presentation: "",
          additionalPoints: ""
        });
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Fetch all people
  const fetchPeople = async () => {
    try {
      // IMPORTANT: Updated to /people/all
      const response = await fetch("/people/all");
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div>
      <h1>Diabolo Battle - Add Person</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name (required):</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Difficulty (0-10, required):</label>
          <input
            type="number"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            min="0"
            max="10"
            required
          />
        </div>
        <div>
          <label>Cleanness (0-5, required):</label>
          <input
            type="number"
            name="cleanness"
            value={formData.cleanness}
            onChange={handleChange}
            min="0"
            max="5"
            required
          />
        </div>
        <div>
          <label>Creativity (0-10, required):</label>
          <input
            type="number"
            name="creativity"
            value={formData.creativity}
            onChange={handleChange}
            min="0"
            max="10"
            required
          />
        </div>
        <div>
          <label>Presentation (0-10, required):</label>
          <input
            type="number"
            name="presentation"
            value={formData.presentation}
            onChange={handleChange}
            min="0"
            max="10"
            required
          />
        </div>
        <div>
          <label>Additional Points (0-15, optional):</label>
          <input
            type="number"
            name="additionalPoints"
            value={formData.additionalPoints}
            onChange={handleChange}
            min="0"
            max="15"
          />
        </div>
        <button type="submit">Add Person</button>
      </form>

      <h2>People List</h2>
      <ul>
        {people.map((person) => (
          <li key={person._id}>
            {person.name} – Difficulty: {person.difficulty}, Cleanness:{" "}
            {person.cleanness}, Creativity: {person.creativity}, Presentation:{" "}
            {person.presentation}, Additional Points:{" "}
            {person.additionalPoints ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
