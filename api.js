const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const router = express.Router();

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));
api.use(bodyparser.json({limit: '20mb', extended: true}));

router.get("/", (req, res) => res.json({
    mensagem: 'API Online...'
}));

api.use("/", router);
api.listen(process.env.PORT || 3000);
console.log("Run API Express");