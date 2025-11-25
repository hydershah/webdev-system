import mongoose from 'mongoose'

const questionnaireSchema = new mongoose.Schema({
  // Contact Information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  phoneNumber: String,

  // Business Overview
  industry: String,
  businessDescription: String,
  targetAudience: String,
  uniqueSellingPoints: String,
  problemSolved: String,
  businessGoals: [String],
  primaryCTAs: [String],
  targetAudienceTechLevel: String,

  // Inspiration
  referenceWebsites: [{
    url: String,
    whatYouLike: String
  }],
  designKeywords: [String],
  dislikedWebsites: [{
    url: String,
    whatYouDislike: String
  }],
  avoidKeywords: String,

  // Design Style
  websiteType: String,
  colorPreference: String,
  layoutStyle: String,
  typographyStyle: String,
  animationLevel: String,
  themeMode: String,

  // Pages & Structure
  commonPages: [String],
  estimatedPageCount: String,

  // Features & Functionality
  features: [String],
  customFeatures: String,
  integrations: [String],

  // Content & Assets
  hasLogo: String,
  hasContent: String,
  hasImages: String,
  existingWebsite: String,
  whatToKeep: String,
  whatToChange: String,

  // Technical Requirements
  hostingPreference: String,
  domainStatus: String,
  domainName: String,
  cmsPreference: String,
  techStackPreference: String,
  expectedMonthlyVisitors: String,
  mobileVsDesktop: String,
  needsMultiLanguage: Boolean,
  accessibilityRequirements: Boolean,
  needsOffline: Boolean,
  needsCoreWebVitals: Boolean,
  apiRequirements: String,
  languages: [String],

  // SEO & Performance
  targetKeywords: String,
  competitors: [String],
  competitorsToOutrank: String,
  performanceExpectations: String,

  // Budget & Timeline
  projectDescription: String,
  timeline: String,
  budget: String,
  hasHardDeadline: Boolean,
  deadlineDate: Date,
  phasedLaunchOk: Boolean,
  maintenancePlan: String,
  analyticsNeeds: [String],
  futureFeatures: String,

  // Final Details
  howDidYouHear: String,
  preferredContact: String,
  bestTimeToContact: String,
  additionalNotes: String,

  // Mockup Count
  mockupCount: Number,

  // Metadata
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'new', enum: ['new', 'in-progress', 'completed', 'archived'] }
}, {
  timestamps: true
})

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema)

export default Questionnaire
