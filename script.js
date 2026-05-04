let sanskritDatabase = {};
let pratyayaDB = {}; 

// Hinglish/common word mappings - for casual English spellings of Hindi/Sanskrit words
const hinglishWordMap = {
    'ram': 'राम', 'krishna': 'कृष्ण', 'shiva': 'शिव', 'ganesh': 'गणेश',
    'hanuman': 'हनुमान', 'vishnu': 'विष्णु', 'brahma': 'ब्रह्मा',
    'agni': 'अग्नि', 'vayu': 'वायु', 'indra': 'इन्द्र', 'surya': 'सूर्य',
    'ganga': 'गङ्गा', 'yama': 'यम', 'kama': 'काम', 'dharma': 'धर्म',
    'karma': 'कर्म', 'yoga': 'योग', 'mantra': 'मन्त्र', 'veda': 'वेद',
    'rishi': 'ऋषि', 'guru': 'गुरु', 'pandit': 'पण्डित', 'swami': 'स्वामी',
    'bhagwan': 'भगवान', 'deva': 'देव', 'devi': 'देवी',
    'raja': 'राजा', 'rani': 'रानी', 'putra': 'पुत्र', 'kanya': 'कन्या',
    'griha': 'गृह', 'nagar': 'नगर', 'pura': 'पुर', 'desh': 'देश',
    'nadi': 'नदी', 'pani': 'पानी', 'aakash': 'आकाश', 'dharti': 'धरती',
    'mata': 'माता', 'pita': 'पिता', 'bhaai': 'भाई', 'behen': 'बहन',
    'mandir': 'मन्दिर', 'pustak': 'पुस्तक', 'shala': 'शाला',
    'vaidya': 'वैद्य', 'chikitsa': 'चिकित्सा', 'aushadhi': 'औषधि',
    'bhojan': 'भोजन', 'jal': 'जल', 'anna': 'अन्न', 'phool': 'फूल',
    'pav': 'पाव', 'kitab': 'किताब', 'kursi': 'कुर्सी',
    'darwaza': 'दरवाज़ा', 'khidki': 'खिड़की', 'chhatri': 'छतरी',
    'baaraat': 'बारात', 'shadi': 'शादी', 'tyohar': 'त्योहार',
    'sabha': 'सभा', 'samiti': 'समिति', 'sena': 'सेना',
    'rajya': 'राज्य', 'raj': 'राज', 'maharaja': 'महाराजा',
    'yuva': 'युवा', 'balak': 'बालक', 'stri': 'स्त्री',
    'purush': 'पुरुष', 'manushya': 'मनुष्य', 'jeev': 'जीव',
    'jeevan': 'जीवन', 'mrit': 'मृत', 'mrityu': 'मृत्यु',
    'sukh': 'सुख', 'dukh': 'दुख', 'prem': 'प्रेम', 'pyar': 'प्यार',
    'dosti': 'दोस्ती', 'saheli': 'सहेली', 'baba': 'बाबा',
    'acharya': 'आचार्य', 'vidwan': 'विद्वान', 'mahila': 'महिला',
    'nari': 'नारी', 'kumari': 'कुमारी', 'pati': 'पति', 'patni': 'पत्नी',
    'santan': 'सन्तान', 'kul': 'कुल', 'vansh': 'वंश', 'parivar': 'परिवार',
    'ghar': 'घर', 'makhan': 'मक्खन', 'dahi': 'दही',
    'chawal': 'चावल', 'roti': 'रोटी', 'dal': 'दाल', 'sabzi': 'सब्ज़ी',
    'phoolgobhi': 'फूलगोभी', 'pyaaz': 'प्याज़', 'adrak': 'अदरक',
    'lehsun': 'लहसुन', 'haldi': 'हल्दी', 'mirch': 'मिर्च',
    'namak': 'नमक', 'shakkar': 'शक्कर', 'chini': 'चीनी',
    'kapur': 'कपूर', 'agarbatti': 'अगरबत्ती', 'deepak': 'दीपक',
    'diya': 'दीया', 'pooja': 'पूजा', 'aarti': 'आरती', 'jaap': 'जाप',
    'tapasya': 'तपस्या', 'sadhana': 'साधना', 'ashram': 'आश्रम',
    'teerth': 'तीर्थ', 'kshetra': 'क्षेत्र', 'pavitra': 'पवित्र',
    'shuddh': 'शुद्ध', 'sundar': 'सुन्दर', 'khoobsurat': 'खूबसूरत',
    'bada': 'बड़ा', 'chota': 'छोटा', 'lamba': 'लंबा',
    'achha': 'अच्छा', 'bura': 'बुरा', 'tez': 'तेज', 'dheere': 'धीरे',
    'galat': 'गलत', 'sahi': 'सही', 'thik': 'ठीक',
    'haan': 'हाँ', 'nahin': 'नहीं', 'nahi': 'नहीं', 'ji': 'जी',
    'kya': 'क्या', 'kaise': 'कैसे', 'kab': 'कब', 'kahan': 'कहाँ',
    'kaun': 'कौन', 'kyon': 'क्यों', 'kitna': 'कितना',
    'mitr': 'मित्र', 'shatru': 'शत्रु', 'shishya': 'शिष्य',
    'pandita': 'पण्डिता', 'santan': 'सन्तान',
    'teerth': 'तीर्थ', 'sthal': 'स्थल',
    'sundarta': 'सुन्दरता', 'bara': 'बड़ा',
    'sakhi': 'सखी', 'tau': 'ताऊ', 'bua': 'बुआ',
    'nana': 'नाना', 'nani': 'नानी', 'dada': 'दादा', 'dadi': 'दादी',
    'fufa': 'फूफा', 'fufi': 'फूफी',
    'chacha': 'चाचा', 'chachi': 'चाची', 'mama': 'मामा', 'mausi': 'मौसी',
    'saas': 'सास', 'sasur': 'ससुर', 'behen': 'बहन', 'bhaai': 'भाई',
    'didi': 'दीदी', 'bhaiya': 'भैया',
    'swamiji': 'स्वामीजी', 'panditji': 'पण्डितजी',
    'maulana': 'मौलाना', 'babaji': 'बाबाजी',
    'yatra': 'यात्रा', 'darshan': 'दर्शन', 'prasad': 'प्रसाद',
    'bhajan': 'भजन', 'kirtan': 'कीर्तन', 'homa': 'होम',
    'yajna': 'यज्ञ', 'havan': 'हवन', 'upasana': 'उपासना',
    'bhakti': 'भक्ति', 'jnana': 'ज्ञान', 'vairagya': 'वैराग्य',
    'moksha': 'मोक्ष', 'nirvana': 'निर्वाण', 'samadhi': 'समाधि',
    'prana': 'प्राण', 'chakra': 'चक्र', 'kundalini': 'कुण्डलिनी',
    'tantra': 'तंत्र', 'mudra': 'मुद्रा', 'asana': 'आसन',
    'pranayam': 'प्राणायाम', 'dhyana': 'ध्यान',
    'siddhi': 'सिद्धि', 'shakti': 'शक्ति', 'shanti': 'शान्ति',
    'om': 'ॐ', 'swastika': 'स्वस्तिक', 'kalash': 'कलश',
    'purnakumbh': 'पूर्णकुंभ', 'toran': 'तोरण',
    'rangoli': 'रंगोली', 'alpana': 'अल्पना',
    'mehendi': 'मेहंदी', 'sindoor': 'सिन्दूर',
    'mangalsutra': 'मंगलसूत्र', 'bichhiya': 'बिछिया',
    'payal': 'पायल', 'kada': 'कड़ा', 'kangna': 'कंगन',
    'nath': 'नथ', 'laung': 'लौंग',
    'gopi': 'गोपी', 'radha': 'राधा',
    'arjun': 'अर्जुन', 'bheem': 'भीम', 'yudh': 'युद्ध',
    'dron': 'द्रोण', 'ashwathama': 'अश्वथामा', 'karna': 'कर्ण',
    'duryodhan': 'दुर्योधन', 'shakuni': 'शकुनि',
    'bhishma': 'भीष्म', 'parashuram': 'परशुराम',
    'ramayan': 'रामायण', 'mahabharat': 'महाभारत',
    'puran': 'पुराण', 'upanishad': 'उपनिषद',
    'bhagvadgita': 'भगवद्गीता', 'vedant': 'वेदांत',
    'mimansa': 'मीमांसा', 'nyaya': 'न्याय',
    'vaiseshik': 'वैशेषिक', 'samkhya': 'सांख्य',
    'yogasutra': 'योगसूत्र', 'ashtang': 'अष्टांग',
    'hath': 'हठ', 'kundalini': 'कुण्डलिनी',
    'chakra': 'चक्र', 'nadi': 'नाड़ी', 'prana': 'प्राण',
    'shushumna': 'सुषुम्णा', 'ida': 'इडा', 'pingla': 'पिङ्गला',
    'bindu': 'बिंदु', 'mandala': 'मण्डल', 'yantra': 'यंत्र',
    'mantra': 'मन्त्र', 'beej': 'बीज', 'bij': 'बीज',
    'siddha': 'सिद्ध', 'nath': 'नाथ', 'siddh': 'सिद्ध',
    'naga': 'नाग', 'yaksha': 'यक्ष', 'rakshas': 'राक्षस',
    'asura': 'असुर', 'danav': 'दानव', 'ravan': 'रावण',
    'meghnad': 'मेघनाद', 'kumbhkaran': 'कुम्भकरण',
    'vibhishan': 'विभीषण', 'shurpanakha': 'शूर्पणखा',
    'tulsidas': 'तुलसीदास', 'kabir': 'कबीर', 'meerabai': 'मीराबाई',
    'tukaram': 'तुकाराम', 'narsinh': 'नरसिंह', 'surdas': 'सूरदास',
    'chaitanya': 'चैतन्य', 'ramanuj': 'रामानुज', 'madhav': 'माधव',
    'adiguru': 'आदिगुरु', 'shankar': 'शंकर', 'ramkrishna': 'रामकृष्ण',
    'vivekanand': 'विवेकानंद', 'chinmayanand': 'चिन्मयानंद',
    'satya': 'सत्य', 'ahinsa': 'अहिंसा', 'karuna': 'करुणा',
    'daya': 'दया', 'kshama': 'क्षमा', 'dhairya': 'धैर्य',
    'virya': 'वीर्य', 'samta': 'समता', 'tyag': 'त्याग',
    'aparigraha': 'अपरिग्रह', 'asteya': 'अस्तेय', 'brahmacharya': 'ब्रह्मचर्य',
    'sauch': 'शौच', 'santosha': 'संतोष', 'tap': 'तप',
    'swadhyay': 'स्वाध्याय', 'ishwar': 'ईश्वरप्रणिधान',
    'yama': 'यम', 'niyam': 'नियम', 'asana': 'आसन',
    'pratyahar': 'प्रत्याहार', 'dharana': 'धारणा',
    'dhyana': 'ध्यान', 'samadhi': 'समाधि',
    'prakriti': 'प्रकृति', 'purusha': 'पुरुष',
    'triguna': 'त्रिगुण', 'sattva': 'सत्त्व', 'rajas': 'रजस्',
    'tamas': 'तमस्', 'maya': 'माया', 'avidya': 'अविद्या',
    'vidya': 'विद्या', 'moha': 'मोह', 'lobh': 'लोभ',
    'krodh': 'क्रोध', 'mada': 'मद', 'matsarya': 'मत्सर्य',
    'rag': 'राग', 'dwesh': 'द्वेष', 'bhay': 'भय',
    'vishad': 'विषाद', 'chinta': 'चिंता', 'udveg': 'उद्वेग',
    'nirvikar': 'निर्विकार', 'stithpragya': 'स्थितप्रज्ञ',
    'vairagya': 'वैराग्य', 'tyag': 'त्याग', 'sanyas': 'संन्यास',
    'grihasth': 'गृहस्थ', 'brahmachari': 'ब्रह्मचारी',
    'vanprasth': 'वानप्रस्थ', 'sanyasi': 'संन्यासी',
    'ashram': 'आश्रम', 'dharma': 'धर्म', 'artha': 'अर्थ',
    'kama': 'काम', 'moksha': 'मोक्ष', 'purushartha': 'पुरुषार्थ',
    'varna': 'वर्ण', 'ashram': 'आश्रम', 'samskara': 'संस्कार',
    'sanskara': 'संस्कार', 'upanayan': 'उपनयन',
    'yajnopavit': 'यज्ञोपवीत', 'grihya': 'गृह्य',
    'shrauta': 'श्रौत', 'smarta': 'स्मार्त',
    'agama': 'आगम', 'nigama': 'निगम',
    'tantr': 'तंत्र', 'yantra': 'यंत्र', 'mantra': 'मन्त्र',
    'pratishtha': 'प्रतिष्ठा', 'avahan': 'आवाहन',
    'shodash': 'षोडश', 'upachar': 'उपचार',
    'puja': 'पूजा', 'archana': 'अर्चना', 'stotra': 'स्तोत्र',
    'ashtakam': 'अष्टकम', 'sahasranam': 'सहस्रनाम',
    'chalisa': 'चालीसा', 'astak': 'अष्टक',
    'stavan': 'स्तवन', 'stuti': 'स्तुति',
    'vandana': 'वन्दना', 'namavali': 'नामावली',
    'kavach': 'कवच', 'argala': 'अर्गला',
    'kilak': 'किलक', 'samput': 'सम्पुट',
    'nyas': 'न्यास', 'mudra': 'मुद्रा',
    'mantra': 'मन्त्र', 'japa': 'जाप', 'homa': 'होम',
    'yajna': 'यज्ञ', 'dana': 'दान', 'dakshina': 'दक्षिणा',
    'bhiksha': 'भिक्षा', 'prasad': 'प्रसाद',
    'naivedya': 'नैवेद्य', 'bali': 'बलि',
    'tarpan': 'तर्पण', 'shraddha': 'श्राद्ध',
    'pind': 'पिंड', 'pret': 'प्रेत', 'pitru': 'पितृ',
    'dev': 'देव', 'pitru': 'पितृ', 'rishi': 'ऋषि',
    'manushya': 'मनुष्य', 'pashu': 'पशु', 'pakshi': 'पक्षी',
    'vriksha': 'वृक्ष', 'pushp': 'पुष्प', 'phool': 'फूल',
    'dhatu': 'धातु', 'pratyay': 'प्रत्यय',
    'sutra': 'सूत्र', 'vaky': 'वाक्य', 'shlok': 'श्लोक',
    'pady': 'पद्य', 'geet': 'गीत', 'bhajan': 'भजन',
    'kirtan': 'कीर्तन', 'stotra': 'स्तोत्र', 'ashtakam': 'अष्टकम',
    'sahasranam': 'सहस्रनाम', 'chalisa': 'चालीसा',
    'doha': 'दोहा', 'chaupai': 'चौपाई', 'kavit': 'कविता',
    'kavya': 'काव्य', 'mahakavya': 'महाकाव्य', 'khandakavya': 'खण्डकाव्य',
    'akhyayika': 'अख्यायिका', 'katha': 'कथा', 'prabandh': 'प्रबन्ध',
    'campu': 'चम्पू', 'sandesh': 'सन्देश', 'baramas': 'बारमास',
    'harikatha': 'हरिकथा', 'burrakatha': 'बुर्रकथा',
    'kirtan': 'कीर्तन', 'bhajan': 'भजन', 'namavali': 'नामावली',
    'sankirtan': 'संकीर्तन', 'nama': 'नाम', 'japa': 'जाप',
    'ajapa': 'अजाप', 'ajapajap': 'अजापजप', 'hridaya': 'हृदय',
    'manas': 'मनस्', 'buddhi': 'बुद्धि', 'chitta': 'चित्त',
    'ahankar': 'अहङ्कार', 'antahkarana': 'अन्तःकरण',
    'sukshma': 'सूक्ष्म', 'sthula': 'स्थूल',
    'karana': 'कारण', 'karya': 'कार्य',
    'nimitta': 'निमित्त', 'upaadana': 'उपादान',
    'sambandh': 'संबंध', 'vishay': 'विषय',
    'vishaya': 'विषय', 'alamban': 'आलम्बन',
    'ashray': 'आश्रय', 'adhisthan': 'अधिष्ठान',
    'shakti': 'शक्ति', 'shaktiman': 'शक्तिमान',
    'prabhav': 'प्रभाव', 'vaibhav': 'वैभव',
    'aishvarya': 'ऐश्वर्य', 'yash': 'यश', 'kirti': 'कीर्ति',
    'fame': 'कीर्ति', 'glory': 'यश', 'honor': 'सम्मान',
    'respect': 'सम्मान', 'dignity': 'गरिमा',
    'pride': 'गर्व', 'ego': 'अहङ्कार', 'humility': 'विनम्रता',
    'modesty': 'विनय', 'courtesy': 'विनय', 'politeness': 'विनय',
    'gratitude': 'कृतज्ञता', 'thankfulness': 'कृतज्ञता',
    'appreciation': 'प्रशंसा', 'admiration': 'प्रशंसा',
    'love': 'प्रेम', 'affection': 'स्नेह', 'fondness': 'राग',
    'attachment': 'आसक्ति', 'detachment': 'वैराग्य',
    'desire': 'इच्छा', 'craving': 'तृष्णा', 'longing': 'वसना',
    'passion': 'राग', 'anger': 'क्रोध', 'hatred': 'द्वेष',
    'aversion': 'द्वेष', 'dislike': 'अरुचि', 'disgust': 'घृणा',
    'fear': 'भय', 'terror': 'भीति', 'anxiety': 'चिंता',
    'worry': 'चिंता', 'tension': 'तनाव', 'stress': 'तनाव',
    'depression': 'विषाद', 'sadness': 'शोक', 'grief': 'शोक',
    'sorrow': 'वेदना', 'pain': 'दुःख', 'suffering': 'दुःख',
    'misery': 'दुःख', 'trouble': 'कष्ट', 'problem': 'समस्या',
    'difficulty': 'कठिनाई', 'obstacle': 'बाधा', 'hurdle': 'बाधा',
    'challenge': 'चुनौती', 'test': 'परीक्षा', 'trial': 'परीक्षा',
    'opportunity': 'अवसर', 'chance': 'मौका', 'possibility': 'संभावना',
    'hope': 'आशा', 'expectation': 'उम्मीद', 'belief': 'विश्वास',
    'faith': 'विश्वास', 'trust': 'विश्वास', 'confidence': 'आत्मविश्वास',
    'courage': 'साहस', 'bravery': 'वीरता', 'valor': 'वीरता',
    'heroism': 'वीरता', 'strength': 'बल', 'power': 'शक्ति',
    'energy': 'ऊर्जा', 'vitality': 'जीवनशक्ति', 'vigor': 'ताकत',
    'enthusiasm': 'उत्साह', 'zeal': 'उत्साह', 'passion': 'राग',
    'interest': 'रुचि', 'curiosity': 'जिज्ञासा', 'inquisitiveness': 'जिज्ञासा',
    'wisdom': 'ज्ञान', 'knowledge': 'ज्ञान', 'understanding': 'बोध',
    'intelligence': 'बुद्धि', 'intellect': 'बुद्धि', 'mind': 'मन',
    'consciousness': 'चेतना', 'awareness': 'ज्ञान', 'realization': 'अनुभव',
    'enlightenment': 'ज्ञान', 'awakening': 'जागरण', 'liberation': 'मोक्ष',
    'freedom': 'स्वतंत्रता', 'independence': 'स्वतंत्रता',
    'autonomy': 'स्वायत्तता', 'self': 'आत्मा', 'soul': 'आत्मा',
    'spirit': 'आत्मा', 'essence': 'सार', 'core': 'मूल',
    'root': 'मूल', 'base': 'आधार', 'foundation': 'नींव',
    'principle': 'सिद्धांत', 'rule': 'नियम', 'law': 'विधान',
    'duty': 'कर्तव्य', 'responsibility': 'दायित्व', 'obligation': 'बाध्यता',
    'right': 'अधिकार', 'privilege': 'विशेषाधिकार',
    'justice': 'न्याय', 'fairness': 'न्याय', 'equality': 'समानता',
    'equity': 'समानता', 'balance': 'संतुलन', 'harmony': 'सामंजस्य',
    'peace': 'शान्ति', 'tranquility': 'शांति', 'calm': 'शांत', 'shant': 'शांत', 'shaant': 'शांत',
    'silence': 'मौन', 'quiet': 'शांत', 'stillness': 'निष्क्रियता',
    'meditation': 'ध्यान', 'contemplation': 'ध्यान', 'reflection': 'चिंतन',
    'thought': 'विचार', 'idea': 'विचार', 'concept': 'अवधारणा',
    'notion': 'विचार', 'perception': 'अनुभव', 'view': 'दृष्टिकोण',
    'opinion': 'मत', 'belief': 'विश्वास', 'conviction': 'दृढ़विश्वास',
    'certainty': 'निश्चय', 'assurance': 'आश्वासन', 'guarantee': 'गारंटी',
    'promise': 'वादा', 'commitment': 'प्रतिबद्धता', 'dedication': 'समर्पण',
    'devotion': 'भक्ति', 'loyalty': 'निष्ठा', 'faithfulness': 'निष्ठा',
    'sincerity': 'ईमानदारी', 'honesty': 'ईमानदारी', 'truth': 'सत्य',
    'reality': 'वास्तविकता', 'fact': 'तथ्य', 'truth': 'सत्य',
    'actuality': 'वास्तविकता', 'existence': 'अस्तित्व', 'being': 'अस्तित्व',
    'life': 'जीवन', 'living': 'जीवन', 'existence': 'अस्तित्व',
    'nature': 'प्रकृति', 'world': 'विश्व', 'universe': 'ब्रह्मांड',
    'cosmos': 'ब्रह्मांड', 'creation': 'सृष्टि', 'destruction': 'लय',
    'preservation': 'संरक्षण', 'transformation': 'रूपांतरण',
    'change': 'परिवर्तन', 'evolution': 'विकास', 'growth': 'विकास',
    'progress': 'प्रगति', 'development': 'विकास', 'improvement': 'सुधार',
    'advancement': 'प्रगति', 'achievement': 'उपलब्धि', 'success': 'सफलता',
    'victory': 'विजय', 'triumph': 'विजय', 'conquest': 'विजय',
    'defeat': 'पराजय', 'loss': 'हानि', 'failure': 'असफलता',
    'mistake': 'गलती', 'error': 'त्रुटि', 'fault': 'दोष',
    'blame': 'दोष', 'accusation': 'आरोप', 'criticism': 'आलोचना',
    'complaint': 'शिकायत', 'grievance': 'शिकायत', 'problem': 'समस्या',
    'issue': 'मुद्दा', 'matter': 'बात', 'affair': 'बात',
    'subject': 'विषय', 'topic': 'विषय', 'theme': 'विषय',
    'title': 'शीर्षक', 'heading': 'शीर्षक', 'caption': 'विवरण',
    'label': 'लेबल', 'tag': 'टैग', 'mark': 'चिह्न',
    'sign': 'चिह्न', 'symbol': 'प्रतीक', 'emblem': 'चिह्न',
    'logo': 'लोगो', 'brand': 'ब्रांड', 'trademark': 'ट्रेडमार्क',
    'copyright': 'कॉपीराइट', 'patent': 'पेटेंट', 'license': 'लाइसेंस',
    'permission': 'अनुमति', 'consent': 'सहमति', 'approval': 'मंजूरी',
    'authorization': 'प्राधिकरण', 'validation': 'मान्यता', 'confirmation': 'पुष्टि',
    'verification': 'सत्यापन', 'authentication': 'प्रमाणीकरण',
    'identification': 'पहचान', 'recognition': 'पहचान', 'acknowledgment': 'स्वीकृति',
    'acceptance': 'स्वीकृति', 'approval': 'मंजूरी', 'endorsement': 'प्रवर्तन',
    'support': 'समर्थन', 'backing': 'समर्थन', 'sponsorship': 'प्रायोजन',
    'patronage': 'प्रायोजन', 'funding': 'वित्तपोषण', 'financing': 'वित्तपोषण',
    'investment': 'निवेश', 'capital': 'पूंजी', 'money': 'धन',
    'wealth': 'धन', 'riches': 'धन', 'fortune': 'भाग्य',
    'luck': 'भाग्य', 'chance': 'मौका', 'fate': 'भाग्य',
    'destiny': 'भाग्य', 'kismet': 'भाग्य', 'providence': 'प्रभुकृपा',
    'grace': 'कृपा', 'blessing': 'आशीर्वाद', 'boon': 'वर',
    'gift': 'उपहार', 'present': 'उपहार', 'offering': 'अर्पण',
    'donation': 'दान', 'charity': 'दान', 'philanthropy': 'सेवा',
    'service': 'सेवा', 'help': 'सहायता', 'assistance': 'सहायता',
    'aid': 'सहायता', 'relief': 'राहत', 'rescue': 'रक्षा',
    'protection': 'संरक्षण', 'defense': 'रक्षा', 'security': 'सुरक्षा',
    'safety': 'सुरक्षा', 'shelter': 'आश्रय', 'refuge': 'आश्रय',
    'sanctuary': 'अभय', 'haven': 'आश्रय', 'home': 'घर',
    'house': 'घर', 'residence': 'निवास', 'dwelling': 'निवास',
    'abode': 'निवास', 'place': 'स्थान', 'location': 'स्थान',
    'position': 'स्थिति', 'site': 'स्थान', 'spot': 'स्थान',
    'area': 'क्षेत्र', 'region': 'क्षेत्र', 'zone': 'क्षेत्र',
    'field': 'क्षेत्र', 'domain': 'क्षेत्र', 'sphere': 'क्षेत्र',
    'range': 'विस्तार', 'scope': 'दायरा', 'extent': 'सीमा',
    'limit': 'सीमा', 'boundary': 'सीमा', 'border': 'सीमा',
    'edge': 'किनारा', 'margin': 'हाशिया', 'side': 'पक्ष',
    'part': 'भाग', 'portion': 'भाग', 'section': 'खंड',
    'segment': 'खंड', 'division': 'विभाजन', 'category': 'श्रेणी',
    'class': 'वर्ग', 'type': 'प्रकार', 'kind': 'प्रकार',
    'sort': 'प्रकार', 'variety': 'विविधता', 'form': 'रूप',
    'shape': 'आकार', 'size': 'आकार', 'dimension': 'आयाम',
    'measure': 'माप', 'quantity': 'मात्रा', 'amount': 'राशि',
    'number': 'संख्या', 'count': 'गणना', 'total': 'कुल'
};

