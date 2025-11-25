import { DataTypes } from 'sequelize'
import sequelize from '../server/database.js'

let Questionnaire = null

if (sequelize) {
  Questionnaire = sequelize.define('Questionnaire', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // Contact Information
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: DataTypes.STRING,

  // Business Overview
  industry: DataTypes.STRING,
  businessDescription: DataTypes.TEXT,
  targetAudience: DataTypes.TEXT,
  uniqueSellingPoints: DataTypes.TEXT,
  problemSolved: DataTypes.TEXT,
  businessGoals: DataTypes.ARRAY(DataTypes.STRING),
  primaryCTAs: DataTypes.ARRAY(DataTypes.STRING),
  targetAudienceTechLevel: DataTypes.STRING,

  // Inspiration
  referenceWebsites: DataTypes.JSONB,
  designKeywords: DataTypes.ARRAY(DataTypes.STRING),
  dislikedWebsites: DataTypes.JSONB,
  avoidKeywords: DataTypes.TEXT,

  // Design Style
  websiteType: DataTypes.STRING,
  colorPreference: DataTypes.STRING,
  layoutStyle: DataTypes.STRING,
  typographyStyle: DataTypes.STRING,
  animationLevel: DataTypes.STRING,
  themeMode: DataTypes.STRING,

  // Pages & Structure
  commonPages: DataTypes.ARRAY(DataTypes.STRING),
  estimatedPageCount: DataTypes.STRING,

  // Features & Functionality
  features: DataTypes.ARRAY(DataTypes.STRING),
  customFeatures: DataTypes.TEXT,
  integrations: DataTypes.ARRAY(DataTypes.STRING),

  // Content & Assets
  hasLogo: DataTypes.STRING,
  hasContent: DataTypes.STRING,
  hasImages: DataTypes.STRING,
  existingWebsite: DataTypes.STRING,
  whatToKeep: DataTypes.TEXT,
  whatToChange: DataTypes.TEXT,

  // Technical Requirements
  hostingPreference: DataTypes.STRING,
  domainStatus: DataTypes.STRING,
  domainName: DataTypes.STRING,
  cmsPreference: DataTypes.STRING,
  techStackPreference: DataTypes.STRING,
  expectedMonthlyVisitors: DataTypes.STRING,
  mobileVsDesktop: DataTypes.STRING,
  needsMultiLanguage: DataTypes.BOOLEAN,
  accessibilityRequirements: DataTypes.BOOLEAN,
  needsOffline: DataTypes.BOOLEAN,
  needsCoreWebVitals: DataTypes.BOOLEAN,
  apiRequirements: DataTypes.TEXT,
  languages: DataTypes.ARRAY(DataTypes.STRING),

  // SEO & Performance
  targetKeywords: DataTypes.TEXT,
  competitors: DataTypes.ARRAY(DataTypes.STRING),
  competitorsToOutrank: DataTypes.TEXT,
  performanceExpectations: DataTypes.STRING,

  // Budget & Timeline
  projectDescription: DataTypes.TEXT,
  timeline: DataTypes.STRING,
  budget: DataTypes.STRING,
  hasHardDeadline: DataTypes.BOOLEAN,
  deadlineDate: DataTypes.DATE,
  phasedLaunchOk: DataTypes.BOOLEAN,
  maintenancePlan: DataTypes.STRING,
  analyticsNeeds: DataTypes.ARRAY(DataTypes.STRING),
  futureFeatures: DataTypes.TEXT,

  // Final Details
  howDidYouHear: DataTypes.STRING,
  preferredContact: DataTypes.STRING,
  bestTimeToContact: DataTypes.STRING,
  additionalNotes: DataTypes.TEXT,

  // Mockup Count
  mockupCount: DataTypes.INTEGER,

  // Metadata
  status: {
    type: DataTypes.ENUM('new', 'in-progress', 'completed', 'archived'),
    defaultValue: 'new'
  }
}, {
    tableName: 'questionnaires',
    timestamps: true
  })
}

export default Questionnaire
