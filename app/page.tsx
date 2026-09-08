"use client";
import {useState,useEffect,useRef,useCallback} from "react";
import {motion,useReducedMotion,useScroll,useTransform} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import {ArrowDown,ArrowUpRight,Code2,Database,FileCheck2,Globe2,LockKeyhole,Menu,X,Bus,UtensilsCrossed,Radio,PenSquare,PlayCircle,type LucideIcon} from "lucide-react";

function GithubIcon({size=17,className=""}:{size?:number,className?:string}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.21.66.8.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5Z"/></svg>}
function FacebookIcon({size=17,className=""}:{size?:number,className?:string}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>}
function WhatsappIcon({size=17,className=""}:{size?:number,className?:string}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.08-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.2.05-.36-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34ZM12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2Zm0 18.2a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.02.79.81-2.95-.2-.3a8.2 8.2 0 1 1 6.88 3.78Z"/></svg>}

function DemoLoading(){return <div className="min-h-[320px] flex items-center justify-center text-slate-500 mono text-sm">Loading demo…</div>}

const EcommercialDemo=()=><Demo/>;
const GestMedicertDemo=dynamic(()=>import("../components/demos/GestMedicertDemo"),{ssr:false,loading:DemoLoading});
const TripBookDemo=dynamic(()=>import("../components/demos/TripBookDemo"),{ssr:false,loading:DemoLoading});
const TransMapDemo=dynamic(()=>import("../components/demos/TransMapDemo"),{ssr:false,loading:DemoLoading});
const JavaRestaurantDemo=dynamic(()=>import("../components/demos/JavaRestaurantDemo"),{ssr:false,loading:DemoLoading});
const MobileSixDemo=dynamic(()=>import("../components/demos/MobileSixDemo"),{ssr:false,loading:DemoLoading});
const BlogOPlatformDemo=dynamic(()=>import("../components/demos/BlogOPlatformDemo"),{ssr:false,loading:DemoLoading});

const demoMap:Record<string,React.ComponentType>={
 ecommercial:EcommercialDemo,
 gestmedicert:GestMedicertDemo,
 tripbook:TripBookDemo,
 transmap:TransMapDemo,
 "java-restaurant":JavaRestaurantDemo,
 "mobile-six":MobileSixDemo,
 "blog-o-platform":BlogOPlatformDemo,
};

const projects:{id:string,num:string,tag:string,title:string,headline:string,tech:string[],icon:LucideIcon}[]=[
{id:"ecommercial",num:"01",tag:"BUSINESS PROCESS",title:"E-COMMERCIAL",headline:"From a paper notebook to a digital commercial workflow.",tech:["PHP","SQL Server","HTML/CSS"],icon:Database},
{id:"gestmedicert",num:"02",tag:"HEALTHCARE",title:"GESTMEDICERT",headline:"Paper medical records → a secure digital workflow.",tech:["Next.js","TypeScript","Chart.js"],icon:LockKeyhole},
{id:"tripbook",num:"03",tag:"MOBILE · TRAVEL",title:"TRIPBOOK",headline:"A community-driven way to travel Africa with confidence.",tech:["Kotlin","Android"],icon:Globe2},
{id:"transmap",num:"04",tag:"TRANSPORT",title:"TRANSMAP",headline:"Modeling a transport network before writing a screen.",tech:["Python","PySide6","SQLAlchemy"],icon:Bus},
{id:"java-restaurant",num:"05",tag:"HOSPITALITY",title:"JAVA RESTAURANT",headline:"One dashboard for orders, tables and demand.",tech:["React","Recharts"],icon:UtensilsCrossed},
{id:"mobile-six",num:"06",tag:"TELECOM · STARTUP",title:"MOBILE SIX",headline:"Coordinating field teams for a telecom startup, live.",tech:["React","Recharts"],icon:Radio},
{id:"blog-o-platform",num:"07",tag:"PUBLISHING",title:"BLOG-O-PLATFORM",headline:"A focused writing tool, without the page-builder bloat.",tech:["JavaScript","Express","Firebase"],icon:PenSquare},
];

const approachSteps:{n:string,title:string,desc:string}[]=[
{n:"01",title:"PROBLEM",desc:"Understand what's actually broken, and for whom."},
{n:"02",title:"RESEARCH",desc:"Look at how it's solved today, and why that falls short."},
{n:"03",title:"SYSTEM DESIGN",desc:"Model the data and the workflow before any UI."},
{n:"04",title:"DEVELOPMENT",desc:"Build with the stack the problem actually needs."},
{n:"05",title:"SECURITY",desc:"Treat access, data and integrity as first-class features."},
{n:"06",title:"TESTING",desc:"Break it on purpose before a user does it by accident."},
{n:"07",title:"DEPLOYMENT",desc:"Ship something real people can actually use."},
{n:"08",title:"ITERATION",desc:"Watch what happens, then make it better."},
];

const logos=[
 {src:"/logo-sosucam.png",alt:"SOSUCAM",width:146,height:30},
 {src:"/logo-mobile-six.png",alt:"Mobile Six",width:40,height:40},
 {src:"/logo-ousy.png",alt:"Secrétariat Ousy",width:40,height:40},
];

function Reveal({children,delay=0}:{children:React.ReactNode,delay?:number}){
 const reduceMotion=useReducedMotion();
 return <motion.div initial={reduceMotion?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:reduceMotion?0:.6,delay:reduceMotion?0:delay}}>{children}</motion.div>
}

function CursorGlow(){
 const cursorRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const cursor=cursorRef.current;
  if(!cursor||window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches)return;
  let frame=0;
  const move=(e:MouseEvent)=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;
    cursor.dataset.active="true";
   });
  };
  const over=(e:MouseEvent)=>{
   const t=e.target as HTMLElement;
   cursor.dataset.hover=String(!!t?.closest('a,button,[role="button"],input,textarea,select'));
  };
  const leave=()=>{cursor.dataset.active="false"};
  window.addEventListener("mousemove",move);
  window.addEventListener("mouseover",over);
  document.documentElement.addEventListener("mouseleave",leave);
  return ()=>{cancelAnimationFrame(frame);window.removeEventListener("mousemove",move);window.removeEventListener("mouseover",over);document.documentElement.removeEventListener("mouseleave",leave)};
 },[]);
 return <div ref={cursorRef} data-active="false" data-hover="false" aria-hidden="true" className="custom-cursor hidden md:block fixed left-0 top-0 pointer-events-none z-[200]">
  <div className="custom-cursor-dot rounded-full -translate-x-1/2 -translate-y-1/2"/>
 </div>
}