function joinSanskrit(text) {
    const vowelMap = { '्अ': '', '्आ': 'ा', '्इ': 'ि', '्ई': 'ी', '्उ': 'ु', '्ऊ': 'ू', '्ऋ': 'ृ', '्ए': 'े', '्ऐ': 'ै', '्ओ': 'ो', '्औ': 'ौ' };
    for (let [key, val] of Object.entries(vowelMap)) { text = text.split(key).join(val); }
    return text;
}

function autoGuna(d) {
    if (d.endsWith('ि') || d.endsWith('ी')) return d.slice(0, -1) + 'े';
    if (d.endsWith('ु') || d.endsWith('ू')) return d.slice(0, -1) + 'ो';
    if (d.endsWith('ृ')) return d.slice(0, -1) + 'र्'; 
    if (d.endsWith('्')) {
        return d.replace(/ि([क-ह]्)$/, 'े$1').replace(/ु([क-ह]्)$/, 'ो$1').replace(/ृ([क-ह]्)$/, 'र्$1');
    }
    return d; 
}

function autoVriddhi(d) {
    if (d.endsWith('ि') || d.endsWith('ी')) return d.slice(0, -1) + 'ै';
    if (d.endsWith('ु') || d.endsWith('ू')) return d.slice(0, -1) + 'ौ';
    if (d.endsWith('ृ')) return d.slice(0, -1) + 'ार्'; 
    if (d.endsWith('्') && !d.match(/[ािीुूृेैोौ][क-ह]्$/) && !d.match(/[क-ह]्[क-ह]्$/)) {
        return d.replace(/([क-ह])([क-ह]्)$/, '$1ा$2'); 
    }
    if (d.endsWith('्')) {
        return d.replace(/ि([क-ह]्)$/, 'ै$1').replace(/ु([क-ह]्)$/, 'ौ$1').replace(/ृ([क-ह]्)$/, 'ार्$1');
    }
    return d; 
}

