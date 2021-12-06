module.exports = (sequelize, Sequelize) => {
	const Vehicules = sequelize.define('vehicules', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	chassis: {
		type: Sequelize.STRING
  },
	  owner: {
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
    trans: {
        type: Sequelize.STRING
    },
    year: {
    type: Sequelize.INTEGER
    },
    carb: {
        type: Sequelize.STRING
    }
	});
	
	return Vehicules;
}