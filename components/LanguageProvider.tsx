"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi" | "mr";

const translations = {
  en: {
    home: "Home",
    services: "Services",
    work: "Our Work",
    areas: "Service Areas",
    about: "About",
    contact: "Contact",
    requestVisit: "Request a visit",
    requestService: "Request a service visit",
    language: "Language",
    heroTag: "Plant care & decoration, Pune & Mumbai",
    heroTitle: "Green spaces that stay green",
    heroDescription: "We style, water, feed and prune the plants in your home, office or venue — on a schedule you never have to think about. Request a visit in under a minute, no account required.",
    seeWhatWeDo: "See what we do",
    homes: "Homes",
    offices: "Offices",
    hotelsEvents: "Hotels & events",
    officeReception: "Office reception",
    heroCaption: "Styled with trailing pothos & fiddle-leaf fig",
    whatWeDo: "What we do",
    sixWays: "Six ways we keep a space green",
    servicesIntro: "From a single styled corner to a full building program, every service is booked the same simple way.",
    recentWork: "Recent work",
    spacesCare: "A few spaces we look after",
    viewAllWork: "View all work",
    customersSay: "What customers say",
    trusted: "Trusted by homes and businesses across the city",
    ready: "Ready for a healthier space?",
    readyDescription: "Tell us what you need — we’ll confirm a visit, usually the same day.",
    plantCareFooter: "Plant care and decoration for homes, offices and events across Pune and Mumbai.",
    explore: "Explore",
    showcaseEditor: "Team showcase editor",
    getInTouch: "Get in touch",
    sendInquiry: "Send an inquiry",
    hours: "Hours",
    sundayClosed: "Sunday: closed",
  },
  hi: {
    home: "होम",
    services: "सेवाएँ",
    work: "हमारा काम",
    areas: "सेवा क्षेत्र",
    about: "हमारे बारे में",
    contact: "संपर्क",
    requestVisit: "भेंट का अनुरोध करें",
    requestService: "सेवा भेंट का अनुरोध करें",
    language: "भाषा",
    heroTag: "पौधों की देखभाल और सजावट, पुणे और मुंबई",
    heroTitle: "ऐसी हरियाली जो हमेशा हरी रहे",
    heroDescription: "हम आपके घर, कार्यालय या स्थल के पौधों को सजाते, पानी देते और उनकी देखभाल करते हैं। अपनी सुविधा के अनुसार सेवा बुक करें, किसी खाते की जरूरत नहीं।",
    seeWhatWeDo: "हम क्या करते हैं",
    homes: "घर",
    offices: "कार्यालय",
    hotelsEvents: "होटल और आयोजन",
    officeReception: "कार्यालय स्वागत कक्ष",
    heroCaption: "ट्रेलिंग पोथोस और फिडल-लीफ फिग से सजाया गया",
    whatWeDo: "हम क्या करते हैं",
    sixWays: "जगह को हरा-भरा रखने के छह तरीके",
    servicesIntro: "एक छोटे सजावटी कोने से लेकर पूरे भवन की देखभाल तक, हर सेवा आसानी से बुक करें।",
    recentWork: "हाल का काम",
    spacesCare: "कुछ जगहों की हम देखभाल करते हैं",
    viewAllWork: "सारा काम देखें",
    customersSay: "ग्राहक क्या कहते हैं",
    trusted: "शहर भर के घरों और व्यवसायों का भरोसा",
    ready: "स्वस्थ और सुंदर जगह के लिए तैयार हैं?",
    readyDescription: "हमें अपनी जरूरत बताएं — हम आमतौर पर उसी दिन भेंट की पुष्टि करेंगे।",
    plantCareFooter: "पुणे और मुंबई में घरों, कार्यालयों और आयोजनों के लिए पौधों की देखभाल और सजावट।",
    explore: "देखें",
    showcaseEditor: "टीम शोकेस संपादक",
    getInTouch: "संपर्क करें",
    sendInquiry: "पूछताछ भेजें",
    hours: "समय",
    sundayClosed: "रविवार: बंद",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    services: "सेवा",
    work: "आमचे काम",
    areas: "सेवा क्षेत्रे",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
    requestVisit: "भेटीची विनंती करा",
    requestService: "सेवा भेटीची विनंती करा",
    language: "भाषा",
    heroTag: "रोपांची निगा आणि सजावट, पुणे आणि मुंबई",
    heroTitle: "नेहमी हिरवी राहणारी हिरवीगार जागा",
    heroDescription: "तुमच्या घरातील, कार्यालयातील किंवा कार्यक्रमस्थळातील रोपांची सजावट, पाणी देणे आणि निगा आम्ही राखतो. खाते न उघडता एका मिनिटात भेट बुक करा.",
    seeWhatWeDo: "आम्ही काय करतो",
    homes: "घरे",
    offices: "कार्यालये",
    hotelsEvents: "हॉटेल्स आणि कार्यक्रम",
    officeReception: "कार्यालय स्वागत कक्ष",
    heroCaption: "ट्रेलिंग पोथोस आणि फिडल-लीफ फिगने सजवलेले",
    whatWeDo: "आम्ही काय करतो",
    sixWays: "जागा हिरवी ठेवण्याचे सहा मार्ग",
    servicesIntro: "एका सजवलेल्या कोपऱ्यापासून संपूर्ण इमारतीच्या कार्यक्रमापर्यंत, प्रत्येक सेवा सहज बुक करा.",
    recentWork: "अलीकडील काम",
    spacesCare: "आम्ही सांभाळत असलेल्या काही जागा",
    viewAllWork: "सर्व काम पहा",
    customersSay: "ग्राहक काय म्हणतात",
    trusted: "शहरातील घरे आणि व्यवसायांचा विश्वास",
    ready: "अधिक निरोगी जागेसाठी तयार आहात?",
    readyDescription: "तुमची गरज सांगा — आम्ही सहसा त्याच दिवशी भेट निश्चित करू.",
    plantCareFooter: "पुणे आणि मुंबईतील घरे, कार्यालये आणि कार्यक्रमांसाठी रोपांची निगा आणि सजावट.",
    explore: "पहा",
    showcaseEditor: "टीम शोकेस संपादक",
    getInTouch: "संपर्क साधा",
    sendInquiry: "चौकशी पाठवा",
    hours: "वेळ",
    sundayClosed: "रविवार: बंद",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
type TranslationDictionary = Record<TranslationKey, string>;
type TranslationContextValue = { language: Language; setLanguage: (language: Language) => void; dictionary: TranslationDictionary };

const LanguageContext = createContext<TranslationContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("greenlife-language") as Language | null;
    if (stored && stored in translations) setLanguageState(stored);
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("greenlife-language", nextLanguage);
  }

  const value: TranslationContextValue = {
    language,
    setLanguage,
    dictionary: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
