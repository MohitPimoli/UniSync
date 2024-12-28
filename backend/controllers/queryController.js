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

const getUserQueries = async (req, res) => {
    const userId = req.user.userId;

    try {
        const queries = await Query.find({ userId }).populate('userId', 'Name Username');
        if (!queries.length) {
            return res.status(404).send({ message: 'No queries found for this user' });
        }
        res.status(200).send(queries);
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
    getUserQueries,
    getQueriesByVisibility,
    updateQuery,
    deleteQuery
};