function applySandhi(word1, word2) {
    if (!word1) return word2;
    if (!word2) return word1;

    let w1 = word1.slice(0, -1); 
    let lastChar = word1.slice(-1); 
    let firstChar = word2.charAt(0); 
    let w2 = word2.slice(1); 

    let isVowel = ['अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ'].includes(firstChar);
    let isConsonantWithImplicitA = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".includes(lastChar);

    if (isConsonantWithImplicitA) {
        if (firstChar === 'अ' || firstChar === 'आ') return w1 + lastChar + 'ा' + w2; 
        if (firstChar === 'इ' || firstChar === 'ई') return w1 + lastChar + 'े' + w2; 
        if (firstChar === 'उ' || firstChar === 'ऊ') return w1 + lastChar + 'ो' + w2; 
        if (firstChar === 'ऋ') return w1 + lastChar + 'र्' + w2; 
        if (firstChar === 'ए' || firstChar === 'ऐ') return w1 + lastChar + 'ै' + w2;
        if (firstChar === 'ओ' || firstChar === 'औ') return w1 + lastChar + 'ौ' + w2;
    }

    // --- ६.१.७७ इको यणचि (सुधार: व्/य् के साथ स्वर को तुरंत जोड़ना ताकि पिछला वर्ण आधा रहे) ---
    if ((lastChar === 'ि' || lastChar === 'ी') && isVowel) return w1 + '्' + joinSanskrit('य्' + firstChar) + w2;
    if ((lastChar === 'ु' || lastChar === 'ू') && isVowel) return w1 + '्' + joinSanskrit('व्' + firstChar) + w2;
    if ((lastChar === 'ृ' || lastChar === 'ॄ') && isVowel) return w1 + '्' + joinSanskrit('र्' + firstChar) + w2;

    if (lastChar === 'े' && isVowel) return w1 + joinSanskrit('य्' + firstChar) + w2; 
    if (lastChar === 'ै' && isVowel) return w1 + joinSanskrit('ाय्' + firstChar) + w2;
    if (lastChar === 'ो' && isVowel) return w1 + joinSanskrit('व्' + firstChar) + w2;
    if (lastChar === 'ौ' && isVowel) return w1 + joinSanskrit('ाव्' + firstChar) + w2;

    if (lastChar === 'म्' && !isVowel) return w1 + 'ं' + firstChar + w2;

    if (lastChar === 'श्' && firstChar === 'त') return w1 + 'ष्ट' + w2; 
    if (lastChar === 'च्' && firstChar === 'त') return w1 + 'क्त' + w2; 
    if (lastChar === 'ज्' && firstChar === 'त') return w1 + 'क्त' + w2; 

    return word1 + word2;
}

// ==================================================
// 2. डेटाबेस लोडिंग (Concurrent JSON loading)
// ==================================================
async function loadDatabase() {
    try {
        const timestamp = new Date().getTime();
        const [dhatusRes, sutrasRes, examplesRes, pratyayasRes] = await Promise.all([
            fetch(`dhatus.json?v=${timestamp}`),
            fetch(`sutras.json?v=${timestamp}`),
            fetch(`examples.json?v=${timestamp}`),
            fetch(`pratyayas.json?v=${timestamp}`)
        ]);

        if (!dhatusRes.ok || !sutrasRes.ok || !examplesRes.ok || !pratyayasRes.ok) {
            throw new Error("JSON files missing or broken.");
        }

    const dhatusData = await dhatusRes.json();
    const sutrasData = await sutrasRes.json();
    const examplesData = await examplesRes.json();
    const pratyayasData = await pratyayasRes.json();

    // expose sutras data globally for pages like sutras.html that render the lists
    try { window.sutrasData = sutrasData; } catch (e) { /* ignore */ }

        sanskritDatabase = { ...dhatusData, ...sutrasData, ...examplesData };
        pratyayaDB = pratyayasData.pratyayaDB;

        // Build lightweight search indexes so English/Hinglish keyboard queries can match the Devanagari database.
        try { indexAllForSearch(); } catch (e) { /* ignore */ }

        initializeUI();
    } catch (error) { 
        console.error(error);
        alert("डेटा लोड नहीं हो सका। कृपया JSON फ़ाइलों की जाँच करें।"); 
    }
}

function initializeUI() {
    // Setup Intelligent Autocomplete
    setupAutocomplete('upasarga', 'upaSuggestions', 'upasargas');
    setupAutocomplete('dhatu', 'dhatuSuggestions', 'dhatus');
    setupAutocomplete('pratyaya', 'pratSuggestions', 'pratyayas');

    let dropdownContainer = document.getElementById("sutraDropdown");
    // Only populate the inline dropdown if the element explicitly opts-in via data-render="dropdown".
    // This avoids injecting large content into pages that don't want the dropdown (prevents displacement).
    if (dropdownContainer && dropdownContainer.getAttribute('data-render') === 'dropdown') {
        dropdownContainer.innerHTML = "";
        const padaConfig = [
            { key: 'samjnaSutras', color: '#10b981' }, { key: 'pada_1_2', color: '#3b82f6' }, { key: 'pada_1_3', color: '#ec4899' }, { key: 'pada_1_4', color: '#eab308' },
            { key: 'pada_2_1', color: '#b91c1c' }, { key: 'pada_2_2', color: '#f97316' }, { key: 'pada_2_3', color: '#d946ef' }, { key: 'pada_2_4', color: '#06b6d4' },
            { key: 'pada_3_1', color: '#8b5cf6' }, { key: 'pada_3_2', color: '#14b8a6' }, { key: 'pada_3_3', color: '#6366f1' }, { key: 'pada_3_4', color: '#dc2626' },
            { key: 'pada_4_1', color: '#f472b6' }, { key: 'pada_4_2', color: '#9333ea' }, { key: 'pada_4_3', color: '#e11d48' }, { key: 'pada_4_4', color: '#10b981' },
            { key: 'pada_5_1', color: '#4f46e5' }, { key: 'pada_5_2', color: '#ea580c' }, { key: 'pada_5_3', color: '#14b8a6' }, { key: 'pada_5_4', color: '#0ea5e9' },
            { key: 'pada_6_1', color: '#78350f' }, { key: 'pada_6_2', color: '#475569' }, { key: 'pada_6_3', color: '#3b82f6' }, { key: 'pada_6_4', color: '#f59e0b' },
            { key: 'pada_7_1', color: '#8b5cf6' }, { key: 'pada_7_2', color: '#db2777' }, { key: 'pada_7_3', color: '#0284c7' }, { key: 'pada_7_4', color: '#84cc16' },
            { key: 'pada_8_1', color: '#dc2626' }, { key: 'pada_8_2', color: '#f97316' }, { key: 'pada_8_3', color: '#eab308' }, { key: 'pada_8_4', color: '#ec4899' }
        ];
        padaConfig.forEach(config => {
            if (sanskritDatabase[config.key]) {
                sanskritDatabase[config.key].forEach(s => {
                    dropdownContainer.insertAdjacentHTML('beforeend', `<div class="sutra-item" style="border-left: 3px solid ${config.color};"><div class="sutra-header sanskrit-text" onclick="toggleAccordion(event, this)">[${s.id}] ${s.name} <i class="fa-solid fa-chevron-down"></i></div><div class="sutra-desc sanskrit-text"><br>${s.desc}<br><br></div></div>`);
                });
            }
        });
    }
}
// window.onload = loadDatabase; // Replaced by DOMContentLoaded call for better coordination

// ==================================================
// 3. TRANSLITERATION ENGINE (Roman → Devanagari)
// ==================================================

/**
 * Convert Roman (English keyboard) Sanskrit input to Devanagari.
 * Supports common IAST/Harvard-Kyoto/ITRANS-style input.
 */
