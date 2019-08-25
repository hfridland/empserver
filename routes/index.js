var express = require('express');
var router = express.Router();

function sortEmployees(emps) {
  var endLoop, cntChanges = 0
  do {
    endLoop = true
    for (var i = 0; i < emps.length - 1; i++) {
      if (+emps[i].salary > +emps[i+1].salary) {
        var t = emps[i]
        emps[i] = emps[i+1]
        emps[i+1] = t
        cntChanges++
        endLoop = false
      }
    }
  } while (endLoop)

  return cntChanges
}

/* GET home page. */

router.get('/', async function (req, res, next) {
  var csvFilePath='data/employees.csv'
  var csv = require('csvtojson')
  var employees= await csv().fromFile(csvFilePath);
  var cntChanges = sortEmployees(employees)
  res.render('index', { title: 'Employees list', employees: employees, cntChanges: cntChanges });
});

module.exports = router;
