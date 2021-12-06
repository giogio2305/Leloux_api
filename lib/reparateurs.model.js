module.exports = (sequelize, Sequelize) => {
	const Reparateurs = sequelize.define('reparateurs', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	rcode: {
		type: Sequelize.STRING
  },
	  repa: {
			type: Sequelize.STRING
	  },
	  cat: {
		  type: Sequelize.STRING
  	},
	  respo: {
			type: Sequelize.STRING
	  },
	  code: {
		type: Sequelize.STRING
  },
	  add: {
			type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    capa: {
    type: Sequelize.INTEGER
    },
    portail: {
        type: Sequelize.INTEGER
    },
	gard: {
        type: Sequelize.INTEGER
    },
	caro: {
        type: Sequelize.INTEGER
    },
	clim: {
        type: Sequelize.INTEGER
    },
	elec: {
        type: Sequelize.INTEGER
    },
	elect: {
        type: Sequelize.INTEGER
    },
	meca: {
        type: Sequelize.INTEGER
    },
	ther: {
        type: Sequelize.INTEGER
    },
	});
	


	return Reparateurs;
}