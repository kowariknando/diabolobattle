import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {
    const [people, setPeople] = useState([]);
    const [formData, setFormData] = useState({ name: "", age: "", city: "" });

    // Fetch data from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/people/all")
            .then((response) => setPeople(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/people/add", formData)
            .then((response) => {
                // Add the new person to the list
                setPeople([...people, response.data]);
                // Clear the form
                setFormData({ name: "", age: "", city: "" });
            })
            .catch((error) => console.error("Error adding person:", error));
    };

    const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/people/delete/${id}`)
        .then(() => {
            // Remove the person from the UI after deleting
            setPeople(people.filter(person => person._id !== id));
        })
        .catch((error) => console.error("Error deleting person:", error));
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.title}>People List</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Add Person</button>
            </form>

            {/* People List */}
            <ul style={styles.list}>
                {people.map((person) => (
                    <li key={person._id} style={styles.listItem}>
            <span style={styles.listText}>
                <strong>ID:</strong> {person._id} <br/>
                {person.name} - {person.age} years old, lives in {person.city}.
            </span>
                        <button onClick={() => handleDelete(person._id)} style={styles.deleteButton}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
        color: "#000", // Text color
        backgroundColor: "#f0f8ff", // Light blue background
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
    deleteButton: {
        marginLeft: "10px",
        padding: "5px 10px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
    },
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "10px",
    },
    listItem: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        marginBottom: "5px",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    listText: {
        fontSize: "16px",
        color: "#333",
    },
};

export default App;
