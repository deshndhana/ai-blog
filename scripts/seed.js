const fs = require('fs');
const path = require('path');

const articles = [];

const topics = [
  "The Future of Generative AI",
  "How Machine Learning is Changing Healthcare",
  "Understanding Large Language Models",
  "AI in Cyber Security",
  "The Rise of Autonomous Vehicles",
  "Ethics in Artificial Intelligence",
  "Quantum Computing and AI",
  "AI for Climate Change",
  "Robotics in Manufacturing",
  "Natural Language Processing Advancements",
  "AI in Financial Markets",
  "Personalized Education with AI",
  "Deep Learning Demystified",
  "AI Art Generation Tools",
  "The Impact of AI on Jobs",
  "Smart Cities of Tomorrow",
  "AI in Agriculture",
  "Space Exploration and AI",
  "AI Powered Customer Service",
  "Edge Computing and AI"
];

const topicsSinhala = [
  "Generative AI හි අනාගතය",
  "Machine Learning මගින් සෞඛ්‍ය අංශය වෙනස් වන අයුරු",
  "Large Language Models තේරුම් ගැනීම",
  "සයිබර් ආරක්ෂණයේදී AI හි කාර්යභාරය",
  "ස්වයංක්‍රීය වාහන වල නැගීම",
  "කෘතිම බුද්ධිය පිළිබඳ ආචාරධර්ම",
  "ක්වොන්ටම් පරිගණනය සහ AI",
  "දේශගුණික විපර්යාස සඳහා AI",
  "නිෂ්පාදන අංශයේ රොබෝ තාක්ෂණය",
  "ස්වාභාවික භාෂා සැකසුම් (NLP) දියුණුව"
];

for (let i = 0; i < 20; i++) {
  const isSinhala = i < 10;
  
  const article = {
    id: (1700000000000 + i * 100000).toString(),
    title: topics[i],
    image: `https://picsum.photos/seed/ai${i}/800/600`, // Placeholder image
    content: `This is an in-depth article about ${topics[i]}. As artificial intelligence continues to evolve rapidly, the implications for this sector are profound. We are seeing unprecedented growth and adoption of these technologies across the globe.

The foundational models powering this revolution are becoming more sophisticated, allowing for complex problem-solving that was previously thought impossible for machines. Researchers and developers are pushing the boundaries of what AI can achieve.

However, challenges remain. As we integrate AI more deeply into our systems, we must also consider the ethical, security, and societal impacts. It is a balancing act between innovation and responsibility.`,
    createdAt: new Date(1700000000000 + i * 10000000).toISOString()
  };

  if (isSinhala) {
    article.titleSinhala = topicsSinhala[i];
    article.contentSinhala = `මෙය ${topicsSinhala[i]} පිළිබඳ සවිස්තරාත්මක ලිපියකි. කෘතිම බුද්ධිය සීඝ්‍රයෙන් පරිණාමය වන විට, මෙම අංශයට ඇති වන බලපෑම ඉතා විශාලය. ලොව පුරා මෙම තාක්ෂණයන්ගේ පෙර නොවූ විරූ වර්ධනයක් සහ භාවිතයක් අපට දැකගත හැකිය.

මෙම විප්ලවය බලගන්වන මූලික ආකෘති වඩාත් සංකීර්ණ වෙමින් පවතින අතර, යන්ත්‍ර සඳහා කළ නොහැකි යැයි සිතූ සංකීර්ණ ගැටළු විසඳීමට ඉඩ සලසයි. පර්යේෂකයන් සහ සංවර්ධකයින් AI වෙත ළඟා විය හැකි සීමාවන් පුළුල් කරමින් සිටී.

කෙසේ වෙතත්, අභියෝග පවතී. අපි AI අපගේ පද්ධතිවලට වඩාත් ගැඹුරින් අනුකලනය කරන විට, එහි ආචාරධාර්මික, ආරක්ෂක සහ සමාජීය බලපෑම් ද අප සැලකිල්ලට ගත යුතුය. එය නවෝත්පාදනය සහ වගකීම අතර සමතුලිතතාවයකි.`;
  }

  articles.push(article);
}

// Reverse so newest is first logically or just sort by createdAt later
const dataFilePath = path.join(__dirname, '..', 'lib', 'data.json');
fs.writeFileSync(dataFilePath, JSON.stringify(articles.reverse(), null, 2), 'utf8');
console.log('20 sample articles generated.');
