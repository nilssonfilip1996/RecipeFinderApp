import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    if(req.session.messages && req.session.messages.length>0){
        const loginErrorMsg = req.session.messages.pop();
        console.log(loginErrorMsg);
        return res.render("login.ejs", {loginError: loginErrorMsg});
    }
    res.render("login.ejs");
});

export default router;