import passport from "passport";
import { Strategy } from "passport-local";
import db from "../db/index.js"
import bcrypt from "bcryptjs";


// Only during the authentication to specify what user information should be stored in the session.
passport.serializeUser((user, done) => {
	console.log("Inside SerializeUser");
	delete user.hashed_password;
	done(null, user);
});

passport.deserializeUser((user, done) => {
	console.log("Inside DeSerializeUser");
	done(null, user);
});


/**
 * Local strategy for authentication when a user tries to login.
 * If the authentication was successful, a callback function is returned with user information stored in the database.
 * If If the authentication was not successful, a callback function is returned with no user information and an error message.
 */
export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const result = await db.query("SELECT * FROM users WHERE username=$1", [username,]);
			
			if(result.rows.length<1){
				console.log("Invalid username.");
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			const foundUser = result.rows[0];
			const storedUserHashPassword = foundUser.hashed_password;
			bcrypt.compare(password, storedUserHashPassword, (err, success) => {
				if(err){
					console.error("Error comparing passwords:", err);
					throw new Error("Error comparing passwords");
				} else {
					if(success){
						//Successful auth.
						return done(null, foundUser);
					} else {
						return done(null, false, { message: 'Incorrect username or password.' });
					}
				}
			});
		} catch (err) {
			done(err, null);
		}
	})
);