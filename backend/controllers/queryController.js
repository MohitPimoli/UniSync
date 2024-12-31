const Query = require('../models/query');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createQuery = async (req, res) => {
    const { content, visibility } = req.body;
    const userId = req.user.userId;

    if (!content) {
        return res.status(400).send({ message: 'Query content is required' });
    }

    try {
        const newQuery = new Query({
            userId,
            content,
            visibility
        });

        await newQuery.save();
        res.status(200).send({ message: 'Query submitted successfully', query: newQuery });
    } catch (err) {
        console.error('Error submitting query:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

const getRecentQueries = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Ensure user exists and populate connections
        const user = await User.findById(userId).populate('connections');
        if (!user) return res.status(404).send({ message: 'User not found' });

        // Collect 1st-degree connections
        const firstDegreeConnections = user.connections.map(conn => conn._id);

        // Fetch 2nd-degree connections
        const secondDegreeConnections = await User.find({
            _id: { $in: firstDegreeConnections },
        }).populate('connections');

        const secondDegreeIds = secondDegreeConnections.flatMap(conn =>
            conn.connections.map(c => c._id)
        );

        // Combine userId with 1st and 2nd degree connections
        const connectionIds = [userId, ...firstDegreeConnections, ...secondDegreeIds];

        // Fetch recent queries from these users
        const queries = await Query.find({ userId: { $in: connectionIds } })
            .sort({ createdAt: -1 })
            .limit(30) // Fetch max 30 queries
            .populate('userId', 'name username profilePicture');

        res.status(200).send(queries);
        console.log('Queries:', queries);
    } catch (err) {
        console.error('Error fetching queries:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

const getQueriesByVisibility = async (req, res) => {
    const { visibility } = req.params;

    if (!['Public', 'Connections'].includes(visibility)) {
        return res.status(400).send({ message: 'Invalid visibility type' });
    }

    try {
        const queries = await Query.find({ visibility }).populate('userId', 'Name Username');
        if (!queries.length) {
            return res.status(404).send({ message: `No ${visibility} queries found` });
        }
        res.status(200).send(queries);
    } catch (err) {
        console.error('Error fetching queries by visibility:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

const updateQuery = async (req, res) => {
    const { queryId, newContent } = req.body;

    if (!newContent) {
        return res.status(400).send({ message: 'New content is required' });
    }

    try {
        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(404).send({ message: 'Query not found' });
        }

        query.content = newContent;
        await query.save();
        res.status(200).send({ message: 'Query updated successfully', query });
    } catch (err) {
        console.error('Error updating query:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

const deleteQuery = async (req, res) => {
    const { queryId } = req.params;

    try {
        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(404).send({ message: 'Query not found' });
        }

        await query.remove();
        res.status(200).send({ message: 'Query deleted successfully' });
    } catch (err) {
        console.error('Error deleting query:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    createQuery,
    getRecentQueries,
    getQueriesByVisibility,
    updateQuery,
    deleteQuery
};
