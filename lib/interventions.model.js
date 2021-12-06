module.exports = (sequelize, Sequelize) => {
	const Interventions = sequelize.define('interventions', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    icode: {
        type: Sequelize.STRING
    },
	  marque: {
		  type: Sequelize.STRING
  	},
	  modele: {
			type: Sequelize.STRING
	  },
	  immat: {
			type: Sequelize.STRING
    },
    nc: {
        type: Sequelize.STRING
},
    year: {
    type: Sequelize.INTEGER
    },
    owner: {
        type: Sequelize.STRING
  },
  conctact: {
    type: Sequelize.STRING
},
repa: {
    type: Sequelize.STRING
},
action: {
    type: Sequelize.STRING
},
syst: {
    type: Sequelize.STRING
},
ssyst: {
    type: Sequelize.STRING
},
org: {
    type: Sequelize.STRING
},
crat: {
    type: Sequelize.DATE
},

pa: {
    type: Sequelize.INTEGER
},	  
pv: {
    type: Sequelize.INTEGER
},
mo: {
    type: Sequelize.INTEGER
},
des: {
    type: Sequelize.STRING
},
pj: {
    type: Sequelize.STRING
},
kil: {
    type: Sequelize.INTEGER
}
	});
	

	return Interventions;
}