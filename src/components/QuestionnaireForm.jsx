import { useState, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { questionnaireSchema, FORM_STEPS } from '../schemas/questionnaireSchema'
import { INDUSTRIES } from '../data/industries'
import {
  COMMON_PAGES,
  FEATURES,
  INTEGRATIONS,
  DESIGN_KEYWORDS,
  WEBSITE_TYPES,
  COLOR_SCHEMES,
  LAYOUT_STYLES,
  TYPOGRAPHY_STYLES,
  BUSINESS_GOALS,
  PRIMARY_CTAS,
  TECH_STACKS,
  ANALYTICS_OPTIONS
} from '../data/questionnaireOptions'

const TOTAL_STEPS = FORM_STEPS.length

export default function QuestionnaireForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [industrySearch, setIndustrySearch] = useState('')
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [referenceWebsites, setReferenceWebsites] = useState([{ url: '', whatYouLike: '' }])
  const [dislikedWebsites, setDislikedWebsites] = useState([{ url: '', whatYouDislike: '' }])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    resolver: zodResolver(questionnaireSchema),
    mode: 'all',
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      mockupCount: 2,
      referenceWebsites: [],
      dislikedWebsites: [],
      commonPages: [],
      features: [],
      integrations: [],
      designKeywords: [],
      avoidKeywords: [],
      businessGoals: [],
      primaryCTAs: [],
      competitors: [],
      competitorsToOutrank: [],
      targetKeywords: [],
      analyticsNeeds: [],
      languages: []
    }
  })

  const websiteType = watch('websiteType')
  const colorPreference = watch('colorPreference')
  const selectedPages = watch('commonPages') || []
  const selectedFeatures = watch('features') || []
  const selectedIntegrations = watch('integrations') || []
  const selectedKeywords = watch('designKeywords') || []
  const selectedGoals = watch('businessGoals') || []
  const selectedCTAs = watch('primaryCTAs') || []
  const selectedAnalytics = watch('analyticsNeeds') || []
  const hasHardDeadline = watch('hasHardDeadline')

  const onSubmit = async (data) => {
    // Include reference websites
    data.referenceWebsites = referenceWebsites.filter(r => r.url)
    data.dislikedWebsites = dislikedWebsites.filter(r => r.url)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/questionnaire/submit'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Questionnaire saved successfully:', result.data)
        setIsSubmitted(true)
      } else {
        console.error('❌ Failed to save questionnaire:', result.message)
        alert('Failed to submit questionnaire. Please try again.')
      }
    } catch (error) {
      console.error('❌ Error submitting questionnaire:', error)
      alert('Network error. Please check if the server is running and try again.')
    }
  }

  const nextStep = async () => {
    const stepConfig = FORM_STEPS[currentStep - 1]
    const fieldsToValidate = stepConfig.required || []

    // If no required fields, just proceed
    if (fieldsToValidate.length === 0) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Validate required fields
    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      // Clear any lingering errors for these fields before proceeding
      clearErrors(fieldsToValidate)
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToStep = (step) => {
    if (step <= currentStep || step === currentStep + 1) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const toggleArrayValue = (field, value) => {
    const current = getValues(field) || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    setValue(field, updated)
  }

  const addReferenceWebsite = () => {
    setReferenceWebsites([...referenceWebsites, { url: '', whatYouLike: '' }])
  }

  const updateReferenceWebsite = (index, field, value) => {
    const updated = [...referenceWebsites]
    updated[index][field] = value
    setReferenceWebsites(updated)
  }

  const removeReferenceWebsite = (index) => {
    if (referenceWebsites.length > 1) {
      setReferenceWebsites(referenceWebsites.filter((_, i) => i !== index))
    }
  }

  const addDislikedWebsite = () => {
    setDislikedWebsites([...dislikedWebsites, { url: '', whatYouDislike: '' }])
  }

  const updateDislikedWebsite = (index, field, value) => {
    const updated = [...dislikedWebsites]
    updated[index][field] = value
    setDislikedWebsites(updated)
  }

  const removeDislikedWebsite = (index) => {
    if (dislikedWebsites.length > 1) {
      setDislikedWebsites(dislikedWebsites.filter((_, i) => i !== index))
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your project details have been submitted successfully.
          </p>
          <p className="text-base text-gray-500">
            We have all the information needed to start working on your project. We'll review everything and get back to you shortly.
          </p>
        </div>
      </motion.div>
    )
  }

  // Progress indicator
  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Tell Us About Your Project
        </h1>
        <p className="text-lg text-gray-500">
          Fill in what you can - everything except contact info is optional
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Step {currentStep} of {TOTAL_STEPS}</span>
          <span>{FORM_STEPS[currentStep - 1].title}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-900"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {FORM_STEPS.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(step.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentStep === step.id
                  ? 'bg-gray-900 text-white'
                  : currentStep > step.id
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={step.id > currentStep + 1}
            >
              {step.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {/* STEP 1: Contact Information */}
            {currentStep === 1 && (
              <StepWrapper key="step1">
                <StepHeader
                  title="Contact Information"
                  subtitle="How can we reach you? Only name, email, and company are required."
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      required
                      {...register('fullName')}
                      error={errors.fullName?.message}
                      placeholder="John Doe"
                    />
                    <InputField
                      label="Email Address"
                      type="email"
                      required
                      {...register('email')}
                      error={errors.email?.message}
                      placeholder="john@company.com"
                    />
                  </div>

                  <InputField
                    label="Company / Project Name"
                    required
                    {...register('companyName')}
                    error={errors.companyName?.message}
                    placeholder="Acme Inc"
                  />

                  <InputField
                    label="Phone Number (Optional)"
                    {...register('phoneNumber')}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </StepWrapper>
            )}

            {/* STEP 2: Business Overview */}
            {currentStep === 2 && (
              <StepWrapper key="step2">
                <StepHeader
                  title="About Your Business"
                  subtitle="Help us understand what you do and who you serve."
                />

                <div className="space-y-6">
                  {/* Industry */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Search or type your industry..."
                      value={industrySearch || watch('industry') || ''}
                      onChange={(e) => {
                        setIndustrySearch(e.target.value)
                        setShowIndustryDropdown(true)
                        setValue('industry', e.target.value)
                      }}
                      onFocus={() => setShowIndustryDropdown(true)}
                      onBlur={() => setTimeout(() => setShowIndustryDropdown(false), 200)}
                    />
                    {showIndustryDropdown && industrySearch && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                        {INDUSTRIES.filter(ind =>
                          ind.toLowerCase().includes(industrySearch.toLowerCase())
                        ).slice(0, 8).map((ind) => (
                          <button
                            key={ind}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                            onClick={() => {
                              setValue('industry', ind)
                              setIndustrySearch(ind)
                              setShowIndustryDropdown(false)
                            }}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <TextAreaField
                    label="What does your business do?"
                    {...register('businessDescription')}
                    placeholder="Describe your products, services, or what makes your business special..."
                    rows={3}
                  />

                  <TextAreaField
                    label="Who is your target audience?"
                    {...register('targetAudience')}
                    placeholder="Describe your ideal customers - their demographics, needs, pain points..."
                    rows={3}
                  />

                  <TextAreaField
                    label="What makes you unique?"
                    {...register('uniqueSellingPoints')}
                    placeholder="Your competitive advantages, what sets you apart from others..."
                    rows={2}
                  />

                  <TextAreaField
                    label="What problem does this website solve for users?"
                    {...register('problemSolved')}
                    placeholder="What pain points or needs will this website address for your visitors?"
                    rows={2}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What do you want to achieve with this website?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUSINESS_GOALS.map((goal) => (
                        <CheckboxCard
                          key={goal.id}
                          label={goal.label}
                          checked={selectedGoals.includes(goal.id)}
                          onChange={() => toggleArrayValue('businessGoals', goal.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Top 3 actions you want visitors to take
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRIMARY_CTAS.map((cta) => (
                        <CheckboxCard
                          key={cta.id}
                          label={cta.label}
                          checked={selectedCTAs.includes(cta.id)}
                          onChange={() => toggleArrayValue('primaryCTAs', cta.id)}
                        />
                      ))}
                    </div>
                    {selectedCTAs.length > 3 && (
                      <p className="mt-2 text-sm text-amber-600">Consider focusing on your top 3 most important actions</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How technical is your target audience?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'non-technical', label: 'Non-technical', desc: 'General public' },
                        { id: 'somewhat-technical', label: 'Somewhat', desc: 'Basic tech skills' },
                        { id: 'technical', label: 'Technical', desc: 'Developers, IT pros' },
                        { id: 'mixed', label: 'Mixed', desc: 'Varies widely' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('targetAudienceTechLevel')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* STEP 3: Inspiration */}
            {currentStep === 3 && (
              <StepWrapper key="step3">
                <StepHeader
                  title="Website Inspiration"
                  subtitle="Share websites you like - this helps us understand your taste."
                />

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Reference Websites
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                      Add URLs of websites you like and tell us what you like about them.
                    </p>

                    {referenceWebsites.map((ref, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="url"
                            className="input-field flex-1"
                            placeholder="https://example.com"
                            value={ref.url}
                            onChange={(e) => updateReferenceWebsite(index, 'url', e.target.value)}
                          />
                          {referenceWebsites.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeReferenceWebsite(index)}
                              className="p-2 text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="What do you like about this site? (layout, colors, animations, etc.)"
                          value={ref.whatYouLike}
                          onChange={(e) => updateReferenceWebsite(index, 'whatYouLike', e.target.value)}
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addReferenceWebsite}
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add another website
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Design Keywords - How should your website feel?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DESIGN_KEYWORDS.map((keyword) => (
                        <button
                          key={keyword.id}
                          type="button"
                          onClick={() => toggleArrayValue('designKeywords', keyword.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedKeywords.includes(keyword.id)
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {keyword.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disliked Websites */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Websites You Dislike
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                      What websites do you NOT want yours to look like? This helps us avoid directions you don't want.
                    </p>

                    {dislikedWebsites.map((ref, index) => (
                      <div key={index} className="mb-4 p-4 bg-red-50 rounded-xl border border-red-100">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="url"
                            className="input-field flex-1"
                            placeholder="https://example.com"
                            value={ref.url}
                            onChange={(e) => updateDislikedWebsite(index, 'url', e.target.value)}
                          />
                          {dislikedWebsites.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDislikedWebsite(index)}
                              className="p-2 text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="What don't you like about it? (layout, colors, too busy, etc.)"
                          value={ref.whatYouDislike}
                          onChange={(e) => updateDislikedWebsite(index, 'whatYouDislike', e.target.value)}
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addDislikedWebsite}
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add another site to avoid
                    </button>
                  </div>

                  <TextAreaField
                    label="What to avoid?"
                    {...register('avoidKeywords')}
                    placeholder="Anything you don't want? (e.g., 'too colorful', 'clipart', 'cluttered')"
                    rows={2}
                  />
                </div>
              </StepWrapper>
            )}

            {/* STEP 4: Design Style */}
            {currentStep === 4 && (
              <StepWrapper key="step4">
                <StepHeader
                  title="Design Preferences"
                  subtitle="Choose the visual style for your website."
                />

                <div className="space-y-8">
                  {/* Website Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What type of website do you need?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {WEBSITE_TYPES.map((type) => (
                        <label key={type.id} className="relative cursor-pointer">
                          <input
                            {...register('websiteType')}
                            type="radio"
                            value={type.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-2xl block mb-1">{type.icon}</span>
                            <span className="text-sm font-medium text-gray-900 block">{type.label}</span>
                            <span className="text-xs text-gray-500">{type.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Color Scheme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Color Preference
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {COLOR_SCHEMES.map((scheme) => (
                        <label key={scheme.id} className="relative cursor-pointer">
                          <input
                            {...register('colorPreference')}
                            type="radio"
                            value={scheme.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <div className="flex gap-1 mb-2">
                              {scheme.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full shadow-sm"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-900 block">{scheme.label}</span>
                            <span className="text-xs text-gray-500">{scheme.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Layout Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Layout Style
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {LAYOUT_STYLES.map((style) => (
                        <label key={style.id} className="relative cursor-pointer">
                          <input
                            {...register('layoutStyle')}
                            type="radio"
                            value={style.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{style.label}</span>
                            <span className="text-xs text-gray-500">{style.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Typography Style
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {TYPOGRAPHY_STYLES.map((style) => (
                        <label key={style.id} className="relative cursor-pointer">
                          <input
                            {...register('typographyStyle')}
                            type="radio"
                            value={style.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{style.label}</span>
                            <span className="text-xs text-gray-500">{style.description}</span>
                            <span className="text-xs text-gray-400 italic">e.g., {style.example}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Animation Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Animation Level
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'none', label: 'None', desc: 'Static, no animations' },
                        { id: 'subtle', label: 'Subtle', desc: 'Gentle hover effects' },
                        { id: 'moderate', label: 'Moderate', desc: 'Scroll animations' },
                        { id: 'rich', label: 'Rich', desc: 'Full experience' },
                      ].map((level) => (
                        <label key={level.id} className="relative cursor-pointer">
                          <input
                            {...register('animationLevel')}
                            type="radio"
                            value={level.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{level.label}</span>
                            <span className="text-xs text-gray-500">{level.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Theme Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme Mode
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'light-only', label: 'Light Only', desc: 'Classic bright look' },
                        { id: 'dark-only', label: 'Dark Only', desc: 'Sleek dark interface' },
                        { id: 'both-toggle', label: 'Both (Toggle)', desc: 'User can switch' },
                        { id: 'system-preference', label: 'Auto', desc: 'Match system setting' },
                      ].map((mode) => (
                        <label key={mode.id} className="relative cursor-pointer">
                          <input
                            {...register('themeMode')}
                            type="radio"
                            value={mode.id}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{mode.label}</span>
                            <span className="text-xs text-gray-500">{mode.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* STEP 5: Pages */}
            {currentStep === 5 && (
              <StepWrapper key="step5">
                <StepHeader
                  title="Pages & Structure"
                  subtitle="What pages do you need? Select all that apply."
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {COMMON_PAGES.map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => toggleArrayValue('commonPages', page.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedPages.includes(page.id)
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">{page.icon}</span>
                        <span className="text-sm font-medium text-gray-900 block">{page.label}</span>
                        <span className="text-xs text-gray-500">{page.description}</span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Estimated total pages
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: '1-5', label: '1-5 pages' },
                        { id: '6-10', label: '6-10 pages' },
                        { id: '11-20', label: '11-20 pages' },
                        { id: '20-plus', label: '20+ pages' },
                      ].map((range) => (
                        <label key={range.id} className="relative cursor-pointer">
                          <input
                            {...register('estimatedPageCount')}
                            type="radio"
                            value={range.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{range.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* STEP 6: Features */}
            {currentStep === 6 && (
              <StepWrapper key="step6">
                <StepHeader
                  title="Features & Functionality"
                  subtitle="What functionality do you need?"
                />

                <div className="space-y-8">
                  {/* Group features by category */}
                  {['essential', 'content', 'engagement', 'ecommerce', 'booking', 'accounts', 'advanced'].map((category) => {
                    const categoryFeatures = FEATURES.filter(f => f.category === category)
                    const categoryNames = {
                      essential: 'Essential',
                      content: 'Content',
                      engagement: 'Engagement',
                      ecommerce: 'E-Commerce',
                      booking: 'Booking & Scheduling',
                      accounts: 'User Accounts',
                      advanced: 'Advanced'
                    }

                    return (
                      <div key={category}>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {categoryNames[category]}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {categoryFeatures.map((feature) => (
                            <CheckboxCard
                              key={feature.id}
                              label={feature.label}
                              description={feature.description}
                              checked={selectedFeatures.includes(feature.id)}
                              onChange={() => toggleArrayValue('features', feature.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  <TextAreaField
                    label="Any custom functionality?"
                    {...register('customFeatures')}
                    placeholder="Describe any special features not listed above..."
                    rows={3}
                  />
                </div>
              </StepWrapper>
            )}

            {/* STEP 7: Content */}
            {currentStep === 7 && (
              <StepWrapper key="step7">
                <StepHeader
                  title="Content & Assets"
                  subtitle="What materials do you have ready?"
                />

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you have a logo?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'yes', label: 'Yes, I have one' },
                        { id: 'no', label: 'No logo yet' },
                        { id: 'need-new', label: 'Need a new one' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('hasLogo')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you have website content ready?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'yes-all-ready', label: 'Yes, all ready', desc: 'Text is written' },
                        { id: 'yes-needs-editing', label: 'Needs editing', desc: 'Have drafts' },
                        { id: 'partial', label: 'Partially', desc: 'Some content ready' },
                        { id: 'no-need-help', label: 'Need help', desc: 'Starting from scratch' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('hasContent')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you have images/photos?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'yes-professional', label: 'Professional photos', desc: 'Ready to use' },
                        { id: 'yes-needs-editing', label: 'Have photos', desc: 'May need editing' },
                        { id: 'need-stock', label: 'Need stock images', desc: 'Find suitable images' },
                        { id: 'need-photoshoot', label: 'Need photoshoot', desc: 'Professional photos needed' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('hasImages')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <InputField
                    label="Existing website URL (if any)"
                    {...register('existingWebsite')}
                    placeholder="https://your-current-site.com"
                  />

                  <TextAreaField
                    label="What do you like about your current site?"
                    {...register('whatToKeep')}
                    placeholder="Anything you want to keep or maintain..."
                    rows={2}
                  />

                  <TextAreaField
                    label="What needs to change?"
                    {...register('whatToChange')}
                    placeholder="What's not working or needs improvement..."
                    rows={2}
                  />
                </div>
              </StepWrapper>
            )}

            {/* STEP 8: Technical */}
            {currentStep === 8 && (
              <StepWrapper key="step8">
                <StepHeader
                  title="Technical Requirements"
                  subtitle="Hosting, domain, and technical preferences."
                />

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Hosting preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'you-handle', label: 'You handle it', desc: 'Set up and manage hosting' },
                        { id: 'have-hosting', label: 'I have hosting', desc: 'Already set up' },
                        { id: 'need-recommendation', label: 'Need advice', desc: 'Recommend options' },
                        { id: 'dont-know', label: "Don't know", desc: 'Help me decide' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('hostingPreference')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Domain status
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'have-domain', label: 'Have domain' },
                        { id: 'need-domain', label: 'Need to buy' },
                        { id: 'need-help-choosing', label: 'Need help' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('domainStatus')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <InputField
                    label="Domain name (if you have one)"
                    {...register('domainName')}
                    placeholder="yourdomain.com"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How do you want to edit content?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'easy-drag-drop', label: 'Easy drag & drop', desc: 'No coding needed' },
                        { id: 'wordpress', label: 'WordPress', desc: 'Traditional CMS' },
                        { id: 'custom-built', label: 'Custom built', desc: 'Developer-managed' },
                        { id: 'no-preference', label: 'No preference', desc: 'You decide' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('cmsPreference')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tech stack preference
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TECH_STACKS.map((stack) => (
                        <label key={stack.id} className="relative cursor-pointer">
                          <input
                            {...register('techStackPreference')}
                            type="radio"
                            value={stack.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{stack.label}</span>
                            <span className="text-xs text-gray-500">{stack.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Expected Traffic */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Expected monthly visitors
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {[
                        { id: 'under-1k', label: '<1K' },
                        { id: '1k-10k', label: '1K-10K' },
                        { id: '10k-50k', label: '10K-50K' },
                        { id: '50k-100k', label: '50K-100K' },
                        { id: '100k-plus', label: '100K+' },
                        { id: 'dont-know', label: "Don't know" },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('expectedMonthlyVisitors')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-2 rounded-lg border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile vs Desktop */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Mobile or desktop priority?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'mobile-first', label: 'Mobile-First', desc: 'Most users on phones' },
                        { id: 'desktop-first', label: 'Desktop-First', desc: 'Most users on computers' },
                        { id: 'equal-priority', label: 'Equal', desc: 'Both equally important' },
                        { id: 'dont-know', label: "Don't know", desc: 'Help me decide' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('mobileVsDesktop')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('needsMultiLanguage')}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Multiple languages</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('accessibilityRequirements')}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Accessibility (WCAG)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('needsOffline')}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Works offline (PWA)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('needsCoreWebVitals')}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Core Web Vitals compliance</span>
                    </label>
                  </div>

                  <TextAreaField
                    label="API requirements (if any)"
                    {...register('apiRequirements')}
                    placeholder="Any internal or external APIs needed? (e.g., payment APIs, third-party data, custom backend)"
                    rows={2}
                  />

                  {/* SEO Section */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Performance</h3>

                    <div className="space-y-4">
                      <InputField
                        label="Target keywords (comma-separated)"
                        {...register('targetKeywords')}
                        placeholder="e.g., web design agency, custom websites, react development"
                      />

                      <InputField
                        label="Competitor websites to outrank"
                        {...register('competitorsToOutrank')}
                        placeholder="e.g., competitor1.com, competitor2.com"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Performance expectations
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'standard', label: 'Standard', desc: '3-5s load time' },
                            { id: 'fast', label: 'Fast', desc: '1-3s load time' },
                            { id: 'blazing-fast', label: 'Blazing Fast', desc: '<1s load time' },
                            { id: 'dont-know', label: "Don't know", desc: 'You recommend' },
                          ].map((option) => (
                            <label key={option.id} className="relative cursor-pointer">
                              <input
                                {...register('performanceExpectations')}
                                type="radio"
                                value={option.id}
                                className="peer sr-only"
                              />
                              <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                                <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                                <span className="text-xs text-gray-500">{option.desc}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* STEP 9: Budget & Timeline */}
            {currentStep === 9 && (
              <StepWrapper key="step9">
                <StepHeader
                  title="Budget & Timeline"
                  subtitle="Help us understand the scope of your project."
                />

                <div className="space-y-6">
                  <TextAreaField
                    label="Project vision"
                    {...register('projectDescription')}
                    placeholder="Describe your overall vision for this website project..."
                    rows={4}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Timeline
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { id: 'urgent', label: 'Urgent', desc: 'ASAP' },
                        { id: '2-4-weeks', label: '2-4 Weeks', desc: 'Quick' },
                        { id: '1-2-months', label: '1-2 Months', desc: 'Standard' },
                        { id: '2-3-months', label: '2-3 Months', desc: 'Relaxed' },
                        { id: 'flexible', label: 'Flexible', desc: 'No rush' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('timeline')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Budget range
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'under-5k', label: 'Under $5K' },
                        { id: '5k-10k', label: '$5K - $10K' },
                        { id: '10k-25k', label: '$10K - $25K' },
                        { id: '25k-50k', label: '$25K - $50K' },
                        { id: '50k-100k', label: '$50K - $100K' },
                        { id: '100k-plus', label: '$100K+' },
                        { id: 'discuss', label: 'Prefer to discuss' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('budget')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Launch & Maintenance Section */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Launch & Beyond</h3>

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('hasHardDeadline')}
                            className="w-5 h-5 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">I have a hard deadline</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('phasedLaunchOk')}
                            className="w-5 h-5 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">Phased launch is OK</span>
                        </label>
                      </div>

                      {hasHardDeadline && (
                        <InputField
                          label="Deadline date"
                          type="date"
                          {...register('deadlineDate')}
                        />
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Post-launch maintenance
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { id: 'self-maintain', label: 'Self-maintain', desc: 'I can handle updates' },
                            { id: 'need-ongoing-support', label: 'Need support', desc: 'Help with updates' },
                            { id: 'monthly-retainer', label: 'Monthly retainer', desc: 'Ongoing partnership' },
                            { id: 'as-needed', label: 'As needed', desc: 'Call when needed' },
                            { id: 'discuss', label: 'Discuss', desc: 'Let\'s talk about it' },
                          ].map((option) => (
                            <label key={option.id} className="relative cursor-pointer">
                              <input
                                {...register('maintenancePlan')}
                                type="radio"
                                value={option.id}
                                className="peer sr-only"
                              />
                              <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                                <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
                                <span className="text-xs text-gray-500">{option.desc}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Analytics & reporting needs
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {ANALYTICS_OPTIONS.map((option) => (
                            <CheckboxCard
                              key={option.id}
                              label={option.label}
                              checked={selectedAnalytics.includes(option.id)}
                              onChange={() => toggleArrayValue('analyticsNeeds', option.id)}
                            />
                          ))}
                        </div>
                      </div>

                      <TextAreaField
                        label="Future features planned?"
                        {...register('futureFeatures')}
                        placeholder="Any features you're planning to add later? (helps with architecture decisions)"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* STEP 10: Final Details */}
            {currentStep === 10 && (
              <StepWrapper key="step10">
                <StepHeader
                  title="Final Details"
                  subtitle="Almost done! Just a few more questions."
                />

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How did you hear about us?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { id: 'google', label: 'Google' },
                        { id: 'social-media', label: 'Social Media' },
                        { id: 'referral', label: 'Referral' },
                        { id: 'portfolio', label: 'Portfolio' },
                        { id: 'other', label: 'Other' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('howDidYouHear')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred contact method
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'email', label: 'Email' },
                        { id: 'phone', label: 'Phone' },
                        { id: 'whatsapp', label: 'WhatsApp' },
                        { id: 'video-call', label: 'Video Call' },
                      ].map((option) => (
                        <label key={option.id} className="relative cursor-pointer">
                          <input
                            {...register('preferredContact')}
                            type="radio"
                            value={option.id}
                            className="peer sr-only"
                          />
                          <div className="p-3 rounded-xl border-2 border-gray-200 peer-checked:border-gray-900 peer-checked:bg-gray-50 hover:border-gray-300 transition-all text-center">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <InputField
                    label="Best time to contact you"
                    {...register('bestTimeToContact')}
                    placeholder="e.g., Weekday mornings, After 5pm, etc."
                  />

                  <TextAreaField
                    label="Anything else we should know?"
                    {...register('additionalNotes')}
                    placeholder="Any additional details, questions, or special requirements..."
                    rows={4}
                  />
                </div>
              </StepWrapper>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Back
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl font-medium bg-gray-900 text-white hover:bg-gray-800"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-medium bg-gray-900 text-white hover:bg-gray-800"
              >
                Submit Project
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// Reusable Components
function StepWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

function StepHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
  )
}

const InputField = forwardRef(({ label, required, error, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        className="input-field"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
})

const TextAreaField = forwardRef(({ label, required, error, rows = 4, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        ref={ref}
        className="input-field resize-none"
        rows={rows}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
})

function CheckboxCard({ label, description, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`p-3 rounded-xl border-2 text-left transition-all ${
        checked
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className="text-sm font-medium text-gray-900 block">{label}</span>
      {description && <span className="text-xs text-gray-500">{description}</span>}
    </button>
  )
}
