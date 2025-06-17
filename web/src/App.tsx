import React, { useState, useEffect } from 'react';
import { Code2, Database, Brain, Mail, Github, Linkedin, Calendar, Rocket, Globe, Server } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
    setEmail('');
    // You can add actual email handling logic here
  };

  const techStack = [
    { name: 'MongoDB', icon: Database, color: 'text-green-600' },
    { name: 'Express.js', icon: Server, color: 'text-gray-700' },
    { name: 'React', icon: Code2, color: 'text-blue-600' },
    { name: 'Node.js', icon: Globe, color: 'text-green-700' },
    { name: 'LangChain', icon: Brain, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Portfolio</span>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Status Badge */}
            <div className={`inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Rocket className="w-4 h-4 animate-pulse" />
              <span>Under Development</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Crafting innovative web solutions with the <span className="text-emerald-400 font-semibold">MERN stack</span> and 
              building intelligent applications powered by <span className="text-purple-400 font-semibold">LangChain</span>
            </p>

            {/* Tech Stack */}
            <div className={`mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-wrap justify-center gap-6">
                {techStack.map((tech, index) => (
                  <div 
                    key={tech.name}
                    className={`group flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <tech.icon className={`w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-2xl font-bold mb-4 text-white">Portfolio Coming Soon</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm currently putting the finishing touches on my portfolio website. It will showcase my latest projects, 
                case studies, and the innovative solutions I've built using modern web technologies and AI integration.
              </p>
              <div className="flex items-center justify-center space-x-2 text-emerald-400">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Expected Launch: Q1 2025</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className={`transform transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <p className="text-gray-300 mb-4">Get notified when it's ready!</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 md:p-8">
          <div className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@yourname.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Available for freelance work</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                © 2025 Your Name. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;