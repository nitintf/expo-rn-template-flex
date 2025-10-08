const en = {
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back',
    logOut: 'Log Out',
    goBack: 'Go Back',
  },
  welcomeScreen: {
    title: 'Welcome Screen',
    content: 'Welcome to the app',
    emailPlaceholder: 'Enter your email',
    emailLabel: 'Email',
    namePlaceholder: 'Enter your name',
    nameLabel: 'Name',
    submit: 'Submit',
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <Button> component.",
    reset: 'RESET APP',
    traceTitle: 'Error from %{name} stack',
  },
  emptyStateComponent: {
    generic: {
      heading: 'So empty... so sad',
      content:
        'No data found yet. Try clicking the button to refresh or reload the app.',
      button: "Let's try this again",
    },
  },

  error: {
    notFound: {
      title: 'Oops! Page Not Found',
      message: "The page you're looking for doesn't exist or has been moved.",
    },
  },
};

export default en;
export type Translations = typeof en;
