var http = require('http');
var fs = require('fs');

const PORT=8080;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(PORT);
    console.log('Enter localhost:8080 in your browser to see the result!');
    console.log('Press Control + C to end this server.');
});