function StarField(){
 const stars=Array.from({length:55},(_,i)=>i);
 return <div aria-hidden="true" className="star-field fixed inset-0 overflow-hidden pointer-events-none">{stars.map(i=>{
  const left=(i*17.3)%100;
  const delay=(i*0.67)%18;
  const duration=9+(i%9);
  const size=i%9===0?2.5:1.3;
  return <span key={i} className="absolute rounded-full bg-cyan-200" style={{left:left+"%",top:"-4%",width:size+"px",height:size+"px",opacity:0,boxShadow:"0 0 4px rgba(103,232,249,.8)",animation:`fall ${duration}s linear ${delay}s infinite`}}/>;
 })}</div>
}

function LiquidBackground(){
 return <div aria-hidden="true" className="liquid-scene fixed inset-0 overflow-hidden pointer-events-none">
  <div className="liquid-glow liquid-glow-one absolute w-[560px] h-[560px] bg-cyan-400/[.09] blur-[120px]"/>
  <div className="liquid-glow liquid-glow-two absolute w-[480px] h-[480px] bg-teal-300/[.08] blur-[120px]"/>
  <div className="metal-flow metal-flow-one"/>
  <div className="metal-flow metal-flow-two"/>
  <div className="chrome-orbit chrome-orbit-one"><span/></div>
  <div className="chrome-orbit chrome-orbit-two"><span/></div>
  <div className="glass-prism"><i/><i/><i/></div>
 </div>
}

