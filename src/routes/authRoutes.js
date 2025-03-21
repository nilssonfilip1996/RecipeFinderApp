import { Router } from "express";
import passport from "passport";
import db from "../db/index.js";
import bcrypt from "bcryptjs";

const router = Router();


router.get("/auth/register", (req, res) => {
	if(req.isAuthenticated()){
		return res.redirect("/");
	}
    res.render("register.ejs", { user: req.session.passport ? req.session.passport.user : null, });
});

router.post("/auth/register", async (req, res) => {
	if(req.isAuthenticated()){
		return res.redirect("/");
	}
	const profileName = req.body["profileName"];
	const username = req.body["username"];
	const password = req.body["password"];
	
	try {
		const foundUser = await db.query("SELECT * FROM users WHERE username=$1", [username,]);
		if(foundUser.rows.length>0){
			return res.render("register.ejs", {registerError: "User already exists!", user: req.session.passport ? req.session.passport.user : null,})
		}			
		bcrypt.hash(password, +process.env.BCRYPT_SALTROUNDS, async (err, hash) => {
			if(err){
				console.log("Error hashing password: ", err);
				return res.redirect("auth/register");
			}
			const result = await db.query("INSERT INTO users (full_name, username, hashed_password) VALUES ($1, $2, $3) RETURNING *", [profileName, username, hash]);
			const newUser = result.rows[0];
			req.login(newUser, (err) => {
				console.log("successful registration");
				res.redirect("/");
			});
		});
	} catch (error) {
		console.log("Error in post auth/register:");
		console.log(error);
	}
});

router.get("/auth/login", (req, res) => {
	if(req.isAuthenticated()){
		return res.redirect("/");
	}
    if(req.session.messages && req.session.messages.length>0){
        const loginErrorMsg = req.session.messages.pop();
        console.log(loginErrorMsg);
        return res.render("login.ejs", {loginError: loginErrorMsg,});
    }
    res.render("login.ejs");
});

/* 
	Post request from a client who wishes to login.
 */
router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/auth/login", failureMessage: true}),
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
		res.redirect("/");
	});
});

export default router;