function romanToDevanagari(roman) {
    if (!roman) return "";
    // Keep original case for output quality but process case-insensitively
    let input = roman.toLowerCase().trim();

    // Extended mapping including common Sanskrit transliteration schemes
    const vowelMap = {
        'a': 'अ', 'aa': 'आ', 'ā': 'आ',
        'i': 'इ', 'ii': 'ई', 'ī': 'ई',
        'ee': 'ई',
        'u': 'उ', 'uu': 'ऊ', 'ū': 'ऊ',
        'oo': 'ऊ',
        'e': 'ए',
        'ai': 'ऐ',
        'o': 'ओ',
        'au': 'औ',
        'ṛ': 'ऋ', 'r̥': 'ऋ',
        'ṝ': 'ॠ', 'r̥̄': 'ॠ',
        'ḷ': 'ऌ', 'l̥': 'ऌ',
        'ḹ': 'ॡ', 'l̥̄': 'ॡ'
    };

    const consonantMap = {
        // Stops
        'k': 'क', 'kh': 'ख',
        'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ', 'ng': 'ङ',
        'c': 'च', 'ch': 'छ',
        'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
        'ṭ': 'ट', 'ṭh': 'ठ',
        'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
        't': 'त', 'th': 'थ',
        'd': 'द', 'dh': 'ध', 'n': 'न',
        'p': 'प', 'ph': 'फ',
        'b': 'ब', 'bh': 'भ', 'm': 'म',
        // Semivowels & sibilants
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
        'ś': 'श', 'sh': 'श', 'ṣ': 'ष', 's': 'स', 'shh': 'ष',
        'h': 'ह',
        // Clusters & special
        'kṣ': 'क्ष', 'ksh': 'क्ष', 'x': 'क्ष',
        'jñ': 'ज्ञ', 'gy': 'ज्ञ', 'jn': 'ज्ञ',
        'tr': 'त्र', 'dr': 'द्र', 'kr': 'क्र', 'kl': 'क्ल', 'gl': 'ग्ल'
    };

    const signMap = {
        'a': '',      // inherent - no sign needed
        'ā': 'ा', 'aa': 'ा',
        'i': 'ि', 'ii': 'ी', 'ee': 'ी',
        'ī': 'ी',
        'u': 'ु', 'uu': 'ू', 'oo': 'ू',
        'ū': 'ू',
        'e': 'े',
        'ai': 'ै',
        'o': 'ो',
        'au': 'ौ',
        'ṛ': 'ृ', 'r̥': 'ृ',
        'ṝ': 'ॄ',
        'ḷ': 'ॢ', 'l̥': 'ॢ',
        'ḹ': 'ॣ'
    };

    // Standalone signs (visarga, anusvara, etc.)
    const standaloneSigns = {
        'ḥ': 'ः',   // visarga
        'ṃ': 'ं',   // anusvara (M with dot below)
        'ṁ': 'ं',   // anusvara (M with dot above)
        '~': 'ं',   // tilde approximation
        '.': '।',   // danda/abbreviation
        '\'': 'ऽ',  // avagraha (apostrophe)
        '`': 'ऽ',
        '//': '॥'  // double danda
    };

    // Build combined mapping sorted by length (longest first)
    const allMappings = [];
    for (let k in vowelMap) allMappings.push({ key: k, val: vowelMap[k], type: 'vowel' });
    for (let k in consonantMap) allMappings.push({ key: k, val: consonantMap[k], type: 'consonant' });
    for (let k in standaloneSigns) allMappings.push({ key: k, val: standaloneSigns[k], type: 'sign' });
    allMappings.sort((a, b) => b.key.length - a.key.length);

    let result = "";
    let prevWasConsonant = false;
    let i = 0;

    while (i < input.length) {
        let matched = false;

        // Try to match any mapping (longest first)
        for (let m of allMappings) {
            let key = m.key;
            if (input.substr(i, key.length) === key) {
                let char = m.val;
                let type = m.type;

                if (type === 'vowel') {
                    if (prevWasConsonant) {
                        // Attach vowel sign to the previous consonant
                        let sign = signMap[key] || '';
                        if (sign) result += sign;
                        // For 'a' (inherent), sign is empty -> consonant stays as-is
                    } else {
                        // Standalone vowel - add directly
                        result += char;
                    }
                    prevWasConsonant = false;
                } else if (type === 'consonant') {
                    if (prevWasConsonant) {
                        // Consonant cluster: add virama then new consonant
                        result += '्' + char;
                    } else {
                        result += char;
                    }
                    prevWasConsonant = true;
                } else if (type === 'sign') {
                    // Standalone sign (visarga, anusvara, etc.) - just append
                    result += char;
                    prevWasConsonant = false;
                }

                i += key.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Unknown character (space, number, punctuation, etc.)
            result += input[i];
            i++;
            prevWasConsonant = false;
        }
    }

    // If string ends with a consonant, the implicit 'a' is already there (no action needed)
    // But if we want explicit halant at end for clarity, we could add it. Not needed.

    return result;
}

function hasDevanagari(text) {
    return /[\u0900-\u097F]/.test(text || "");
}

function escapeRegex(text) {
    return (text || "").replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert input text to Devanagari with Hinglish support.
 * First checks hinglishWordMap for common words, then falls back to transliteration.
 */
function toDevanagariWithHinglish(input) {
    if (!input) return "";
    
    // Trim and convert to lowercase for hinglish map lookup
    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();
    
    // Check if it's a known hinglish word
    if (hinglishWordMap[lower]) {
        return hinglishWordMap[lower];
    }
    
    // Otherwise, use transliteration
    return romanToDevanagari(trimmed);
}

function tokenizeSearchQuery(query) {
    if (!query) return [];
    try {
        return query.match(/[\p{L}\p{N}.]+/gu) || [];
    } catch (e) {
        return query.match(/[A-Za-z0-9.\u0900-\u097F]+/g) || [];
    }
}

function devanagariToRomanAscii(text) {
    if (!text) return "";

    const independentVowels = {
        'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu',
        'ऋ': 'ri', 'ॠ': 'rii', 'ऌ': 'li', 'ॡ': 'lii',
        'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au'
    };

    const consonants = {
        'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
        'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
        'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
        'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
        'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
        'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
        'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
        'ळ': 'l'
    };

    const vowelSigns = {
        'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu',
        'ृ': 'ri', 'ॄ': 'rii', 'ॢ': 'li', 'ॣ': 'lii',
        'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
    };

    const specials = {
        // Use 'n' for anusvara to better match common Hinglish typing (e.g., "sankat", "shant").
        'ं': 'n', 'ँ': 'n', 'ः': 'h', 'ऽ': '',
        '।': '.', '॥': '||'
    };

    let out = "";
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (independentVowels[ch]) { out += independentVowels[ch]; continue; }
        if (specials[ch] !== undefined) { out += specials[ch]; continue; }

        if (consonants[ch]) {
            out += consonants[ch];

            const next = chars[i + 1];
            if (next === '्') { i += 1; continue; }
            if (next && vowelSigns[next]) { out += vowelSigns[next]; i += 1; continue; }

            out += 'a';
            continue;
        }

        if (vowelSigns[ch]) { out += vowelSigns[ch]; continue; }

        out += ch;
    }
    return out;
}

function normalizeRomanForSearch(text) {
    if (!text) return "";
    let s = text.toLowerCase();

    // Unicode diacritics → ASCII-ish
    s = s
        .replace(/ā/g, 'aa').replace(/ī/g, 'ii').replace(/ū/g, 'uu')
        .replace(/ṛ|r̥/g, 'ri').replace(/ṝ|r̥̄/g, 'rii')
        .replace(/ḷ|l̥/g, 'li').replace(/ḹ|l̥̄/g, 'lii')
        .replace(/ṅ/g, 'ng').replace(/ñ/g, 'ny')
        .replace(/ṭ/g, 't').replace(/ḍ/g, 'd').replace(/ṇ/g, 'n')
        .replace(/[śṣ]/g, 'sh')
        .replace(/[ṃṁ]/g, 'n')
        .replace(/ḥ/g, 'h');

    // Common casual spellings
    s = s.replace(/w/g, 'v');
    s = s.replace(/ph/g, 'f');
    s = s.replace(/x/g, 'ksh');

    // Collapse long vowels so "raama" matches "ram"
    s = s.replace(/aa/g, 'a').replace(/ii/g, 'i').replace(/uu/g, 'u');

    // Keep only alphanumerics (and dots for sutra-like tokens)
    s = s.replace(/[^a-z0-9.]+/g, '');
    return s;
}

function devanagariNasalClustersToAnusvara(text) {
    if (!text) return "";
    // Convert nasal conjuncts like "न्त/ङ्क/म्प" to anusvara forms like "ंत/ंक/ंप"
    // Helps Hinglish users who type "shant" expecting "शांत" etc.
    return text.replace(/[ङञणनम]\u094d(?=[क-ह])/g, 'ं');
}

function generateRomanVariantsForSearch(tokenLower) {
    if (!tokenLower) return [];
    const base = tokenLower.toLowerCase().trim();
    if (!base) return [];

    const variants = [base];

    // If user types Hinglish without long vowels (aa/ii/uu), try a few likely long-vowel variants.
    // We keep this conservative: at most 3 extra variants, only on the first vowel after the initial consonant cluster.
    if (/^[^aeiou]/.test(base)) {
        const vowelExpansions = [
            { v: 'a', vv: 'aa' },
            { v: 'i', vv: 'ii' },
            { v: 'u', vv: 'uu' }
        ];
        for (const { v, vv } of vowelExpansions) {
            const re = new RegExp(`(^[^aeiou]*?)${v}`);
            if (re.test(base)) {
                const expanded = base.replace(re, `$1${vv}`);
                if (expanded && expanded !== base) variants.push(expanded);
            }
        }
    }

    return [...new Set(variants)];
}

function indexExamplesForSearch() {
    if (!sanskritDatabase.examples || !Array.isArray(sanskritDatabase.examples)) return;
    sanskritDatabase.examples.forEach(item => {
        if (!item || typeof item.ex !== 'string') return;
        if (item._exRoman && item._exRomanNorm) return;
        const roman = devanagariToRomanAscii(item.ex);
        item._exRoman = roman;
        item._exRomanNorm = normalizeRomanForSearch(roman);
    });
}

function indexSutrasForSearch() {
    if (!sanskritDatabase) return;
    if (sanskritDatabase._sutraSearchIndexed) return;

    const sutraArrayKeys = [
        'samjnaSutras', 'pada_1_2', 'pada_1_3', 'pada_1_4', 'pada_2_1', 'pada_2_2', 'pada_2_3', 'pada_2_4',
        'pada_3_1', 'pada_3_2', 'pada_3_3', 'pada_3_4', 'pada_4_1', 'pada_4_2', 'pada_4_3', 'pada_4_4',
        'pada_5_1', 'pada_5_2', 'pada_5_3', 'pada_5_4', 'pada_6_1', 'pada_6_2', 'pada_6_3', 'pada_6_4',
        'pada_7_1', 'pada_7_2', 'pada_7_3', 'pada_7_4', 'pada_8_1', 'pada_8_2', 'pada_8_3', 'pada_8_4'
    ];

    const sutraById = Object.create(null);
    const sutraList = [];

    // Top-level notes (no id) also count as searchable content
    if (Array.isArray(sanskritDatabase.sutras)) {
        sanskritDatabase.sutras.forEach(s => {
            if (!s) return;
            if (!s._searchRomanNorm) {
                const dev = `${s.name || ''} ${s.desc || ''}`.trim();
                s._searchDev = dev;
                s._searchRomanNorm = normalizeRomanForSearch(devanagariToRomanAscii(dev));
            }
            sutraList.push(s);
        });
    }

    sutraArrayKeys.forEach(key => {
        const arr = sanskritDatabase[key];
        if (!Array.isArray(arr)) return;
        arr.forEach(s => {
            if (!s) return;
            if (s.id) sutraById[s.id] = s;
            if (!s._searchRomanNorm) {
                const dev = `${s.id ? `[${s.id}] ` : ''}${s.name || ''} ${s.desc || ''}`.trim();
                s._searchDev = dev;
                s._searchRomanNorm = normalizeRomanForSearch(devanagariToRomanAscii(dev));
            }
            sutraList.push(s);
        });
    });

    sanskritDatabase._sutraById = sutraById;
    sanskritDatabase._sutraList = sutraList;
    sanskritDatabase._sutraSearchIndexed = true;
}

function indexDhatusForSearch() {
    if (!sanskritDatabase) return;
    if (sanskritDatabase._dhatuSearchIndexed) return;
    const list = [];
    if (sanskritDatabase.dhatus) {
        for (const [key, d] of Object.entries(sanskritDatabase.dhatus)) {
            if (!d) continue;
            if (!d._searchRomanNorm) {
                const dev = `${key} ${d.label || ''} ${d.clean || ''}`.trim();
                d._searchDev = dev;
                d._searchRomanNorm = normalizeRomanForSearch(devanagariToRomanAscii(dev));
            }
            list.push({ key, data: d });
        }
    }
    sanskritDatabase._dhatuList = list;
    sanskritDatabase._dhatuSearchIndexed = true;
}

function indexPratyayasForSearch() {
    if (!sanskritDatabase) return;
    if (sanskritDatabase._pratyayaSearchIndexed) return;
    const list = [];
    if (pratyayaDB) {
        for (const [key, p] of Object.entries(pratyayaDB)) {
            if (!p) continue;
            if (!p._searchRomanNorm) {
                const dev = `${key} ${p.real || ''} ${p.type || ''} ${p.lopa || ''}`.trim();
                p._searchDev = dev;
                p._searchRomanNorm = normalizeRomanForSearch(devanagariToRomanAscii(dev));
            }
            list.push({ key, data: p });
        }
    }
    sanskritDatabase._pratyayaList = list;
    sanskritDatabase._pratyayaSearchIndexed = true;
}

function indexUpasargasForSearch() {
    if (!sanskritDatabase) return;
    if (sanskritDatabase._upasargaSearchIndexed) return;
    const list = [];
    if (Array.isArray(sanskritDatabase.upasargas)) {
        sanskritDatabase.upasargas.forEach(u => {
            if (!u) return;
            if (!u._searchRomanNorm) {
                const dev = `${u.id || ''} ${u.label || ''}`.trim();
                u._searchDev = dev;
                u._searchRomanNorm = normalizeRomanForSearch(devanagariToRomanAscii(dev));
            }
            list.push(u);
        });
    }
    sanskritDatabase._upasargaList = list;
    sanskritDatabase._upasargaSearchIndexed = true;
}

function indexAllForSearch() {
    indexExamplesForSearch();
    indexSutrasForSearch();
    indexDhatusForSearch();
    indexPratyayasForSearch();
    indexUpasargasForSearch();
}

// ==================================================
// 4. ENHANCED SEARCH with Transliteration
// ==================================================
// NOTE: `performSearch()` is defined near the end of this file (after shared header/footer load),
// so it can use the latest helpers and Hinglish/English-keyboard matching.

// ==================================================
// 3. DYNAMIC PANINIAN ENGINE
// ==================================================
function generateKridanta() {
    let upa = toDevanagariWithHinglish(document.getElementById("upasarga").value.trim());
    let dhatuStr = toDevanagariWithHinglish(document.getElementById("dhatu").value.trim());
    let rawPratStr = toDevanagariWithHinglish(document.getElementById("pratyaya").value.trim().replace(/\s+/g, ''));

    if(!dhatuStr || !rawPratStr) { alert("कृपया कम से कम एक धातु और प्रत्यय टाइप करें!"); return; }

    let steps = [];
    let baseForm = "";
    let finalForm = "";

    steps.push(`<b>शुरुआत:</b> ${upa ? upa + ' + ' : ''}${dhatuStr} + ${rawPratStr}`);

    let pratStr = rawPratStr;
    if (pratStr === "क्त्वा" && upa !== "") {
        steps.push(`उपसर्ग होने के कारण 'समासेऽनञ्पूर्वे क्त्वो ल्यप्' (7.1.37) से 'क्त्वा' को 'ल्यप्' आदेश हुआ।`);
        pratStr = "ल्यप्";
    }

    let dhatuData = sanskritDatabase.dhatus ? sanskritDatabase.dhatus[dhatuStr] : null;
    let activeDhatu = dhatuStr;

    if (!dhatuData) {
        steps.push(`<i>(नोट: धातु कस्टम है, सिस्टम सामान्य उपधा नियमों से काम कर रहा है)</i>`);
        dhatuData = { isSet: true, guna: autoGuna(dhatuStr), vriddhi: autoVriddhi(dhatuStr), clean: dhatuStr };
    } else {
        activeDhatu = dhatuData.clean;
        if(dhatuData.anubandha && dhatuData.anubandha !== "none") {
            steps.push(`<b>इत्-संज्ञा व लोप:</b> 'आदिर्ञिटुडवः/हलन्त्यम्' आदि से <b>${dhatuData.anubandha}</b> का लोप हुआ। शेष धातु: <b>${activeDhatu}</b>`);
        }
    }

    let pratData = pratyayaDB[pratStr];
    if (!pratData) {
        steps.push(`<i>(नोट: प्रत्यय डेटाबेस में नहीं है, सिस्टम सामान्य रूप से जोड़ रहा है)</i>`);
        pratData = { real: pratStr, type: "akit", lopa: "अज्ञात" };
    } else {
        steps.push(`<b>इत्-लोप:</b> ${pratData.lopa}। शेष बचा: <b>${pratData.real}</b>`);
    }

    let activePratyaya = pratData.real;

    if (pratData.type === "kit" || pratData.type === "ngit" || pratData.type === "git") {
        steps.push(`<b>गुण/वृद्धि निषेध:</b> प्रत्यय कित्/ङित्/गित् है, अतः 'क्ङिति च (1.1.5)' से गुण/वृद्धि निषिद्ध।`);
    } else if (pratData.type === "nnit" || pratData.type === "nit") {
        activeDhatu = dhatuData.vriddhi;
        steps.push(`<b>वृद्धि:</b> प्रत्यय ञित्/णित् होने से 'अचो ञ्णिति/अत उपधायाः' से धातु को वृद्धि -> <b>${activeDhatu}</b>`);
    } else {
        activeDhatu = dhatuData.guna;
        steps.push(`<b>गुण:</b> 'सार्वधातुकार्धधातुकयोः' से धातु को गुण हुआ -> <b>${activeDhatu}</b>`);
    }

    if (pratData.kutva || pratData.type === "ghit") {
        if (activeDhatu.endsWith('च्') || activeDhatu.endsWith('ज्')) {
            activeDhatu = activeDhatu.replace(/च्$/, 'क्').replace(/ज्$/, 'ग्');
            steps.push(`<b>कुत्व:</b> 'चजोः कु घिण्ण्यतोः' से 'च्/ज्' के स्थान पर 'क्/ग्' हुआ -> <b>${activeDhatu}</b>`);
        }
    }

    if (pratData.type === "dit") {
        activeDhatu = activeDhatu.replace(/[अाइईउऊऋएऐओऔ][क-ह]्?$/, ''); 
        steps.push(`<b>टि-लोप:</b> डित् प्रत्यय परे होने से 'टेः' (6.4.143) से अन्त्य भाग का लोप -> <b>${activeDhatu}</b>`);
    }

    if (pratStr === "ल्यप्") {
        let shortVowels = ["अ", "इ", "उ", "ऋ", "ि", "ु", "ृ"]; 
        if (shortVowels.includes(activeDhatu.slice(-1))) {
            activePratyaya = "त्य";
            steps.push(`<b>तुक् आगम:</b> धातु ह्रस्वान्त है, अतः 'ह्रस्वस्य पिति कृति तुक्' से 'त्' जुड़ा।`);
        }
    }

    if ((activeDhatu.endsWith("म्") || activeDhatu.endsWith("न्")) && (pratData.type === "kit" || pratData.type === "ngit")) {
        activeDhatu = activeDhatu.slice(0, -1);
        steps.push(`<b>अनुनासिक लोप:</b> 'अनुदात्तोपदेश...' (6.4.37) से म्/न् का लोप हुआ -> <b>${activeDhatu}</b>`);
    }

    let isValadi = !['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ', 'य'].includes(activePratyaya.charAt(0));
    let itAgama = false;
    if (dhatuData.isSet && isValadi && pratStr !== "ल्यप्") {
        itAgama = true;
        steps.push(`<b>इट्-आगम:</b> धातु 'सेट्' है और प्रत्यय वलादि है, अतः 'आर्धधातुकस्येड् वलादेः' (7.2.35) से 'इ' का आगम हुआ।`);
    }

    if (itAgama) baseForm = applySandhi(activeDhatu, "इ" + activePratyaya);
    else baseForm = applySandhi(activeDhatu, activePratyaya);

    if (baseForm.includes("म्त") || baseForm.includes("म्त्व")) {
        baseForm = baseForm.replace("म्त", "न्त").replace("म्त्व", "न्त्व");
        steps.push(`<b>परसवर्ण:</b> 'अनुस्वारस्य ययि परसवर्णः' से 'म्' को 'न्' हुआ।`);
    }

    // अंतिम वर्ण संयोजन (Join)
    let joinedForm = joinSanskrit(baseForm);
    if(baseForm !== joinedForm) {
        steps.push(`<b>वर्ण संयोजन:</b> स्वर और व्यंजन मिलकर पूर्ण पद बने -> <b>${joinedForm}</b>`);
        baseForm = joinedForm;
    }

    if (pratData.gender === "m") {
        baseForm = baseForm + "ः";
        steps.push(`<b>सुप्-विभक्ति:</b> पुँल्लिङ्ग प्रथमा एकवचन 'सु' का विसर्ग (ः) हुआ -> <b>${baseForm}</b>`);
    } else if (pratData.gender === "n") {
        baseForm = baseForm + "म्";
        steps.push(`<b>सुप्-विभक्ति:</b> नपुंसकलिङ्ग में 'सु' को 'अम्' हुआ -> <b>${baseForm}</b>`);
    } else if (pratData.gender === "f") {
        baseForm = baseForm + "ः"; 
        steps.push(`<b>सुप्-विभक्ति:</b> स्त्रीलिङ्ग प्रथमा एकवचन 'सु' का विसर्ग (ः) हुआ -> <b>${baseForm}</b>`);
    }

    if (upa !== "") {
        let uBase = upa === "आङ्" ? "आ" : upa;
        steps.push(`<b>उपसर्ग योग:</b> '${uBase}' का '${baseForm}' के साथ योग।`);
        finalForm = applySandhi(uBase, baseForm);
        finalForm = joinSanskrit(finalForm);
        if(finalForm !== uBase + baseForm) steps.push(`<b>सन्धि:</b> पाणिनीय सन्धि नियमों से शब्द बना -> <b>${finalForm}</b>`);
    } else {
        finalForm = baseForm;
    }

    steps.push(`<b>सिद्ध रूप:</b> <span style="color:#ec4899; font-size:1.2em;">${finalForm}</span>`);

    document.getElementById("finalOutput").innerText = finalForm;
    let stepsHtml = steps.map((s, index) => `<li class="step-item"><div style="background:#3b82f6; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-weight:bold; font-size:14px;">${index+1}</div> <div>${s}</div></li>`).join("");
    document.getElementById("prakriyaSteps").innerHTML = stepsHtml;

    document.getElementById("resultSection").classList.add("active");
    document.getElementById("prakriyaBox").classList.remove("show");
    setTimeout(() => { document.getElementById("resultSection").scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}

// UI Interaction Helpers
function togglePrakriya() { document.getElementById("prakriyaBox").classList.toggle("show"); }
function toggleMobileMenu() {
    const nav = document.getElementById("nav-menu");
    const icon = document.getElementById("menu-icon");
    nav.classList.toggle("active");
    if(nav.classList.contains("active")) { icon.classList.replace("fa-bars", "fa-xmark"); document.body.style.overflow = "hidden"; } 
    else { icon.classList.replace("fa-xmark", "fa-bars"); document.body.style.overflow = "auto"; }
}
function closeMobileMenu() { if(window.innerWidth <= 768) toggleMobileMenu(); }
function toggleSutraDropdown(event) { event.stopPropagation(); document.getElementById("sutraDropdown").classList.toggle("show"); }
function toggleAccordion(event, element) { event.stopPropagation(); element.parentElement.classList.toggle("active"); }
window.onclick = function(event) { if (!event.target.closest('.nav-dropdown')) document.querySelectorAll(".dropdown-content.show").forEach(el => el.classList.remove('show')); }
// mini menu toggle and outside click close
function toggleMiniMenu(event) {
    event.stopPropagation();
    const btn = document.getElementById('miniMenuBtn');
    const dd = document.getElementById('miniMenuDropdown');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    dd.classList.toggle('show');
    dd.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}
// close mini menu on outside click
document.addEventListener('click', function(e) {
    const dd = document.getElementById('miniMenuDropdown');
    const btn = document.getElementById('miniMenuBtn');
    if (!dd || !btn) return;
    if (!e.target.closest('.mini-menu')) {
        dd.classList.remove('show'); btn.setAttribute('aria-expanded', 'false'); dd.setAttribute('aria-hidden', 'true');
    }
});
function toggleDark() {
    const willDark = !document.body.classList.contains('dark');
    if (willDark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    // update theme icon if present (some pages have a different id)
    const icon = document.getElementById("theme-icon") || document.getElementById("theme-icon-mini");
    if (icon && icon.classList) {
        const toRemove = document.body.classList.contains("dark") ? "fa-moon" : "fa-sun";
        const toAdd = document.body.classList.contains("dark") ? "fa-sun" : "fa-moon";
        icon.classList.replace(toRemove, toAdd);
    }
    closeMobileMenu();
    try { localStorage.setItem('siteDark', document.body.classList.contains('dark') ? '1' : '0'); } catch(e){}
}

// Persist theme selection and helper to apply saved theme on load
function applySavedTheme() {
    const saved = localStorage.getItem('siteDark');
    const shouldDark = saved === '1';
    if (shouldDark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    // sync icon(s)
    const icons = [document.getElementById('theme-icon'), document.getElementById('theme-icon-mini')];
    icons.forEach(icon => {
        if (!icon || !icon.classList) return;
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
        }
    });
}



// =========================================
// 5. SUGGESTION DROPDOWN FOR BUILDER PAGE
// =========================================

// Track active suggestion index for keyboard navigation
let activeSuggestionIndex = -1;
let currentSuggestionType = '';
let currentSuggestions = [];

function setupSuggestionListeners() {
    const inputs = [
        { id: 'upasarga', type: 'upasarga', dropdownId: 'upaSuggestions' },
        { id: 'dhatu', type: 'dhatu', dropdownId: 'dhatuSuggestions' },
        { id: 'pratyaya', type: 'pratyaya', dropdownId: 'pratSuggestions' }
    ];

    inputs.forEach(({ id, type, dropdownId }) => {
        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener('input', () => handleInput(input, type, dropdownId));
        input.addEventListener('focus', () => handleInput(input, type, dropdownId));
        input.addEventListener('keydown', (e) => handleKeydown(e, type, dropdownId));
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-group')) {
            closeAllSuggestions();
        }
    });
}

function handleInput(input, type, dropdownId) {
    const query = input.value.trim();
    const dropdown = document.getElementById(dropdownId);
    
    if (!dropdown) return;

    if (query.length === 0) {
        dropdown.classList.remove('show');
        return;
    }

    // Ensure database is loaded
    if (!sanskritDatabase) {
        dropdown.innerHTML = '<div class="no-suggestions">डेटाबेस लोड हो रहा है...</div>';
        dropdown.classList.add('show');
        return;
    }

    const suggestions = getSuggestions(query, type);
    currentSuggestions = suggestions;
    currentSuggestionType = type;
    activeSuggestionIndex = -1;

    renderSuggestions(suggestions, dropdown, dropdownId);
}

function getSuggestions(query, type) {
    const lowerQuery = query.toLowerCase();
    const isDevanagari = hasDevanagari(query);
    const maxResults = 10;
    let results = [];

    if (type === 'upasarga') {
        const upasargas = sanskritDatabase.upasargas || [];
        results = upasargas.filter(u => {
            if (!u || !u.id) return false;
            const label = (u.label || '').toLowerCase();
            const id = (u.id || '').toLowerCase();
            return label.includes(lowerQuery) || id.includes(lowerQuery);
        }).slice(0, maxResults);
    } 
    else if (type === 'dhatu') {
        const dhatus = sanskritDatabase.dhatus || {};
        results = Object.entries(dhatus)
            .filter(([key, d]) => {
                if (!d) return false;
                const label = (d.label || '').toLowerCase();
                const clean = (d.clean || '').toLowerCase();
                return key.toLowerCase().includes(lowerQuery) || 
                       label.toLowerCase().includes(lowerQuery) ||
                       clean.includes(lowerQuery);
            })
            .slice(0, maxResults)
            .map(([key, d]) => ({ ...d, key, label: d.label }));
    }
    else if (type === 'pratyaya') {
        const pratyayas = pratyayaDB || {};
        results = Object.entries(pratyayas)
            .filter(([key, p]) => {
                if (!p) return false;
                return key.toLowerCase().includes(lowerQuery);
            })
            .slice(0, maxResults)
            .map(([key, p]) => ({ ...p, key }));
    }

    return results;
}

function renderSuggestions(suggestions, dropdown, dropdownId) {
    if (!suggestions || suggestions.length === 0) {
        dropdown.innerHTML = '<div class="no-suggestions">कोई परिणाम नहीं मिला</div>';
        dropdown.classList.add('show');
        return;
    }

    let html = '';
    suggestions.forEach((item, index) => {
        let text = '';
        let label = '';
        
        if (item.key && item.label) {
            // Dhatu format
            text = item.key;
            label = item.label;
        } else if (item.id) {
            // Upasarga format
            text = item.id;
            label = item.label || '';
        } else if (item.key) {
            // Pratyaya format
            text = item.key;
            label = `type: ${item.type || ''} ${item.real ? '| real: ' + item.real : ''}`.trim();
        }

        html += `
            <div class="suggestion-item" data-value="${text}" data-index="${index}" onclick="selectSuggestion('${dropdownId}', '${text.replace(/'/g, "\\'")}')">
                <div>
                    <div class="suggestion-text">${text}</div>
                    <div class="suggestion-label">${label}</div>
                </div>
            </div>
        `;
    });

    dropdown.innerHTML = html;
    dropdown.classList.add('show');
}

function selectSuggestion(dropdownId, value) {
    const inputMap = {
        'upaSuggestions': 'upasarga',
        'dhatuSuggestions': 'dhatu',
        'pratSuggestions': 'pratyaya'
    };

    const inputId = inputMap[dropdownId];
    if (!inputId) return;

    const input = document.getElementById(inputId);
    if (input) {
        input.value = value;
        input.focus();
    }

    closeAllSuggestions();
}

function handleKeydown(e, type, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown || !dropdown.classList.contains('show')) return;

    const items = dropdown.querySelectorAll('.suggestion-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeSuggestionIndex = Math.min(activeSuggestionIndex + 1, items.length - 1);
        updateActiveItem(items);
    } 
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, 0);
        updateActiveItem(items);
    }
    else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestionIndex >= 0 && activeSuggestionIndex < items.length) {
            const selectedItem = items[activeSuggestionIndex];
            const value = selectedItem.getAttribute('data-value');
            selectSuggestion(dropdownId, value);
        }
    }
    else if (e.key === 'Escape') {
        closeAllSuggestions();
    }
}

function updateActiveItem(items) {
    items.forEach((item, index) => {
        item.classList.toggle('active', index === activeSuggestionIndex);
    });
}

function closeAllSuggestions() {
    document.querySelectorAll('.suggestion-dropdown').forEach(d => {
        d.classList.remove('show');
    });
    activeSuggestionIndex = -1;
}

// Initialize suggestion system
function initSuggestionSystem() {
    // Check if we're on the builder page by looking for the input elements
    if (document.getElementById('upasarga') || document.getElementById('dhatu') || document.getElementById('pratyaya')) {
        // DOM is already loaded or loading - set up listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupSuggestionListeners);
        } else {
            // DOM is already loaded
            setupSuggestionListeners();
        }
    }
}

initSuggestionSystem();


// Comprehensive translations for all pages
const TRANSLATIONS = {
    en: {
        // Brand & basic nav
        brand: 'Sanskrit',
        home: 'Home',
        search_examples: 'Search Examples',
        builder: 'Builder',
        sutra: 'Sutras',
        dark_mode: 'Dark Mode',
        
        // Builder page labels
        label_upa: 'Upasarga',
        label_dhatu: 'Dhatu (Root)',
        label_prat: 'Pratyaya',
        placeholder_upa: 'Select or type...',
        placeholder_dhatu: 'e.g. kṛ, paṭh, likh...',
        placeholder_prat: 'e.g. tavya, ktva...',
        no_upasarga: 'No Upasarga',
        select_dhatu: 'Select Dhatu...',
        select_pratyaya: 'Select Pratyaya...',
        
        // Buttons
        generate_word: 'Generate Word!',
        dummy1: 'Dummy Item 1',
        dummy2: 'Dummy Item 2',
        dummy3: 'Dummy Item 3',
        
        // Hero text
        hero_title: 'Word Formation Process!',
        hero_subtitle: 'Pure derivation using Ashtadhyayi rules (1.1.1 - 1.1.75)!',
        
        // Homepage specific
        hero_tagline: '|| Vande Sanskritam ||',
        hero_search_placeholder: 'Search Shikshapatri...',
        hero_search_subtext: 'Search by dhatu, pratyaya or sutra no. (e.g. 1.1.1)',
        section_granthas: '|| Granthas ||',
        book_examples: '|| Examples ||',
        book_kridanta: '|| Kridanta ||',
        book_tinnanta: '|| Tinnanta ||',
        book_taddhitanta: '|| Taddhitanta ||',
        book_subanta: '|| Subanta ||',
        book_sutras: '|| Sutras ||',
        book_dhatus: '|| Dhatus ||',
        book_shabda: '|| Shabda Rupa ||',
        book_dhatu_rupa: '|| Dhatu Rupa ||',
        book_more: '|| More ||',
        book_about: 'About Us',

        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'Dummy Item 1',
        mini_dummy2: 'Dummy Item 2',
        mini_dummy3: 'Dummy Item 3',
        
        // Result section
        result_hint: 'How was this formed? (Tap to see process)',
        
        // Prakriya (steps)
        prakriya_title: 'Paninian Derivation Process:',
        
        // Search modal
        search_title: 'Search Examples',
        search_placeholder: 'Search by dhatu, pratyaya, rule no. or type in Roman (e.g. bhagah, gacchati)',
        search_input_placeholder: 'Search...',
        search_no_results: 'No results found.',
        search_loading: 'Database loading...',
        
        // Sutras page
        sutras_title: 'Sutras',
        sutras_heading: 'Sutras',
        sutras_intro: 'Select a sutra group to view the sutras. This page loads sutras from the site\'s data and is translated based on the header language buttons.',
        sutras_error: 'Could not load sutras.',

        // Footer
        footer_title: 'Paninian Grammar Engine v2.0',
        footer_desc: 'This engine creates derived words based on Ashtadhyayi sutras.',
        footer_copyright: '© 2026 Created by Hotyoga',
        
        // Sutra dropdown
        sutra_samjna: 'Lakaras',
        sutra_pada1_2: '1.2 - Samjna Sutras',
        sutra_pada1_3: '1.3 - Miscellaneous',
        sutra_pada1_4: '1.4 - Git',
        sutra_pada2_1: '2.1 - Atmanepada',
        sutra_pada2_2: '2.2 - Parasmaipada',
        sutra_pada2_3: '2.3 - Ardhadhatuka',
        sutra_pada2_4: '2.4 - Sarvadhatuka',
        sutra_pada3_1: '3.1 - Krt',
        sutra_pada3_2: '3.2 - Krt',
        sutra_pada3_3: '3.3 - Krt',
        sutra_pada3_4: '3.4 - Krt',
        sutra_pada4_1: '4.1 - Krt',
        sutra_pada4_2: '4.2 - Krt',
        sutra_pada4_3: '4.3 - Krt',
        sutra_pada4_4: '4.4 - Krt',
        sutra_pada5_1: '5.1 - Krt',
        sutra_pada5_2: '5.2 - Krt',
        sutra_pada5_3: '5.3 - Krt',
        sutra_pada5_4: '5.4 - Krt',
        sutra_pada6_1: '6.1 - Krt',
        sutra_pada6_2: '6.2 - Krt',
        sutra_pada6_3: '6.3 - Krt',
        sutra_pada6_4: '6.4 - Krt',
        sutra_pada7_1: '7.1 - Krt',
        sutra_pada7_2: '7.2 - Krt',
        sutra_pada7_3: '7.3 - Krt',
        sutra_pada7_4: '7.4 - Krt',
        sutra_pada8_1: '8.1 - Krt',
        sutra_pada8_2: '8.2 - Krt',
        sutra_pada8_3: '8.3 - Krt',
        sutra_pada8_4: '8.4 - Krt',
        
        // Engine messages
        msg_select_dhatu_prat: 'Please enter at least one dhatu and pratyaya!',
        msg_database_missing: 'Data could not be loaded. Please check JSON files.',
        msg_custom_dhatu: '(Note: Custom dhatu, system working with general rules)',
        msg_it_agama: '(Note: Dhatu \'set\' is and pratyaya is valadi, \'it\' agama by 7.2.35)',
        
        // Generated word labels
        word_final: 'Final Form:',
        word_siddha: 'Siddha Form:',

        // About Page
        about: 'About Us',
        about_hero_title: '॥ About Us ॥',
        about_hero_subtext: 'Preserving the ancient wisdom of Sanskrit through modern technology and interactive learning.',
        our_mission: 'Our Mission',
        mission_desc: 'To make the complex rules of Ashtadhyayi accessible to everyone, bridging the gap between ancient linguistic science and modern computational power.',
        our_vision: 'Our Vision',
        vision_desc: 'Creating a digital ecosystem where Sanskrit is not just a language of the past, but a living, breathing medium of expression for the future.',
        our_values: 'Core Values',
        values_desc: 'Authenticity in representation, simplicity in interface, and excellence in linguistic precision are the pillars of SansGra.',
        vision_quote: 'भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती।<br>तस्यां हि काव्यं मधुरं तस्मादपि सुभाषितम्॥',
        the_creators: 'The Creators',
        team_subtext: 'Dedicated scholars and developers working to bring Sanskrit to your fingertips.'
    },
    hi: {
        // Brand & basic nav
        brand: 'संस्कृत',
        home: 'होम',
        search_examples: 'उदाहरण खोजें',
        builder: 'शब्द निर्माण',
        sutra: 'व्याकरण सूत्र',
        dark_mode: 'डार्क मोड',
        
        // Builder page labels
        label_upa: 'उपसर्ग',
        label_dhatu: 'धातु (मूल)',
        label_prat: 'प्रत्यय',
        placeholder_upa: 'चुनें या टाइप करें...',
        placeholder_dhatu: 'उदा. कृ, पठ्, लिख्...',
        placeholder_prat: 'उदा. तव्यत्, क्त्वा...',
        no_upasarga: 'कोई उपसर्ग नहीं',
        select_dhatu: 'धातु चुनें...',
        select_pratyaya: 'प्रत्यय चुनें...',
        
        // Buttons
        generate_word: 'शब्द बनाओ!',
        dummy1: 'डमी आइटम 1',
        dummy2: 'डमी आइटम 2',
        dummy3: 'डमी आइटम 3',
        
        // Hero text
        hero_title: 'शब्द निर्माण की प्रक्रिया!',
        hero_subtitle: 'अष्टाध्यायी के नियमों (१.१.१ - १.१.७५) के साथ शुद्ध रूप सिद्धि!',
        
        // Homepage specific
        hero_tagline: '॥ वन्दे संस्कृतम् ॥',
        hero_search_placeholder: 'शिक्षापत्री खोजें...',
        hero_search_subtext: 'धातु, प्रत्यय या सूत्र संख्या से खोजें (उदा: 1.1.1)',
        section_granthas: '॥ ग्रन्थाः ॥',
        book_examples: '॥ उदाहरणम् ॥',
        book_kridanta: '॥ कृदन्तम् ॥',
        book_tinnanta: '॥ तिङन्तम् ॥',
        book_taddhitanta: '॥ तद्धितान्तम् ॥',
        book_subanta: '॥ सुबन्तम् ॥',
        book_sutras: '॥ सूत्राणि ॥',
        book_dhatus: '॥ धातवः ॥',
        book_shabda: '॥ शब्दरूपाणि ॥',
        book_dhatu_rupa: '॥ धातुरूपाणि ॥',
        book_more: '॥ अधिकम् ॥',
        book_about: '॥ अस्माकं विषयः ॥',

        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'डमी आइटम 1',
        mini_dummy2: 'डमी आइटम 2',
        mini_dummy3: 'डमी आइटम 3',
        
        // Result section
        result_hint: 'यह कैसे बना? (प्रक्रिया देखने के लिए टैप करें)',
        
        // Prakriya (steps)
        prakriya_title: 'पाणिनीय सिद्धि प्रक्रिया:',
        
        // Search modal
        search_title: 'उदाहरण खोजें',
        search_placeholder: 'धातु, प्रत्यय या सूत्र संख्या से खोजें (उदा: 1.1.1)',
        search_input_placeholder: 'खोजें...',
        search_no_results: 'कोई परिणाम नहीं मिला।',
        search_loading: 'डेटाबेस लोड हो रहा है...',
        
        // Sutras page
        sutras_title: 'व्याकरण सूत्र',
        sutras_heading: 'व्याकरण सूत्र',
        sutras_intro: 'सूत्रों को देखने के लिए एक समूह चुनें। यह पृष्ठ डेटा से सूत्र लोड करता है और भाषा के आधार पर अनुवादित होता है।',
        sutras_error: 'सूत्र लोड नहीं हो सके।',

        // Footer
        footer_title: 'पाणिनीय व्याकरण यन्त्र v2.0',
        footer_desc: 'यह यन्त्र अष्टाध्यायी के सूत्रों के आधार पर कृदन्त शब्दों की रचना करता है।',
        footer_copyright: '© 2026 Hotyoga द्वारा निर्मित',
        
        // Sutra dropdown
        sutra_samjna: 'संज्ञा सूत्र',
        sutra_pada1_2: '१.२ - संज्ञा सूत्र',
        sutra_pada1_3: '१.३ - विविध सूत्र',
        sutra_pada1_4: '१.४ - गित्',
        sutra_pada2_1: '२.१ - आत्मनेपद',
        sutra_pada2_2: '२.२ - परस्मैपद',
        sutra_pada2_3: '२.३ - अर्धधातुक',
        sutra_pada2_4: '२.४ - सर्वधातुक',
        sutra_pada3_1: '३.१ - कृत्',
        sutra_pada3_2: '३.२ - कृत्',
        sutra_pada3_3: '३.३ - कृत्',
        sutra_pada3_4: '३.४ - कृत्',
        sutra_pada4_1: '४.१ - कृत्',
        sutra_pada4_2: '४.२ - कृत्',
        sutra_pada4_3: '४.३ - कृत्',
        sutra_pada4_4: '४.४ - कृत्',
        sutra_pada5_1: '५.१ - कृत्',
        sutra_pada5_2: '५.२ - कृत्',
        sutra_pada5_3: '५.३ - कृत्',
        sutra_pada5_4: '५.४ - कृत्',
        sutra_pada6_1: '६.१ - कृत्',
        sutra_pada6_2: '६.२ - कृत्',
        sutra_pada6_3: '६.३ - कृत्',
        sutra_pada6_4: '६.४ - कृत्',
        sutra_pada7_1: '७.१ - कृत्',
        sutra_pada7_2: '७.२ - कृत्',
        sutra_pada7_3: '७.३ - कृत्',
        sutra_pada7_4: '७.४ - कृत्',
        sutra_pada8_1: '८.१ - कृत्',
        sutra_pada8_2: '८.२ - कृत्',
        sutra_pada8_3: '८.३ - कृत्',
        sutra_pada8_4: '८.४ - कृत्',
        
        // Engine messages
        msg_select_dhatu_prat: 'कृपया कम से कम एक धातु और प्रत्यय टाइप करें!',
        msg_database_missing: 'डेटा लोड नहीं हो सका। कृपया JSON फ़ाइलों की जाँच करें।',
        msg_custom_dhatu: '(नोट: धातु कस्टम है, सिस्टम सामान्य उपधा नियमों से काम कर रहा है)',
        msg_it_agama: '(इट्-आगम: धातु \'सेट्\' है और प्रत्यय वलादि है, \'आर्धधातुकस्येड् वलादेः\' से \'इ\' का आगम हुआ।)',
        
        // Generated word labels
        word_final: 'अंतिम रूप:',
        word_siddha: 'सिद्ध रूप:',

        // About Page
        about: 'हमारे बारे में',
        about_hero_title: '॥ हमारे बारे में ॥',
        about_hero_subtext: 'आधुनिक तकनीक और इंटरैक्टिव लर्निंग के माध्यम से संस्कृत के प्राचीन ज्ञान को संरक्षित करना।',
        our_mission: 'हमारा लक्ष्य',
        mission_desc: 'अष्टाध्यायी के जटिल नियमों को सभी के लिए सुलभ बनाना, प्राचीन भाषाई विज्ञान और आधुनिक गणना शक्ति के बीच की खाई को पाटना।',
        our_vision: 'हमारा दृष्टिकोण',
        vision_desc: 'एक ऐसा डिजिटल पारिस्थितिकी तंत्र बनाना जहां संस्कृत केवल अतीत की भाषा न हो, बल्कि भविष्य के लिए अभिव्यक्ति का एक जीवंत माध्यम हो।',
        our_values: 'मुख्य मूल्य',
        values_desc: 'प्रतिनिधित्व में प्रामाणिकता, इंटरफेस में सादगी और भाषाई सटीकता में उत्कृष्टता SansGra के स्तंभ हैं।',
        vision_quote: 'भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती।<br>तस्यां हि काव्यं मधुरं तस्मादपि सुभाषितम्॥',
        the_creators: 'निर्माता',
        team_subtext: 'समर्पित विद्वान और डेवलपर संस्कृत को आपकी उंगलियों तक लाने के लिए काम कर रहे हैं।'
    },
    sa: {
        // Brand & basic nav
        brand: 'संस्कृत',
        home: 'गृहम्',
        search_examples: 'उदाहरणान्वेषणम्',
        builder: 'निर्माणकार्यम्',
        sutra: 'सूत्राणि',
        dark_mode: 'निशाकरः',
        
        // Builder page labels
        label_upa: 'उपसर्गः',
        label_dhatu: 'धातु (मूलम्)',
        label_prat: 'प्रत्ययः',
        placeholder_upa: 'विन्यस्य वा टाइप करें...',
        placeholder_dhatu: 'उदा. कृ, पठ्, लिख्...',
        placeholder_prat: 'उदा. तव्यत्, क्त्वा...',
        no_upasarga: 'नास्ति उपसर्गः',
        select_dhatu: 'धातुं विन्यस्य...',
        select_pratyaya: 'प्रत्ययं विन्यस्य...',
        
        // Buttons
        generate_word: 'पदम् निर्माय!',
        dummy1: 'नमूनार्थ 1',
        dummy2: 'नमूनार्थ 2',
        dummy3: 'नमूनार्थ 3',
        
        // Hero text
        hero_title: 'पदनिर्माणप्रक्रिया!',
        hero_subtitle: 'अष्टाध्यायी-सूत्रैः (१.१.१ - १.१.७५) शुद्धरूपसिद्धिः!',
        
        // Homepage specific
        hero_tagline: '॥ वन्दे संस्कृतम् ॥',
        hero_search_placeholder: 'शिक्षापत्रीम् अन्वेषय...',
        hero_search_subtext: 'धातु, प्रत्यय वा सूत्रसङ्ख्यायाः अन्वेषणम् (उदा: 1.1.1)',
        section_granthas: '॥ ग्रन्थाः ॥',
        book_examples: '॥ उदाहरणम् ॥',
        book_kridanta: '॥ कृदन्तम् ॥',
        book_tinnanta: '॥ तिङन्तम् ॥',
        book_taddhitanta: '॥ तद्धितान्तम् ॥',
        book_subanta: '॥ सुबन्तम् ॥',
        book_sutras: '॥ सूत्राणि ॥',
        book_dhatus: '॥ धातवः ॥',
        book_shabda: '॥ शब्दरूपाणि ॥',
        book_dhatu_rupa: '॥ धातुरूपाणि ॥',
        book_more: '॥ अधिकम् ॥',
        book_about: '॥ अस्माकं विषयः ॥',

        // Scroll overlay (index page)
        scroll_title: '॥ तस्मै पाऽणिनये नमः ॥',
        scroll_line1: 'येनाक्षरसमान्याभिषङ्ग्य महेशरात् | कृत्स्नं व्याकरणं प्रोतं तस्मै पाणिनये नमः ||',
        scroll_line2: 'येन धौत गिरः पुंसां विमलेः शब्दवारिधि: । तमश्रज्ञानंज भिन्नं तस्मै पाणिनये नमः ॥',
        scroll_line3: 'अज्ञानन्धस्य लोकस्य ज्ञानान्शश्लाकया चदुःक्ष्मीलितेन येन तस्मै पाणिनये नमः ।',
        scroll_line4: 'वाक्यकारं वररुचं भाष्कारं पतञ्जलिम् । पाणिनि सूत्रकारं च प्रणतोऽस्मि मुनीन्यम् ॥',
        
        // Mini menu items
        mini_dummy1: 'नमूनार्थ 1',
        mini_dummy2: 'नमूनार्थ 2',
        mini_dummy3: 'नमूनार्थ 3',
        
        // Result section
        result_hint: 'कथं निर्मितम्? (प्रक्रियां द्रष्टुं टैप करें)',
        
        // Prakriya (steps)
        prakriya_title: 'पाणिनीय सिद्धिप्रक्रिया:',
        
        // Search modal
        search_title: 'उदाहरणान्वेषणम्',
        search_placeholder: 'धातु, प्रत्यय वा सूत्रसङ्ख्यायाः अन्वेषणम् (उदा: 1.1.1)',
        search_input_placeholder: 'अन्वेषय...',
        search_no_results: 'उत्तराणि न सन्ति।',
        search_loading: 'डेटाबेस लोड हो रहा है...',
        
        // Sutras page
        sutras_title: 'सूत्राणि',
        sutras_heading: 'सूत्राणि',
        sutras_intro: 'सूत्राणि द्रष्टुं कश्चित् वर्गं चिनुत। इदं पृष्ठं डेटा-तः सूत्राणि लोड् करोति तथा च भाषा-आधारितम् अस्ति।',
        sutras_error: 'सूत्राणि लोड् कर्तुं न शक्यन्ते।',

        // Footer
        footer_title: 'पाणिनीय व्याकरणयन्त्रम् v2.0',
        footer_desc: 'अष्टाध्यायी-सूत्रैः कृतान्तात् कृदन्तपदानि निर्मिति भवति।',
        footer_copyright: '© 2026 Hotyoga द्वारा निर्मितम्',
        
        // Sutra dropdown
        sutra_samjna: 'संज्ञासूत्राणि',
        sutra_pada1_2: '१.२ - संज्ञासूत्राणि',
        sutra_pada1_3: '१.३ - विविधसूत्राणि',
        sutra_pada1_4: '१.४ - गित्',
        sutra_pada2_1: '२.१ - आत्मनेपदम्',
        sutra_pada2_2: '२.२ - परस्मैपदम्',
        sutra_pada2_3: '२.३ - अर्धधातुकम्',
        sutra_pada2_4: '२.४ - सर्वधातुकम्',
        sutra_pada3_1: '३.१ - कृत्',
        sutra_pada3_2: '३.२ - कृत्',
        sutra_pada3_3: '३.३ - कृत्',
        sutra_pada3_4: '३.४ - कृत्',
        sutra_pada4_1: '४.१ - कृत्',
        sutra_pada4_2: '४.२ - कृत्',
        sutra_pada4_3: '४.३ - कृत्',
        sutra_pada4_4: '४.४ - कृत्',
        sutra_pada5_1: '५.१ - कृत्',
        sutra_pada5_2: '५.२ - कृत्',
        sutra_pada5_3: '५.३ - कृत्',
        sutra_pada5_4: '५.४ - कृत्',
        sutra_pada6_1: '६.१ - कृत्',
        sutra_pada6_2: '६.२ - कृत्',
        sutra_pada6_3: '६.३ - कृत्',
        sutra_pada6_4: '६.४ - कृत्',
        sutra_pada7_1: '७.१ - कृत्',
        sutra_pada7_2: '७.२ - कृत्',
        sutra_pada7_3: '७.३ - कृत्',
        sutra_pada7_4: '७.४ - कृत्',
        sutra_pada8_1: '८.१ - कृत्',
        sutra_pada8_2: '८.२ - कृत्',
        sutra_pada8_3: '८.३ - कृत्',
        sutra_pada8_4: '८.४ - कृत्',
        
        // Engine messages
        msg_select_dhatu_prat: 'कृपया अल्पंतमम् एकं धातुं च प्रत्ययं वा लिख्यताम्!',
        msg_database_missing: 'विवरणानि लोड् न भवन्ति। कृपया JSON-सङ्ख्यानि पश्यतु।',
        msg_custom_dhatu: '(टिप्पणी: धातुः प्रत्ययः, सिस्टम सामान्य नियमैः कार्यं करोति)',
        msg_it_agama: '(इट्-आगमः: धातुः \'सेट्\' अस्ति च प्रत्ययः वलादि, \'आर्धधातुकस्येड् वलादेः\' से \'इ\' आगमः।)',
        
        // Generated word labels
        word_final: 'अन्तिमरूपम्:',
        word_siddha: 'सिद्धरूपम्:',

        // About Page
        about: 'अस्माकं विषयः',
        about_hero_title: '॥ अस्माकं विषयः ॥',
        about_hero_subtext: 'आधुनिकतन्त्रज्ञानस्य पारस्परिकशिक्षणस्य च माध्यमेन संस्कृतस्य प्राचीनज्ञानस्य संरक्षणम्।',
        our_mission: 'अस्माकं लक्ष्यम्',
        mission_desc: 'अष्टाध्यायी-नियमान् सर्वेषां कृते सुलभं कर्तुम्, प्राचीनभाषाविज्ञानस्य आधुनिकगणनायाश्च मध्ये सेतुनिर्माणम्।',
        our_vision: 'अस्माकं दृष्टिः',
        vision_desc: 'एतादृशं डिजिटल-पारिस्थितिकी-तन्त्रं निर्मातव्यं यत्र संस्कृतं न केवलं भूतकालस्य भाषा स्यात्, अपितु भविष्यस्य कृते अभिव्यक्ति-माध्यमं भवेत्।',
        our_values: 'मुख्यमूल्यानि',
        values_desc: 'प्रामाणिकता, सरलता, भाषाशुद्धिः च संसग्रा-इत्यस्य आधारस्तम्भाः सन्ति।',
        vision_quote: 'भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती।<br>तस्यां हि काव्यं मधुरं तस्मादपि सुभाषितम्॥',
        the_creators: 'निर्मातारः',
        team_subtext: 'समर्पिताः विद्वांसः डेवलपर्स च संस्कृतं युष्मभ्यं दातुं प्रयतन्ते।'
    }
};

function setLang(lang) {
    localStorage.setItem('siteLang', lang);
    applyTranslationsExtended(lang);
    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

function applyTranslations(lang) {
    const map = TRANSLATIONS[lang] || TRANSLATIONS['hi'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (map[key]) el.innerText = map[key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
}

function applyTranslationsExtended(lang) {
    applyTranslations(lang);
    const map = TRANSLATIONS[lang] || TRANSLATIONS['hi'];
    const hiMap = TRANSLATIONS['hi'] || {};
    const reverse = {};
    Object.keys(hiMap).forEach(k => {
        const v = (hiMap[k] || '').toString().trim();
        if (v) reverse[v] = k;
    });
    function replaceTextNode(node) {
        const txt = node.nodeValue.trim();
        if (!txt) return;
        const key = reverse[txt];
        if (key && map[key]) node.nodeValue = node.nodeValue.replace(txt, map[key]);
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while ((n = walker.nextNode())) {
        const parent = n.parentElement;
        if (!parent) continue;
        const tag = parent.tagName.toLowerCase();
        if (['script','style','noscript'].includes(tag)) continue;
        if (parent.closest('.no-translate')) continue;
        replaceTextNode(n);
    }
    const attrList = ['placeholder','title','alt','value'];
    document.querySelectorAll('*').forEach(el => {
        if (el.closest && el.closest('.no-translate')) return;
        attrList.forEach(attr => {
            if (el.hasAttribute && el.hasAttribute(attr)) {
                const v = el.getAttribute(attr).toString().trim();
                const key = reverse[v];
                if (key && map[key]) el.setAttribute(attr, map[key]);
            }
        });
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (map[key]) el.setAttribute('placeholder', map[key]);
    });
}

function openSearchModal() { 
    if(document.getElementById("searchModal")) {
        document.getElementById("searchModal").style.display = "block"; 
        document.getElementById("searchInput").focus(); 
    } else {
        window.location.href = 'search.html';
    }
}
function closeSearchModal() { 
    if(document.getElementById("searchModal")) {
        document.getElementById("searchModal").style.display = "none"; 
        document.getElementById("searchInput").value = ""; 
        document.getElementById("searchResults").innerHTML = ""; 
    }
}
window.addEventListener('click', function(event) { if (document.getElementById("searchModal") && event.target == document.getElementById("searchModal")) closeSearchModal(); });

// Load shared header/footer fragments and initialize language on page load
async function loadSharedHeaderFooter() {
    try {
        const [headerRes, footerRes] = await Promise.all([fetch('header.html'), fetch('footer.html')]);
        if (headerRes.ok) {
            const headerHtml = await headerRes.text();
            document.getElementById('site-header')?.insertAdjacentHTML('afterbegin', headerHtml);
            
            // Hide/Show specific header parts based on page
            const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
            
            if (isHome) {
                // Home page: hide text nav, show mini header
                const textNav = document.querySelector('.main-text-nav-container');
                if (textNav) textNav.style.display = 'none';
            } else {
                // Other pages: show text nav, hide the "red" mini header
                const miniHeader = document.querySelector('.mini-header');
                if (miniHeader) miniHeader.style.display = 'none';
                
                // Ensure main nav is visible
                const textNav = document.querySelector('.main-text-nav-container');
                if (textNav) textNav.style.display = 'block';
            }
        }
        if (footerRes.ok) {
            const footerHtml = await footerRes.text();
            document.getElementById('site-footer')?.insertAdjacentHTML('afterbegin', footerHtml);
        }
    } catch (e) { console.warn('Could not load shared header/footer', e); }
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadSharedHeaderFooter();
    // apply persisted theme first so fragments render with correct colors
    try { applySavedTheme(); } catch(e) {}
    
    // Ensure database is loaded before translations and search
    await loadDatabase();

    const saved = localStorage.getItem('siteLang') || 'hi';
    applyTranslationsExtended(saved);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === saved));

    // Handle search page specific logic
    if (window.location.pathname.endsWith('search.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        const searchInput = document.getElementById('searchInput');
        if (query && searchInput) {
            searchInput.value = query;
            performSearch();
        }
        if (searchInput) searchInput.focus();
    }
});

function getSutraDetails(sutraId) {
    try { indexSutrasForSearch(); } catch (e) {}
    if (sanskritDatabase && sanskritDatabase._sutraById && sanskritDatabase._sutraById[sutraId]) {
        return sanskritDatabase._sutraById[sutraId];
    }

    const allArrays = [
        'samjnaSutras', 'pada_1_2', 'pada_1_3', 'pada_1_4', 'pada_2_1', 'pada_2_2', 'pada_2_3', 'pada_2_4', 
        'pada_3_1', 'pada_3_2', 'pada_3_3', 'pada_3_4', 'pada_4_1', 'pada_4_2', 'pada_4_3', 'pada_4_4',
        'pada_5_1', 'pada_5_2', 'pada_5_3', 'pada_5_4', 'pada_6_1', 'pada_6_2', 'pada_6_3', 'pada_6_4',
        'pada_7_1', 'pada_7_2', 'pada_7_3', 'pada_7_4', 'pada_8_1', 'pada_8_2', 'pada_8_3', 'pada_8_4'
    ];
    for (let arrayName of allArrays) {
        if (sanskritDatabase[arrayName]) {
            let foundSutra = sanskritDatabase[arrayName].find(s => s.id === sutraId);
            if (foundSutra) return foundSutra;
        }
    }
    return { name: "अज्ञात सूत्र", desc: "विवरण उपलब्ध नहीं" };
}

function performSearch() {
    const inputEl = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("searchResults");
    if (!inputEl || !resultsDiv) return;

    const query = inputEl.value.trim();
    if (query.length === 0) { resultsDiv.innerHTML = ""; return; }
    if (!sanskritDatabase) { resultsDiv.innerHTML = `<p style="color:red; text-align:center;">डेटाबेस लोड हो रहा है...</p>`; return; }

    indexAllForSearch();

    const tokens = tokenizeSearchQuery(query);
    const tokenList = tokens.length ? tokens : [query];

    function buildTokenMatcher(token) {
        const t = (token || "").trim();
        if (!t) return null;

        const sutraLike = /^[0-9.]+$/.test(t) && /\d/.test(t);
        if (sutraLike) return { type: 'sutra', raw: t };

        const devForms = [];
        const romanForms = [];

        if (hasDevanagari(t)) {
            devForms.push(t);
        } else {
            const tl = t.toLowerCase();
            const devSet = new Set();

            const hing = hinglishWordMap[tl];
            if (hing) {
                devSet.add(hing);
                devSet.add(devanagariNasalClustersToAnusvara(hing));
            }

            const romanVariants = generateRomanVariantsForSearch(tl);
            for (const rv of romanVariants) {
                const dev = romanToDevanagari(rv);
                if (dev) {
                    devSet.add(dev);
                    devSet.add(devanagariNasalClustersToAnusvara(dev));
                }
                const romanNorm = normalizeRomanForSearch(rv);
                if (romanNorm && romanNorm.length >= 2) romanForms.push(romanNorm);
            }

            devForms.push(...devSet);
        }

        return {
            type: 'text',
            raw: t,
            devForms: [...new Set(devForms.filter(Boolean))],
            romanForms: [...new Set(romanForms.filter(Boolean))],
            highlightForms: [...new Set(devForms.filter(v => (v || "").length >= 2))]
        };
    }

    const matchers = tokenList.map(buildTokenMatcher).filter(Boolean);

    const highlightForms = [...new Set(matchers.flatMap(m => m.highlightForms || []))].sort((a, b) => b.length - a.length);

    function highlightText(text) {
        let out = text || "";
        for (const qf of highlightForms) {
            if (!qf) continue;
            const regex = new RegExp(escapeRegex(qf), 'g');
            out = out.replace(regex,
                `<span style="background-color:#fbbf24; color:#1e293b; border-radius:2px; padding:0 2px; font-weight:bold;">$&</span>`);
        }
        return out;
    }

    function recordMatches(record, matcher) {
        if (!record) return false;
        if (matcher.type === 'sutra') {
            return (record.sutraId || "").startsWith(matcher.raw);
        }
        const dev = record.dev || "";
        for (const d of matcher.devForms) {
            if (d && dev.includes(d)) return true;
        }
        const romanNorm = record.romanNorm || "";
        for (const r of matcher.romanForms) {
            if (r && romanNorm.includes(r)) return true;
        }
        return false;
    }

    const MAX_PER_SECTION = 20;

    // 1) Examples
    const matchedExamples = (sanskritDatabase.examples || [])
        .filter(item => matchers.every(m => recordMatches({
            sutraId: item?.sutra || "",
            dev: item?.ex || "",
            romanNorm: item?._exRomanNorm || ""
        }, m)))
        .slice(0, MAX_PER_SECTION);

    // 2) Sutras (full sutra database)
    const sutraList = sanskritDatabase._sutraList || [];
    const matchedSutras = sutraList
        .filter(s => matchers.every(m => recordMatches({
            sutraId: s?.id || "",
            dev: s?._searchDev || `${s?.id || ''} ${s?.name || ''} ${s?.desc || ''}`.trim(),
            romanNorm: s?._searchRomanNorm || ""
        }, m)))
        .slice(0, MAX_PER_SECTION);

    // 3) Dhatus
    const dhatuList = sanskritDatabase._dhatuList || [];
    const matchedDhatus = dhatuList
        .filter(({ key, data }) => matchers.every(m => recordMatches({
            sutraId: "",
            dev: data?._searchDev || `${key || ''} ${data?.label || ''} ${data?.clean || ''}`.trim(),
            romanNorm: data?._searchRomanNorm || ""
        }, m)))
        .slice(0, MAX_PER_SECTION);

    // 4) Pratyayas
    const pratyayaList = sanskritDatabase._pratyayaList || [];
    const matchedPratyayas = pratyayaList
        .filter(({ key, data }) => matchers.every(m => recordMatches({
            sutraId: "",
            dev: data?._searchDev || `${key || ''} ${data?.real || ''} ${data?.type || ''} ${data?.lopa || ''}`.trim(),
            romanNorm: data?._searchRomanNorm || ""
        }, m)))
        .slice(0, MAX_PER_SECTION);

    // 5) Upasargas
    const upaList = sanskritDatabase._upasargaList || [];
    const matchedUpasargas = upaList
        .filter(u => matchers.every(m => recordMatches({
            sutraId: "",
            dev: u?._searchDev || `${u?.id || ''} ${u?.label || ''}`.trim(),
            romanNorm: u?._searchRomanNorm || ""
        }, m)))
        .slice(0, MAX_PER_SECTION);

    if (
        matchedExamples.length === 0 &&
        matchedSutras.length === 0 &&
        matchedDhatus.length === 0 &&
        matchedPratyayas.length === 0 &&
        matchedUpasargas.length === 0
    ) {
        resultsDiv.innerHTML = `<p style="color:red; text-align:center; margin-top:20px;">कोई परिणाम नहीं मिला।</p>`;
        return;
    }

    function sectionHeader(title, count) {
        return `<div style="margin:12px 0 6px; font-weight:800; color: var(--text-dark);">${title} <span style="opacity:0.7; font-weight:700;">(${count})</span></div>`;
    }

    let htmlOutput = "";

    if (matchedExamples.length) {
        htmlOutput += sectionHeader("Examples", matchedExamples.length);
        matchedExamples.forEach(match => {
            const sutraInfo = getSutraDetails(match.sutra);
            const highlightedEx = highlightText(match.ex);
            htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightedEx}</div><div class="su-text sanskrit-text"><b>सूत्र:</b> [${match.sutra}] ${highlightText(sutraInfo.name || "")}</div><div class="desc-text sanskrit-text">${highlightText(sutraInfo.desc || "")}</div></div>`;
        });
    }

    if (matchedSutras.length) {
        htmlOutput += sectionHeader("Sutras", matchedSutras.length);
        matchedSutras.forEach(s => {
            const title = `${s.id ? `[${s.id}] ` : ''}${s.name || ''}`.trim();
            htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightText(title)}</div><div class="desc-text sanskrit-text">${highlightText(s.desc || "")}</div></div>`;
        });
    }

    if (matchedDhatus.length) {
        htmlOutput += sectionHeader("Dhatus", matchedDhatus.length);
        matchedDhatus.forEach(({ key, data }) => {
            const title = `${key}`.trim();
            const desc = (data && data.label) ? data.label : "";
            htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightText(title)}</div><div class="desc-text sanskrit-text">${highlightText(desc)}</div></div>`;
        });
    }

    if (matchedPratyayas.length) {
        htmlOutput += sectionHeader("Pratyayas", matchedPratyayas.length);
        matchedPratyayas.forEach(({ key, data }) => {
            const title = `${key}`.trim();
            const descParts = [];
            if (data?.real) descParts.push(`real: ${data.real}`);
            if (data?.type) descParts.push(`type: ${data.type}`);
            if (data?.lopa) descParts.push(`it-lopa: ${data.lopa}`);
            const desc = descParts.join(" | ");
            htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightText(title)}</div><div class="desc-text sanskrit-text">${highlightText(desc)}</div></div>`;
        });
    }

    if (matchedUpasargas.length) {
        htmlOutput += sectionHeader("Upasargas", matchedUpasargas.length);
        matchedUpasargas.forEach(u => {
            const title = `${u.id || ""}`.trim();
            const desc = u.label || "";
            htmlOutput += `<div class="result-card"><div class="ex-text sanskrit-text">${highlightText(title)}</div><div class="desc-text sanskrit-text">${highlightText(desc)}</div></div>`;
        });
    }
    resultsDiv.innerHTML = htmlOutput;
}

