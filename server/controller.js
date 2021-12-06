const { Vehicules, Diagno, sequelize } = require("./db");
const { Reparateurs } = require("./db");
const { Interventions } = require("./db");
const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 5)



                        /////////////////////////////////
                        // LeLoux Backend - Véhicules //
                        ////////////////////////////////

///////////////////////
// Crée un Véhicule //
//////////////////////

exports.createCustomer = (req, res) => {
    let customer = {};
    try{
        customer.chassis = req.body.chassis;
        customer.owner = req.body.owner;
        customer.marque = req.body.marque;
        customer.modele = req.body.modele;
        customer.year = req.body.year;
        customer.immat = req.body.immat;
        customer.trans = req.body.trans;
        customer.carb = req.body.carb;
        Vehicules.create(customer, 
                          {attributes: ['id','chassis', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
                    .then(result => {    
                        res.json({
                            status: 'SUCCESS',
                            data: result,
                            message: "Vehicule enregistree"
                        });
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            status: "FAILED",
            error: error.message
        });
    }
}


//////////////////////////
// Afficher un Véhicule //
//////////////////////////

exports.getCustomer = (req, res) => {
    Vehicules.findByPk(req.params.id, 
                        {attributes: ['id','chassis', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb', 'createdAt']})
        .then(customer => {
          res.status(200).json(customer);
        }).catch(error => {
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}


////////////////////////////
// Afficher les Véhicules //
///////////////////////////


exports.customers = (req, res) => {
    // find all Customer information from 
    try{
        Vehicules.findAll({attributes: ['id','chassis', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
        .then(customers => {
            res.send({data:customers});
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}

///////////////////////////
// Modifier un Véhicule //
//////////////////////////


exports.updateCustomer = async (req, res, next) => {
    try{
        let customer = await Vehicules.findByPk(req.body.id);
    
        if(!customer){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                chassis: req.body.chassis,
                owner: req.body.owner,
                marque: req.body.marque,
                modele: req.body.modele,
                year: req.body.year,
                immat: req.body.immat,
                trans: req.body.trans,
                carb: req.body.carb
            }
            let result = await Vehicules.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id','chassis', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']
                              }
                            );
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        }
    } catch(error){
        next(err);
    }
}

////////////////////////////
// Supprimer un Véhicule //
///////////////////////////


exports.deleteCustomer = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Vehicules.findByPk(customerId);

        if(!customer){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200);
            res.send({data:customer});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}





                        //////////////////////////////////
                        // LeLoux Backend - Réparateurs //
                        //////////////////////////////////


//////////////////////////
// Créer un Réparateur //
/////////////////////////


exports.createReparateur = (req, res) => {
    let reparateur = {};
    
    try{
        bcrypt.hash(req.body.code, 10).then((hash)=>{ 
             
        
        reparateur.rcode = 'R' + nanoid();
        reparateur.repa = req.body.repa;
        reparateur.cat = req.body.cat;
        reparateur.respo= req.body.respo;
        reparateur.code = hash;
        reparateur.add= req.body.add;
        reparateur.tel= req.body.tel;
        reparateur.capa= req.body.capa;
        reparateur.portail= req.body.portail;
        reparateur.gard= req.body.gard;
        reparateur.caro= req.body.caro;
        reparateur.clim= req.body.clim;
        reparateur.elec= req.body.elec;
        reparateur.elect= req.body.elect;
        reparateur.meca= req.body.meca;
        reparateur.ther= req.body.ther;
        
    
        Reparateurs.create(reparateur, 
                          {attributes: ['id','rcode', 'repa', 'cat', 'respo', 'code', 'add','tel','capa', 'portail', 'gard', 'caro', 'clim', 'elec', 'elect', 'meca', 'ther']})
                    .then(result => {    
                      return res.send({data:result});
                    });
                
                });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}

//////////////////////////////
// Afficher les Réparateurs //
/////////////////////////////

exports.reparateurs = (req, res) => {
    // find all Customer information from 
    try{
        Reparateurs.findAll({attributes: ['id','rcode', 'repa', 'cat', 'respo', 'add', 'tel', 'code','capa', 'portail', 'gard', 'caro', 'clim', 'elec', 'elect', 'meca', 'ther', 'createdAt']})
        .then(reparateurs => {
            res.send({data:reparateurs});
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}

/////////////////////////////
// Afficher un Réparateur //
////////////////////////////

exports.getRepa = (req, res) => {
    Reparateurs.findByPk(req.params.id, 
                        {attributes: ['id','rcode', 'repa', 'cat', 'respo', 'add', 'tel', 'code','capa', 'portail', 'gard', 'caro', 'clim', 'elec', 'elect', 'meca', 'ther', 'createdAt']})
        .then(reparateur => {
          res.status(200).json(reparateur);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}

/////////////////////////////
// Modifier un Réparateur //
////////////////////////////

exports.updateReparateur = async (req, res, next) => {
    try{
        let repa = await Reparateurs.findByPk(req.body.id);
    
        if(!repa){
            res.status(404).json({
                message: "Aucune modification possible pour un reparteur avec pour id = " + req.body.id,
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                repa: req.body.repa,
                cat: req.body.cat,
                respo: req.body.respo,
                add: req.body.add,
                tel: req.body.tel,
                capa: req.body.capa,
                portail: req.body.portail,
                gard: req.body.gard,
                caro: req.body.caro,
                clim: req.body.clim,
                elec: req.body.elec,
                elect: req.body.elect,
                meca: req.body.meca,
                ther: req.body.ther
            }
            let result = await Reparateurs.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'repa', 'cat', 'respo', 'add','tel','capa', 'portail', 'gard', 'caro', 'clim', 'elec', 'elect', 'meca', 'ther','updatedAt']
                              }
                            );

            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a reparateur with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        
    }

    } catch(error){
        next(err);
    }
}


//////////////////////////////
// Supprimer un Réparateur //
/////////////////////////////

exports.deleteReparateur = async (req, res) => {
    try{
        let repaId = req.params.id;
        let repa = await Reparateurs.findByPk(repaId);

        if(!repa){
            res.status(404).json({
                message: "Il n'existe pas de reparateurs avec pour id = " + customerId,
                error: "404",
            });
        } else {
            await repa.destroy();
            res.status(200);
            res.send({data:customer});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}




                        ////////////////////////////////////
                        // LeLoux Backend - Interventions //
                        ////////////////////////////////////


//////////////////////////////
// Créer une  Intervention //
/////////////////////////////

exports.createIntervention = (req, res) => {
    let inter = {};

    try{
        inter.owner = req.body.owner;
        inter.marque = req.body.marque;
        inter.modele = req.body.modele;
        inter.year = req.body.year;
        inter.immat = req.body.immat;
        inter.nc = req.body.nc;
        inter.contact = req.body.contact;
        inter.repa = req.body.repa;
        inter.action = req.body.action;
        inter.syst = req.body.syst;
        inter.ssyst = req.body.ssyst;
        inter.org = req.body.org;
        inter.crat = req.body.crat;
        inter.pa = req.body.pa;
        inter.pv = req.body.pv;
        inter.mo = req.body.mo;
        inter.des = req.body.des;
        inter.pj = req.body.pj;
        inter.kil = req.body.kil;
    
        Interventions.create(inter, 
                          {attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
                    .then(result => {    
                      res.send({data:result});
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}


////////////////////////////////////////
// Afficher toutes les  Interventions //
///////////////////////////////////////

exports.interventions = (req, res) => {
    try{
        Interventions.findAll({attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
        .then(interventions => {
            res.send({data:interventions});
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur !",
            error: error
        });

    }
}

///////////////////////////////////////////////
// Afficher les Interventions d'un reparateur//
//////////////////////////////////////////////

exports.Pinterventions = (req, res) => {
    try{
        Interventions.findAll({
            returning: true, 
            where: {repa: req.params.repa},
            attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]
    })
        .then(interventions => {
            res.send({data:interventions});
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur !",
            error: error
        });

    }
}




/////////////////////////////////
// Afficher une  Intervention //
/////////////////////////////////

exports.getInt = (req, res) => {
    Interventions.findByPk(req.params.id, 
                        {attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
        .then(int => {
            res.status(200).json(int);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}


/////////////////////////////////
// Modifier une  Intervention //
/////////////////////////////////

exports.updateIntervention = async (req, res, next) => {
    try{
        let inter = await Interventions.findByPk(req.body.id);
    
        if(!inter){
            res.status(404).json({
                message: "impossible de trouver l'intervention " + req.body.id,
                error: "404"
            });
        } else {    
            let updatedObject = {
                owner : req.body.owner,
                marque : req.body.marque,
                modele : req.body.modele,
                year : req.body.year,
                immat : req.body.immat,
                nc : req.body.nc,
                contact : req.body.contact,
                repa : req.body.repa,
                action : req.body.action,
                syst : req.body.syst,
                ssyst : req.body.ssyst,
                org : req.body.org,
                pv : req.body.pv,
                mo : req.body.mo,
                des : req.body.des,
                pj : req.body.pj,
                kil : req.body.kil
            }
            let result = await Interventions.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','pv','mo','des','pj','kil']
                              }
                            );

            //reponse  
            if(!result) {
                res.status(500).json({
                    message: "Modification impossible pour l'intervention " + req.body.id,
                    error: "Can NOT Updated",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        }
    } catch(error){
        next(error);
    }
}


                        //////////////////////////////////
                        // LeLoux Backend - Diagnostics //
                        //////////////////////////////////


/////////////////////////
// Crée un Diagnostic //
////////////////////////

exports.createDiagno = (req, res) => {
    let diagno = {};

    try{
        diagno.vid = req.body.vid;
        diagno.clid = req.body.clid;
        diagno.syst = req.body.syst;
        diagno.repaid = req.body.repaid;
        Diagno.create(diagno, 
                          {attributes: ['id','vid','clid', 'syst', 'repaid']})
                    .then(result => {    
                        res.json({
                            status: 'SUCCESS',
                            data: result,
                            message: "Demande enregistree"
                        });
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            status: "FAILED",
            error: error.message
        });
    }
}

//////////////////////////////
// Afficher les Diagnostics //
//////////////////////////////

exports.diagnos = (req, res) => {
    try{
        sequelize.query('DELETE FROM diagnos WHERE createdAt < DATE_SUB(NOW(), INTERVAL 3 DAY) AND isr = 0');
        Diagno.findAll({attributes: ['id','vid','clid', 'syst', 'repaid', 'phid','rt','dp', 'rdvo', 'rdvt', 'rdvth', 'createdAt', 'updatedAt','cd', 'isr',]})
        .then(diagnos => {
                    
            res.send({data:diagnos});
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur !",
            error: error
        });

    }
}

////////////////////////////
// Afficher le Diagnostic //
////////////////////////////

exports.getDiagnos = (req, res) => {
    Diagno.findByPk(req.params.id, 
                        {attributes: ['id','vid','clid', 'syst', 'repaid', 'phid','rt','dp', 'rdvo', 'rdvt', 'rdvth', 'createdAt', 'updatedAt','cd', 'isr',]})
        .then(diagnos => {
          res.status(200).json(diagnos);
        }).catch(error => {
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}

///////////////////////////////////////////////
// Afficher les Interventions d'un client /////
//////////////////////////////////////////////

exports.PDiagnos = (req, res) => {
    try{
        sequelize.query('DELETE FROM diagnos WHERE createdAt < DATE_SUB(NOW(), INTERVAL 3 DAY) AND isr = 0');
        Diagno.findAll({
            returning: true, 
            where: {clid: req.params.clid},
            attributes: ['id','vid','clid', 'syst', 'repaid', 'phid','rt','dp', 'rdvo', 'rdvt', 'rdvth', 'cd', 'isr', 'createdAt', 'updatedAt']
    })
        .then(diagnostics => {
            res.send({data:diagnostics});
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Erreur !",
            error: error
        });

    }
}

/////////////////////////
// Reponse  Diagnostic //
/////////////////////////

exports.updateDiag = async (req, res, next) => {
    try{
        let diareq = await Diagno.findByPk(req.body.id);
    
        if(!diareq){
            // reponse d'erreur
            res.status(404).json({
                message: "Pas de modifications possible pour le diagnostic " + req.body.id,
                error: "404"
            });
        } else {    
            // Modifications dans la base de donnée
            let updatedObject = {
                rt: req.body.rt,
                dp: req.body.dp,
                rdvo: req.body.rdvo,
                rdvt: req.body.rdvt,
                rdvth: req.body.rdvth,
            }
            let result = await Diagno.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['rt','dp', 'rdvo', 'rdvt', 'rdvth']
                              }
                            );

            // reponse
            if(!result) {
                res.status(500).json({
                    message: "Error -> impossible de modifier le diagnostic id = " + req.body.id,
                    error: "Modification Impossible",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        }
    } catch(err){
        next(err);
    }
}

/////////////////////////////
// Confirmation Diagnostic //
////////////////////////////

exports.confDiag = async (req, res, next) => {
    try{
        let diareq = await Diagno.findByPk(req.body.id);
    
        if(!diareq){
            // reponse d'erreur
            res.status(404).json({
                message: "Pas de modifications possible pour le diagnostic " + req.body.id,
                error: "404"
            });
        } else {    
            // Modifications dans la base de donnée
            let updatedObject = {
                cd: req.body.dc,
                isr: 1,
            }
            let result = await Diagno.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['isr','cd']
                              }
                            );

            // reponse
            if(!result) {
                res.status(500).json({
                    message: "Error -> impossible de modifier le diagnostic id = " + req.body.id,
                    error: "Modification Impossible",
                });
            }
            const updiagno = await Diagno.findByPk(req.body.id);
            //res.status(200).json(result);
            res.send({data: updiagno});
        }
    } catch(err){
        next(err);
    }
}