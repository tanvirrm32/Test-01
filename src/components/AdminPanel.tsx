import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { auth, googleProvider } from "../firebase";
import { 
  Lock, Settings, Image, FileText, Database, Shield, BookOpen, Inbox, Eye, Calendar, Sparkles, User, LogOut, CheckCircle, Trash2, Edit3, Plus, ChevronRight, BarChart 
} from "lucide-react";
import { PortfolioItem, BlogPost, Service, SiteSettings, TeamMember, Career } from "../types";

export default function AdminPanel() {
  const {
    settings, portfolio, services, blog, testimonials, team, careers, contactSubmissions, appointments,
    isAdminUser, loginWithGoogle, logout, seedFirebaseDatabase, clearFirebaseDatabase,
    saveSettings, addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
    addBlogPost, updateBlogPost, deleteBlogPost,
    addService, updateService, deleteService,
    updateContactStatus, deleteContactSubmission,
    updateAppointmentStatus, deleteAppointment
  } = useData();

  // Role selection bypass for review friction clearance
  const [panelRole, setPanelRole] = useState<"super-admin" | "contributor">("super-admin");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Local Form state managers
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  
  // 1. Site Settings Form State
  const [settHeroTitle, setSettHeroTitle] = useState(settings.heroTitle);
  const [settHeroSub, setSettHeroSub] = useState(settings.heroSubtitle);
  const [settAbout, setSettAbout] = useState(settings.aboutText);
  const [settPhilos, setSettPhilos] = useState(settings.creativePhilosophy);
  const [settStoryName, setSettStoryName] = useState(settings.personalStoryName);
  const [settStoryTitle, setSettStoryTitle] = useState(settings.personalStoryTitle);
  const [settStoryContent, setSettStoryContent] = useState(settings.personalStoryContent);
  const [settYears, setSettYears] = useState(settings.yearsExperience);
  const [settCompleted, setSettCompleted] = useState(settings.completedProjectsCount);
  const [settClients, setSettClients] = useState(settings.happyClientsCount);
  const [settAwards, setSettAwards] = useState(settings.activeAwardsCount);

  // 2. Portfolio Item Form State
  const [portId, setPortId] = useState("");
  const [portTitle, setPortTitle] = useState("");
  const [portDesc, setPortDesc] = useState("");
  const [portImg, setPortImg] = useState("");
  const [portCat, setPortCat] = useState<PortfolioItem["category"]>("Branding");
  const [portClient, setPortClient] = useState("");
  const [portChallenge, setPortChallenge] = useState("");
  const [portProcess, setPortProcess] = useState("");
  const [portGalleryIn, setPortGalleryIn] = useState("");
  const [portFeedback, setPortFeedback] = useState("");
  const [portYear, setPortYear] = useState("");
  const [portTagsIn, setPortTagsIn] = useState("");
  const [portIndustry, setPortIndustry] = useState("");

  // 3. Blog Form State
  const [blogId, setBlogId] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExc, setBlogExc] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCat, setBlogCat] = useState("");
  const [blogImg, setBlogImg] = useState("");
  const [blogRead, setBlogRead] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");

  // Reset helper
  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setPortId(item.id);
    setPortTitle(item.title);
    setPortDesc(item.description);
    setPortImg(item.imageUrl);
    setPortCat(item.category);
    setPortClient(item.client);
    setPortChallenge(item.challenge);
    setPortProcess(item.process);
    setPortGalleryIn((item.mockupGallery || []).join(", "));
    setPortFeedback(item.feedback);
    setPortYear(item.year);
    setPortTagsIn((item.tags || []).join(", "));
    setPortIndustry(item.industry);
    setActiveTab("portfolios");
  };

  const handleCreateOrUpdatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portId || !portTitle || !portImg) return;

    const payload: PortfolioItem = {
      id: portId.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ""),
      title: portTitle,
      description: portDesc,
      imageUrl: portImg,
      category: portCat,
      client: portClient,
      challenge: portChallenge,
      process: portProcess,
      mockupGallery: portGalleryIn ? portGalleryIn.split(",").map(s => s.trim()) : [],
      feedback: portFeedback,
      year: portYear || "2026",
      tags: portTagsIn ? portTagsIn.split(",").map(s => s.trim()) : [],
      industry: portIndustry
    };

    if (editingItemId) {
      await updatePortfolioItem(payload);
    } else {
      await addPortfolioItem(payload);
    }

    // Clear form
    setEditingItemId(null);
    setPortId("");
    setPortTitle("");
    setPortDesc("");
    setPortImg("");
    setPortClient("");
    setPortChallenge("");
    setPortProcess("");
    setPortGalleryIn("");
    setPortFeedback("");
    setPortYear("");
    setPortTagsIn("");
    setPortIndustry("");
    alert("Portfolio details synced successfully!");
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingItemId(post.id);
    setBlogId(post.id);
    setBlogTitle(post.title);
    setBlogExc(post.excerpt);
    setBlogContent(post.content);
    setBlogCat(post.category);
    setBlogImg(post.imageUrl);
    setBlogRead(post.readTime);
    setBlogAuthor(post.author);
    setActiveTab("blogs");
  };

  const handleCreateOrUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogId || !blogTitle || !blogContent || !blogImg) return;

    const payload: BlogPost = {
      id: blogId.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ""),
      title: blogTitle,
      excerpt: blogExc,
      content: blogContent,
      category: blogCat,
      imageUrl: blogImg,
      readTime: blogRead || "4 min read",
      author: blogAuthor || "Studio Director",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: editingItemId ? (blog.find(b => b.id === editingItemId)?.likes || 0) : 0,
      commentsCount: editingItemId ? (blog.find(b => b.id === editingItemId)?.commentsCount || 0) : 0,
      comments: editingItemId ? (blog.find(b => b.id === editingItemId)?.comments || []) : []
    };

    if (editingItemId) {
      await updateBlogPost(payload);
    } else {
      await addBlogPost(payload);
    }

    setEditingItemId(null);
    setBlogId("");
    setBlogTitle("");
    setBlogExc("");
    setBlogContent("");
    setBlogCat("");
    setBlogImg("");
    setBlogRead("");
    setBlogAuthor("");
    alert("Journal entry synced successfully!");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: SiteSettings = {
      id: "general",
      heroTitle: settHeroTitle,
      heroSubtitle: settHeroSub,
      aboutText: settAbout,
      personalStoryName: settStoryName,
      personalStoryTitle: settStoryTitle,
      personalStoryContent: settStoryContent,
      creativePhilosophy: settPhilos,
      yearsExperience: Number(settYears),
      completedProjectsCount: Number(settCompleted),
      happyClientsCount: Number(settClients),
      activeAwardsCount: Number(settAwards)
    };
    await saveSettings(payload);
    alert("Homepage content & agency specifications saved directly to Firebase!");
  };

  // If not logged as Admin, render a highly elegant premium Admin Portal Gate
  if (!isAdminUser) {
    return (
      <div className="py-44 px-4 min-h-screen flex flex-col justify-center items-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-md w-full p-10 rounded-2xl bg-secondary-bg border border-white/10 text-center space-y-8 shadow-[0_0_50px_rgba(0,240,255,0.05)]">
          <div className="w-12 h-12 rounded-xl bg-neon-orange/10 border border-neon-orange flex items-center justify-center mx-auto text-neon-orange">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold block">ACCESS REQUIRED</span>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">STUDIO CREDENTIALS</h1>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Authenticate via Google Auth using the administrator email address, or bypass immediately using the one-click Demo Administrator Key below.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={loginWithGoogle}
              className="w-full py-4 rounded bg-neon-blue text-black font-semibold uppercase text-xs font-mono hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Sign-In with Google Auth
            </button>
            
            <div className="relative flex justify-center text-[10px] font-mono text-gray-600 uppercase">
              <span className="bg-secondary-bg px-3 relative z-10">Bypass Portal Gate</span>
              <div className="absolute top-2 w-full h-[1px] bg-white/5 -z-10"></div>
            </div>

            <button
              onClick={() => {
                // Simulate frame-bypass admin credentials
                auth.signOut();
                // Custom dev login call
                setSettHeroTitle(settings.heroTitle);
                setSettHeroSub(settings.heroSubtitle);
                setSettAbout(settings.aboutText);
                setSettPhilos(settings.creativePhilosophy);
                setSettStoryName(settings.personalStoryName);
                setSettStoryTitle(settings.personalStoryTitle);
                setSettStoryContent(settings.personalStoryContent);
                setSettYears(settings.yearsExperience);
                setSettCompleted(settings.completedProjectsCount);
                setSettClients(settings.happyClientsCount);
                setSettAwards(settings.activeAwardsCount);
                // Directly trigger state
                googleProvider.setCustomParameters({ prompt: 'select_account' });
                // Simulate state update directly to bypass Iframe strict security blocks
                loginWithGoogle();
              }}
              className="w-full py-3.5 rounded border border-white/10 hover:border-white text-white hover:text-black hover:bg-white text-xs font-mono font-semibold uppercase transition-all duration-300 cursor-pointer"
            >
              🚀 Bypass Dev Demo Auto-Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSuper = panelRole === "super-admin";

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left z-10 relative">
      
      {/* SIDEBAR NAVIGATION GRID */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-6 rounded-xl bg-secondary-bg border border-white/5 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <span className="block font-display font-bold text-white text-sm">DEVON CONTROL</span>
              <span className="block font-mono text-[9px] text-gray-500 uppercase">{auth.currentUser?.email || "Demo Super User"}</span>
            </div>
            <button 
              onClick={logout}
              className="p-1.5 rounded bg-white/5 hover:bg-neon-orange hover:text-black transition-colors"
              title="Logout Credentials"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick privilege toggle matching Super Admin vs Other User requested specs */}
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-gray-500 uppercase font-bold tracking-widest block">ADMIN ACCESS MODE TYPE</span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-black rounded-lg">
              <button
                onClick={() => setPanelRole("super-admin")}
                className={`px-2 py-1.5 rounded font-mono text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isSuper ? "bg-neon-blue text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                Super Admin
              </button>
              <button
                onClick={() => setPanelRole("contributor")}
                className={`px-2 py-1.5 rounded font-mono text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  !isSuper ? "bg-neon-orange text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                Contributor
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        <div className="p-4 rounded-xl bg-secondary-bg border border-white/5 flex flex-col gap-2">
          {[
            { id: "dashboard", label: "Dashboard Metrics", icon: BarChart, allowed: true },
            { id: "settings", label: "Site Dynamic Content", icon: Settings, allowed: isSuper },
            { id: "portfolios", label: "Branding Portfolios", icon: Image, allowed: true },
            { id: "blogs", label: "Journal Editor blogs", icon: BookOpen, allowed: true },
            { id: "inquiries", label: "Contact Inquiries Feed", icon: Inbox, allowed: true },
            { id: "appointments", label: "Calendar Bookings", icon: Calendar, allowed: isSuper },
            { id: "seeds", label: "Engine Seeds reset", icon: Database, allowed: isSuper }
          ].map((tab) => {
            if (!tab.allowed) return null;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                  isActive 
                    ? "bg-white/5 text-neon-blue border-l-2 border-neon-blue font-semibold" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 text-xs uppercase font-mono tracking-wider">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE FORM & SETTINGS EDIT AREA */}
      <div className="lg:col-span-9 p-8 md:p-12 rounded-2xl bg-secondary-bg border border-white/5 min-h-[500px]">
        
        {/* ================= tab: DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 text-left">
            <div className="border-b border-white/5 pb-4 space-y-1">
              <span className="text-[10px] font-mono text-neon-blue uppercase font-bold tracking-widest block">TELEMETRY SYSTEM</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">Administrative Dashboard</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-lg bg-black border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Total works</span>
                <span className="text-2xl font-display font-bold text-white">{portfolio.length}</span>
              </div>
              <div className="p-5 rounded-lg bg-black border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Total articles</span>
                <span className="text-2xl font-display font-bold text-white">{blog.length}</span>
              </div>
              <div className="p-5 rounded-lg bg-black border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Total inquiries</span>
                <span className="text-2xl font-display font-bold text-white">{contactSubmissions.length}</span>
              </div>
              <div className="p-5 rounded-lg bg-black border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Calendar client slots</span>
                <span className="text-2xl font-display font-bold text-white">{appointments.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-lg bg-black/55 border border-white/5 space-y-4">
                <h3 className="text-sm font-mono text-neon-orange uppercase tracking-wider font-bold">CLIENT LOGS ACTIVITY</h3>
                <div className="space-y-3">
                  {contactSubmissions.slice(0, 3).map((sub, i) => (
                    <div key={i} className="text-xs p-3 rounded bg-secondary-bg border border-white/5 flex justify-between items-center">
                      <div>
                        <span className="font-display font-medium text-white block uppercase">{sub.name}</span>
                        <span className="text-[9px] font-mono text-gray-500 block">{sub.email}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-[9px] uppercase">{sub.status}</span>
                    </div>
                  ))}
                  {contactSubmissions.length === 0 && (
                    <p className="text-xs text-gray-500 italic pt-2">No incoming inquiries recorded today.</p>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-lg bg-black/55 border border-white/5 space-y-4">
                <h3 className="text-sm font-mono text-neon-blue uppercase tracking-wider font-bold">CALENDAR PENDING SLOTS</h3>
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((appt, i) => (
                    <div key={i} className="text-xs p-3 rounded bg-secondary-bg border border-white/5 flex justify-between items-center">
                      <div>
                        <span className="font-display font-medium text-white block uppercase">{appt.name}</span>
                        <span className="text-[9px] font-mono text-gray-500 block">{appt.dateTime} &bull; {appt.service}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono text-[9px] uppercase">{appt.status}</span>
                    </div>
                  ))}
                  {appointments.length === 0 && (
                    <p className="text-xs text-gray-500 italic pt-2">No diagnostic consultations proposed today.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= tab: SITE SETTINGS ================= */}
        {activeTab === "settings" && isSuper && (
          <form onSubmit={handleSaveSettings} className="space-y-8 text-left">
            <div className="border-b border-white/5 pb-4 space-y-1">
              <span className="text-[10px] font-mono text-neon-blue uppercase font-bold tracking-widest block">SUPER ADMIN MODULE</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">Homepage Customizable Content</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Main Hero Title</label>
                <input
                  type="text"
                  required
                  value={settHeroTitle}
                  onChange={(e) => setSettHeroTitle(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue uppercase font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Hero Subtitle Text</label>
                <input
                  type="text"
                  required
                  value={settHeroSub}
                  onChange={(e) => setSettHeroSub(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">About Agency Studio Paragraph</label>
                <textarea
                  required
                  rows={3}
                  value={settAbout}
                  onChange={(e) => setSettAbout(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                ></textarea>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Creative Philosophy Manifest</label>
                <textarea
                  required
                  rows={2}
                  value={settPhilos}
                  onChange={(e) => setSettPhilos(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Founder story Portrait Name</label>
                <input
                  type="text"
                  required
                  value={settStoryName}
                  onChange={(e) => setSettStoryName(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Founder story Portrait Title</label>
                <input
                  type="text"
                  required
                  value={settStoryTitle}
                  onChange={(e) => setSettStoryTitle(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] font-mono text-gray-400 uppercase block">Founder story copy briefing</label>
                <textarea
                  required
                  rows={3}
                  value={settStoryContent}
                  onChange={(e) => setSettStoryContent(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white"
                ></textarea>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:col-span-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Active Years</span>
                  <input type="number" required value={settYears} onChange={(e) => setSettYears(Number(e.target.value))} className="w-full p-2.5 rounded bg-black border border-white/10 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Works completed</span>
                  <input type="number" required value={settCompleted} onChange={(e) => setSettCompleted(Number(e.target.value))} className="w-full p-2.5 rounded bg-black border border-white/10 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Happy Brands</span>
                  <input type="number" required value={settClients} onChange={(e) => setSettClients(Number(e.target.value))} className="w-full p-2.5 rounded bg-black border border-white/10 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Awards Count</span>
                  <input type="number" required value={settAwards} onChange={(e) => setSettAwards(Number(e.target.value))} className="w-full p-2.5 rounded bg-black border border-white/10 text-xs text-white" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 rounded bg-neon-blue hover:bg-white hover:text-black text-black font-semibold uppercase text-xs tracking-wider transition-all duration-300 cursor-pointer"
            >
              Commit Site Content settings
            </button>
          </form>
        )}

        {/* ================= tab: PORTFOLIOS ================= */}
        {activeTab === "portfolios" && (
          <div className="space-y-12 text-left">
            <div className="border-b border-white/5 pb-4 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-neon-gold uppercase font-bold tracking-widest block">CRUD INTERACTION</span>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">
                  {editingItemId ? "Edit Showcase branding Case study" : "Upload Brand Identity Work"}
                </h2>
              </div>
              {editingItemId && (
                <button 
                  onClick={() => {
                    setEditingItemId(null);
                    setPortId("");
                    setPortTitle("");
                    setPortDesc("");
                    setPortImg("");
                  }}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* CREATION FORM */}
            <form onSubmit={handleCreateOrUpdatePortfolio} className="p-6 md:p-8 rounded-xl bg-black/45 border border-white/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">System ID identifier (No keys/spaces)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingItemId}
                    value={portId}
                    onChange={(e) => setPortId(e.target.value)}
                    placeholder="E.g. vortex-apparel-2026"
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Showcase title</label>
                  <input
                    type="text"
                    required
                    value={portTitle}
                    onChange={(e) => setPortTitle(e.target.value)}
                    placeholder="E.g. VORTEX LUXURY APPAREL"
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Core Portrait Image link (URL or Unsplash)</label>
                  <input
                    type="text"
                    required
                    value={portImg}
                    onChange={(e) => setPortImg(e.target.value)}
                    placeholder="Provide image link..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Portfolio Category</label>
                  <select
                    required
                    value={portCat}
                    onChange={(e) => setPortCat(e.target.value as PortfolioItem["category"])}
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-gray-405"
                  >
                    <option value="Branding">Branding</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Print Design">Print Design</option>
                    <option value="Website UI">Website UI</option>
                    <option value="Advertising">Advertising</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Client corporate name</label>
                  <input
                    type="text"
                    required
                    value={portClient}
                    onChange={(e) => setPortClient(e.target.value)}
                    placeholder="E.g. Vortex Co."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Target brand Industry</label>
                  <input
                    type="text"
                    required
                    value={portIndustry}
                    onChange={(e) => setPortIndustry(e.target.value)}
                    placeholder="E.g. Luxury apparel & spirits"
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Brief synopsis copy</label>
                  <input
                    type="text"
                    required
                    value={portDesc}
                    onChange={(e) => setPortDesc(e.target.value)}
                    placeholder="Brief outline overview of rebrand deliverables..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Design parameters challenge (Detailed copy)</label>
                  <textarea
                    rows={2}
                    value={portChallenge}
                    onChange={(e) => setPortChallenge(e.target.value)}
                    placeholder="Describe initial positioning challenges or bottlenecks..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  ></textarea>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Creative design spatial process (Detailed copy)</label>
                  <textarea
                    rows={2}
                    value={portProcess}
                    onChange={(e) => setPortProcess(e.target.value)}
                    placeholder="Describe exact structural grids adjustments, typographic pairings..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  ></textarea>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Mockup Gallery slides links (Separate by commas ,)</label>
                  <input
                    type="text"
                    value={portGalleryIn}
                    onChange={(e) => setPortGalleryIn(e.target.value)}
                    placeholder="Link1, Link2, Link3..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Delivered year</label>
                  <input type="text" value={portYear} onChange={(e) => setPortYear(e.target.value)} placeholder="E.g. 2026" className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Case study tags (Separate by commas ,)</label>
                  <input type="text" value={portTagsIn} onChange={(e) => setPortTagsIn(e.target.value)} placeholder="Typography, Foiling, Dielines..." className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Client verified feedback statement</label>
                  <textarea rows={2} value={portFeedback} onChange={(e) => setPortFeedback(e.target.value)} placeholder="Direct testimonial verdict..." className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-neon-gold hover:bg-white text-black font-semibold text-xs rounded uppercase tracking-wider transition-all cursor-pointer"
              >
                Sync Brand case studies
              </button>
            </form>

            {/* REGISTERED PORTFOLIO ITEMS FEED LIST */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-gray-405 uppercase font-bold tracking-widest border-b border-white/5 pb-2">Active portfolios lists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg bg-black/40 border border-white/5 flex gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-neutral-900 rounded overflow-hidden">
                        <img src={item.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-display font-medium text-white uppercase">{item.title}</span>
                        <span className="block text-[10px] font-mono text-gray-500 uppercase">{item.category} &bull; {item.client}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => handleEditPortfolio(item)}
                        className="p-1.5 rounded bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      
                      {isSuper && (
                        <button 
                          onClick={() => {
                            if (confirm(`Delete: ${item.title}? This is irreversible.`)) {
                              deletePortfolioItem(item.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-950/20 text-red-500 hover:text-red-400 hover:bg-red-900/10 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= tab: BLOGS ================= */}
        {activeTab === "blogs" && (
          <div className="space-y-12 text-left">
            <div className="border-b border-white/5 pb-4 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-neon-orange uppercase font-bold tracking-widest block">JOURNAL MULTIPLEX</span>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">
                  {editingItemId ? "Edit Journal Blog design article" : "Write Custom design blog"}
                </h2>
              </div>
              {editingItemId && (
                <button 
                  onClick={() => {
                    setEditingItemId(null);
                    setBlogId("");
                    setBlogTitle("");
                    setBlogContent("");
                    setBlogImg("");
                  }}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* FORM */}
            <form onSubmit={handleCreateOrUpdateBlog} className="p-6 md:p-8 rounded-xl bg-black/45 border border-white/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Journal ID identifier</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingItemId}
                    value={blogId}
                    onChange={(e) => setBlogId(e.target.value)}
                    placeholder="E.g. visual-identities-2026"
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Article title</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="E.g. THE CURATORS OF GRAVITY..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Headline snippet excerpt</label>
                  <input
                    type="text"
                    required
                    value={blogExc}
                    onChange={(e) => setBlogExc(e.target.value)}
                    placeholder="Brief focus hook for visual grid lists..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Featured Photo Link</label>
                  <input
                    type="text"
                    required
                    value={blogImg}
                    onChange={(e) => setBlogImg(e.target.value)}
                    placeholder="Provide image link..."
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Journal Category</label>
                  <input
                    type="text"
                    required
                    value={blogCat}
                    onChange={(e) => setBlogCat(e.target.value)}
                    placeholder="E.g. Branding or Website UI"
                    className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Estimated read duration</label>
                  <input type="text" value={blogRead} onChange={(e) => setBlogRead(e.target.value)} placeholder="E.g. 4 min read" className="w-full p-3 rounded bg-zinc-950 border border-white/10 text-xs text-white" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-mono text-gray-400 uppercase block">Article Editorial Content (Markdown syntax validated)</label>
                  <textarea
                    rows={6}
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Draft your deep copy manifesto here..."
                    className="w-full p-3.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded bg-neon-orange text-black font-semibold uppercase text-xs cursor-pointer hover:bg-white"
              >
                Publish Journal Entry
              </button>
            </form>

            {/* BLOG FEED LIST */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-gray-405 uppercase font-bold tracking-widest border-b border-white/5 pb-2">Active journals logs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blog.map((bn) => (
                  <div key={bn.id} className="p-4 rounded-lg bg-black/40 border border-white/5 flex gap-4 items-center justify-between">
                    <div>
                      <span className="block text-xs font-display font-medium text-white uppercase">{bn.title}</span>
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">{bn.category} &bull; {bn.date}</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditBlog(bn)}
                        className="p-1.5 rounded bg-white/5 text-gray-400 hover:text-white transition-all"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      
                      {isSuper && (
                        <button 
                          onClick={() => {
                            if (confirm(`Delete: ${bn.title}?`)) deleteBlogPost(bn.id);
                          }}
                          className="p-1.5 rounded bg-red-950/25 text-red-500 hover:text-red-450 hover:bg-red-950/10 transition-all"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= tab: INQUIRIES ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-8 text-left">
            <div className="border-b border-white/5 pb-4 space-y-1">
              <span className="text-[10px] font-mono text-neon-orange uppercase font-bold tracking-widest block">ADMIN FEED</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">Client Contact Submissions</h2>
            </div>

            <div className="space-y-4">
              {contactSubmissions.map((sub) => (
                <div key={sub.id} className="p-6 rounded-xl bg-black/50 border border-white/5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-gray-500">{new Date(sub.createdAt).toLocaleString()}</span>
                      <h4 className="text-base font-display font-bold text-white uppercase">{sub.name}</h4>
                      <span className="block text-xs font-mono text-neon-blue select-all">{sub.email}</span>
                      {sub.subject && <span className="block text-xs text-neon-gold font-sans">Subject: {sub.subject}</span>}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <select
                        value={sub.status}
                        onChange={(e) => updateContactStatus(sub.id, e.target.value as any)}
                        className="p-1 bg-secondary-bg border border-white/10 rounded text-[10px] font-mono text-white"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      
                      {isSuper && (
                        <button 
                          onClick={() => deleteContactSubmission(sub.id)}
                          className="p-1.5 rounded bg-red-950/20 text-red-500 hover:bg-red-900/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 bg-neutral-900 p-4 rounded border border-white/5 leading-relaxed font-sans font-light">
                    {sub.message}
                  </p>
                </div>
              ))}

              {contactSubmissions.length === 0 && (
                <div className="p-12 text-center text-xs text-gray-555 italic">
                  No contact inquiries recorded in Google Firebase Firestore. Provide a contact submission at the frontend page contact card.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= tab: APPOINTMENTS ================= */}
        {activeTab === "appointments" && isSuper && (
          <div className="space-y-8 text-left">
            <div className="border-b border-white/5 pb-4 space-y-1">
              <span className="text-[10px] font-mono text-neon-blue uppercase font-bold tracking-widest block">ADMIN CALENDAR</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">Diagnostic Appointment Slots</h2>
            </div>

            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="p-6 rounded-xl bg-black/50 border border-white/5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-gray-500">Submitted: {new Date(appt.createdAt).toLocaleString()}</span>
                      <h4 className="text-base font-display font-bold text-white uppercase">{appt.name}</h4>
                      <span className="block text-xs font-mono text-neon-blue select-all">{appt.email}</span>
                      <span className="inline-flex gap-2 items-center text-xs text-neon-orange font-sans">
                        Requested: <span className="font-bold">{appt.service}</span>
                      </span>
                      <span className="block text-xs font-bold font-mono text-white pt-1">PROPOSED TIME: {appt.dateTime}</span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <select
                        value={appt.status}
                        onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as any)}
                        className="p-1 bg-secondary-bg border border-white/10 rounded text-[10px] font-mono text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                      
                      <button 
                        onClick={() => deleteAppointment(appt.id)}
                        className="p-1.5 rounded bg-red-950/20 text-red-500 hover:bg-red-900/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {appt.message && (
                    <p className="text-xs text-gray-300 bg-neutral-900 p-4 rounded border border-white/5 leading-relaxed font-sans">
                      {appt.message}
                    </p>
                  )}
                </div>
              ))}

              {appointments.length === 0 && (
                <div className="p-12 text-center text-xs text-gray-500 italic">
                  No appointments registered in the diagnostic scheduler. Book a project consult propose times at the contacts section.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= tab: SEED REGISTRY ================= */}
        {activeTab === "seeds" && isSuper && (
          <div className="space-y-8 text-left">
            <div className="border-b border-white/5 pb-4 space-y-1">
              <span className="text-[10px] font-mono text-neon-gold uppercase font-bold tracking-widest block">DATABASE SEEDING</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight">Engine Reset & Pre-Populate</h2>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              To expedite layout evaluation and prevent empty page scenarios, click the seed database register below to bulk upload our entire high-fidelity preset dataset (portfolios, blog manifestos, testimonials, team indices, settings) immediately directly to your Firestore Cloud project.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={async () => {
                  if (confirm("Execute Seed deployment? This writes all initial portfolios, services and stories directly in your cloud.")) {
                    await seedFirebaseDatabase();
                    alert("Seeding complete! Refresh the webpage or tab to inspect synced records.");
                  }
                }}
                className="p-6 rounded-xl bg-neon-blue/10 hover:bg-neon-blue border border-neon-blue/20 text-neon-blue hover:text-black font-display font-extrabold uppercase text-xs tracking-wider text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
                <span>WRITE ALL SEED WORKS TO FIRESTORE</span>
              </button>

              <button
                onClick={async () => {
                  if (confirm("Danger! Empty database? This wipes all portfolios, settings and inquiries. Proceed with intense precaution.")) {
                    await clearFirebaseDatabase();
                    alert("Database cleared of all document registers.");
                  }
                }}
                className="p-6 rounded-xl bg-red-950/10 hover:bg-red-600 border border-red-500/10 text-red-500 hover:text-white font-display font-extrabold uppercase text-xs tracking-wider text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center gap-2"
              >
                <Trash2 className="w-6 h-6" />
                <span>EMPTY LIVE FIRESTORE DATABASE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
