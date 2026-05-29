const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'src', 'lib', 'data.json');

const aiTopics = [
  "The Future of Generative AI", "Machine Learning in Healthcare", "Understanding Large Language Models",
  "AI in Cyber Security", "The Rise of Autonomous Vehicles", "Ethics in Artificial Intelligence",
  "Quantum Computing and AI", "AI for Climate Change", "Robotics in Manufacturing",
  "Natural Language Processing Advancements", "AI in Financial Markets", "Personalized Education with AI",
  "Deep Learning Demystified", "AI Art Generation Tools", "The Impact of AI on Jobs",
  "Smart Cities of Tomorrow", "AI in Agriculture", "Space Exploration and AI",
  "AI Powered Customer Service", "Edge Computing and AI", "Neuromorphic Computing",
  "AI and the Internet of Things", "Predictive Analytics in Retail", "AI for Drug Discovery",
  "Computer Vision Breakthroughs", "AI in Video Games", "Reinforcement Learning Applications",
  "AI for Accessibility", "Algorithmic Bias and Fairness", "Explainable AI (XAI)",
  "AI in Music Production", "The Evolution of Chatbots", "AI in Human Resources",
  "Swarm Intelligence", "AI for Disaster Response", "Virtual Assistants and Smart Homes",
  "AI in Legal Tech", "Generative Adversarial Networks (GANs)", "AI for Wildlife Conservation",
  "The Role of AI in 5G", "AI and Blockchain", "AI in Sports Analytics",
  "Emotion AI and Affective Computing", "AI for Personalized Medicine", "AI in the Creative Industries",
  "Federated Learning", "AI and Mental Health", "AI in Supply Chain Management",
  "The Singularity: Fact or Fiction?", "AI Regulation and Policy"
];

const loremIpsum = `This article explores the profound implications of recent technological advancements. As artificial intelligence continues to evolve rapidly, the impact on various sectors is undeniable. We are seeing unprecedented growth and adoption of these technologies across the globe.

The foundational models powering this revolution are becoming more sophisticated, allowing for complex problem-solving that was previously thought impossible for machines. Researchers and developers are pushing the boundaries of what AI can achieve, bringing us closer to artificial general intelligence.

However, challenges remain. As we integrate AI more deeply into our systems, we must also consider the ethical, security, and societal impacts. It is a balancing act between innovation and responsibility. The next decade will be crucial in determining how we harness this immense power for the greater good of humanity.`;

const articles = [];
const today = new Date();

// Generate 60 days of history, 3 posts per day = 180 posts
let idCounter = 1;

for (let dayOffset = 0; dayOffset < 60; dayOffset++) {
  // Go backwards in time
  const postDate = new Date(today);
  postDate.setDate(postDate.getDate() - dayOffset);
  
  // 3 posts per day
  for (let postOfDay = 0; postOfDay < 3; postOfDay++) {
    // Offset hours slightly so they don't have the exact same timestamp
    postDate.setHours(10 + postOfDay * 4, 0, 0, 0); // 10 AM, 2 PM, 6 PM

    // Select a random topic or cycle through them
    const topicIndex = (dayOffset * 3 + postOfDay) % aiTopics.length;
    const baseTopic = aiTopics[topicIndex];
    
    // Add some variation to titles to avoid exact duplicates when cycling
    const titleVariations = ["Exploring ", "The State of ", "Why We Need ", "Understanding ", "The Future of ", "A Deep Dive into "];
    const prefix = titleVariations[idCounter % titleVariations.length];
    
    // If it already starts with "The Future of" etc, don't prepend, otherwise prepend
    const title = baseTopic.startsWith("The") || baseTopic.startsWith("Why") || baseTopic.startsWith("Understanding") 
      ? baseTopic 
      : `${prefix}${baseTopic}`;

    // Unique random-looking image using picsum with seed
    const imageSeed = `ai-blog-${dayOffset}-${postOfDay}`;
    const image = `https://picsum.photos/seed/${imageSeed}/800/600`;

    // Only add Sinhala to some recent posts (e.g., first 10 days) just to keep the feature alive
    const addSinhala = dayOffset < 10;
    
    const article = {
      id: Date.now().toString() + idCounter.toString().padStart(3, '0'),
      title: title,
      image: image,
      content: loremIpsum,
      createdAt: postDate.toISOString()
    };

    if (addSinhala) {
      article.contentSinhala = `මෙය ${title} පිළිබඳව ලියැවුණු ලිපියකි. කෘතිම බුද්ධියේ නවතම දියුණුවත් සමඟ ලොව පුරා බොහෝ ක්ෂේත්‍ර වෙනස් වෙමින් පවතී. මෙම වෙනස්කම් අපගේ අනාගතය කෙසේ හැඩගස්වනු ඇත්ද යන්න පිළිබඳව මෙම ලිපියෙන් සාකච්ඡා කෙරේ.`;
    }

    articles.push(article);
    idCounter++;
  }
}

// Sort by date descending (newest first)
articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

fs.writeFileSync(dataFilePath, JSON.stringify(articles, null, 2), 'utf8');
console.log(`Successfully generated ${articles.length} articles spanning 60 days.`);
