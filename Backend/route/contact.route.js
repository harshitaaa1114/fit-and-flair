

import express from "express";
import { submitContactForm,getAllContacts,
 } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/contact", submitContactForm);
router.get("/admin/contacts", getAllContacts);

export default router;
