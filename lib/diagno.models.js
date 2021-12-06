module.exports = (sequelize, Sequelize) => {
	const Diagno = sequelize.define('diagno', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	clid: {
		type: Sequelize.INTEGER
	},
	vid: {
		type: Sequelize.INTEGER
	},
    createdAt: {
        type: Sequelize.DATE
    },
    
	  syst: {
		  type: Sequelize.STRING
  	},
	  repaid: {
			type: Sequelize.INTEGER
	  },
	  phid: {
			type: Sequelize.INTEGER
    },
	rt: {
		type: Sequelize.STRING
	},
	dp: {
		type: Sequelize.INTEGER
	},
	rdvo: {
		type: Sequelize.DATE
	},
	rdvt: {
		type: Sequelize.DATE
	},
	rdvth: {
		type: Sequelize.DATE
	},
	isr: {
		type: Sequelize.INTEGER
	},
	cd: {
		type: Sequelize.DATE
	}
	});
	
	return Diagno;
}