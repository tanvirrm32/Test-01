import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { Search, Heart, MessageSquare, ArrowRight, X, Sparkles, Smile, Share2, BookOpen } from "lucide-react";
import { BlogPost } from "../../types";

interface BlogProps {
  selectedBlogId?: string | null;
  onClearBlogSelection?: () => void;
}

export default function Blog({ selectedBlogId, onClearBlogSelection }: BlogProps) {
  const { blog, likeBlogPost, addCommentToBlogPost } = useData();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Comment Form State
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [likesCount, setLikesCount] = useState<number>(0);
  
  // Newsletter Subscribe state
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Reading progress scroll state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto trigger detailed view if navigated with specific ID
  useState(() => {
    if (selectedBlogId) {
      const found = blog.find(b => b.id === selectedBlogId);
      if (found) {
        setSelectedPost(found);
      }
    }
  });

  // Calculate reading progress of active popup modal
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight > 0) {
      const progress = (target.scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    }
  };

  const categories = ["All", "Branding", "Website UI", "Marketing", "Spatial Code"];

  const filteredPosts = blog.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribed(true);
    setSubscribeEmail("");
    setTimeout(() => {
      setSubscribed(false);
      alert("Verification linkage was dispatched. Welcome to the aesthetics handbook circle!");
    }, 2000);
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor || !commentText || !selectedPost) return;
    
    addCommentToBlogPost(selectedPost.id, {
      author: commentAuthor,
      content: commentText
    });

    // Local append for quick feel
    const updatedComments = [
      ...(selectedPost.comments || []),
      {
        author: commentAuthor,
        content: commentText,
        date: "Just Now"
      }
    ];

    setSelectedPost({
      ...selectedPost,
      commentsCount: updatedComments.length,
      comments: updatedComments
    });

    setCommentAuthor("");
    setCommentText("");
  };

  const handleTriggerLike = () => {
    if (!selectedPost) return;
    likeBlogPost(selectedPost.id);
    setSelectedPost({
      ...selectedPost,
      likes: (selectedPost.likes || 0) + 1
    });
  };

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-24 relative">
      
      {/* 1. HEADER SECTION */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-orange uppercase tracking-widest">AGENCY JOURNALS</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Visual Letters & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-gold">Design Insights</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          Critical articles surrounding physical unboxing, Swiss asymmetry grids, and lighting aesthetics written by our lead directors.
        </p>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <section className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 text-xs font-mono rounded-md uppercase cursor-pointer ${
                activeCategory === c 
                  ? "bg-neon-orange text-black font-bold" 
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <input
            type="text"
            placeholder="Search journal entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-secondary-bg border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
        </div>
      </section>

      {/* 3. CORE ARTICLES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="group rounded-xl border border-white/5 bg-secondary-bg overflow-hidden flex flex-col justify-between h-[520px] cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative h-60 overflow-hidden bg-neutral-900">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 text-[9px] font-mono text-neon-orange uppercase">
                {post.category}
              </div>
            </div>

            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <span className="block text-[10px] font-mono text-gray-500 uppercase">{post.date} &bull; {post.readTime}</span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-neon-orange transition-colors uppercase leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono text-gray-500">
                <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-neon-orange" /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-neon-blue" /> {post.commentsCount} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. SIDEBAR RECREATION: NEWSLETTER CIRCLE */}
      <section className="p-12 rounded-2xl bg-gradient-to-r from-secondary-bg to-zinc-950 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-[10px] font-mono text-neon-blue">
            <Sparkles className="w-3.5 h-3.5 text-neon-blue" /> Handcrafted Circle
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-white">THE MONTHLY CURATION</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Register below to receive Devon Sterling's personal curation catalogs covering paperweight tactile structures, neon branding hex codes, and Swiss editorial styles.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="md:col-span-5 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Introduce your e-mail..."
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue flex-grow"
          />
          <button 
            type="submit" 
            className="px-6 py-3 rounded-lg bg-neon-blue hover:bg-white hover:text-black text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
          >
            {subscribed ? "Syncing..." : "JOIN IN"}
          </button>
        </form>
      </section>

      {/* 5. JOURNAL DETAIL POPUP MODAL WITH SCROLL AND READING PROGRESS */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
          {/* Scroll Container */}
          <div 
            onScroll={handleScroll}
            className="bg-secondary-bg border border-white/10 md:rounded-2xl max-w-3xl w-full h-full md:h-[90vh] overflow-y-auto relative p-8 md:p-12 space-y-8"
          >
            
            {/* READING PROGRESS BAR COLLAR */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900 pointer-events-none rounded-t-2xl overflow-hidden">
              <div className="h-full bg-neon-orange transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Close trigger */}
            <button
              onClick={() => {
                setSelectedPost(null);
                if (onClearBlogSelection) onClearBlogSelection();
              }}
              className="absolute top-8 right-8 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Read Time Info */}
            <div className="space-y-4 mr-8 border-b border-white/5 pb-6">
              <span className="text-[10px] font-mono text-neon-orange uppercase font-bold bg-neon-orange/10 px-2 py-0.5 rounded">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-medium text-white uppercase tracking-tight">
                {selectedPost.title}
              </h2>
              <div className="flex gap-4 text-xs font-mono text-gray-500 pt-2">
                <span>By {selectedPost.author || "Devon Sterling"}</span>
                <span>&bull;</span>
                <span>{selectedPost.date}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-neon-orange" /> {selectedPost.readTime}</span>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-900">
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            {/* Substantive copy layout */}
            <div className="text-sm text-gray-300 space-y-4 leading-relaxed font-sans border-b border-white/5 pb-8 whitespace-pre-line">
              {selectedPost.content}
            </div>

            {/* Liking Interaction */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleTriggerLike}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-orange/10 hover:bg-neon-orange hover:text-black border border-neon-orange/20 text-xs font-mono font-bold text-neon-orange transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-neon-orange" /> LIKE ENTRY ({selectedPost.likes})
              </button>
              
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard! Share the visual word.");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> SHARE
              </button>
            </div>

            {/* MULTI USER COMMENTS SECTION */}
            <div className="space-y-6 pt-6">
              <h4 className="text-lg font-display uppercase text-white font-bold tracking-tight">JOURNAL COMMENTS ({selectedPost.commentsCount || 0})</h4>
              
              {/* Submission fields */}
              <form onSubmit={handleCreateComment} className="p-6 rounded-xl bg-black border border-white/5 space-y-4">
                <span className="text-[10px] font-mono text-gray-550 uppercase tracking-widest block font-bold">Write a comment response</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Provide your catalog name..."
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="p-3 rounded bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Draft your comment thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3 rounded bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neon-orange text-black font-semibold text-xs rounded uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  Post Comment
                </button>
              </form>

              {/* Feed items */}
              <div className="space-y-4 pt-2">
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map((cm, cmI) => (
                    <div key={cmI} className="p-5 rounded-lg bg-secondary-bg/50 border border-white/5 flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center font-mono font-bold text-xs text-neon-blue shrink-0 uppercase">
                        {cm.author.slice(0, 2)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <span className="font-display font-semibold text-white text-xs">{cm.author}</span>
                          <span className="text-[10px] font-mono text-gray-500">{cm.date}</span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">{cm.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">No comments yet. Be the first to start the aesthetic discussion!</p>
                )}
              </div>
            </div>

            {/* Footer triggers */}
            <div className="pt-6 border-t border-white/5 text-right">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  if (onClearBlogSelection) onClearBlogSelection();
                }}
                className="px-6 py-2 rounded bg-white text-black font-semibold text-xs uppercase hover:bg-neon-orange transition-all cursor-pointer"
              >
                Close Journal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
