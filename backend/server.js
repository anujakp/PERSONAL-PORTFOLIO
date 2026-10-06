import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || "*" }))
app.use(express.json())

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
})

const Contact = mongoose.model("Contact", contactSchema)

const projects = [
  {
    title: "Heart Disease Prediction",
    description: "Machine-learning prediction project using a Random Forest classifier.",
    tech: ["Python", "Pandas", "Scikit-learn", "Random Forest"]
  },
  {
    title: "Fitness & Nutrition App",
    description: "Full-stack platform concept for workouts, diet and motivation.",
    tech: ["React", "Node.js", "MongoDB"]
  }
]

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running" })
})

app.get("/api/projects", (req, res) => {
  res.json(projects)
})

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." })
    }
    const contact = await Contact.create({ name, email, message })
    res.status(201).json({ message: "Message saved successfully.", id: contact._id })
  } catch (error) {
    res.status(500).json({ message: "Server error. Check MongoDB connection." })
  }
})

const PORT = process.env.PORT || 5000

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })
    .catch(error => {
      console.error("MongoDB connection failed:", error.message)
      console.log("Start the API after configuring MONGO_URI in .env")
    })
} else {
  console.warn("MONGO_URI not set — starting API without MongoDB. Contact endpoints that require the database will fail.")
  app.listen(PORT, () => console.log(`API running on port ${PORT} (no DB)`))
}