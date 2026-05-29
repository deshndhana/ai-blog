import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const aiTopics = [
  "The Future of Generative AI", "Machine Learning in Healthcare", "Understanding Large Language Models",
  "AI in Cyber Security", "The Rise of Autonomous Vehicles", "Ethics in Artificial Intelligence",
  "Quantum Computing and AI", "AI for Climate Change", "Robotics in Manufacturing",
  "Natural Language Processing Advancements"
];

// Extremely long generated article placeholder
const longContentEn = `The rapid evolution of artificial intelligence is fundamentally reshaping how we interact with technology, process information, and solve complex global challenges. Over the past decade, we have transitioned from theoretical models of machine learning to practical, highly capable systems that permeate almost every aspect of modern society. This article delves deep into the mechanics, implications, and future trajectories of these technologies.

### The Dawn of Large Language Models

One of the most significant breakthroughs has been the development of Large Language Models (LLMs). These models, trained on vast datasets comprising essentially the entirety of the public internet, have demonstrated an uncanny ability to understand, generate, and manipulate human language. From writing sophisticated computer code to composing poetry and drafting legal documents, the versatility of LLMs is unprecedented. They operate on transformer architectures, which allow them to weigh the context of words in a sentence much more effectively than previous models.

This leap in natural language processing (NLP) has birthed a new era of generative AI. Tools that can create hyper-realistic images from text prompts, generate entire video sequences, and synthesize human voices are no longer science fiction. They are here, and they are improving at an exponential rate.

### Ethical Implications and Societal Impact

However, this rapid advancement is not without its profound challenges. The ethical implications of AI are hotly debated among technologists, ethicists, and policymakers. Issues such as algorithmic bias, where AI systems inherit and sometimes amplify human prejudices present in their training data, pose significant risks to fairness and equality. Furthermore, the potential for AI to be used in creating deepfakes or spreading misinformation threatens the very fabric of democratic societies.

The impact on the workforce is another critical area of concern. While AI will undoubtedly create new industries and job roles, it also threatens to automate millions of existing jobs, particularly those involving routine, repetitive tasks. The transition period will require massive reskilling efforts and perhaps even a rethinking of societal safety nets, such as the introduction of Universal Basic Income (UBI).

### The Path to Artificial General Intelligence (AGI)

Looking ahead, the holy grail for many researchers remains Artificial General Intelligence (AGI) – an AI system capable of understanding, learning, and applying knowledge across a wide range of tasks at a level equal to or beyond human capability. While experts disagree on when, or even if, AGI will be achieved, the trajectory of current research suggests that we are moving steadily in that direction. 

In conclusion, the AI revolution is the defining technological shift of our time. It holds the promise of solving some of humanity's most intractable problems, from curing diseases to mitigating climate change. However, navigating this transition will require unprecedented global cooperation, robust ethical frameworks, and a commitment to ensuring that the benefits of AI are distributed equitably across all of humanity.`;

