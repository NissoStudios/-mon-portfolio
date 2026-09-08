"use client";
/* eslint-disable @next/next/no-img-element -- Demo content supports remote and user-selected image URLs. */

import React, { useState, useRef, useMemo, useCallback, memo } from "react";
// Perf note: useMemo/useCallback/memo below are portfolio-demo additions for a
// smoother React preview. They are NOT part of the original Blog-O-Platform v2
// codebase (which is vanilla JS, not React) — treat them as a "future addition"
// if/when this UI gets ported into the real Next.js project.
import {
  Sparkles, Home, PenSquare, LayoutDashboard, LogIn, LogOut, X, Send,
  Bold, Italic, Underline, Heading1, Heading2, Quote, Code2, ImageIcon,
  Trash2, Edit3, ArrowLeft, Calendar, Eye, EyeOff,
} from "lucide-react";

const INITIAL_POSTS = [
  {
    id: "the-quiet-power-of-constraints-k3f9a1",
    title: "The quiet power of constraints",
    author: "aline.k",
    authorName: "Aline K.",
    publishedAt: "12 Aug 2026",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=60",
    html:
      "<h1>The quiet power of constraints</h1><p>Most of the interesting design decisions on this platform came from what we deliberately left out.</p><img class='article-image' src='https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&q=60' style='max-width:100%;border-radius:8px;margin:12px 0' /><blockquote>No page builder. No drag-and-drop blocks. A rich text editor and a clear data model.</blockquote><h2>Why it worked</h2><p>Keeping the editor <b>simple</b> and <i>opinionated</i> meant every feature had to earn its place before we shipped it.</p>",
  },
  {
    id: "shipping-with-a-real-backend-p88x2c",
    title: "Shipping with a real backend, this time",
    author: "team",
    authorName: "Team",
    publishedAt: "20 Aug 2026",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=60",
    html:
      "<h1>Shipping with a real backend, this time</h1><p>Version 2 moved from static pages to an <b>Express server</b> in front of Firebase.</p><h2>What changed</h2><p>Rate limiting, Helmet security headers, a dedicated upload endpoint, and Firebase credentials that never touch the client bundle directly.</p><blockquote>The backend doesn't just serve files anymore — it protects them.</blockquote>",
  },
];

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/* ---------- Toast (mirrors the slideIn/slideOut notification in the real login.css) ---------- */
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      key={toast.key}
      className={`fixed top-20 right-5 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg toast-slide-in ${
        toast.type === "error" ? "bg-[#C0522F] text-white" : "bg-[#2A2621] text-white"
      }`}
    >
      {toast.message}
      <style>{`
        @keyframes toastSlideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes toastSlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
        .toast-slide-in { animation: toastSlideIn 0.3s ease forwards; }
        .toast-slide-out { animation: toastSlideOut 0.3s ease forwards; }
      `}</style>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ view, setView, session, logout }) {
  return (
    <header className="sticky top-0 z-20 bg-[#FAF7F0]/90 backdrop-blur border-b border-[#E8E1D3]">
      <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => setView({ name: "home" })} className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-md bg-[#2A2621] flex items-center justify-center">
            <Sparkles size={15} className="text-[#F2AA4C]" />
          </span>
          <span className="font-serif text-[#2A2621] text-base">Blog-O-Platform</span>
          <span className="text-[10px] text-[#B0A98F] border border-[#E8E1D3] rounded-full px-1.5 py-0.5 ml-1">v2</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setView({ name: "home" })} className={`p-2 rounded-lg ${view.name === "home" ? "bg-[#2A2621] text-white" : "text-[#5A5347] hover:bg-[#F0EAE0]"}`}>
            <Home size={16} />
          </button>
          {session ? (
            <>
              <button onClick={() => setView({ name: "editor" })} className="flex items-center gap-1.5 bg-[#F2AA4C] hover:bg-[#E0993E] text-[#2A2621] text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
                <PenSquare size={14} /> Write
              </button>
              <button onClick={() => setView({ name: "dashboard" })} className={`p-2 rounded-lg ${view.name === "dashboard" ? "bg-[#2A2621] text-white" : "text-[#5A5347] hover:bg-[#F0EAE0]"}`} title="Dashboard">
                <LayoutDashboard size={16} />
              </button>
              <button onClick={logout} className="p-2 rounded-lg text-[#8A8371] hover:bg-[#F0EAE0]" title="Log out">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <button onClick={() => setView({ name: "login" })} className="flex items-center gap-1.5 bg-[#2A2621] hover:bg-[#3A362E] text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
              <LogIn size={14} /> Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------- Home ---------- */
// Demo-only addition: memoized card so re-renders of HomePage (e.g. from a
// parent state change elsewhere in the SPA) don't re-render every card.
const PostCard = memo(function PostCard({ post, onOpen }) {
  return (
  <button onClick={() => onOpen(post.id)} className="text-left flex flex-col sm:flex-row gap-4 bg-white border border-[#E8E1D3] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <img
        src={post.banner}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full sm:w-48 h-40 sm:h-auto object-cover"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-serif text-lg text-[#2A2621]">{post.title}</h2>
        <p className="text-[#8A8371] text-sm line-clamp-2">{stripHtml(post.html).slice(0, 140)}...</p>
        <div className="flex items-center gap-3 text-xs text-[#B0A98F] mt-auto pt-1">
          <span>{post.authorName}</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
        </div>
      </div>
    </button>
  );
});

function HomePage({ posts, openPost }) {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#B08D4F] mb-2">Portfolio demo · v2</p>
      <h1 className="font-serif text-3xl text-[#2A2621] mb-1">Stories worth reading</h1>
      <p className="text-[#8A8371] text-sm mb-10">
        Reimagined from a Firebase + Express blogging platform, built with a school team. This version adds real authentication, a rich text editor and a personal dashboard.
      </p>
      <div className="flex flex-col gap-6">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onOpen={openPost} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Article ---------- */
function Article({ post, back }) {
  if (!post) return null;
  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <button onClick={back} className="flex items-center gap-1.5 text-sm text-[#8A8371] hover:text-[#2A2621] mb-6">
        <ArrowLeft size={14} /> Back to stories
      </button>
      <img src={post.banner} alt="" loading="lazy" decoding="async" className="w-full h-56 object-cover rounded-xl mb-6" />
      <p className="text-xs text-[#B0A98F] mb-4">{post.publishedAt} — {post.authorName}</p>
      <div
        className="prose-demo text-[#3A362E] leading-relaxed text-[15px] [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:text-[#2A2621] [&_h1]:mb-3 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-[#2A2621] [&_h2]:mt-5 [&_h2]:mb-2 [&_p]:mb-3 [&_blockquote]:border-l-2 [&_blockquote]:border-[#F2AA4C] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#8A8371] [&_blockquote]:my-4"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
}

/* ---------- Login ---------- */
// Mirrors the real login.css: .input-highlight animates width 0 -> 100% on
// focus (here via a peer-focus scale-x transform, same visual effect).
function AnimatedInput({ type = "text", value, onChange, placeholder, endAdornment }) {
  return (
    <div className="relative">
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="peer w-full border-0 border-b-2 border-[#E8E1D3] bg-transparent px-1 py-2.5 text-sm outline-none pr-10"
      />
      <span className="pointer-events-none absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-[#2A2621] transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      {endAdornment}
    </div>
  );
}

function LoginPage({ onLogin, notify }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password should be at least 6 characters."); return; }
    if (mode === "register" && password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify(mode === "login" ? "Login successful!" : "Account created successfully!");
      onLogin({ username: email.split("@")[0], displayName: email.split("@")[0] });
    }, 600);
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-16 overflow-hidden">
      <h1 className="font-serif text-2xl text-[#2A2621] text-center mb-1">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="text-[#8A8371] text-sm text-center mb-8">{mode === "login" ? "Sign in to write and manage your stories." : "Join to start publishing."}</p>

      <form
        onSubmit={submit}
        className="flex flex-col gap-5 transition-transform duration-500 ease-in-out"
        style={{ transform: mode === "register" ? "translateX(0)" : "translateX(0)" }}
      >
        <AnimatedInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <AnimatedInput
          type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          endAdornment={
            <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-1 top-1/2 -translate-y-1/2 text-[#B0A98F]">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />
        <div className={`grid transition-all duration-400 ease-in-out ${mode === "register" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <AnimatedInput type={showPw ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" />
          </div>
        </div>
        {error && <p className="text-xs text-[#C0522F] -mt-2">{error}</p>}
        <button disabled={loading} className="mt-1 bg-[#2A2621] hover:bg-[#3A362E] active:scale-[0.98] disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-all">
          {loading ? (mode === "login" ? "Signing in..." : "Creating account...") : (mode === "login" ? "Sign in" : "Create account")}
        </button>
      </form>

      <p className="text-center text-sm text-[#8A8371] mt-6">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="text-[#2A2621] underline underline-offset-2">
          {mode === "login" ? "Create an account" : "Sign in"}
        </button>
      </p>
      <p className="text-center text-[11px] text-[#B0A98F] mt-4">Demo login — any email/password combination works, nothing is stored.</p>
    </div>
  );
}

/* ---------- Rich text editor ---------- */
function ToolbarButton({ icon: Icon, onClick, title }) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onClick} title={title}
      className="p-1.5 rounded-md text-[#5A5347] hover:bg-[#F0EAE0]">
      <Icon size={14} />
    </button>
  );
}

function Editor({ session, onPublish, cancel }) {
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [autosaved, setAutosaved] = useState(false);
  const editorRef = useRef(null);
  const saveTimeout = useRef(null);

  const exec = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const onInput = () => {
    clearTimeout(saveTimeout.current);
    setAutosaved(false);
    saveTimeout.current = setTimeout(() => setAutosaved(true), 1000);
  };

  const handleBanner = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBanner(reader.result);
    reader.readAsDataURL(file);
  };

  const insertImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      exec("insertImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const publish = () => {
    const html = editorRef.current?.innerHTML || "";
    if (!title.trim() || !stripHtml(html)) {
      setError("Add a title and some content before publishing.");
      return;
    }
    setError("");
    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 40);
    const id = `${slug}-${Date.now().toString(36)}`;
    onPublish({
      id,
      title,
      html: `<h1>${title}</h1>${html}`,
      author: session.username,
      authorName: session.displayName,
      publishedAt: "Just now",
      banner: banner || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=60",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-[#2A2621]">New story</h2>
        <button onClick={cancel} className="text-[#8A8371] hover:text-[#2A2621]"><X size={18} /></button>
      </div>

      <label className="block mb-4">
        <div className="w-full h-40 rounded-xl border-2 border-dashed border-[#D8CFBB] flex items-center justify-center cursor-pointer bg-cover bg-center overflow-hidden"
          style={banner ? { backgroundImage: `url(${banner})`, border: "none" } : {}}>
          {!banner && <span className="flex items-center gap-2 text-[#B0A98F] text-sm"><ImageIcon size={16} /> Upload a banner image</span>}
        </div>
        <input type="file" accept="image/*" onChange={handleBanner} className="hidden" />
      </label>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Story title..."
        className="w-full font-serif text-2xl text-[#2A2621] placeholder:text-[#C9C0AA] outline-none bg-transparent mb-3" />

      <div className="flex items-center gap-1 border border-[#E8E1D3] rounded-lg px-2 py-1.5 mb-2 bg-white flex-wrap">
        <ToolbarButton icon={Bold} title="Bold" onClick={() => exec("bold")} />
        <ToolbarButton icon={Italic} title="Italic" onClick={() => exec("italic")} />
        <ToolbarButton icon={Underline} title="Underline" onClick={() => exec("underline")} />
        <span className="w-px h-4 bg-[#E8E1D3] mx-1" />
        <ToolbarButton icon={Heading1} title="Heading" onClick={() => exec("formatBlock", "H2")} />
        <ToolbarButton icon={Heading2} title="Subheading" onClick={() => exec("formatBlock", "H3")} />
        <ToolbarButton icon={Quote} title="Quote" onClick={() => exec("formatBlock", "BLOCKQUOTE")} />
        <ToolbarButton icon={Code2} title="Code" onClick={() => exec("formatBlock", "PRE")} />
        <span className="w-px h-4 bg-[#E8E1D3] mx-1" />
        <label className="p-1.5 rounded-md text-[#5A5347] hover:bg-[#F0EAE0] cursor-pointer" title="Insert image at cursor">
          <ImageIcon size={14} />
          <input type="file" accept="image/*" onChange={insertImage} className="hidden" />
        </label>
        <span className="ml-auto text-[11px] text-[#B0A98F]">{autosaved ? "Saved" : "Editing..."}</span>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        data-placeholder="Start writing here..."
        className="min-h-[220px] text-[15px] text-[#3A362E] outline-none bg-white border border-[#E8E1D3] rounded-lg p-4 leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-[#C9C0AA] [&_blockquote]:border-l-2 [&_blockquote]:border-[#F2AA4C] [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:font-serif [&_h2]:text-lg [&_h3]:font-serif [&_h3]:text-base [&_pre]:bg-[#F0EAE0] [&_pre]:p-2 [&_pre]:rounded [&_img]:max-w-full [&_img]:rounded-md [&_img]:my-2"
      />

      {error && <p className="text-xs text-[#C0522F] mt-2">{error}</p>}

      <button onClick={publish} className="mt-4 flex items-center gap-2 bg-[#2A2621] hover:bg-[#3A362E] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
        Publish <Send size={14} />
      </button>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ posts, session, deletePost, openPost, editPost }) {
  const [confirmId, setConfirmId] = useState(null);
  // Demo-only addition: useMemo avoids recomputing the filter on every
  // keystroke elsewhere in the app (e.g. while typing in the editor).
  const mine = useMemo(
    () => posts.filter((p) => p.author === session.username),
    [posts, session.username]
  );

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="font-serif text-2xl text-[#2A2621] mb-1">Your stories</h1>
      <p className="text-[#8A8371] text-sm mb-6">Signed in as {session.displayName}</p>

      {mine.length === 0 ? (
        <div className="border border-dashed border-[#D8CFBB] rounded-xl p-10 text-center">
          <p className="text-[#2A2621] font-medium mb-1">No stories yet</p>
          <p className="text-[#8A8371] text-sm mb-4">Start writing your first blog post.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {mine.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-white border border-[#E8E1D3] rounded-xl p-3">
              <img src={p.banner} alt="" loading="lazy" decoding="async" className="w-20 h-16 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="font-serif text-[#2A2621] truncate">{p.title}</p>
                <p className="text-xs text-[#B0A98F]">{p.publishedAt}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openPost(p.id)} className="p-2 rounded-lg text-[#5A5347] hover:bg-[#F0EAE0]" title="Read"><Eye size={15} /></button>
                <button onClick={() => editPost(p.id)} className="p-2 rounded-lg text-[#5A5347] hover:bg-[#F0EAE0]" title="Edit"><Edit3 size={15} /></button>
                {confirmId === p.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => { deletePost(p.id); setConfirmId(null); }} className="text-xs bg-[#C0522F] text-white px-2 py-1.5 rounded-md">Delete</button>
                    <button onClick={() => setConfirmId(null)} className="text-xs text-[#8A8371] px-2 py-1.5">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmId(p.id)} className="p-2 rounded-lg text-[#C0522F] hover:bg-[#FBEAE4]" title="Delete"><Trash2 size={15} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Root ---------- */
export default function BlogOPlatformDemo() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [session, setSession] = useState(null);
  const [view, setView] = useState({ name: "home" });
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setToast({ key: Date.now(), message, type });
    setTimeout(() => setToast(null), 2600);
  }, []);

  const openPost = useCallback((id) => setView({ name: "article", id }), []);
  const login = useCallback((user) => { setSession(user); setView({ name: "dashboard" }); }, []);
  const logout = useCallback(() => {
    setSession(null);
    setView({ name: "home" });
    notify("Logged out");
  }, [notify]);
  const publish = useCallback((post) => {
    setPosts((prev) => [post, ...prev]);
    setView({ name: "article", id: post.id });
    notify("Story published!");
  }, [notify]);
  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    notify("Post deleted");
  }, [notify]);
  const editPost = useCallback(() => setView({ name: "editor" }), []);

  const currentPost = view.name === "article" ? posts.find((p) => p.id === view.id) : null;

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-sans">
      <Navbar view={view} setView={setView} session={session} logout={logout} />
      <Toast toast={toast} />
      <div key={view.name + (view.id || "")} className="animate-view-fade">
        {view.name === "home" && <HomePage posts={posts} openPost={openPost} />}
        {view.name === "article" && <Article post={currentPost} back={() => setView({ name: "home" })} />}
        {view.name === "login" && <LoginPage onLogin={login} notify={notify} />}
        {view.name === "editor" && session && <Editor session={session} onPublish={publish} cancel={() => setView({ name: "home" })} />}
        {view.name === "dashboard" && session && (
          <Dashboard posts={posts} session={session} deletePost={deletePost} openPost={openPost} editPost={editPost} />
        )}
      </div>
      <style>{`
        @keyframes viewFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-view-fade { animation: viewFade 0.35s ease; }
      `}</style>
    </div>
  );
}
