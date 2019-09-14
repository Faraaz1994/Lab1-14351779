var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ res: 10 });
});

router.post('/', function (req, res, next) {
  const { leftOperand, rightOperand, operator } = req.body;
  switch (operator) {
    case "+":
      res.send({ result : (parseFloat(leftOperand) + parseFloat(rightOperand)) });
      break;
    case "-":
        res.send({ result : (parseFloat(leftOperand) - parseFloat(rightOperand)) });
      break;
    case "*":
        res.send({ result : (parseFloat(leftOperand) * parseFloat(rightOperand)) });
      break;
    case "/" :
      //TODO divide by zero
      res.send({ result : (parseFloat(leftOperand) / parseFloat(rightOperand)) });
      break;  
    default:
      break;
  }
});

module.exports = router;
