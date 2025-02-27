import passport from "passport";
import { Strategy } from "passport-local";


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
	new Strategy((username, password, done) => {
		try {
/*             console.log(`Username: ${username}`);
            console.log(`Pasword: ${password}`); */
			const findUser = {id: "007", username: username, password: password};
			done(null, findUser);
		} catch (err) {
			done(err, null);
		}
	})
);