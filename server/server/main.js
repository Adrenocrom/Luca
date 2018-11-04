const HTTPS_PORT = 8443;

const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const Gpio = require('onoff').Gpio;

const serverConfig = {
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
};

const handleRequest = function(request, response) {
  // Render the single client html file for any request the HTTP server receives
  console.log('request received: ' + request.url);

  if(request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(fs.readFileSync('client/index.html'));
  } else if(request.url === '/webrtc.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.end(fs.readFileSync('client/webrtc.js'));
  }
};

const httpsServer = https.createServer(serverConfig, handleRequest);
httpsServer.listen(HTTPS_PORT, "0.0.0.0");

console.log("server startet ... ");

var motor1f = new Gpio(4, 'out');
//var motor1b = new Gpio(4, 'out');
//var motor2f = new Gpio(4, 'out');
//var motor2b = new Gpio(4, 'out');

var motorsInterval = setInterval(runMotors, 250); //run the blinkLED function every 250ms

function runMotors() { //function to start blinking
	if (motor1f.readSync() === 0) { //check the pin state, if the state is 0 (or off)
		motor1f.writeSync(1); //set pin state to 1 (turn LED on)
	} else {
	    motor1f.writeSync(0); //set pin state to 0 (turn LED off)
	}
}

function endBlink() { //function to stop blinking
	clearInterval(runMotors); // Stop blink intervals
	motor1f.writeSync(0); // Turn LED off
	motor1f.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds
