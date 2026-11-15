/* =====================================================================
   YOUR CONTENT — edit this file to change what's on the site.
   ---------------------------------------------------------------------
   • Change any text between the "quotes".
   • To swap an image: put your file in the /images folder and type its
     name below (e.g. "images/red1.jpg").
   • sections: each project's photos, grouped under a heading with a
     photo credit. Add or remove file names inside "images".
   • card: a single tall photo used for the scroll-down cards, the small
     thumbnails, and the full-screen cover on phones.
   • models (inside a section): interactive 3D models (.glb files in /models).
   • links (optional): buttons on the project page, e.g. an Instagram link.
   • coverFocus (optional): which part of the cover to keep when it's
     cropped, e.g. "60% 40%" = a bit right of centre, a bit high.
   • To reorder projects: cut a whole { ... }, block and paste it
     somewhere else in the list. Keep the comma after each block.
   • To add a project: copy a block, paste it, and change the details.
   • Custom title font for one project: put the font file in /fonts,
     list it under "fonts" below, then add  titleFont: "Its Name",
     to that project. Remove the line to go back.
   ===================================================================== */

window.PORTFOLIO = {
  name: "Jeff",
  role: "Designer",
  location: "Kuala Lumpur, Malaysia",

  // Extra fonts you can use for project titles
  fonts: [
    // { name: "Font Name", file: "fonts/your-font.woff2" },
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
      category: "Final Year Collection · Look 01",
      year: "2025",
      cover: "images/covers/red.jpg",
      card: "images/herry/red-1193.jpg",
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
      card: "images/lookbook/implodelb1.jpg",
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
      card: "images/noodle3.jpg",
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
      card: "images/herry/black-1020.jpg",
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
    {
      title: "Overgrowth",
      category: "Collaboration · Collection for a friend",
      year: "2025",
      cover: "images/covers/collab.jpg",
      card: "images/collab/dsc06624.jpg",
      summary: "Placeholder — A collection made with [friend's name]. I advised on the designs, worked out the construction, sewed the garments and helped run the shoot day. Add a line about the concept.",
      details: { Designer: "Placeholder — friend's name", "My role": "Design advice, construction, sewing, shoot-day support", Photography: "Weeyang" },
      sections: [
        { title: "Shoot", credit: "Photography — Weeyang", images: ["images/collab/dsc05956.jpg", "images/collab/dsc05967.jpg", "images/collab/dsc06043.jpg", "images/collab/dsc06046.jpg", "images/collab/dsc06134.jpg", "images/collab/dsc06217.jpg", "images/collab/dsc06232.jpg", "images/collab/dsc06244.jpg", "images/collab/dsc06257.jpg", "images/collab/dsc06268.jpg", "images/collab/dsc06288.jpg", "images/collab/dsc06383.jpg", "images/collab/dsc06413.jpg", "images/collab/dsc06522.jpg", "images/collab/dsc06528.jpg", "images/collab/dsc06569.jpg", "images/collab/dsc06624.jpg", "images/collab/dsc06679.jpg", "images/collab/dsc06694.jpg"] },
      ],
      archiveGroup: "camcorder",
    },
    {
      title: "Phase Space",
      category: "Event · takeover.zip",
      year: "2026",
      cover: "images/covers/event.jpg",
      card: "images/event/09.jpg",
      summary: "A semi-underground techno night at Phase Space on 28 March, featuring new and upcoming DJs playing genres rarely heard in Malaysia. Organised by takeover.zip, which I co-founded.",
      details: { Organiser: "takeover.zip (co-founder)", Venue: "Phase Space", Date: "28 March 2026", Photography: "Ronald", "Photo editing & posts": "Jeff" },
      links: [{ label: "takeover.zip on Instagram", url: "https://instagram.com/takeover.zip" }],
      sections: [
        { title: "Event posts", credit: "Photography — Ronald · Editing — Jeff", images: ["images/event/09.jpg", "images/event/22.jpg", "images/event/11.jpg", "images/event/01.jpg", "images/event/04.jpg", "images/event/05.jpg", "images/event/06.jpg", "images/event/07.jpg", "images/event/10.jpg", "images/event/13.jpg", "images/event/17.jpg", "images/event/18.jpg", "images/event/19.jpg", "images/event/02.jpg", "images/event/20.jpg", "images/event/23.jpg", "images/event/25.jpg", "images/event/26.jpg", "images/event/27.jpg", "images/event/29.jpg", "images/event/32.jpg", "images/event/35.jpg", "images/event/36.jpg", "images/event/38.jpg", "images/event/39.jpg", "images/event/40.jpg", "images/event/42.jpg", "images/event/43.jpg", "images/event/44.jpg"] },
      ],
    },
    {
      title: "3D Work",
      category: "3D Modelling · 3D Printing",
      year: "2026",
      cover: "images/covers/3d.jpg",
      card: "images/covers/3d-card.jpg",
      summary: "Placeholder — Forms modelled in 3D and printed. Drag each model to turn it around; on a phone, tap \u201cView in your space\u201d to see it at real size in the room.",
      details: { Tools: "Placeholder — e.g. Blender, Nomad Sculpt", Output: "3D printed", Year: "2026" },
      sections: [
        { title: "Models", credit: "Modelled by Jeff", models: [
          { src: "models/spoke-smooth.glb", name: "Spoke", caption: "Placeholder — a line about this piece: idea, process, material it was printed in.", size: "approx. 15 × 15 × 8 cm" },
          { src: "models/spoke-ball.glb", name: "Spoke Ball", caption: "Placeholder — a line about this piece.", size: "approx. 14 cm across" },
          { src: "models/flower-bowl.glb", name: "Flower Bowl", caption: "Placeholder — a line about this piece.", size: "approx. 20 × 20 × 4 cm", orbit: "20deg 55deg auto" },
        ] },
      ],
    },
  ],

  // "More photos" page: unedited shots from the Weeyang shoot
  archive: {
    title: "Archive",
    // the archive also appears as the last slide in the slideshow, with this cover
    cover: "images/covers/archive.jpg",
    card: "images/archive/school-clay-1009.jpg",
    intro: "Unedited frames and extras from the shoots, plus earlier work from school.",
    groups: [
      { section: "Final Year Collection", name: "Red", group: "red", credit: "Final Year Collection — Photography by Weeyang", images: ["images/archive/red1.jpg", "images/archive/red3.jpg", "images/archive/red4.jpg", "images/archive/red5.jpg", "images/archive/red7.jpg", "images/archive/red8.jpg", "images/archive/red9.jpg", "images/archive/red10.jpg", "images/archive/red11.jpg", "images/archive/red12.jpg", "images/archive/red14.jpg", "images/archive/red16.jpg", "images/archive/red17.jpg", "images/archive/red18.jpg", "images/archive/red19.jpg", "images/archive/red20.jpg"] },
      { section: "Final Year Collection", name: "Implode", group: "implode", credit: "Final Year Collection — Photography by Weeyang", images: ["images/archive/implode-5.jpg", "images/archive/implode-6.jpg", "images/archive/implode-9.jpg", "images/archive/implode-10.jpg", "images/archive/implode-11.jpg", "images/archive/implode-13.jpg", "images/archive/implode-14.jpg", "images/archive/implode-15.jpg", "images/archive/implode-18.jpg", "images/archive/implode-19.jpg"] },
      { section: "Final Year Collection", name: "Noodle", group: "noodle", credit: "Final Year Collection — Photography by Weeyang", images: ["images/archive/noodle-1.jpg", "images/archive/noodle-2.jpg", "images/archive/noodle-3.jpg", "images/archive/noodle-4.jpg", "images/archive/noodle-5.jpg", "images/archive/noodle-6.jpg", "images/archive/noodle-7.jpg", "images/archive/noodle-8.jpg", "images/archive/noodle-9.jpg", "images/archive/noodle-10.jpg", "images/archive/noodle-11.jpg", "images/archive/noodle-12.jpg", "images/archive/noodle-13.jpg", "images/archive/noodle-14.jpg", "images/archive/noodle-16.jpg", "images/archive/noodle-18.jpg", "images/archive/noodle-19.jpg"] },
      { section: "Final Year Collection", name: "Black", group: "black", credit: "Final Year Collection — Photography by Weeyang", images: ["images/archive/black3.jpg", "images/archive/black4.jpg", "images/archive/black5.jpg", "images/archive/black6.jpg", "images/archive/black7.jpg", "images/archive/black8.jpg", "images/archive/black10.jpg", "images/archive/black11.jpg", "images/archive/black12.jpg", "images/archive/black14.jpg", "images/archive/black15.jpg", "images/archive/black16.jpg", "images/archive/black17.jpg", "images/archive/black18.jpg", "images/archive/black19.jpg", "images/archive/black21.jpg", "images/archive/black22.jpg", "images/archive/black23.jpg"] },
      { section: "Overgrowth", name: "Camcorder", group: "camcorder", credit: "Overgrowth — camcorder shots from the shoot day", images: ["images/archive/cam-455.jpg", "images/archive/cam-457.jpg", "images/archive/cam-458.jpg", "images/archive/cam-461.jpg", "images/archive/cam-467.jpg", "images/archive/cam-469.jpg", "images/archive/cam-470.jpg", "images/archive/cam-476.jpg", "images/archive/cam-478.jpg", "images/archive/cam-479.jpg", "images/archive/cam-486.jpg", "images/archive/cam-488.jpg", "images/archive/cam-490.jpg", "images/archive/cam-494.jpg", "images/archive/cam-499.jpg", "images/archive/cam-504.jpg", "images/archive/cam-508.jpg", "images/archive/cam-509.jpg", "images/archive/cam-512.jpg", "images/archive/cam-514.jpg", "images/archive/cam-524.jpg", "images/archive/cam-525.jpg", "images/archive/cam-526.jpg", "images/archive/cam-530.jpg", "images/archive/cam-534.jpg", "images/archive/cam-538.jpg", "images/archive/cam-540.jpg", "images/archive/cam-546.jpg", "images/archive/cam-560.jpg", "images/archive/cam-562.jpg", "images/archive/cam-565.jpg", "images/archive/cam-570.jpg", "images/archive/cam-571.jpg", "images/archive/cam-572.jpg", "images/archive/cam-575.jpg", "images/archive/cam-578.jpg", "images/archive/cam-586.jpg", "images/archive/cam-594.jpg", "images/archive/cam-596.jpg"] },
      { section: "School work", name: "Muslins", group: "muslin", credit: "School work · 2023 · Year 2 muslin toiles: exam suit, denim jacket and bomber jacket", images: ["images/archive/school-muslin-5328.jpg", "images/archive/school-muslin-5329.jpg", "images/archive/school-muslin-5330.jpg", "images/archive/school-muslin-5515.jpg", "images/archive/school-muslin-5516.jpg", "images/archive/school-muslin-5517.jpg", "images/archive/school-muslin-5518.jpg", "images/archive/school-muslin-5553.jpg", "images/archive/school-muslin-5554.jpg", "images/archive/school-muslin-5556.jpg"] },
      { section: "School work", name: "Jury Dress", group: "jury", credit: "School work · 2022 · Jury dress", images: ["images/archive/school-jury-2373.jpg", "images/archive/school-jury-2374.jpg", "images/archive/school-jury-2375.jpg", "images/archive/school-jury-2378.jpg", "images/archive/school-jury-2380.jpg", "images/archive/school-jury-2382.jpg"] },
      { section: "School work", name: "Abstract Suit", group: "suit", credit: "School work · 2023 · Abstract suit, with process shots", images: ["images/archive/school-suit-4972.jpg", "images/archive/school-suit-4976.jpg", "images/archive/school-suit-5003.jpg", "images/archive/school-suit-5004.jpg", "images/archive/school-suit-5005.jpg", "images/archive/school-suit-5006.jpg", "images/archive/school-suit-5010.jpg"] },
      { section: "School work", name: "Clay Spine & Ribcage", group: "clay", credit: "School work · February 2022 · Sculpted clay spine and ribcage on a toile", images: ["images/archive/school-clay-1005.jpg", "images/archive/school-clay-1008.jpg", "images/archive/school-clay-1009.jpg", "images/archive/school-clay-1010.jpg", "images/archive/school-clay-1011.jpg", "images/archive/school-clay-1016.jpg", "images/archive/school-clay-1017.jpg", "images/archive/school-clay-1018.jpg"] },
      { section: "School work", name: "Hanbok", group: "hanbok", credit: "School work · 2023 · Group project: designed by a classmate, pattern making and sewing by Jeff", images: ["images/archive/school-hanbok-7411.jpg", "images/archive/school-hanbok-7412.jpg", "images/archive/school-hanbok-7415.jpg", "images/archive/school-hanbok-7417.jpg", "images/archive/school-hanbok-7420.jpg", "images/archive/school-hanbok-7421.jpg"] },
    ],
  },
};
