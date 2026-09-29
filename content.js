/* ==========================================================================
   YOUR CONTENT — this is the only file you need to edit.
   --------------------------------------------------------------------------
   Tips:
   - Keep the quotes around text and the commas between items.
   - To remove a section, delete its items (leave an empty list: []) and it
     will disappear from the page automatically.
   - Images/PDFs go in the "assets" folder; refer to them as "assets/name.png".
   ========================================================================== */

window.SITE = {
  // ---- Look & feel -------------------------------------------------------
  theme: {
    accentColor: "#6366f1",   // any CSS color: "#e11d48", "teal", "rgb(0,120,255)"
    defaultMode: "auto",      // "light", "dark", or "auto" (follows the visitor's system)
  },

  // ---- Basics ------------------------------------------------------------
  name: "Ethan Lee",
  title: "Mechanical Engineer",
  tagline: " "",                  // e.g. "assets/me.jpg" — leave "" to show your initials
  location: "Austin, TX",
  email: "ethan.lee@utexas.edu",
  resumePdf: "",              // e.g. "assets/resume.pdf" — adds a "Download résumé" button

  // Social links: remove any you don't use, or add more with a label + url.
  links: [
    { label: "GitHub",   url: "https://github.com/yourname" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
  ],

  // ---- About -------------------------------------------------------------
  about: [
    "Write a short paragraph about who you are and what you do.",
    "Add a second paragraph if you like — each item in this list is a paragraph.",
  ],

  // ---- Skills (grouped) --------------------------------------------------
  skills: [
    { group: "Languages",  items: ["JavaScript", "Python", "SQL"] },
    { group: "Frameworks", items: ["React", "Node.js", "Django"] },
    { group: "Tools",      items: ["Git", "Docker", "AWS"] },
  ],

  // ---- Projects ----------------------------------------------------------
  // tags are used for the filter buttons above the project grid.
  projects: [
    {
      name: "Project One",
      description: "A one- or two-sentence summary of what it does and why it matters.",
      image: "",              // e.g. "assets/project-one.png"
      tags: ["React", "API"],
      links: [
        { label: "Live",   url: "https://example.com" },
        { label: "Code",   url: "https://github.com/yourname/project-one" },
      ],
    },
    {
      name: "Project Two",
      description: "Describe the problem, your approach, and the result.",
      image: "",
      tags: ["Python", "Data"],
      links: [{ label: "Code", url: "https://github.com/yourname/project-two" }],
    },
    {
      name: "Project Three",
      description: "Mention anything impressive: users, performance, awards.",
      image: "",
      tags: ["Node.js", "API"],
      links: [],
    },
  ],

  // ---- Experience --------------------------------------------------------
  experience: [
    {
      role: "Software Engineer",
      company: "Company Name",
      dates: "2023 — Present",
      location: "City",
      points: [
        "Led X, resulting in Y% improvement in Z.",
        "Built and shipped A used by B people.",
      ],
    },
    {
      role: "Software Engineering Intern",
      company: "Another Company",
      dates: "Summer 2022",
      location: "Remote",
      points: ["Did something meaningful and measurable."],
    },
  ],

  // ---- Education ---------------------------------------------------------
  education: [
    {
      school: "University Name",
      degree: "B.S. in Computer Science",
      dates: "2019 — 2023",
      details: "GPA, honors, relevant coursework (optional).",
    },
  ],

  // ---- Extra section (optional) -----------------------------------------
  // Certifications, awards, publications, volunteering... Rename freely.
  extras: {
    title: "Certifications & Awards",
    items: [
      { name: "AWS Certified Cloud Practitioner", detail: "2024" },
    ],
  },
};
