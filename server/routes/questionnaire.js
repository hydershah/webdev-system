import express from 'express'
import Questionnaire from '../../models/Questionnaire.js'

const router = express.Router()

// Create new questionnaire submission
router.post('/submit', async (req, res) => {
  try {
    const savedQuestionnaire = await Questionnaire.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Questionnaire submitted successfully',
      data: savedQuestionnaire
    })
  } catch (error) {
    console.error('Error saving questionnaire:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit questionnaire',
      error: error.message
    })
  }
})

// Get all questionnaire submissions
router.get('/all', async (req, res) => {
  try {
    const questionnaires = await Questionnaire.findAll({
      order: [['createdAt', 'DESC']]
    })

    res.json({
      success: true,
      count: questionnaires.length,
      data: questionnaires
    })
  } catch (error) {
    console.error('Error fetching questionnaires:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questionnaires',
      error: error.message
    })
  }
})

// Get single questionnaire by ID
router.get('/:id', async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findByPk(req.params.id)

    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      })
    }

    res.json({
      success: true,
      data: questionnaire
    })
  } catch (error) {
    console.error('Error fetching questionnaire:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questionnaire',
      error: error.message
    })
  }
})

// Update questionnaire status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const questionnaire = await Questionnaire.findByPk(req.params.id)

    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      })
    }

    questionnaire.status = status
    await questionnaire.save()

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: questionnaire
    })
  } catch (error) {
    console.error('Error updating questionnaire status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message
    })
  }
})

// Delete questionnaire
router.delete('/:id', async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findByPk(req.params.id)

    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      })
    }

    await questionnaire.destroy()

    res.json({
      success: true,
      message: 'Questionnaire deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting questionnaire:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete questionnaire',
      error: error.message
    })
  }
})

export default router
