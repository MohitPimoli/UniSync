const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const authenticateUser = require('../middlewares/authenticate');

router.post('/send-request', authenticateUser, connectionController.sendRequest);

router.post('/accept-request', authenticateUser, connectionController.acceptRequest);

router.post('/reject-request', authenticateUser, connectionController.rejectRequest);

router.get('/connections', authenticateUser, connectionController.getConnections);

router.get('/requests', authenticateUser, connectionController.getConnectionRequests);

router.get('/suggestions', authenticateUser, connectionController.getFriendSuggestions);
module.exports = router;
