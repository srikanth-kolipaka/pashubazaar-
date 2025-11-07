export const dictionaries = {
  en: { appName:'PashuBazaar', sell:'Sell Animal', login:'Login', searchPh:'Search cow, goat, buffalo…', post:'Post', price:'Price', callSeller:'Call Seller', chatSeller:'Chat with Seller', markSold:'Mark as Sold', myListings:'My Listings', whatsapp:'WhatsApp', location:'Location', state:'State', filters:'Filters', apply:'Apply', reset:'Reset' },
  hi: { appName:'पशुबाज़ार', sell:'पशु बेचें', login:'लॉगिन', searchPh:'गाय, बकरी, भैंस खोजें…', post:'पोस्ट', price:'कीमत', callSeller:'विक्रेता को कॉल करें', chatSeller:'विक्रेता से चैट', markSold:'बिका हुआ मार्क करें', myListings:'मेरी सूचियाँ', whatsapp:'व्हाट्सऐप', location:'स्थान', state:'राज्य', filters:'फ़िल्टर', apply:'लागू करें', reset:'रीसेट' },
  te: { appName:'పశు బజార్', sell:'జంతువు అమ్మండి', login:'లాగిన్', searchPh:'ఆవు, మేక, ఎద్దు వెతకండి…', post:'పోస్ట్', price:'ధర', callSeller:'విక్రేతకు కాల్', chatSeller:'చాట్', markSold:'సోల్డ్‌గా మార్క్ చేయి', myListings:'నా లిస్టింగ్స్', whatsapp:'వాట్సాప్', location:'ప్రాంతం', state:'రాష్ట్రం', filters:'ఫిల్టర్లు', apply:'అప్లై', reset:'రిసెట్' }
} as const;
export type Lang = keyof typeof dictionaries;
export function t(lang: Lang, key: keyof typeof dictionaries['en']) {
  return (dictionaries as any)[lang]?.[key] ?? (dictionaries.en as any)[key];
}
