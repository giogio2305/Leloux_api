let express = require('express');
let router = express.Router();
 
const customers = require('./controller.js');
const reparateurs = require('./controller.js');
const interventions =  require('./controller.js');
const diagno = require('./controller.js');

///////////////////////
// Routes Véhicules //
//////////////////////

router.post('/crud/customer', customers.createCustomer);
router.get('/crud/customer/:id', customers.getCustomer);
router.get('/crud/customers', customers.customers);
router.put('/crud/customer', customers.updateCustomer);
router.delete('/crud/customer/:id', customers.deleteCustomer);

////////////////////////
// Routes Réparateurs //
///////////////////////

router.post('/crud/reparateur', reparateurs.createReparateur);
router.get('/crud/reparateurs', reparateurs.reparateurs);
router.get('/crud/reparateur/:id', reparateurs.getRepa);
router.put('/crud/reparateur', reparateurs.updateReparateur);
router.delete('/crud/reparateur/:id', customers.deleteReparateur);

/////////////////////////
// Routes Inteventions //
////////////////////////

router.post('/crud/intervention', interventions.createIntervention);
router.get('/crud/interventions', interventions.interventions);
router.get('/crud/interventions/:repa',interventions.Pinterventions);
router.put('/crud/intervention', interventions.updateIntervention);
router.get('/crud/uintervention/:id', interventions.getInt);

////////////////////////
// Routes Diagnostics //
///////////////////////

router.post('/crud/diagno', diagno.createDiagno);
router.get('/crud/diagnos', diagno.diagnos);
router.get('/crud/diagno/:id', diagno.getDiagnos);
router.get('/crud/diagnos/:clid',diagno.PDiagnos);
router.put('/crud/diagno', diagno.updateDiag);
router.put('/crud/codiagno', diagno.confDiag);

module.exports = router;