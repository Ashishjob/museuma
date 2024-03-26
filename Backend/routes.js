const controller = require('./controller');

function router(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/branch-directors' && method === 'GET') {
        controller.getBranchDirectors(req, res);
    } 
    else if (url === '/manage-employees' && method === 'GET') {
        controller.getEmployees(req, res);
    } 
    else if (url === '/manage-employees' && method === 'POST') {
        controller.addEmployee(req, res);
    } 
    else if(url === '/manage-exhibits' && method === 'GET'){
        controller.getExhibits(req, res);
    }
    else if(url === '/manage-exhibits' && method === 'POST'){
        controller.addExhibits(req, res);
    }
    else if (url === '/manage-employees' && method === 'PUT') {
        controller.markEmployeeForDeletion(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
}

module.exports = router;
