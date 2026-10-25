// ============================================================
// EDIT THIS FILE: all text, links and images live here.
// Images: put files in /public/images and use "/images/name.png".
// null = striped placeholder.
// ============================================================

export const profile = {
  name: "Shruti",
  first: "Shruti",
  city: "Noida, India",
  email: "shrutikumari916200@gmail.com",
  callLink: "#",
  resumeUrl: "#",
  photo: "/images/profile/me.jpeg",
  photoCaption: "that's me!",
  intro: "Shruti this side, I'm a",
  roles: ["developer", "designer", "researcher"],
  marquee: ["Build it. Design it. Ship it.", "Hackathon winner", "Published researcher", "Make it matter.", "Open for collab"],
  audioSrc: "/audio/track.mp3", // e.g. "/audio/lofi.mp3". null = built-in ambient synth
  socials: [
    { short: "in", label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { short: "gh", label: "GitHub", url: "https://github.com/yourname" },
    { short: "@", label: "Email", url: "mailto:shrutikumari916200@gmail.com" },
    { short: "cv", label: "Resume", url: "#" },
    { short: "x", label: "X", url: "https://x.com/yourname" },
  ],
};

// Highlight types: "blue", "yellow", "pink" or undefined for plain text
export const statement = [
  { t: "I like the " }, { t: "messy middle", h: "blue" },
  { t: " when an idea is still becoming something. I ask questions, sketch possibilities, and shape the strongest one into a " },
  { t: "product", h: "pink" }, { t: ". " },
  { t: "Design gives it a point of view.", h: "yellow" },
  { t: " Code makes it real. The goal is simple: make it useful, memorable, and " },
  { t: "effortless to use", h: "blue" }, { t: "." },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"] },
  { group: "Programming", items: ["C++", "Python", "JavaScript", "Java"] },
  { group: "AI / ML", items: ["Machine Learning", "Prompt Engineering", "Data Visualization"] },
  { group: "Design", items: ["Figma", "UI/UX", "Prototyping", "Canva"] },
];

export const githubUser = "shruti-collab";

export const folders = [
  { name: "My projects", files: 14, tone: "blue", thumbs: ["/images/projects/thumb-1.jpg", "/images/projects/thumb-2.jpg", "/images/projects/thumb-3.jpg"] },
  { name: "UI/UX", files: 8, tone: "pink", thumbs: ["/images/ui-ux/thumb-1.jpg", "/images/ui-ux/thumb-2.jpg", "/images/ui-ux/thumb-3.jpg"] },
  { name: "Graphic design", files: 12, tone: "yellow", thumbs: ["/images/graphic-design/thumb-1.jpg", "/images/graphic-design/thumb-2.jpg", "/images/graphic-design/thumb-3.jpg"] },
  { name: "Research", files: 5, tone: "green", thumbs: ["/images/research/thumb-1.jpg", "/images/research/thumb-2.jpg", "/images/research/thumb-3.jpg"] },
];

// type: "work" or "study". Newest first.
export const timeline = [
  { type: "study", title: "B.Tech in Computer Science", org: "Your University", date: "2022 - 2026", desc: "Core subjects, CGPA, clubs or societies you lead." },
  { type: "work", title: "Software Developer Intern", org: "Company Name", date: "Jun - Aug 2025", desc: "What you built, shipped, and learned here in one or two lines." },
  { type: "work", title: "Web Developer Intern", org: "Another Company", date: "Jan - Mar 2025", desc: "Describe your impact with a number if you have one." },
  { type: "work", title: "Open-source frontend contributor", org: "Project Name", date: "2024 - Present", desc: "Mention merged pull requests or features." },
  { type: "study", title: "Online certification / course", org: "Platform or Institute", date: "2024", desc: "What you studied and what you built with it." },
  { type: "study", title: "Senior Secondary (Class XII)", org: "Your School", date: "2020 - 2022", desc: "Stream, score, and anything you are proud of." },
];

export const awards = [
  { tag: "hackathon winner", title: "2nd Prize - Hackathon Name", text: "Built a product that ... and placed 2nd out of 100 teams.", meta: "20+ teams" },
  { tag: "hackathon winner", title: "1st Place - Another Event", text: "Built an app for ... judged on innovation and design.", meta: "200+ participants" },
  { tag: "design winner", title: "1st Place - Frontend Hackathon", text: "Won a design-focused frontend challenge.", meta: "Competitive field" },
  { tag: "track winner", title: "Track Winner - Hack 2025", text: "Secured the sponsor track for building on ...", meta: "Virtual hackathon" },
  { tag: "special mention", title: "Best Team Award", text: "Recognised for teamwork and delivery.", meta: "1000+ participants" },
];

// Polaroid line carousel. Images live in /public/images/gallery
export const gallery = [
  { image: "/images/gallery/photo-1.jpg", title: "Hackathon night", caption: "36 hours, too much coffee, one working demo." },
  { image: "/images/gallery/photo-2.jpeg", title: "First stage", caption: "Presenting the project to the judges." },
  { image: "/images/gallery/photo-3.jpeg", title: "Desk setup", caption: "Where most of the shipping happens." },
  { image: "/images/gallery/photo-4.jpg", title: "Team photo", caption: "The people who made it possible." },
  { image: "/images/gallery/photo-5.jpeg", title: "Campus", caption: "A favourite corner to think in." },
  { image: "/images/gallery/photo-6.png", title: "Trip", caption: "Offline, on purpose." },
];

export const nav = ["Home", "About", "GitHub", "Projects", "Experience", "Achievements", "Gallery", "Contact"];