// ==================================================
// 🚀 INTELLIGENT AUTOCOMPLETE SYSTEM (Hinglish Support)
// ==================================================

const suggestionData = {
    upasargas: [
        { hinglish: "pra", devanagari: "प्र", meaning: "forward, intense, very" },
        { hinglish: "para", devanagari: "परा", meaning: "away, opposite, back" },
        { hinglish: "apa", devanagari: "अप", meaning: "away, off, down" },
        { hinglish: "sam", devanagari: "सम्", meaning: "together, perfect, well" },
        { hinglish: "anu", devanagari: "अनु", meaning: "after, along, following" },
        { hinglish: "ava", devanagari: "अव", meaning: "down, off, away" },
        { hinglish: "nis", devanagari: "निस्", meaning: "out, forth, away" },
        { hinglish: "nir", devanagari: "निर्", meaning: "out, away, without" },
        { hinglish: "dus", devanagari: "दुस्", meaning: "bad, difficult, hard" },
        { hinglish: "dur", devanagari: "दुर्", meaning: "bad, difficult, evil" },
        { hinglish: "vi", devanagari: "वि", meaning: "apart, without, away" },
        { hinglish: "aa", devanagari: "आङ्", meaning: "towards, near, back" },
        { hinglish: "ni", devanagari: "नि", meaning: "down, into, back" },
        { hinglish: "adhi", devanagari: "अधि", meaning: "above, over, on" },
        { hinglish: "api", devanagari: "अपि", meaning: "on, near, also" },
        { hinglish: "ati", devanagari: "अति", meaning: "across, beyond, very" },
        { hinglish: "su", devanagari: "सु", meaning: "good, well, easy" },
        { hinglish: "ut", devanagari: "उत्", meaning: "up, forth, out" },
        { hinglish: "abhi", devanagari: "अभि", meaning: "towards, near, against" },
        { hinglish: "prati", devanagari: "प्रति", meaning: "towards, back, each" },
        { hinglish: "pari", devanagari: "परि", meaning: "around, about, fully" },
        { hinglish: "upa", devanagari: "उप", meaning: "towards, near, sub" }
    ],
    dhatus: [], // Populated dynamically
    pratyayas: [] // Populated dynamically
};

