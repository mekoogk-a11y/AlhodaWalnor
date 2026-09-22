export type LanguageCode =
  | "ar"
  | "en"
  | "fr"
  | "es"
  | "pt"
  | "de"
  | "tr"
  | "id"
  | "ur"
  | "zh"
  | "ru"
  | "bn";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  flag: string;
}

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  tagline: string;
  nav: {
    directory: string;
    scholarlyStudies: string;
    searchEngine: string;
    methodology: string;
    bookmarks: string;
    admin: string;
    assistant: string;
    installApp: string;
    appInstalled: string;
    language: string;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    searchPlaceholder: string;
    exploreEncyclopedia: string;
    askAssistant: string;
    statsTotal: string;
    statsDisciplines: string;
    statsScholars: string;
  };
  tabs: {
    directory: string;
    scholarlyStudies: string;
    searchEngine: string;
    methodology: string;
  };
  directory: {
    title: string;
    subtitle: string;
    filterAll: string;
    resultsCount: string;
    readAnswer: string;
    collapseAnswer: string;
    scholarlySource: string;
    categoryTag: string;
    share: string;
    copyCitation: string;
    listenAudio: string;
    bookmark: string;
    noItems: string;
  };
  search: {
    title: string;
    subtitle: string;
    placeholder: string;
    disciplinesFilter: string;
    allDisciplines: string;
    resultsCount: string;
    noResults: string;
    sourceRef: string;
    openInAssistant: string;
  };
  assistant: {
    title: string;
    badge: string;
    subtitle: string;
    sunnahBanner: string;
    newChat: string;
    placeholder: string;
    send: string;
    thinking: string;
    suggestionsTitle: string;
    citationsTitle: string;
    visualEvidenceTitle: string;
    closeCitation: string;
    author: string;
    reference: string;
    disclaimer: string;
    viewVisualModal: string;
  };
  install: {
    buttonTitle: string;
    installed: string;
    modalTitle: string;
    instructions: string;
    iosStep1: string;
    iosStep2: string;
    close: string;
  };
  footer: {
    description: string;
    aboutHeading: string;
    quickLinks: string;
    disciplinesHeading: string;
    contactSupport: string;
    copyright: string;
    authorAttribution: string;
    allRightsReserved: string;
  };
  common: {
    listen: string;
    share: string;
    copy: string;
    copied: string;
    saved: string;
    removed: string;
    error: string;
    loading: string;
    retry: string;
    close: string;
  };
}
