const HTTPS_PORT = 8443;

const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

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
