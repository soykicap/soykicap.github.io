/* =====================================================================
   YOUR CONTENT — edit this file to change what's on the site.
   ---------------------------------------------------------------------
   • Change any text between the "quotes".
   • To swap an image: put your file in the /images folder and type its
     name below (e.g. "images/red1.jpg").
   • sections: each project's photos, grouped under a heading with a
     photo credit. Add or remove file names inside "images".
   • coverFocus (optional): which part of the cover to keep when it's
     cropped, e.g. "60% 40%" = a bit right of centre, a bit high.
   • To reorder projects: cut a whole { ... }, block and paste it
     somewhere else in the list. Keep the comma after each block.
   • To add a project: copy a block, paste it, and change the details.
   • Custom title font for one project: put the font file in /fonts,
     list it under "fonts" below, then add  titleFont: "Its Name",
     to that project (see the first project). Remove the line to go back.
   ===================================================================== */

window.PORTFOLIO = {
  name: "Jeff",
  role: "Designer",
  location: "Kuala Lumpur, Malaysia",

  // Extra fonts you can use for project titles
  fonts: [
    { name: "Liquidity", file: "fonts/liquidity.woff2" },
  ],

  about: {
    headline: "Fashion-trained designer making brands you can hold, wear and pin to a wall.",
    paragraphs: [
      "Placeholder — I came to graphic design from fashion, so I think about how a logo sits on a swing tag, a tee or a shopping bag as much as how it looks on screen.",
      "Placeholder — My work covers identity, packaging, posters, tee graphics and campaign material. Write two or three sentences here about what you care about and the kind of team you want to join.",
    ],
    services: ["Brand identity", "Packaging", "Posters & print", "Tee & merch graphics", "Campaign assets"],
  },

  contact: [
    { label: "Email", value: "hello@yourname.com", link: "mailto:hello@yourname.com" },
    { label: "Instagram", value: "@yourhandle", link: "https://instagram.com/yourhandle" },
    { label: "Behance", value: "behance.net/yourname", link: "https://behance.net/yourname" },
    { label: "LinkedIn", value: "linkedin.com/in/yourname", link: "https://linkedin.com/in/yourname" },
  ],

  projects: [
    {
      title: "Red",
      titleFont: "Liquidity",
      category: "Final Year Collection · Look 01",
      year: "2025",
      cover: "images/covers/red.jpg",
      summary: "Placeholder — A red lace knit dress trailed by loose, rope-like tendrils that coil around the body and spill onto the floor. Tell the story of this look in two or three sentences.",
      details: { Role: "Placeholder — Design, pattern making, styling", Materials: "Placeholder — e.g. lace knit, hand-felted rope", Photography: "Weeyang, Herry" },
      sections: [
        { title: "Campaign", credit: "Photography & editing — Weeyang", images: ["images/red4.jpg", "images/red1.jpg", "images/red2.jpg", "images/red3.jpg"] },
        { title: "Editorial · Herry", credit: "Photography — Herry", images: ["images/herry/red-1071.jpg", "images/herry/red-1095.jpg", "images/herry/red-1110.jpg", "images/herry/red-1128.jpg", "images/herry/red-1155.jpg", "images/herry/red-1167.jpg", "images/herry/red-1172.jpg", "images/herry/red-1182.jpg", "images/herry/red-1193.jpg", "images/herry/red-1224.jpg"] },
        { title: "Lookbook", credit: "Photography & editing — Weeyang", images: ["images/lookbook/redlb1.jpg", "images/lookbook/redlb2.jpg"] },
      ],
      archiveGroup: "red",
    },
    {
      title: "Implode",
      category: "Final Year Collection · Look 02",
      year: "2025",
      cover: "images/covers/implode-front.jpg",
      summary: "Placeholder — An inflated, hourglass silhouette in a black-and-white printed shell that swallows the body from shoulder to thigh.",
      details: { Role: "Placeholder — Design, print, construction", Materials: "Placeholder — e.g. printed shell, padding", Photography: "Weeyang" },
      sections: [
        { title: "Campaign", credit: "Photography & editing — Weeyang", images: ["images/implode1.jpg", "images/implode2.jpg", "images/implode3.jpg"] },
        { title: "Lookbook", credit: "Photography & editing — Weeyang", images: ["images/lookbook/implodelb1.jpg", "images/lookbook/implodelb2.jpg", "images/lookbook/implodelb3.jpg", "images/lookbook/implodelb4.jpg", "images/lookbook/implodelb5.jpg", "images/lookbook/implodelb6.jpg"] },
      ],
      archiveGroup: "implode",
    },
    {
      title: "Noodle",
      category: "Final Year Collection · Look 03",
      year: "2025",
      cover: "images/covers/noodle.jpg",
      summary: "Placeholder — Soft, oversized white tubes that wrap, fold and collapse around the wearer, somewhere between garment and furniture.",
      details: { Role: "Placeholder — Design, construction", Materials: "Placeholder — e.g. cotton, wadding", Photography: "Weeyang" },
      sections: [
        { title: "Campaign", credit: "Photography & editing — Weeyang", images: ["images/noodle1.jpg", "images/noodle2.jpg", "images/noodle3.jpg", "images/noodle4.jpg", "images/noodle5.jpg"] },
        { title: "Lookbook", credit: "Photography & editing — Weeyang", images: ["images/lookbook/noodlelb1.jpg", "images/lookbook/noodlelb2.jpg"] },
      ],
      archiveGroup: "noodle",
    },
    {
      title: "Black",
      category: "Final Year Collection · Look 04",
      year: "2025",
      cover: "images/covers/black.jpg",
      summary: "Placeholder — Sharp black tailoring that dissolves into long fringe at the sleeves and hem.",
      details: { Role: "Placeholder — Design, tailoring", Materials: "Placeholder — e.g. wool, fringe", Photography: "Weeyang, Herry, Harry C" },
      sections: [
        { title: "Campaign", credit: "Photography & editing — Weeyang", images: ["images/black1.jpg", "images/black2.jpg", "images/black3.jpg"] },
        { title: "Editorial · Herry", credit: "Photography — Herry", images: ["images/herry/black-0870.jpg", "images/herry/black-0963.jpg", "images/herry/black-0996.jpg", "images/herry/black-1002.jpg", "images/herry/black-1018.jpg", "images/herry/black-1020.jpg", "images/herry/black-1043.jpg"] },
        { title: "Editorial · Harry C", credit: "Photography — Harry C", images: ["images/harryc/black99-01.jpg", "images/harryc/black99-02.jpg", "images/harryc/black99-04.jpg", "images/harryc/black99-06.jpg", "images/harryc/black99-07.jpg", "images/harryc/black99-08.jpg", "images/harryc/black99-11.jpg", "images/harryc/black99-12.jpg", "images/harryc/black99-14.jpg", "images/harryc/blackn1.jpg", "images/harryc/blackn2.jpg"] },
        { title: "Lookbook", credit: "Photography & editing — Weeyang", images: ["images/lookbook/blacklb1.jpg", "images/lookbook/blacklb2.jpg"] },
      ],
      archiveGroup: "black",
    },
  ],

  // "More photos" page: unedited shots from the Weeyang shoot
  archive: {
    title: "Archive",
    intro: "Unedited frames from the final-year collection shoot that didn't make the final edit.",
    credit: "Photography — Weeyang",
    groups: [
      { name: "Red", group: "red", images: ["images/archive/red1.jpg", "images/archive/red3.jpg", "images/archive/red4.jpg", "images/archive/red5.jpg", "images/archive/red7.jpg", "images/archive/red8.jpg", "images/archive/red9.jpg", "images/archive/red10.jpg", "images/archive/red11.jpg", "images/archive/red12.jpg", "images/archive/red14.jpg", "images/archive/red16.jpg", "images/archive/red17.jpg", "images/archive/red18.jpg", "images/archive/red19.jpg", "images/archive/red20.jpg"] },
      { name: "Implode", group: "implode", images: ["images/archive/implode-5.jpg", "images/archive/implode-6.jpg", "images/archive/implode-9.jpg", "images/archive/implode-10.jpg", "images/archive/implode-11.jpg", "images/archive/implode-13.jpg", "images/archive/implode-14.jpg", "images/archive/implode-15.jpg", "images/archive/implode-18.jpg", "images/archive/implode-19.jpg"] },
      { name: "Noodle", group: "noodle", images: ["images/archive/noodle-1.jpg", "images/archive/noodle-2.jpg", "images/archive/noodle-3.jpg", "images/archive/noodle-4.jpg", "images/archive/noodle-5.jpg", "images/archive/noodle-6.jpg", "images/archive/noodle-7.jpg", "images/archive/noodle-8.jpg", "images/archive/noodle-9.jpg", "images/archive/noodle-10.jpg", "images/archive/noodle-11.jpg", "images/archive/noodle-12.jpg", "images/archive/noodle-13.jpg", "images/archive/noodle-14.jpg", "images/archive/noodle-16.jpg", "images/archive/noodle-18.jpg", "images/archive/noodle-19.jpg"] },
      { name: "Black", group: "black", images: ["images/archive/black3.jpg", "images/archive/black4.jpg", "images/archive/black5.jpg", "images/archive/black6.jpg", "images/archive/black7.jpg", "images/archive/black8.jpg", "images/archive/black10.jpg", "images/archive/black11.jpg", "images/archive/black12.jpg", "images/archive/black14.jpg", "images/archive/black15.jpg", "images/archive/black16.jpg", "images/archive/black17.jpg", "images/archive/black18.jpg", "images/archive/black19.jpg", "images/archive/black21.jpg", "images/archive/black22.jpg", "images/archive/black23.jpg"] }
    ],
  },
};