function LogoMarquee(){
 const loop=[...logos,...logos];
 return <div className="border-y border-white/5 bg-white/[.02] py-7 overflow-hidden">
  <div className="max-w-6xl mx-auto px-5 mb-4"><span className="mono text-[11px] text-slate-600 tracking-[.2em]">BUILT FOR</span></div>
  <div className="flex overflow-hidden">
   <div className="flex items-center gap-14 marquee-track shrink-0 pr-14">
    {loop.map((l,i)=><div key={`${l.src}-${i}`} aria-hidden={i>=logos.length} className="shrink-0 bg-white/95 rounded-xl px-5 py-3 flex items-center justify-center h-16 w-40"><Image src={l.src} alt={i<logos.length?l.alt:""} width={l.width} height={l.height} className="max-h-10 max-w-full object-contain"/></div>)}
   </div>
  </div>
 </div>
}

function Cube3D(){
 const ref=useRef(null);
 const {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 const rotateX=useTransform(scrollYProgress,[0,1],[0,360]);
 const rotateY=useTransform(scrollYProgress,[0,1],[0,540]);
 const s=112;
 const faceStyle="absolute inset-0 flex items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/[.06] backdrop-blur-sm mono text-[10px] text-cyan-300";
 return <div ref={ref} aria-hidden="true" className="hidden md:flex items-center justify-center py-10">
  <div style={{perspective:700}}>
   <motion.div style={{width:s,height:s,position:"relative",transformStyle:"preserve-3d",rotateX,rotateY}}>
    <div className={faceStyle} style={{transform:`translateZ(${s/2}px)`}}>DESIGN</div>
    <div className={faceStyle} style={{transform:`rotateY(180deg) translateZ(${s/2}px)`}}>BUILD</div>
    <div className={faceStyle} style={{transform:`rotateY(90deg) translateZ(${s/2}px)`}}>SECURE</div>
    <div className={faceStyle} style={{transform:`rotateY(-90deg) translateZ(${s/2}px)`}}>TEST</div>
    <div className={faceStyle} style={{transform:`rotateX(90deg) translateZ(${s/2}px)`}}>SHIP</div>
    <div className={faceStyle} style={{transform:`rotateX(-90deg) translateZ(${s/2}px)`}}>ITERATE</div>
   </motion.div>
  </div>
 </div>
}

function Demo(){
 const [step,setStep]=useState(0),[qty,setQty]=useState(100),[valid,setValid]=useState(false);
 const total=qty*50, labels=["Authentication","Order","Calculation","Validation","Documents"];
 return <div className="max-w-5xl mx-auto p-5 md:p-10">
  <div className="flex flex-wrap gap-2 mb-6" aria-label="Demo steps">{labels.map((x,i)=><button key={x} onClick={()=>setStep(i)} aria-pressed={step===i} className={"px-3 py-2 rounded-xl text-xs mono border "+(step===i?"border-cyan-400/50 bg-cyan-400/10 text-cyan-300":"border-white/10 text-slate-500")}>0{i+1} {x}</button>)}</div>
  {step===0&&<div className="max-w-md mx-auto py-8"><div className="text-center mb-7"><div className="text-2xl font-bold text-white">E-COMMERCIAL</div><div className="text-slate-500 text-sm mt-2">Secure access</div></div><label htmlFor="demo-username" className="block text-xs mono text-slate-400 mb-2">Username</label><input id="demo-username" autoComplete="username" className="w-full mb-3 rounded-xl bg-black/30 border border-white/10 p-3 text-white" placeholder="Enter username"/><label htmlFor="demo-password" className="block text-xs mono text-slate-400 mb-2">Password</label><input id="demo-password" autoComplete="current-password" className="w-full mb-4 rounded-xl bg-black/30 border border-white/10 p-3 text-white" placeholder="Enter password" type="password"/><button onClick={()=>setStep(1)} className="w-full rounded-xl bg-cyan-300 text-black font-semibold py-3">LOGIN</button></div>}
  {step===1&&<div><div className="grid md:grid-cols-4 gap-3 mb-6">{[["ORDERS","128"],["PENDING","07"],["PRODUCTS","24"],["HISTORY","342"]].map(a=><div className="rounded-2xl border border-white/10 bg-white/[.025] p-4" key={a[0]}><div className="text-xs text-slate-500 mono">{a[0]}</div><div className="text-2xl font-bold mt-2 text-white">{a[1]}</div></div>)}</div><button onClick={()=>setStep(2)} className="rounded-xl bg-white text-black px-5 py-3 font-semibold">Create order <ArrowUpRight className="inline" size={17}/></button></div>}
  {step===2&&<div className="grid md:grid-cols-2 gap-8"><div><div className="text-xs mono text-slate-500">PRODUCT</div><div className="mt-2 p-3 rounded-xl border border-white/10 text-white">Sugar</div><div className="block text-xs mono text-slate-500 mt-5">PACKAGE WEIGHT</div><div className="mt-2 p-3 rounded-xl border border-white/10 text-white">50 kg</div><label htmlFor="demo-quantity" className="block text-xs mono text-slate-500 mt-5">QUANTITY</label><input id="demo-quantity" value={qty} onChange={e=>setQty(Math.max(1,Number(e.target.value)))} min="1" type="number" className="mt-2 w-full p-3 rounded-xl border border-white/10 bg-black/20 text-white"/></div><div className="rounded-2xl bg-cyan-300/10 border border-cyan-300/20 p-7 flex flex-col justify-center"><div className="text-xs mono text-cyan-300">AUTOMATIC CALCULATION</div><div className="text-4xl font-bold mt-5 text-white">{qty} × 50 kg</div><div className="text-5xl font-black mt-2 text-white">{total.toLocaleString()} kg</div><div className="text-slate-400 mt-2">= {(total/1000).toFixed(2)} tonnes</div><button onClick={()=>setStep(3)} className="mt-7 rounded-xl bg-cyan-300 text-black py-3 font-semibold">Continue to validation</button></div></div>}
  {step===3&&<div className="max-w-2xl mx-auto"><div className="rounded-2xl border border-white/10 p-6"><div className="flex justify-between"><div><div className="mono text-xs text-slate-500">ORDER #EC-1024</div><h3 className="text-2xl font-bold mt-2 text-white">ABC COMPANY</h3><p className="text-slate-400">{(total/1000).toFixed(2)} tonnes · Sugar</p></div><span className={"px-3 py-1 rounded-full text-xs "+(valid?"bg-emerald-400/15 text-emerald-300":"bg-amber-400/15 text-amber-300")}>{valid?"VALIDATED":"PENDING"}</span></div><button disabled={valid} onClick={()=>setValid(true)} className="mt-7 rounded-xl bg-white text-black px-5 py-3 font-semibold disabled:opacity-50">{valid?"✓ Order validated":"Validate order"}</button>{valid&&<button onClick={()=>setStep(4)} className="ml-3 rounded-xl border border-white/10 px-5 py-3 text-white">Generate documents</button>}</div></div>}
  {step===4&&<div className="grid md:grid-cols-3 gap-4">{["Delivery Document","Order Document","Commercial Document"].map(x=><div key={x} className="rounded-2xl border border-white/10 p-5"><FileCheck2 className="text-cyan-300"/><div className="font-semibold mt-4 text-white">{x}</div><div className="text-xs text-slate-500 mt-1">PDF document</div><button onClick={()=>alert("Demo: document generated successfully.")} className="mt-5 text-sm text-cyan-300">Generate PDF →</button></div>)}</div>}
 </div>
}

function DemoModal({activeId,onClose}:{activeId:string|null,onClose:()=>void}){
 const dialogRef=useRef<HTMLDivElement>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  if(!activeId)return;
  const previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const pageContent=document.getElementById("page-content");
  document.body.style.overflow="hidden";
  pageContent?.setAttribute("inert","");
  closeRef.current?.focus();
  const handleKeyDown=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){event.preventDefault();onClose();return}
   if(event.key!=="Tab"||!dialogRef.current)return;
   const focusable=Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'));
   if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  };
  document.addEventListener("keydown",handleKeyDown);
  return ()=>{document.body.style.overflow="";pageContent?.removeAttribute("inert");document.removeEventListener("keydown",handleKeyDown);previousFocus?.focus()};
 },[activeId,onClose]);
 if(!activeId)return null;
 const ActiveComponent=demoMap[activeId];
 const project=projects.find(p=>p.id===activeId);
 if(!ActiveComponent)return null;
 return <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title" className="fixed inset-0 z-[80] bg-[#05070b] overflow-y-auto">
  <div id="demo-dialog-title" className="fixed top-4 left-4 z-[95] mono text-[10px] text-cyan-300 bg-black/70 border border-cyan-300/20 rounded-full px-3 py-2 backdrop-blur">LIVE PROTOTYPE · {project?.title}</div>
  <button ref={closeRef} onClick={onClose} aria-label={`Close ${project?.title??"demo"} prototype`} className="fixed top-4 right-4 z-[95] w-11 h-11 rounded-full bg-black/70 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 shadow-lg"><X size={18}/></button>
  <ActiveComponent/>
 </div>
}

