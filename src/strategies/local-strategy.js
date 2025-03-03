import passport from "passport";
import { Strategy } from "passport-local";
import db from "../db/index.js"


// Only during the authentication to specify what user information should be stored in the session.
passport.serializeUser((user, done) => {
	console.log(user.username);
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

/* 
    TODO: Logic for finding a user in the postgres db.
        Use bcrypt to compare hashed password against the one that the user entered.
*/
export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
/*             console.log(`Username: ${username}`);
            console.log(`Pasword: ${password}`); */
			const foundUser = await db.query("SELECT * FROM users WHERE username=$1", [username,]);
			
			if(foundUser.rows.length<1){
				console.log("Invalid username.");
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			if(foundUser.rows[0].hashed_password!=password){
				console.log("Invalid password.");
				
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			console.log("Password match!");
			
			done(null, foundUser.rows[0]);
		} catch (err) {
			done(err, null);
		}
	})
);