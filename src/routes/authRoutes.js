import { Router } from "express";
import passport from "passport";

const router = Router();

/* 
	Post request from a client who wishes to login.
 */
router.post(
  "/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.redirect("/");
  }
);

router.get("/auth/status", (req, res) => {
	return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.get("/auth/logout", (req, res) => {
	if (!req.user) return res.sendStatus(401);
	req.logout((err) => {
		if (err) return res.sendStatus(400);
		res.send(200);
	});
});

export default router;
