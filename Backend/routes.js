const controller = require('./controller');
const { URL } = require('url'); // Import the URL class


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
    else if (url === '/manage-employees' && method === 'PUT') {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                const { action, ...requestData } = data; // Destructure 'action' field and get the rest of the data
                if (data.action === 'update') {
                    controller.updateEmployeeInfo(requestData, res);
                } else if (data.action === 'markForDeletion') {
                    console.log("we made it to routes.js")
                    controller.markEmployeeForDeletion(requestData, res);
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid action' }));
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid content type' }));
        }
    } 
    else if(url === '/manage-exhibits' && method === 'GET'){
        controller.getExhibits(req, res);
    }
    else if(url === '/manage-exhibits' && method === 'POST'){
        controller.addExhibits(req, res);
    }
    else if(url === '/complaints' && method === 'POST'){
        controller.insertComplaints(req, res);
    }
    else if (url === '/complaints' && method === 'GET') {
        controller.getComplaints(req, res);
    } 
    else if (url === '/login' && method === 'POST') {
        controller.authenticateUser(req, res);
    }
    else if (url === '/signup' && method === 'POST') {
        controller.addCustomer(req, res);
    }
    else if (url.startsWith('/customer/') && method === 'GET') {
        // Extract the customer ID from the URL
        const customerId = url.split('/')[2]; // Assuming the customer ID is the third segment of the URL
        controller.getCustomerInfo(customerId, res);
    }
    else if (url.startsWith('/editCustomerInfo/') && method === 'PUT') {
        const customerId = url.split('/')[2];
        controller.updateCustomerInfo(customerId, req, res);
    }
    else if (url.startsWith('/decodeToken') && method === 'POST') {
        controller.decodeToken(req, res);
    }
    else if (url.startsWith('/manage-giftshop') && method === 'POST') {
        controller.addItem(req, res);
    }
    else if ((url.startsWith('/giftshop') || url.startsWith('/manage-giftshop')) && method === 'GET') {
        controller.getItem(req, res);
    }
    else if (url.startsWith('/manage-giftshop') && method === 'PUT') {
        controller.updateItemInfo(req, res);
    }
    else if (url.startsWith('/manage-giftshop') && method === 'DELETE') {
        controller.deleteItem(req, res);
    }
    else if (url === '/manage-artworks' && method === 'GET') {
        controller.getArtWorks(req, res);
    }
    else if (url === '/manage-artworks' && method === 'POST') {
        controller.addArtWork(req, res);
    }
    else if (url === '/manage-artworks' && method === 'PUT') {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                const { action, ...requestData } = data; // Destructure 'action' field and get the rest of the data
                if (data.action === 'update') {
                    console.log(requestData);
                    controller.updateArtWork(requestData, res);
                } else if (data.action === 'markForDeletion') {
                    console.log("Here is our request data: ", requestData);
                    controller.markArtWorkForDeletion(requestData, res);
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid action' }));
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid content type' }));
        }
    }
    else if (new URL(req.url, `http://${req.headers.host}`).pathname.startsWith('/admin') && method === 'GET') {
        const hash = new URL(req.url, `http://${req.headers.host}`).hash; // Get the hash from the URL
        
        // Check if the hash is '#notifications'
        if (hash === '#notifications') {
            // Handle the notifications route
            // For example, call a function or send a response
        } else {
            // Handle other admin routes
            controller.getMessages(req, res);
        }
    }
    
    else if (url.startsWith('/manage-restaurant') && method === 'GET') {
        controller.getFood(req, res);
    }
    else if (url.startsWith('/manage-restaurant') && method === 'POST') {
        controller.addFood(req, res);
    } 
    else if (url === '/manage-exhibits' && method === 'PUT') {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                const { action, ...requestData } = data; // Destructure 'action' field and get the rest of the data
                if (data.action === 'update') {
                    console.log(requestData);
                    controller.updateExhibit(requestData, res);
                } else if (data.action === 'markForDeletion') {
                    controller.markExhibitForDeletion(requestData, res);
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid action' }));
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid content type' }));
        }
    } 
    else if (url === '/manage-restaurant' && method === 'PUT') {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                const { action, ...requestData } = data; // Destructure 'action' field and get the rest of the data
                if (data.action === 'update') {
                    console.log(requestData);
                    controller.updateFood(requestData, res);
                } else if (data.action === 'markForDeletion') {
                    controller.markFoodForDeletion(requestData, res);
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid action' }));
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid content type' }));
        }
    }
    else if (url === '/getFirstName' && method === 'POST') {
        controller.getFirstName(req, res);
    }
    else if (url === '/employee-department' && method === 'POST') {
        controller.getEmployeeDepartment(req, res);
    }
    else if (url.startsWith('/exhibit-report') && method === 'GET') {
        controller.exhibitReport(req, res);
    }
    else if (url.startsWith('/order-confirmed') && method === 'POST') {
        controller.addOrder(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
}

module.exports = router;