const longContentSi = `කෘතිම බුද්ධියේ (Artificial Intelligence) සීඝ්‍ර පරිණාමය, අප තාක්ෂණය සමඟ අන්තර් ක්‍රියා කරන ආකාරය, තොරතුරු සකසන ආකාරය සහ සංකීර්ණ ගෝලීය අභියෝග විසඳන ආකාරය මූලික වශයෙන් වෙනස් කරමින් පවතී. පසුගිය දශකය තුළ, අපි යන්ත්‍ර ඉගෙනීමේ (Machine Learning) න්‍යායික ආකෘතිවල සිට නූතන සමාජයේ සෑම අංශයකටම පාහේ විනිවිද යන ප්‍රායෝගික, ඉහළ හැකියාවන්ගෙන් යුත් පද්ධති වෙත ගමන් කර ඇත්තෙමු. මෙම ලිපිය මෙම තාක්ෂණයන්හි යාන්ත්‍ර විද්‍යාව, බලපෑම් සහ අනාගත ගමන් මඟ පිළිබඳව ගැඹුරින් සාකච්ඡා කරයි.

### විශාල භාෂා ආකෘතිවල (LLMs) අරුණළු

වඩාත්ම වැදගත් දියුණුවක් වී ඇත්තේ විශාල භාෂා ආකෘති (Large Language Models) සංවර්ධනය කිරීමයි. පොදු අන්තර්ජාලයේ සමස්තයම පාහේ අඩංගු විශාල දත්ත කට්ටල මත පුහුණු කර ඇති මෙම ආකෘති, මානව භාෂාව තේරුම් ගැනීමට, ජනනය කිරීමට සහ හැසිරවීමට පුදුමාකාර හැකියාවක් පෙන්නුම් කර ඇත. සංකීර්ණ පරිගණක කේත ලිවීමේ සිට කවි රචනා කිරීම සහ නීතිමය ලියකියවිලි කෙටුම්පත් කිරීම දක්වා, LLM හි බහුකාර්යතාව පෙර නොවූ විරූ ය.

ස්වාභාවික භාෂා සැකසුම් (NLP) හි මෙම පිම්ම උත්පාදක AI (Generative AI) හි නව යුගයක් බිහි කර ඇත. පෙළ විමසීම් වලින් (text prompts) අධි-යථාර්ථවාදී රූප නිර්මාණය කිරීමට, සම්පූර්ණ වීඩියෝ දර්ශන ජනනය කිරීමට සහ මිනිස් කටහඬ සංස්ලේෂණය කිරීමට හැකි මෙවලම් තවදුරටත් විද්‍යා ප්‍රබන්ධ නොවේ. ඒවා දැන් අප අතර ඇති අතර ඒවා ඝාතීය වේගයකින් වැඩිදියුණු වෙමින් පවතී.

### සදාචාරාත්මක ඇඟවුම් සහ සමාජ බලපෑම

කෙසේ වෙතත්, මෙම සීඝ්‍ර දියුණුව එහි ගැඹුරු අභියෝගවලින් තොර නොවේ. AI හි සදාචාරාත්මක ඇඟවුම් තාක්‍ෂණවේදීන්, ආචාරධර්මවාදීන් සහ ප්‍රතිපත්ති සම්පාදකයින් අතර දැඩි ලෙස විවාදයට ලක් වේ. ඇල්ගොරිතම පක්ෂග්‍රාහීත්වය වැනි ගැටළු, සාධාරණත්වයට සහ සමානාත්මතාවයට සැලකිය යුතු අවදානමක් ඇති කරයි. ඊට අමතරව, ඩීප්ෆේක් (deepfakes) නිර්මාණය කිරීමට හෝ සාවද්‍ය තොරතුරු පතුරුවා හැරීමට AI භාවිතා කිරීමේ හැකියාව ප්‍රජාතන්ත්‍රවාදී සමාජයන්හි පැවැත්මටම තර්ජනයක් වේ.

### කෘතිම සාමාන්‍ය බුද්ධිය (AGI) කරා යන ගමන

ඉදිරිය දෙස බලන විට, බොහෝ පර්යේෂකයන්ගේ ප්‍රධානතම ඉලක්කය වන්නේ කෘතිම සාමාන්‍ය බුද්ධියයි (AGI) - එනම් මානව හැකියාවන්ට සමාන හෝ ඊට වැඩි මට්ටමකින් පුළුල් පරාසයක කාර්යයන් හරහා දැනුම තේරුම් ගැනීමට, ඉගෙන ගැනීමට සහ යෙදවීමට හැකියාව ඇති AI පද්ධතියකි.

අවසාන වශයෙන්, AI විප්ලවය යනු අපගේ කාලයේ නිර්වචනය කරන තාක්ෂණික මාරුවයි. රෝග සුව කිරීමේ සිට දේශගුණික විපර්යාස අවම කිරීම දක්වා මානව වර්ගයාගේ වඩාත්ම දුෂ්කර ගැටළු සමහරක් විසඳීමේ පොරොන්දුව එය දරයි. කෙසේ වෙතත්, මෙම සංක්‍රාන්තිය සැරිසැරීම සඳහා පෙර නොවූ විරූ ගෝලීය සහයෝගීතාවක්, ශක්තිමත් සදාචාරාත්මක රාමු සහ AI හි ප්‍රතිලාභ සමස්ත මානව වර්ගයා හරහා සාධාරණ ලෙස බෙදා හැරීම සහතික කිරීමට කැපවීමක් අවශ්‍ය වේ.`;

async function seed() {
  console.log("Starting Firebase seed...");
  const today = new Date();
  let idCounter = 1;
  let batchCount = 0;

  for (let dayOffset = 0; dayOffset < 60; dayOffset++) {
    const postDate = new Date(today);
    postDate.setDate(postDate.getDate() - dayOffset);
    
    for (let postOfDay = 0; postOfDay < 3; postOfDay++) {
      postDate.setHours(10 + postOfDay * 4, 0, 0, 0); 

      const topicIndex = (dayOffset * 3 + postOfDay) % aiTopics.length;
      const baseTopic = aiTopics[topicIndex];
      const titleVariations = ["Exploring ", "The State of ", "Why We Need ", "Understanding ", "The Future of ", "A Deep Dive into "];
      const prefix = titleVariations[idCounter % titleVariations.length];
      const title = baseTopic.startsWith("The") || baseTopic.startsWith("Why") || baseTopic.startsWith("Understanding") 
        ? baseTopic 
        : `${prefix}${baseTopic}`;

      const id = Date.now().toString() + idCounter.toString().padStart(3, '0');
      const imageSeed = `long-ai-blog-${dayOffset}-${postOfDay}`;
      const image = `https://picsum.photos/seed/${imageSeed}/1200/600`;

      const article = {
        id,
        title,
        image,
        content: longContentEn,
        contentSinhala: longContentSi,
        createdAt: postDate.toISOString(),
        likes: 0
      };

      try {
        await setDoc(doc(db, "articles", id), article);
        batchCount++;
        console.log(`Added ${batchCount}/180: ${title}`);
      } catch (err) {
        console.error("Error adding doc:", err);
      }
      
      idCounter++;
    }
  }
  
  console.log("Seed complete! Added 180 long articles to Firestore.");
  process.exit(0);
}

seed();
