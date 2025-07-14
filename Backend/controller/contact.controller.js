

import Contact from "../model/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    return res.status(200).json({
      message: "Your message has been submitted successfully.",
      contactId: newContact._id
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ data: contacts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts." });
  }
};


