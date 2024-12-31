const express = require('express');
const { body, param } = require('express-validator');
const queryController = require('../controllers/queryController');
const authenticateUser = require('../middlewares/authenticate.js');
const router = express.Router();

router.post(
    '/CreateQuery',
    authenticateUser,
    [
        body('content').notEmpty().withMessage('Query content is required'),
        body('visibility').optional().isIn(['Public', 'Connections']).withMessage('Invalid visibility type')
    ],
    queryController.createQuery
);

router.get('/getRecentQueries', authenticateUser, queryController.getRecentQueries);

router.get('/visibility/:visibility', authenticateUser, queryController.getQueriesByVisibility);

router.put(
    '/updateQuery',
    authenticateUser,
    [
        body('queryId').isMongoId().withMessage('Invalid query ID'),
        body('newContent').notEmpty().withMessage('New content is required')
    ],
    queryController.updateQuery
);

router.delete(
    '/deleteQuery/:queryId',
    authenticateUser,
    [
        param('queryId').isMongoId().withMessage('Invalid query ID')
    ],
    queryController.deleteQuery
);

module.exports = router;
