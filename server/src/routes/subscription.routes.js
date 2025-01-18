import { Router } from 'express';
import {
    getUserChannelSubscribers,
    toggleSubscription,
    getSubscribedChannels
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
// Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .post(verifyJWT, toggleSubscription);

router
    .route("/d/:channelId")
    .get(getUserChannelSubscribers);

router
    .route("/s/:subscriberId")
    .get(getSubscribedChannels);

export default router