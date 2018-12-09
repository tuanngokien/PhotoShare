const {getNewRouter} = require("./base");
const router = getNewRouter();

router.get('/me', (req, res) => {
    if (!req.user) {
        res.json({"errors": error});
    } else {
        res.json(req.user);
    }
});


module.exports = router;
