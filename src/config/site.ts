/**
 * Central site configuration.
 *
 * TRAINING_HUB_LOGIN_URL is the ONLY place to set the destination of the
 * "Training Hub" button/link. It points at the separate, invite-only Training
 * Hub application (Admins and Trainers only).
 *
 * Leave it as an empty string until the real URL is known — the UI then renders
 * the button in a non-clickable "coming soon" state instead of linking to a
 * made-up address.
 */
export const TRAINING_HUB_LOGIN_URL = "";

/** Public CALP Network website — used by the header link and the footer link. */
export const CALP_NETWORK_URL = "https://www.calpnetwork.org";
