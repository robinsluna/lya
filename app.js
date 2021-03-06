const express = require("express");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bearerToken = require('express-bearer-token');

const config = require("./config");
const routes = require('./routes');
const { jwtAuthenticationMiddleware } = require("./middleware/auth");

const app = express();

// swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: "Lya API",
			description: "Test for Lya",
			contact: {
				name: "ing.robins@gmail.com"
			}
		},
		components: {
			securitySchemes: {
				jwt: {
					type: "http",
					scheme: "bearer",
					in: "header",
					bearerFormat: "JWT"
				},
			}
		}
		,
		security: [{
			jwt: []
		}],
	},

	swagger: "2.0",
	apis: ["./routes/*.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bearerToken());
app.use(jwtAuthenticationMiddleware);

app.use(routes)
app.use((err, req, res, next) => {
	if (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		} // Set 500 server code error if statuscode not set
		return res.status(err.statusCode).send({
			statusCode: err.statusCode,
			message: err.message
		})
	}

	next()
})


// 404
app.use(function (req, res) {
	res.status(404).json({
		status: 'Page does not exist'
	});
});


const PORT = config.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
})