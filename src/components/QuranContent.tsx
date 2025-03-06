import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Headphones, Video, Download, ExternalLink, PlayCircle, User } from 'lucide-react';

const QuranContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Quran recitation data
  const recitations = [
    {
      id: 1,
      title: "Surah Al-Fatiha",
      reciter: "Sheikh Mishary Rashid Alafasy",
      duration: "1:24",
      audioUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1583354608715-163bc347e603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVyYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Surah Al-Baqarah (verses 1-5)",
      reciter: "Sheikh Abdul Rahman Al-Sudais",
      duration: "2:15",
      audioUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1609599006353-e629a7e3ea3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cXVyYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Surah Ya-Sin",
      reciter: "Sheikh Maher Al Muaiqly",
      duration: "12:45",
      audioUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1610308479130-5141d71ba6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHF1cmFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  ];
  
  // Mock Islamic resources
  const resources = [
    {
      id: 1,
      title: "Understanding the Quran: A Guide for Beginners",
      author: "Dr. Bilal Philips",
      type: "PDF",
      description: "A comprehensive guide for those beginning their journey with the Quran.",
      downloadUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXNsYW1pYyUyMGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "The Sealed Nectar",
      author: "Safiur Rahman Mubarakpuri",
      type: "Book",
      description: "Biography of the Prophet Muhammad (peace be upon him).",
      downloadUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1585436518410-191a8d3b1ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlzbGFtaWMlMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Fundamentals of Faith",
      author: "Sheikh Ibn Uthaymeen",
      type: "Article",
      description: "Explaining the core beliefs of Islam in a simple manner.",
      downloadUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1567929008300-64c332b98f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGlzbGFtaWMlMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  ];
  
  // Mock lecture videos
  const lectures = [
    {
      id: 1,
      title: "The Purpose of Life",
      speaker: "Dr. Zakir Naik",
      duration: "48:32",
      videoUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Understanding Tawheed",
      speaker: "Mufti Menk",
      duration: "32:15",
      videoUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Rights in Islam",
      speaker: "Nouman Ali Khan",
      duration: "52:10",
      videoUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxlY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
  ];

  // Filter based on search term
  const filteredRecitations = recitations.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.reciter.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredResources = resources.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLectures = lectures.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-masjid-light">
      <div className="section-container">
        <h1 className="section-title">Quran & Islamic Resources</h1>
        <p className="text-center text-masjid-navy/80 max-w-2xl mx-auto mb-10">
          Access Quran recitations, educational resources, and Islamic lectures to enhance your spiritual journey.
        </p>
        
        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-masjid-navy/50" size={18} />
            <Input
              type="text"
              placeholder="Search recitations, resources, or lectures..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabbed content */}
        <Tabs defaultValue="quran" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="quran" className="flex items-center">
              <BookOpen size={16} className="mr-2" /> Quran Recitations
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <Download size={16} className="mr-2" /> Islamic Resources
            </TabsTrigger>
            <TabsTrigger value="lectures" className="flex items-center">
              <Video size={16} className="mr-2" /> Video Lectures
            </TabsTrigger>
          </TabsList>
          
          {/* Quran Recitations Tab */}
          <TabsContent value="quran">
            {filteredRecitations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecitations.map(recitation => (
                  <Card key={recitation.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden relative group">
                      <img 
                        src={recitation.imageUrl} 
                        alt={recitation.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-masjid-navy/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="rounded-full" size="icon" variant="outline">
                          <PlayCircle size={40} className="text-white" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{recitation.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <Headphones size={16} className="mr-2 text-masjid-gold" />
                          {recitation.reciter}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-masjid-navy/70">{recitation.duration}</span>
                      <Button variant="outline" className="border-masjid-primary text-masjid-primary hover:bg-masjid-primary/10">
                        Listen
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-masjid-navy/70">No recitations found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          {/* Islamic Resources Tab */}
          <TabsContent value="resources">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-masjid-cream text-masjid-navy rounded-full">
                          {resource.type}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>
                        <div className="mb-2">{resource.author}</div>
                        <p className="line-clamp-2">{resource.description}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full">
                        <Download size={16} className="mr-2" /> Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-masjid-navy/70">No resources found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          {/* Video Lectures Tab */}
          <TabsContent value="lectures">
            {filteredLectures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLectures.map(lecture => (
                  <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden relative group">
                      <img 
                        src={lecture.thumbnailUrl} 
                        alt={lecture.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-masjid-navy/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="rounded-full" size="icon" variant="outline">
                          <PlayCircle size={40} className="text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                        {lecture.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{lecture.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-masjid-gold" />
                          {lecture.speaker}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full">
                        <ExternalLink size={16} className="mr-2" /> Watch Lecture
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-masjid-navy/70">No lectures found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default QuranContent;
