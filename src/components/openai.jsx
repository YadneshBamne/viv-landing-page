import React from 'react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { ChevronRight, MenuIcon } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const OpenAIAPIPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="bg-[#07080A] text-white min-h-screen">
      {/* Header */}
<div>
    <Navbar/>

    </div>

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl mx-auto">
          The fastest and most powerful platform for building AI products
        </h1>
        <p className="text-lg mb-6 max-w-xl mx-auto text-white/80">
          Build transformative AI experiences powered by industry-leading models and tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <Button className="bg-white text-black hover:bg-white/90 cursor-pointer">Start building</Button>
          <Button variant="yadnesh" className="bg-transparent text-white cursor-pointer">View API pricing<ChevronRight width={30}/></Button>
        </div>
      </section>

      {/* Models Section */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Flagship Models</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Card Template */}
          {[
            {
              title: 'VIV V1',
              desc: 'Smartest model for complex tasks',
              features: ['Text and vision', '1M context length'],
              pricing: 'Input: ₹1 | Output: ₹1 per 1M tokens',
            },
            {
              title: 'VIV V2',
              desc: 'Affordable model balancing speed and intelligence',
              features: ['Text and vision', '1M context length'],
              pricing: 'Input: ₹1 | Output: ₹1 per 1M tokens',
            },
            {
              title: 'VIV V3',
              desc: 'Fastest, most cost-effective model for low-latency tasks',
              features: ['Text and vision', '1M context length'],
              pricing: 'Input: ₹1 | Output: ₹1 per 1M tokens',
            },
          ].map((model) => (
            <div key={model.title} className="border border-white/10 p-6 rounded-lg bg-white/5 text-left">
              <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
              <p className="text-sm mb-4 text-white/80">{model.desc}</p>
              <ul className="text-sm mb-4 list-disc list-inside text-white/70">
                {model.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="text-sm mb-4 text-white/70">{model.pricing}</p>
              <Button variant="link" className="text-blue-400 px-0">Learn more</Button>
            </div>
          ))}
        </div>
      </section>

      {/* APIs Section */}
      {/* <section className="px-6 py-16 bg-white/5">
        <h2 className="text-3xl font-bold mb-8 text-center">Access the power of our models with APIs</h2>
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="responses" className="w-full">
            <TabsList className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-6">
              {['responses', 'chat', 'realtime', 'assistants', 'batch'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2 rounded-md border border-white/10"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} API
                </TabsTrigger>
              ))}
            </TabsList>
            {[
              {
                value: 'responses',
                title: 'Responses API',
                desc: 'A new API primitive for agents, combining the simplicity of Chat Completions with the ability to use built-in tools like the Assistants API.',
              },
              {
                value: 'chat',
                title: 'Chat Completions API',
                desc: 'Get access to our most powerful models with a few lines of code.',
              },
              {
                value: 'realtime',
                title: 'Realtime API',
                desc: 'Build low-latency, multimodal experiences, including speech-to-speech.',
              },
              {
                value: 'assistants',
                title: 'Assistants API',
                desc: 'Build AI assistants within your own applications that can leverage models, tools, and knowledge to do complex, multi-step tasks.',
              },
              {
                value: 'batch',
                title: 'Batch API',
                desc: 'Run asynchronous workloads for 50% of the cost over 24 hours.',
              },
            ].map(({ value, title, desc }) => (
              <TabsContent key={value} value={value}>
                <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-sm mb-4 text-white/80">{desc}</p>
                  <Button variant="link" className="text-blue-400 px-0">Learn more</Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section> */}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default OpenAIAPIPage;
