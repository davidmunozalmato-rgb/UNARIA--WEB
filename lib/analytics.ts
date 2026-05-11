function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

export const Analytics = {
  quotaSelected: (quota: number) =>
    track('quota_selected', { quota, currency: 'EUR' }),

  signupStarted: (locale: string) =>
    track('signup_started', { locale }),

  signupStepCompleted: (step: number, stepName: string) =>
    track('signup_step_completed', { step, step_name: stepName }),

  signupAbandoned: (step: number, stepName: string) =>
    track('signup_abandoned', { step, step_name: stepName }),

  paymentMethodSelected: (method: 'card' | 'sepa') =>
    track('payment_method_selected', { method }),

  donationStarted: (amount: number) =>
    track('donation_started', { value: amount, currency: 'EUR' }),

  donationCompleted: (amount: number) =>
    track('donation_completed', { value: amount, currency: 'EUR' }),

  subscriptionCompleted: (quota: number) =>
    track('subscription_completed', { value: quota, currency: 'EUR' }),

  languageChanged: (from: string, to: string) =>
    track('language_changed', { from_locale: from, to_locale: to }),

  ctaClicked: (ctaLabel: string, location: string) =>
    track('cta_clicked', { cta_label: ctaLabel, location }),

  exitIntentShown: () =>
    track('exit_intent_shown'),

  exitIntentConverted: (action: string) =>
    track('exit_intent_converted', { action }),

  transparencyReportDownloaded: (locale: string) =>
    track('transparency_report_downloaded', { locale }),

  cancellationStarted: () =>
    track('cancellation_started'),

  cancellationCompleted: () =>
    track('cancellation_completed'),

  cancellationPaused: () =>
    track('cancellation_paused'),

  referralLinkCopied: () =>
    track('referral_link_copied'),

  referralJoined: (referralCode: string) =>
    track('referral_joined', { referral_code: referralCode }),
}
