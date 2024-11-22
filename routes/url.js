import express from "express";
import urlFunc from "../controller/url.js";

const router = express.Router()

router.post('/', urlFunc.handleGenerateNewShortURL)
router.get("/:shortId", urlFunc.redirectToURL);
router.get("/analytic/:shortId", urlFunc.analyticOfLink);

export default router;