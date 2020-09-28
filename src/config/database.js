require('dotenv').config()

module.exports = {
	dialect: 'postgres',
	url: process.env.DATABASE_URL,
	define: {
		timestamp: true,
		underscored: true,
		underscoredAll: true
	}	
	
}