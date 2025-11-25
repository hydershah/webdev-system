'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questionnaires', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      // Contact Information
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: Sequelize.STRING,

      // Business Overview
      industry: Sequelize.STRING,
      businessDescription: Sequelize.TEXT,
      targetAudience: Sequelize.TEXT,
      uniqueSellingPoints: Sequelize.TEXT,
      problemSolved: Sequelize.TEXT,
      businessGoals: Sequelize.ARRAY(Sequelize.STRING),
      primaryCTAs: Sequelize.ARRAY(Sequelize.STRING),
      targetAudienceTechLevel: Sequelize.STRING,

      // Inspiration
      referenceWebsites: Sequelize.JSONB,
      designKeywords: Sequelize.ARRAY(Sequelize.STRING),
      dislikedWebsites: Sequelize.JSONB,
      avoidKeywords: Sequelize.TEXT,

      // Design Style
      websiteType: Sequelize.STRING,
      colorPreference: Sequelize.STRING,
      layoutStyle: Sequelize.STRING,
      typographyStyle: Sequelize.STRING,
      animationLevel: Sequelize.STRING,
      themeMode: Sequelize.STRING,

      // Pages & Structure
      commonPages: Sequelize.ARRAY(Sequelize.STRING),
      estimatedPageCount: Sequelize.STRING,

      // Features & Functionality
      features: Sequelize.ARRAY(Sequelize.STRING),
      customFeatures: Sequelize.TEXT,
      integrations: Sequelize.ARRAY(Sequelize.STRING),

      // Content & Assets
      hasLogo: Sequelize.STRING,
      hasContent: Sequelize.STRING,
      hasImages: Sequelize.STRING,
      existingWebsite: Sequelize.STRING,
      whatToKeep: Sequelize.TEXT,
      whatToChange: Sequelize.TEXT,

      // Technical Requirements
      hostingPreference: Sequelize.STRING,
      domainStatus: Sequelize.STRING,
      domainName: Sequelize.STRING,
      cmsPreference: Sequelize.STRING,
      techStackPreference: Sequelize.STRING,
      expectedMonthlyVisitors: Sequelize.STRING,
      mobileVsDesktop: Sequelize.STRING,
      needsMultiLanguage: Sequelize.BOOLEAN,
      accessibilityRequirements: Sequelize.BOOLEAN,
      needsOffline: Sequelize.BOOLEAN,
      needsCoreWebVitals: Sequelize.BOOLEAN,
      apiRequirements: Sequelize.TEXT,
      languages: Sequelize.ARRAY(Sequelize.STRING),

      // SEO & Performance
      targetKeywords: Sequelize.TEXT,
      competitors: Sequelize.ARRAY(Sequelize.STRING),
      competitorsToOutrank: Sequelize.TEXT,
      performanceExpectations: Sequelize.STRING,

      // Budget & Timeline
      projectDescription: Sequelize.TEXT,
      timeline: Sequelize.STRING,
      budget: Sequelize.STRING,
      hasHardDeadline: Sequelize.BOOLEAN,
      deadlineDate: Sequelize.DATE,
      phasedLaunchOk: Sequelize.BOOLEAN,
      maintenancePlan: Sequelize.STRING,
      analyticsNeeds: Sequelize.ARRAY(Sequelize.STRING),
      futureFeatures: Sequelize.TEXT,

      // Final Details
      howDidYouHear: Sequelize.STRING,
      preferredContact: Sequelize.STRING,
      bestTimeToContact: Sequelize.STRING,
      additionalNotes: Sequelize.TEXT,

      // Mockup Count
      mockupCount: Sequelize.INTEGER,

      // Metadata
      status: {
        type: Sequelize.ENUM('new', 'in-progress', 'completed', 'archived'),
        defaultValue: 'new'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create index on email for faster lookups
    await queryInterface.addIndex('questionnaires', ['email']);

    // Create index on status
    await queryInterface.addIndex('questionnaires', ['status']);

    // Create index on createdAt for sorting
    await queryInterface.addIndex('questionnaires', ['createdAt']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questionnaires');
  }
};
