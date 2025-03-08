
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, User, Clock, ArrowLeft, Loader2 } from 'lucide-react';

// Define the blog post type
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
};

// Mock blog data (same as in BlogPosts.tsx)
const blogPosts = [
  {
    id: 1,
    title: "Eid Al-Fitr Celebration Highlights",
    excerpt: "Recap of our community's joyous Eid Al-Fitr celebration with photos and memorable moments.",
    content: `
      <p>As the blessed month of Ramadan came to a close, our community gathered to celebrate Eid Al-Fitr with joy and gratitude. The day began with a beautiful Eid prayer led by our Imam, followed by a heartfelt sermon that reminded us of the importance of unity, compassion, and carrying forward the spiritual lessons of Ramadan into our daily lives.</p>
      
      <p>The masjid was adorned with colorful decorations, creating a festive atmosphere that complemented the spirit of the occasion. Families arrived dressed in their finest attire, exchanging warm embraces and Eid greetings.</p>
      
      <h3>Community Gathering</h3>
      
      <p>Following the prayer, everyone moved to the community hall for a special Eid breakfast. The tables were filled with a variety of delicious foods contributed by community members, showcasing the diversity and culinary talents within our congregation.</p>
      
      <p>Children received Eid gifts and participated in fun activities organized by our youth committee. Their laughter and excitement added an extra layer of happiness to the celebration.</p>
      
      <h3>Honoring Our Volunteers</h3>
      
      <p>This year, we took a moment to recognize the dedicated volunteers who worked tirelessly throughout Ramadan to ensure our iftar programs, taraweeh prayers, and educational sessions ran smoothly. Their selfless service is a testament to the strong sense of community that defines our masjid.</p>
      
      <p>We also welcomed several new families who have recently joined our community, ensuring they felt included in our Eid festivities.</p>
      
      <h3>Looking Forward</h3>
      
      <p>As we celebrated together, we also reflected on our plans for the coming year. The masjid board announced several upcoming initiatives, including expanded educational programs, community service projects, and facilities improvements.</p>
      
      <p>We extend our heartfelt thanks to everyone who contributed to making this Eid celebration a memorable one. May Allah accept our fasts, prayers, and good deeds during Ramadan, and may He grant us the ability to maintain our spiritual growth throughout the year.</p>
      
      <p>Eid Mubarak to all!</p>
    `,
    date: "2023-04-22",
    author: "Imam Abdullah",
    readTime: "5 min read",
    category: "Events",
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: 2,
    title: "Understanding the Five Pillars of Islam",
    excerpt: "A comprehensive guide to the fundamental aspects of Islam that form the foundation of a Muslim's faith and practice.",
    content: `
      <p>The Five Pillars of Islam constitute the most essential foundations of Muslim life. They are the testimony of faith (Shahada), prayer (Salah), giving zakat (Zakah), fasting during Ramadan (Sawm), and the pilgrimage to Mecca (Hajj). These pillars are central to Muslims' lives, shaping their daily routines, annual activities, and lifelong spiritual journey.</p>
      
      <h3>1. Shahada: Declaration of Faith</h3>
      
      <p>The Shahada is the basic creed of Islam that must be recited under oath with the specific statement: "I testify that there is no god but Allah and I testify that Muhammad is the Messenger of Allah." This testament is the foundation for all other beliefs and practices in Islam.</p>
      
      <p>By declaring the Shahada, a person enters Islam and becomes a Muslim. This declaration affirms the monotheistic nature of Islam and acknowledges Muhammad (peace be upon him) as the final prophet.</p>
      
      <h3>2. Salah: Prayer</h3>
      
      <p>Muslims are required to perform five obligatory prayers each day. These prayers are performed at dawn (Fajr), noon (Dhuhr), late afternoon (Asr), sunset (Maghrib), and night (Isha). Prayer is a direct link between the worshiper and Allah, without any intermediaries.</p>
      
      <p>Before prayer, Muslims must perform a purification ritual called Wudu, and the prayer itself involves a series of movements and recitations that engage both mind and body in devotion.</p>
      
      <h3>3. Zakah: Almsgiving</h3>
      
      <p>Zakah is the practice of charitable giving by Muslims based on their accumulated wealth, and is obligatory for all who are able to do so. It is typically calculated as 2.5% of a Muslim's total savings and wealth above a minimum amount known as nisab.</p>
      
      <p>The word Zakah means both 'purification' and 'growth.' The giving of Zakah is meant to purify one's wealth and soul, while also helping those in need and fostering compassion and generosity.</p>
      
      <h3>4. Sawm: Fasting during Ramadan</h3>
      
      <p>Every year during the ninth month of the Islamic calendar, Ramadan, Muslims fast from dawn until sunset, abstaining from food, drink, and intimate relations. The purpose of fasting is to develop self-discipline, self-control, sacrifice, and empathy for those who are less fortunate.</p>
      
      <p>Ramadan is also a time of increased prayer, charity, and recitation of the Quran. The month culminates in the celebration of Eid al-Fitr.</p>
      
      <h3>5. Hajj: Pilgrimage to Mecca</h3>
      
      <p>The Hajj is an annual Islamic pilgrimage to Mecca, Saudi Arabia, the holiest city for Muslims. Every able-bodied Muslim who can afford to do so is obligated to make the pilgrimage at least once in their lifetime.</p>
      
      <p>The Hajj takes place during the last month of the Islamic calendar and includes several rituals that symbolize the essential concepts of the Islamic faith. It is also a time when Muslims from all over the world gather together, demonstrating the unity of the global Muslim community.</p>
      
      <h3>Conclusion</h3>
      
      <p>The Five Pillars provide the framework of Muslim life, binding together a diverse community of believers into a unified whole. By fulfilling these obligations, Muslims affirm their commitment to their faith both inwardly and outwardly, strengthening their relationship with Allah and with the broader community.</p>
      
      <p>Understanding these pillars is essential not only for Muslims but also for those seeking to understand Islam, as they represent the core practices and beliefs that define the Islamic faith.</p>
    `,
    date: "2023-03-15",
    author: "Shaykh Muhammad",
    readTime: "8 min read",
    category: "Education",
    image: "https://images.unsplash.com/photo-1597535973747-951442d5dbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXNsYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: 3,
    title: "Ramadan Preparations: A Practical Guide",
    excerpt: "Tips and advice on how to spiritually and physically prepare for the blessed month of Ramadan.",
    content: `
      <p>Ramadan, the ninth month of the Islamic calendar, is a time of spiritual reflection, self-improvement, and heightened devotion. Preparing for this blessed month can help maximize its benefits and make it a transformative experience. This guide offers practical advice on how to prepare both spiritually and physically for Ramadan.</p>
      
      <h3>Spiritual Preparations</h3>
      
      <h4>1. Increase Voluntary Worship</h4>
      <p>Begin increasing your voluntary acts of worship in the weeks leading up to Ramadan. This can include extra prayers (nafl), reading more Quran, and making dhikr (remembrance of Allah). This gradual increase helps condition your soul for the heightened worship during Ramadan.</p>
      
      <h4>2. Seek Knowledge</h4>
      <p>Take time to learn about the virtues and blessings of Ramadan. Understanding the significance of this month can increase your motivation and focus. Consider joining pre-Ramadan classes at your local masjid or online.</p>
      
      <h4>3. Make Sincere Intentions</h4>
      <p>Set clear intentions for what you hope to achieve during Ramadan. This might include completing the recitation of the Quran, improving certain aspects of your character, or strengthening your connection with Allah.</p>
      
      <h4>4. Seek Forgiveness</h4>
      <p>Use the time before Ramadan to seek Allah's forgiveness for past shortcomings. The Prophet Muhammad (peace be upon him) said, "Whoever fasts Ramadan out of faith and hoping for reward, all his previous sins will be forgiven."</p>
      
      <h3>Physical Preparations</h3>
      
      <h4>1. Adjust Your Schedule</h4>
      <p>Gradually adjust your sleeping and eating patterns to align with Ramadan timings. This is especially important if you will be waking up for suhoor (pre-dawn meal) and staying up late for taraweeh prayers.</p>
      
      <h4>2. Moderate Your Eating</h4>
      <p>Begin eating moderate portions before Ramadan to help your body adjust to the changes in eating patterns. Avoid excessive consumption of caffeine, sugar, and processed foods that may make fasting more difficult.</p>
      
      <h4>3. Plan Nutritious Meals</h4>
      <p>Plan your Ramadan menu in advance, focusing on nutritious, balanced meals for suhoor and iftar (breaking of the fast). Ensure your meals include proteins, complex carbohydrates, and healthy fats to sustain your energy throughout the day.</p>
      
      <h4>4. Hydrate Well</h4>
      <p>Increase your water intake in the weeks before Ramadan to ensure your body is well-hydrated. During Ramadan, plan to drink plenty of water between iftar and suhoor to maintain hydration during the fasting hours.</p>
      
      <h3>Practical Preparations</h3>
      
      <h4>1. Clear Your Schedule</h4>
      <p>Try to reduce your workload and social commitments during Ramadan. This will allow you to conserve energy during fasting hours and dedicate more time to worship.</p>
      
      <h4>2. Create a Ramadan Plan</h4>
      <p>Develop a daily schedule for Ramadan that includes time for prayers, Quran recitation, reflection, work, rest, and family. Having a structured plan helps ensure you make the most of this blessed month.</p>
      
      <h4>3. Prepare Your Home</h4>
      <p>Clean and organize your home before Ramadan begins. Consider creating a dedicated prayer or reading space where you can engage in worship without distractions.</p>
      
      <h4>4. Stock Your Kitchen</h4>
      <p>Purchase non-perishable food items and prepare and freeze some meals in advance to reduce cooking time during Ramadan, allowing more time for worship.</p>
      
      <h3>Community Preparations</h3>
      
      <h4>1. Reconnect with Community</h4>
      <p>Reach out to friends, family, and community members before Ramadan begins. Strengthen these relationships and consider making plans to break fast together or attend taraweeh prayers as a group.</p>
      
      <h4>2. Plan for Charity</h4>
      <p>Set aside a portion of your wealth for charity during Ramadan. The rewards for charitable acts are multiplied during this blessed month.</p>
      
      <p>By taking these steps to prepare for Ramadan, you can ensure that you enter the month ready to maximize its spiritual benefits while managing the physical challenges of fasting. Remember that Ramadan is not just about abstaining from food and drink but is a comprehensive exercise in self-discipline and heightened consciousness of Allah.</p>
    `,
    date: "2023-02-20",
    author: "Sister Aisha",
    readTime: "6 min read",
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1532635248-cdd3d399f56c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFtYWRhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: 4,
    title: "Youth Program Launch: Nurturing Future Leaders",
    excerpt: "Announcing our new youth development program focused on Islamic values, leadership, and community service.",
    content: `
      <p>We are excited to announce the launch of our new Youth Leadership Program, designed to nurture and develop the next generation of Muslim leaders in our community. This comprehensive program combines Islamic education, leadership development, and community service to help young Muslims navigate the challenges of modern life while staying true to their faith.</p>
      
      <h3>Program Vision</h3>
      
      <p>Our vision is to empower young Muslims with the knowledge, skills, and confidence they need to succeed in their personal, professional, and spiritual lives. We believe that by providing a supportive environment where youth can explore their faith, develop their leadership potential, and contribute to their community, we are investing in a brighter future for all.</p>
      
      <h3>Program Components</h3>
      
      <h4>1. Islamic Education</h4>
      <p>The foundation of our program is a strong understanding of Islamic principles and values. Weekly classes will cover:</p>
      <ul>
        <li>Quranic studies and tafsir (interpretation)</li>
        <li>Prophetic traditions and their application in contemporary life</li>
        <li>Islamic ethics and character development</li>
        <li>Comparative religion and interfaith understanding</li>
      </ul>
      
      <h4>2. Leadership Development</h4>
      <p>We will host monthly workshops focused on developing essential leadership skills:</p>
      <ul>
        <li>Public speaking and effective communication</li>
        <li>Team building and collaboration</li>
        <li>Project management and organization</li>
        <li>Conflict resolution and problem-solving</li>
      </ul>
      
      <h4>3. Community Service</h4>
      <p>Participants will be required to engage in regular community service activities, applying their learning in practical ways:</p>
      <ul>
        <li>Monthly community service projects</li>
        <li>Assisting with masjid programs and events</li>
        <li>Mentoring younger children</li>
        <li>Participating in interfaith and community outreach</li>
      </ul>
      
      <h4>4. Mentorship</h4>
      <p>Each participant will be paired with an adult mentor from our community who will provide guidance, support, and advice throughout the program. Mentors will be selected based on their expertise, character, and commitment to youth development.</p>
      
      <h3>Program Structure</h3>
      
      <p>The Youth Leadership Program will run throughout the academic year, with sessions held every Sunday from 10:00 AM to 1:00 PM at the masjid. The program is designed for youth ages 13-18 and will be divided into two age groups: 13-15 and 16-18.</p>
      
      <p>In addition to the weekly sessions, we will organize:</p>
      <ul>
        <li>Quarterly retreats focused on spiritual development and team building</li>
        <li>An annual leadership conference featuring guest speakers and workshops</li>
        <li>Summer service trips to apply leadership skills in different contexts</li>
      </ul>
      
      <h3>Registration Information</h3>
      
      <p>Registration for the Youth Leadership Program is now open. Space is limited to 30 participants per age group to ensure quality interaction and individual attention.</p>
      
      <p>To register, please complete the application form available at the masjid office or on our website. The application includes questions about the youth's interests, goals, and what they hope to gain from the program.</p>
      
      <p>A parent orientation session will be held on [date] at 7:00 PM to provide more information about the program and answer any questions.</p>
      
      <h3>Get Involved</h3>
      
      <p>We invite parents, community members, and professionals to get involved in this important initiative:</p>
      <ul>
        <li>Volunteer as a mentor or workshop facilitator</li>
        <li>Provide financial support for program activities and materials</li>
        <li>Offer internship or job shadowing opportunities for program participants</li>
        <li>Share your expertise through guest speaking opportunities</li>
      </ul>
      
      <p>We believe that by investing in our youth today, we are building a stronger, more vibrant community for tomorrow. We look forward to your support and participation in this exciting new program.</p>
      
      <p>For more information, please contact Brother Yusuf at youth@masjid.org or call the masjid office at (555) 123-4567.</p>
    `,
    date: "2023-01-10",
    author: "Brother Yusuf",
    readTime: "4 min read",
    category: "Youth",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzbGltJTIweW91dGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60"
  },
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching blog post data
    const fetchPost = () => {
      setLoading(true);
      setTimeout(() => {
        const foundPost = blogPosts.find(p => p.id === Number(id));
        setPost(foundPost || null);
        setLoading(false);
      }, 500); // Simulating network delay
    };
    
    fetchPost();
  }, [id]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-masjid-primary animate-spin mx-auto mb-4" />
            <p className="text-masjid-navy">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16">
          <div className="section-container text-center">
            <h1 className="text-2xl font-bold text-masjid-primary mb-4">Article Not Found</h1>
            <p className="text-masjid-navy mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBack}>Return to Blog</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="section-container max-w-4xl">
          <Button 
            variant="outline" 
            className="mb-6 flex items-center"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Blog
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-masjid-primary mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="outline" className="bg-masjid-cream text-masjid-navy">
                {post.category}
              </Badge>
              
              <div className="flex items-center text-sm text-masjid-navy/70">
                <CalendarIcon size={14} className="mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="flex items-center text-sm text-masjid-navy/70">
                <User size={14} className="mr-1" />
                {post.author}
              </div>
              
              <div className="flex items-center text-sm text-masjid-navy/70">
                <Clock size={14} className="mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>
          
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-masjid-navy/90">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-masjid-cream">
            <h3 className="text-xl font-semibold text-masjid-primary mb-4">Share This Article</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Facebook</Button>
              <Button size="sm" variant="outline">Twitter</Button>
              <Button size="sm" variant="outline">WhatsApp</Button>
              <Button size="sm" variant="outline">Email</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