export default function Home(){
 const [menu,setMenu]=useState(false);
 const [activeDemo,setActiveDemo]=useState<string|null>(null);
 const reduceMotion=useReducedMotion();
 const closeDemo=useCallback(()=>setActiveDemo(null),[]);
 return <main id="main-content">
  <a href="#page-content" className="skip-link">Skip to main content</a>
 <StarField/>
 <LiquidBackground/>
 <CursorGlow/>
 <div id="page-content" className="relative z-10">

 <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#05070b]/75 backdrop-blur-xl" aria-label="Primary navigation"><div className="max-w-6xl mx-auto px-5 min-h-[64px] md:min-h-[72px] flex items-center justify-between"><a href="#" className="font-black text-lg md:text-xl">NISSO STUDIOS<span className="text-cyan-300">.</span></a><div className="hidden md:flex items-center gap-7 text-sm text-slate-400"><a href="#about">About</a><a href="#work">Projects</a><a href="#approach">Approach</a><a href="#skills">Skills</a><a href="#contact">Contact</a><a href="#contact" className="rounded-full bg-white text-black px-4 py-2 font-semibold glow-hover">Let&apos;s build something</a></div><button type="button" className="md:hidden p-2" onClick={()=>setMenu(!menu)} aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu} aria-controls="mobile-navigation">{menu?<X/>:<Menu/>}</button></div>{menu&&<div id="mobile-navigation" className="md:hidden px-5 pb-5 grid gap-4 text-slate-300"><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#work" onClick={()=>setMenu(false)}>Projects</a><a href="#approach" onClick={()=>setMenu(false)}>Approach</a><a href="#skills" onClick={()=>setMenu(false)}>Skills</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></div>}</nav>

 <section className="min-h-screen grid-bg flex items-center pt-24 relative overflow-hidden"><div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_35%,rgba(34,211,238,.10),transparent_30%)]"/><div className="max-w-6xl mx-auto px-5 py-16 md:py-24 w-full grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center"><div><div className="mono text-xs tracking-[.22em] text-cyan-300 mb-7">SOFTWARE ENGINEER · CYBERSECURITY · DIGITAL PRODUCTS</div><h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[-.05em] leading-[.95]">I turn real-world problems into <span className="text-cyan-300">digital solutions.</span></h1><p className="text-base md:text-xl text-slate-400 max-w-2xl mt-7 leading-relaxed">Software engineering student and cybersecurity-minded developer building useful web, mobile and business solutions with a focus on functionality, security and real-world impact.</p><div className="flex flex-wrap gap-3 mt-9"><a href="#work" className="rounded-full bg-white text-black px-6 py-3 font-semibold glow-hover">Explore my work <ArrowDown className="inline ml-1" size={17}/></a><a href="#contact" className="rounded-full border border-white/10 px-6 py-3 font-semibold glow-hover">Let&apos;s connect</a></div><div className="mono text-xs text-slate-500 mt-10 space-y-1.5"><div>BASED IN CAMEROON · BUILDING FOR THE REAL WORLD</div><div className="text-slate-500">APPS DESIGNED FOR SOSUCAM · SECRÉTARIAT OUSY · MOBILE SIX (STARTUP)</div></div></div><motion.div animate={reduceMotion?undefined:{y:[0,-10,0]}} transition={{repeat:Infinity,duration:6,ease:"easeInOut"}} className="hero-portrait relative mx-auto max-w-[320px] lg:max-w-none w-full"><div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-cyan-300/25 via-cyan-500/10 to-transparent blur-2xl pointer-events-none"/><div className="glass relative rounded-[2rem] p-3"><div className="relative rounded-[1.6rem] overflow-hidden aspect-[4/5]"><Image src="/nisso-photo.png" alt="Nisso Emmanuel Franky, software engineer and founder of Nisso Studios" fill priority sizes="(max-width: 1024px) 320px, 430px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#05070b] via-transparent to-transparent"/><div className="absolute inset-0 opacity-[.05] pointer-events-none" style={{backgroundImage:"repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 3px)"}}/><div className="absolute bottom-4 left-4 right-4 flex items-center justify-between"><span className="mono text-[10px] text-cyan-300 bg-black/50 backdrop-blur px-2.5 py-1.5 rounded-full border border-cyan-300/20">OPERATOR</span><span className="mono text-[10px] text-slate-300 bg-black/50 backdrop-blur px-2.5 py-1.5 rounded-full border border-white/10">NISSO STUDIOS</span></div></div></div></motion.div></div></section>

 <LogoMarquee/>

 <section id="about" className="max-w-6xl mx-auto px-5 py-20 md:py-28 scroll-mt-20"><Reveal><div className="max-w-3xl"><div className="mono text-xs text-cyan-300">01 / MINDSET</div><h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4">I don&apos;t start with code. <span className="text-slate-500">I start with the problem.</span></h2><p className="text-base md:text-lg text-slate-400 mt-7 leading-relaxed">Every project starts with a problem worth solving. I focus on understanding the process, identifying what can be improved, designing the right system and then building the technology behind it.</p></div></Reveal><div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-14">{[["01","Understand","Users, process and context."],["02","Design","Workflow and architecture."],["03","Build","The solution with the right tools."],["04","Secure & improve","Access, data, reliability and iteration."]].map((x,i)=><Reveal key={x[1]} delay={i*.06}><div className="border-t border-white/10 pt-5"><div className="mono text-xs text-cyan-300">{x[0]}</div><h3 className="font-bold mt-4">{x[1]}</h3><p className="text-sm text-slate-500 mt-2">{x[2]}</p></div></Reveal>)}</div></section>

 <section id="work" className="border-y border-white/5 bg-white/[.015] py-20 md:py-28 scroll-mt-20"><div className="max-w-6xl mx-auto px-5"><Reveal><div className="mono text-xs text-cyan-300">02 / SELECTED WORK</div><h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4">Real problems. <span className="text-slate-500">Real systems.</span></h2><p className="text-slate-500 text-sm mt-3">More projects added regularly — launch any live prototype below.</p></Reveal><div className="mt-14 grid sm:grid-cols-2 gap-4">{projects.map((p,i)=>{const Icon=p.icon;return <Reveal key={p.id} delay={i*.05}><article className="glass rounded-2xl p-5 h-full flex flex-col group hover:border-cyan-300/30 transition-colors"><div className="flex items-center justify-between"><span className="mono text-[10px] text-cyan-300">{p.num} · {p.tag}</span><Icon aria-hidden="true" size={18} className="text-slate-500 group-hover:text-cyan-300 transition-colors"/></div><h3 className="text-xl font-black mt-4">{p.title}</h3><p className="text-sm text-slate-400 mt-2 leading-relaxed flex-1">{p.headline}</p><div className="flex flex-wrap gap-1.5 mt-4">{p.tech.map(t=><span key={t} className="mono text-[10px] border border-white/10 rounded-full px-2 py-0.5 text-slate-500">{t}</span>)}</div><button onClick={()=>setActiveDemo(p.id)} aria-label={`Launch ${p.title} demo`} className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-cyan-300/30 text-cyan-300 px-3 py-2 text-xs font-semibold hover:bg-cyan-300/10 glow-hover w-fit"><PlayCircle aria-hidden="true" size={14}/> Launch demo</button></article></Reveal>})}</div></div></section>

 <section id="approach" className="max-w-6xl mx-auto px-5 py-20 md:py-28 scroll-mt-20"><Reveal><div className="mono text-xs text-cyan-300">03 / HOW I BUILD</div><h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4">From problem to <span className="text-slate-500">impact.</span></h2></Reveal><Cube3D/><div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{approachSteps.map((x,i)=><Reveal key={x.title} delay={i*.03}><div className="rounded-2xl border border-white/10 p-5 min-h-[150px] glow-hover"><div className="mono text-xs text-slate-600">{x.n}</div><div className="font-bold mt-5">{x.title}</div><p className="text-xs text-slate-500 mt-2 leading-relaxed">{x.desc}</p></div></Reveal>)}</div></section>

 <section id="skills" className="border-y border-white/5 bg-white/[.015] py-20 md:py-28 scroll-mt-20"><div className="max-w-6xl mx-auto px-5"><Reveal><div className="mono text-xs text-cyan-300">04 / CAPABILITIES</div><h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4">Tools are the means. <span className="text-slate-500">Engineering is the skill.</span></h2></Reveal><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">{([{title:"SOFTWARE ENGINEERING",items:["PHP","JavaScript","React","Next.js","Python","Java","C++"]},{title:"DATABASES",items:["Microsoft SQL Server","MySQL","Relational design"]},{title:"MOBILE & APIs",items:["Android","Kotlin","Flutter","Dart","Mapbox","REST APIs"]},{title:"SECURITY",items:["Authentication","Authorization","Data integrity","SHA-256","HMAC","Prepared queries"]}] satisfies {title:string;items:string[]}[]).map(group=><div key={group.title} className="rounded-3xl border border-white/10 p-6 glow-hover"><Code2 className="text-cyan-300"/><h3 className="mono text-xs mt-6">{group.title}</h3><div className="mt-5 space-y-2">{group.items.map(item=><div className="text-slate-300" key={item}>{item}</div>)}</div></div>)}</div></div></section>

 <section className="max-w-6xl mx-auto px-5 py-20 md:py-28"><div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[.035] p-6 md:p-14"><div className="mono text-xs text-cyan-300">05 / PHILOSOPHY</div><blockquote className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight max-w-4xl mt-5">&ldquo;Technology becomes valuable when it improves something that matters.&rdquo;</blockquote><p className="text-slate-400 mt-6 max-w-2xl">Automation. Efficiency. Traceability. Security. Accessibility. The goal is not technology for its own sake — it is measurable improvement.</p></div></section>

 <section id="contact" className="border-t border-white/5 py-20 md:py-28 scroll-mt-20"><div className="max-w-6xl mx-auto px-5"><div className="max-w-4xl"><div className="mono text-xs text-cyan-300">06 / CONTACT</div><h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mt-4">Have a problem worth solving?</h2><p className="text-lg md:text-xl text-slate-400 mt-6">Let&apos;s turn the idea into something real.</p><div className="flex flex-wrap gap-3 mt-9"><a href="mailto:frankynisso16@gmail.com" className="rounded-full bg-white text-black px-6 py-3 font-semibold glow-hover">Let&apos;s talk</a><a href="https://wa.me/237680363055" target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-400/30 text-emerald-300 px-5 py-3 glow-hover"><WhatsappIcon className="inline mr-2" size={17}/>WhatsApp</a><a href="https://github.com/NissoStudios" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-5 py-3 glow-hover"><GithubIcon className="inline mr-2" size={17}/>GitHub</a><a href="https://www.facebook.com/nisso.emmanuel.franky" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-5 py-3 glow-hover"><FacebookIcon className="inline mr-2" size={17}/>Facebook</a></div></div></div></section>

 <footer className="border-t border-white/5 py-8"><div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row gap-3 justify-between text-sm text-slate-600"><div className="font-black text-slate-300">NISSO STUDIOS<span className="text-cyan-300">.</span></div><div>Software Engineer · Cybersecurity · Digital Solutions</div><div>© 2026 Nisso Emmanuel Franky</div></div></footer>

 <a href="https://wa.me/237680363055" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="md:hidden fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,.5)]"><WhatsappIcon size={26} className="text-white"/></a>

 </div>
 <DemoModal activeId={activeDemo} onClose={closeDemo}/>
 </main>
}