function setupAutocomplete(inputId, dropdownId, type) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    let activeIndex = -1;

    // Populate dynamic data if needed
    if (type === 'dhatus' && suggestionData.dhatus.length === 0) {
        for (let key in sanskritDatabase.dhatus) {
            const d = sanskritDatabase.dhatus[key];
            const hinglishMatch = d.label.match(/\((.*?)\)/);
            const meaningMatch = d.label.match(/\| (.*?)\)/);
            suggestionData.dhatus.push({
                hinglish: key.toLowerCase().replace(/्/g, ''),
                devanagari: key,
                meaning: meaningMatch ? meaningMatch[1] : d.label
            });
        }
    }
    if (type === 'pratyayas' && suggestionData.pratyayas.length === 0) {
        for (let key in pratyayaDB) {
            suggestionData.pratyayas.push({
                hinglish: key.toLowerCase(),
                devanagari: key,
                meaning: pratyayaDB[key].type || "प्रत्यय"
            });
        }
    }

    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();
        if (!value) {
            dropdown.classList.remove('show');
            return;
        }

        // Smart Matching: Match Hinglish OR transliterated Devanagari
        const devQuery = romanToDevanagari(value);
        
        const matches = suggestionData[type].filter(item => 
            item.hinglish.includes(value) || 
            item.devanagari.includes(value) ||
            item.devanagari.includes(devQuery) ||
            item.meaning.toLowerCase().includes(value)
        ).sort((a, b) => {
            // Priority: Exact Hinglish match > Starts with query > Includes query
            if (a.hinglish === value) return -1;
            if (b.hinglish === value) return 1;
            if (a.hinglish.startsWith(value) && !b.hinglish.startsWith(value)) return -1;
            if (b.hinglish.startsWith(value) && !a.hinglish.startsWith(value)) return 1;
            return 0;
        }).slice(0, 10); 

        renderSuggestions(matches, dropdown, input, value);
    });

    input.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.suggestion-item');
        if (!dropdown.classList.contains('show') || items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActiveItem(items, activeIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActiveItem(items, activeIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex > -1) {
                items[activeIndex].click();
            }
        } else if (e.key === 'Escape') {
            dropdown.classList.remove('show');
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function renderSuggestions(matches, dropdown, input, query) {
    if (matches.length === 0) {
        dropdown.classList.remove('show');
        return;
    }

    dropdown.innerHTML = matches.map((item, index) => `
        <div class="suggestion-item" onclick="selectSuggestion('${input.id}', '${item.devanagari}')" data-index="${index}">
            <div class="suggestion-main">
                <span class="suggestion-hinglish">${highlightMatch(item.hinglish, query)}</span>
                <span class="suggestion-devanagari sanskrit-text">${item.devanagari}</span>
            </div>
            <div class="suggestion-meaning">${item.meaning}</div>
        </div>
    `).join('');

    // Add keyboard hint
    dropdown.insertAdjacentHTML('beforeend', `
        <div class="suggestion-kbd-hint">
            <span>Use ↑ ↓ to navigate</span>
            <span>Enter to select</span>
        </div>
    `);

    dropdown.classList.add('show');
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="match-highlight">$1</span>');
}

function selectSuggestion(inputId, value) {
    const input = document.getElementById(inputId);
    input.value = value;
    const dropdownId = inputId === 'upasarga' ? 'upaSuggestions' : (inputId === 'dhatu' ? 'dhatuSuggestions' : 'pratSuggestions');
    document.getElementById(dropdownId).classList.remove('show');
    input.focus();
}

function updateActiveItem(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

window.selectSuggestion = selectSuggestion; // Expose to global for onclick

// ==================================================
// 💬 CHAT BOX & EMAILJS INTEGRATION
// ==================================================

function toggleChatBox() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.classList.toggle('show');
        if (chatBox.classList.contains('show')) {
            document.getElementById('userName').focus();
        }
    }
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const form = event.target;

    btn.disabled = true;
    btn.innerText = "Sending...";
    status.innerText = "";
    status.className = "form-status";

    try {
        // EmailJS integration
        // Note: USER will provide keys later. 
        // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with actual values.
        
        if (window.emailjs) {
            const result = await emailjs.sendForm(
                'YOUR_SERVICE_ID', // Service ID
                'YOUR_TEMPLATE_ID', // Template ID
                form,
                'YOUR_PUBLIC_KEY' // Public Key
            );
            
            console.log('SUCCESS!', result.status, result.text);
            status.innerText = "Message sent successfully!";
            status.classList.add('success');
            form.reset();
            setTimeout(() => toggleChatBox(), 2000);
        } else {
            // Fallback if EmailJS is not loaded yet
            status.innerText = "Email service not ready. Try again later.";
            status.classList.add('error');
        }
    } catch (error) {
        console.error('FAILED...', error);
        status.innerText = "Failed to send message. Please try again.";
        status.classList.add('error');
    } finally {
        btn.disabled = false;
        btn.innerText = "Send";
    }
}

// Inject EmailJS SDK
(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = function() {
        // emailjs.init("YOUR_PUBLIC_KEY"); // User will provide this
    };
    document.head.appendChild(script);
})();

window.toggleChatBox = toggleChatBox;

// Click outside to close chat box
window.addEventListener('click', (e) => {
    const chatBox = document.getElementById('chatBox');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatBox && chatBox.classList.contains('show')) {
        // If click is NOT inside chatBox and NOT on the toggle button
        if (!chatBox.contains(e.target) && !chatToggle.contains(e.target)) {
            chatBox.classList.remove('show');
        }
    }
});
window.handleContactSubmit = handleContactSubmit;
