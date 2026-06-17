const filterButtons = document.querySelectorAll("[data-filter]");
const courseCards = document.querySelectorAll(".course-card");
const adminApp = document.querySelector("#adminApp");
const adminLogout = document.querySelector("#adminLogout");
const portalLoginForm = document.querySelector("#portalLoginForm");
const portalLoginError = document.querySelector("#portalLoginError");
const clientLogout = document.querySelector("#clientLogout");
const classroomName = document.querySelector("#classroomName");
const classroomLabel = document.querySelector("#classroomLabel");
const courseSearchForms = document.querySelectorAll(".course-search");
const dashboardBackButtons = document.querySelectorAll(".dashboard-back");
const dashboardJumps = document.querySelectorAll("[data-open-section]");
const announcementForm = document.querySelector("#announcementForm");
const adminAnnouncements = document.querySelector("#adminAnnouncements");
const studentAnnouncements = document.querySelector("#studentAnnouncements");
const studentAnnouncementClass = document.querySelector("#studentAnnouncementClass");
const chatbox = document.querySelector("#chatbox");
const chatForm = document.querySelector("#chatForm");
const chatMessage = document.querySelector("#chatMessage");
const chatMessages = document.querySelector("#chatMessages");
const chatClassroom = document.querySelector("#chatClassroom");
const chatToggles = document.querySelectorAll(".chat-toggle");
const courseForm = document.querySelector("#courseForm");
const courseTitle = document.querySelector("#courseTitle");
const courseDescription = document.querySelector("#courseDescription");
const courseCover = document.querySelector("#courseCover");
const privateMessagePanel = document.querySelector(".private-message-panel");
const privateMessageStudent = document.querySelector("#privateMessageStudent");
const privateMessageStudentName = document.querySelector("#privateMessageStudentName");
const privateMessages = document.querySelector("#privateMessages");
const privateMessageForm = document.querySelector("#privateMessageForm");
const privateMessageText = document.querySelector("#privateMessageText");
const videoForm = document.querySelector("#videoForm");
const videoError = document.querySelector("#videoError");
const adminVideos = document.querySelector("#adminVideos");
const studentVideos = document.querySelector("#studentVideos");
const studentVideoClass = document.querySelector("#studentVideoClass");
const assignmentForm = document.querySelector("#assignmentForm");
const adminAssignments = document.querySelector("#adminAssignments");
const adminGrades = document.querySelector("#adminGrades");
const studentAssignments = document.querySelector("#studentAssignments");
const studentAssignmentClass = document.querySelector("#studentAssignmentClass");
const videoModal = document.querySelector("#videoModal");
const videoModalFrame = document.querySelector("#videoModalFrame");
const videoModalLabel = document.querySelector("#videoModalLabel");
const invitationForm = document.querySelector("#invitationForm");
const studentInvitations = document.querySelector("#studentInvitations");
const studentInvitationClass = document.querySelector("#studentInvitationClass");
const enrollmentRequests = document.querySelector("#enrollmentRequests");
const studentSectionLinks = document.querySelectorAll("[data-student-section-link]");
const studentSections = document.querySelectorAll("[data-student-section]");
const sectionMenuToggle = document.querySelector("#sectionMenuToggle");
const sectionMenuBackdrop = document.querySelector("#sectionMenuBackdrop");
const sectionNav = document.querySelector("#sectionNav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobileSectionQuery = window.matchMedia("(max-width: 991.98px)");

const motionObserver = !prefersReducedMotion && "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("motion-visible");
        motionObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 })
  : null;

function observeMotionElements(root = document) {
  const elements = root.querySelectorAll(".card, .announcement-item, .grade-tile, .gradebook-course, .chat-message, .student-section-nav");

  elements.forEach((element) => {
    if (element.classList.contains("motion-ready")) return;

    element.classList.add("motion-ready");

    if (!motionObserver) {
      element.classList.add("motion-visible");
      return;
    }

    element.classList.add("motion-reveal");
    motionObserver.observe(element);
  });
}

function setSectionMenuOpen(isOpen) {
  if (!sectionMenuToggle || !sectionNav) return;

  sectionMenuToggle.setAttribute("aria-expanded", String(isOpen));
  sectionMenuToggle.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} sections menu`);
  sectionMenuToggle.classList.toggle("active", isOpen);
  sectionNav.classList.toggle("section-menu-open", isOpen);
  sectionMenuBackdrop?.classList.toggle("active", isOpen);
  document.body.classList.toggle("section-menu-lock", isOpen);
}

sectionMenuToggle?.addEventListener("click", () => {
  const isOpen = sectionMenuToggle.getAttribute("aria-expanded") === "true";
  setSectionMenuOpen(!isOpen);
});

sectionMenuBackdrop?.addEventListener("click", () => {
  setSectionMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setSectionMenuOpen(false);
});

const classroomTitles = {
  ict: "ICT OJT Classroom",
  css: "Computer Systems Servicing",
  all: "All Classrooms"
};

const classroomStudents = {
  ict: [
    { id: "ict-andrea", name: "Andrea Valdez" },
    { id: "ict-jomar", name: "Jomar Mercado" },
    { id: "ict-mika", name: "Mika Santos" }
  ],
  css: [
    { id: "css-ella", name: "Ella Reyes" },
    { id: "css-paolo", name: "Paolo Cruz" },
    { id: "css-nina", name: "Nina Ramos" }
  ]
};

const requestedClassroom = new URLSearchParams(window.location.search).get("classroom") || "ict";
const selectedClassroom = classroomTitles[requestedClassroom] ? requestedClassroom : "ict";
const selectedClassroomTitle = classroomTitles[selectedClassroom];
const currentStudent = {
  ...((classroomStudents[selectedClassroom] || classroomStudents.ict)[0]),
  classroom: selectedClassroom
};

const subjectCourseMap = {
  "General Activity": ""
};

const demoAnnouncements = [
  {
    id: "demo-ict-pinned",
    classroom: "ict",
    subject: "OJT Onboarding Essentials",
    message: "Please complete your onboarding checklist before Friday.",
    pinned: true,
    createdAt: "2026-06-11T08:00:00.000Z"
  },
  {
    id: "demo-css-safety",
    classroom: "css",
    subject: "Safety and Compliance",
    message: "Bring your lab tools and review the safety reminders before class.",
    pinned: false,
    createdAt: "2026-06-11T09:00:00.000Z"
  }
];

const demoVideos = [
  {
    id: "demo-video-ict",
    classroom: "ict",
    title: "OJT Orientation Walkthrough",
    youtubeId: "dQw4w9WgXcQ",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-06-11T10:00:00.000Z"
  }
];

const demoAssignments = [
  {
    id: "demo-assignment-ict",
    classroom: "ict",
    subject: "OJT Onboarding Essentials",
    title: "Onboarding Checklist Submission",
    instructions: "Upload your completed onboarding checklist and supervisor acknowledgment.",
    dueDate: "2026-06-18T17:00",
    createdAt: "2026-06-11T12:00:00.000Z"
  }
];

let expandedAssignmentId;

const demoInvitations = [
  {
    id: "demo-invite-ict",
    classroom: "ict",
    title: "ICT OJT GMeet Consultation",
    link: "https://meet.google.com/demo-ict-ojt",
    createdAt: "2026-06-11T11:00:00.000Z"
  }
];

const courseWorkspaces = {};

const courseAccentClasses = ["primary", "coral", "sand"];

function createTextElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function getAllStudents() {
  return Object.entries(classroomStudents).flatMap(([classroom, students]) => {
    return students.map((student) => ({ ...student, classroom }));
  });
}

function getStudentGrades() {
  return getStoredItems("gthStudentGrades", []);
}

function getStudentGrade(courseId, studentId) {
  return getStudentGrades().find((grade) => grade.courseId === courseId && grade.studentId === studentId);
}

function calculateFinalGrade(grade = {}) {
  const values = ["prelim", "midterm", "final"].map((key) => grade[key]);
  if (values.some((value) => value === "" || value === null || value === undefined)) return null;
  const parts = values.map((value) => Number(value));
  if (parts.some((part) => Number.isNaN(part))) return null;
  return Math.round(parts.reduce((total, part) => total + part, 0) / parts.length);
}

function renderCourseGradeSummary(courseId, student = currentStudent) {
  const grade = getStudentGrade(courseId, student.id) || {};
  const finalGrade = calculateFinalGrade(grade);
  const summary = document.createElement("div");
  summary.className = "course-grade-summary mt-3";

  summary.append(
    createTextElement("p", "section-label mb-1", "Current grades"),
    createTextElement("h4", "h6 mb-3", student.name)
  );

  const grid = document.createElement("div");
  grid.className = "course-grade-grid";

  [
    ["Prelim", grade.prelim],
    ["Midterm", grade.midterm],
    ["Final", grade.final],
    ["Final Grade", finalGrade]
  ].forEach(([label, value]) => {
    const tile = document.createElement("div");
    tile.className = "course-grade-tile";
    tile.append(
      createTextElement("span", "", label),
      createTextElement("strong", "", value === null || value === undefined || value === "" ? "--" : `${value}%`)
    );
    grid.appendChild(tile);
  });

  summary.appendChild(grid);
  return summary;
}

function renderCourseWorkspace(courseId, triggerCard) {
  const course = courseWorkspaces[courseId];
  const courseList = triggerCard.closest("#courseList");
  if (!course || !courseList) return;

  document.querySelectorAll(".course-card").forEach((card) => {
    const isActive = card === triggerCard;
    card.classList.toggle("course-card-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  courseList.parentElement.querySelector(".course-workspace")?.remove();

  const workspace = document.createElement("section");
  workspace.className = `course-workspace course-workspace-${course.accent}`;
  workspace.setAttribute("aria-live", "polite");

  const hero = document.createElement("div");
  hero.className = "course-workspace-hero";

  const heroText = document.createElement("div");
  heroText.append(
    createTextElement("p", "section-label mb-1", "Course workspace"),
    createTextElement("h3", "h4 mb-2", course.title),
    createTextElement("p", "text-secondary mb-0", course.description)
  );

  const heroMeta = document.createElement("div");
  heroMeta.className = "course-workspace-meta";
  heroMeta.append(
    createTextElement("span", "badge text-bg-info", course.status),
    createTextElement("strong", "", `${course.progress}%`)
  );

  hero.append(heroText, heroMeta);

  const progress = document.createElement("div");
  progress.className = "course-workspace-progress progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", `${course.title} progress`);
  progress.setAttribute("aria-valuenow", String(course.progress));
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");

  const progressBar = document.createElement("div");
  progressBar.className = `progress-bar ${course.accent === "coral" ? "bg-coral" : course.accent === "sand" ? "bg-sand" : ""}`;
  progressBar.style.width = `${course.progress}%`;
  progress.appendChild(progressBar);

  const body = document.createElement("div");
  body.className = "course-workspace-grid";

  const stream = document.createElement("article");
  stream.className = "course-workspace-panel course-workspace-panel-main";
  const currentNext = getCourseItems(getCourseNextPosts(), courseId)[0];
  stream.append(
    createTextElement("p", "section-label mb-1", "Next up"),
    createTextElement("h4", "h6 mb-2", currentNext?.title || course.next)
  );

  if (currentNext?.message) {
    stream.appendChild(createTextElement("p", "text-secondary small mb-0", currentNext.message));
  }

  if (adminApp) stream.appendChild(renderCourseNextForm(courseId, currentNext));

  const quizTitle = createTextElement("h4", "h6 mt-4 mb-2", "Quizzes");
  const quizList = document.createElement("div");
  quizList.className = "course-post-list";
  const quizzes = getCourseItems(getCourseQuizzes(), courseId);
  const quizScore = getCourseQuizScore(courseId);
  stream.appendChild(quizTitle);
  if (adminApp) stream.appendChild(renderCourseQuizForm(courseId));

  if (!adminApp && quizzes.length) {
    const scoreSummary = document.createElement("div");
    scoreSummary.className = "course-quiz-score";
    scoreSummary.append(
      createTextElement("span", "", "Quiz score"),
      createTextElement("strong", "", `${quizScore.points}/${quizScore.total} points`)
    );
    stream.appendChild(scoreSummary);
  }

  if (!quizzes.length) {
    quizList.appendChild(createTextElement("p", "text-secondary small mb-0", adminApp ? "No quizzes posted yet." : "No quizzes for this course yet."));
  } else {
    quizzes.forEach((quiz) => quizList.appendChild(renderCourseQuizItem(quiz)));
  }

  stream.appendChild(quizList);
  stream.appendChild(renderCourseGradeSummary(courseId));

  const side = document.createElement("aside");
  side.className = "course-workspace-panel";

  const resourceTitle = createTextElement("h4", "h6 mb-2", "Classwork and resources");
  const resourceList = document.createElement("div");
  resourceList.className = "course-post-list";
  course.resources.forEach((resource) => {
    resourceList.appendChild(renderStaticCourseResource(resource, course));
  });
  getCourseItems(getCourseResources(), courseId).forEach((resource) => {
    resourceList.appendChild(renderCourseResourceItem(resource));
  });
  if (adminApp) resourceList.appendChild(renderCourseResourceForm(courseId));

  const activityTitle = createTextElement("h4", "h6 mt-4 mb-2", adminApp ? "Learner activity" : "Recent activity");
  const activityList = document.createElement("div");
  activityList.className = "course-activity-list";
  course.activity.forEach((activity) => {
    activityList.appendChild(createTextElement("p", "small text-secondary mb-2", activity));
  });

  side.append(resourceTitle, resourceList, activityTitle, activityList);

  body.append(stream, side);
  workspace.append(hero, progress, body);
  courseList.insertAdjacentElement("afterend", workspace);
  observeMotionElements(workspace);
  workspace.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
}

function bindCourseCard(card) {
  if (card.dataset.courseBound === "true") return;
  card.dataset.courseBound = "true";
  card.tabIndex = 0;
  card.role = "button";
  card.setAttribute("aria-pressed", "false");

  card.addEventListener("click", () => {
    renderCourseWorkspace(card.dataset.course, card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    renderCourseWorkspace(card.dataset.course, card);
  });
}

courseCards.forEach(bindCourseCard);

dashboardJumps.forEach((jump) => {
  jump.addEventListener("click", () => {
    showStudentSection(jump.dataset.openSection, { updateHash: true });
  });

  jump.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    showStudentSection(jump.dataset.openSection, { updateHash: true });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".course-card").forEach((card) => {
      const isVisible = filter === "all" || card.dataset.status === filter;
      card.classList.toggle("d-none", !isVisible);
    });

    const activeCard = document.querySelector(".course-card-active");
    if (activeCard?.classList.contains("d-none")) {
      activeCard.classList.remove("course-card-active");
      activeCard.setAttribute("aria-pressed", "false");
      activeCard.closest("#courseList")?.parentElement.querySelector(".course-workspace")?.remove();
    }
  });
});

dashboardBackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "index.html";
  });
});

function showStudentSection(sectionId, options = {}) {
  if (!studentSections.length) return;

  const targetSection = document.querySelector(`[data-student-section="${sectionId}"]`) || studentSections[0];
  const targetId = targetSection.dataset.studentSection;

  studentSections.forEach((section) => {
    section.classList.toggle("active", section === targetSection);
  });

  studentSectionLinks.forEach((link) => {
    const isActive = link.dataset.studentSectionLink === targetId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (options.updateHash) {
    history.replaceState(null, "", `#${targetId}`);
  }

  observeMotionElements(targetSection);

  if (options.updateHash && mobileSectionQuery.matches) {
    targetSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }
}

if (studentSections.length) {
  const initialSection = window.location.hash.replace("#", "") || "announcements";
  showStudentSection(initialSection);

  studentSectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showStudentSection(link.dataset.studentSectionLink, { updateHash: true });
      setSectionMenuOpen(false);
    });
  });

  window.addEventListener("hashchange", () => {
    showStudentSection(window.location.hash.replace("#", "") || "announcements");
  });
}

courseSearchForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = form.querySelector("input[type='search']");
    const query = searchInput?.value.trim().toLowerCase();
    if (!query) return;

    const cards = Array.from(document.querySelectorAll(".course-card"));
    const match = cards.find((card) => {
      const title = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
      return title.includes(query);
    });

    cards.forEach((card) => card.classList.remove("course-search-match"));

    if (!match) {
      searchInput.classList.add("is-invalid");
      setTimeout(() => {
        searchInput.classList.remove("is-invalid");
      }, 1200);
      return;
    }

    match.classList.remove("d-none");
    match.scrollIntoView({ behavior: "smooth", block: "center" });
    match.classList.add("course-search-match");

    setTimeout(() => {
      match.classList.remove("course-search-match");
    }, 2200);
  });
});

function getStoredItems(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function saveStoredItems(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Keep the demo usable if browser storage is unavailable.
  }
}

function getCustomCourses() {
  return getStoredItems("gthCourses", []);
}

function saveCustomCourses(courses) {
  saveStoredItems("gthCourses", courses);
}

function getCourseResources() {
  return getStoredItems("gthCourseResources", []);
}

function saveCourseResources(resources) {
  saveStoredItems("gthCourseResources", resources);
}

function getCourseQuizzes() {
  return getStoredItems("gthCourseQuizzes", []);
}

function saveCourseQuizzes(quizzes) {
  saveStoredItems("gthCourseQuizzes", quizzes);
}

function getCourseQuizSubmissions() {
  return getStoredItems("gthCourseQuizSubmissions", []);
}

function saveCourseQuizSubmissions(submissions) {
  saveStoredItems("gthCourseQuizSubmissions", submissions);
}

function getCourseNextPosts() {
  return getStoredItems("gthCourseNextPosts", []);
}

function saveCourseNextPosts(posts) {
  saveStoredItems("gthCourseNextPosts", posts);
}

function readStorageFile(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        data: String(reader.result || "")
      });
    });
    reader.addEventListener("error", () => resolve(null));
    reader.readAsDataURL(file);
  });
}

function getCourseItems(items, courseId) {
  return items
    .filter((item) => item.courseId === courseId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function renderCourseNextForm(courseId, currentNext = {}) {
  const form = document.createElement("form");
  form.className = "course-post-form vstack gap-2 mt-3";
  form.dataset.courseNextForm = courseId;

  const title = document.createElement("input");
  title.className = "form-control form-control-sm";
  title.name = "title";
  title.type = "text";
  title.placeholder = "Next up title";
  title.required = true;
  title.value = currentNext.title || "";

  const message = document.createElement("textarea");
  message.className = "form-control form-control-sm";
  message.name = "message";
  message.rows = 3;
  message.placeholder = "What should students do next?";
  message.required = true;
  message.value = currentNext.message || "";

  const button = document.createElement("button");
  button.className = "btn btn-primary btn-sm align-self-start";
  button.type = "submit";
  button.textContent = "Update Next Up";

  form.append(title, message, button);
  return form;
}

function renderCourseResourceItem(resource) {
  const item = document.createElement("details");
  item.className = "course-resource-item";

  const summary = document.createElement("summary");
  summary.className = "course-resource-summary";
  const summaryText = document.createElement("span");
  summaryText.append(
    createTextElement("strong", "", resource.title),
    createTextElement("small", "text-secondary d-block", resource.description || "Open to view details")
  );
  summary.append(summaryText, createTextElement("span", "badge text-bg-info", "Open"));

  const content = document.createElement("div");
  content.className = "course-resource-content";
  content.appendChild(createTextElement("p", "text-secondary small mb-2", resource.description || "Posted course material"));

  if (resource.file?.name || resource.link) {
    const details = document.createElement("p");
    details.className = "small text-secondary mb-0";
    details.textContent = resource.file?.name || resource.link;
    content.appendChild(details);
  }

  const preview = renderCourseResourcePreview(resource);
  if (preview) content.appendChild(preview);

  const actions = document.createElement("div");
  actions.className = "d-flex flex-wrap gap-2";

  if (resource.file?.data) {
    const fileLink = document.createElement("a");
    fileLink.className = "btn btn-outline-secondary btn-sm";
    fileLink.href = resource.file.data;
    fileLink.download = resource.file.name;
    fileLink.textContent = `Open ${resource.file.name}`;
    actions.appendChild(fileLink);
  }

  if (resource.link) {
    const link = document.createElement("a");
    link.className = "btn btn-outline-secondary btn-sm";
    link.href = resource.link;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open Link";
    actions.appendChild(link);
  }

  if (adminApp) {
    const remove = document.createElement("button");
    remove.className = "btn btn-outline-danger btn-sm";
    remove.type = "button";
    remove.dataset.courseResourceAction = "remove";
    remove.dataset.resourceId = resource.id;
    remove.textContent = "Remove";
    actions.appendChild(remove);
  }

  content.appendChild(actions);
  item.append(summary, content);
  return item;
}

function isImagePath(value = "") {
  return /\.(apng|avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(value);
}

function isPdfPath(value = "") {
  return /\.pdf(\?.*)?$/i.test(value);
}

function renderCourseResourcePreview(resource) {
  const file = resource.file;
  const link = resource.link || "";
  const preview = document.createElement("div");
  preview.className = "course-resource-preview";

  if (file?.data && (file.type?.startsWith("image/") || isImagePath(file.name))) {
    const image = document.createElement("img");
    image.src = file.data;
    image.alt = file.name;
    preview.appendChild(image);
    return preview;
  }

  if (file?.data && (file.type === "application/pdf" || isPdfPath(file.name))) {
    const frame = document.createElement("iframe");
    frame.src = file.data;
    frame.title = `${file.name} preview`;
    preview.appendChild(frame);
    return preview;
  }

  if (link && isImagePath(link)) {
    const image = document.createElement("img");
    image.src = link;
    image.alt = resource.title;
    preview.appendChild(image);
    return preview;
  }

  if (link && isPdfPath(link)) {
    const frame = document.createElement("iframe");
    frame.src = link;
    frame.title = `${resource.title} preview`;
    preview.appendChild(frame);
    return preview;
  }

  return null;
}

function renderStaticCourseResource(resource, course) {
  const item = document.createElement("details");
  item.className = "course-resource-item";

  const summary = document.createElement("summary");
  summary.className = "course-resource-summary";
  const summaryText = document.createElement("span");
  summaryText.append(
    createTextElement("strong", "", resource)
  );
  summary.append(summaryText, createTextElement("span", "badge text-bg-info", "Open"));

  const content = document.createElement("div");
  content.className = "course-resource-content";
  const text = resource.toLowerCase().includes("description")
    ? course.description
    : "Details will appear here when the admin posts related material.";
  content.appendChild(createTextElement("p", "text-secondary small mb-0", text));

  item.append(summary, content);
  return item;
}

function renderCourseResourceForm(courseId) {
  const form = document.createElement("form");
  form.className = "course-post-form vstack gap-2 mt-3";
  form.dataset.courseResourceForm = courseId;

  const title = document.createElement("input");
  title.className = "form-control form-control-sm";
  title.name = "title";
  title.type = "text";
  title.placeholder = "Reviewer or resource title";
  title.required = true;

  const description = document.createElement("textarea");
  description.className = "form-control form-control-sm";
  description.name = "description";
  description.rows = 2;
  description.placeholder = "Preview text students see before opening";
  description.required = true;

  const file = document.createElement("input");
  file.className = "form-control form-control-sm";
  file.name = "file";
  file.type = "file";
  file.accept = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*";

  const link = document.createElement("input");
  link.className = "form-control form-control-sm";
  link.name = "link";
  link.type = "url";
  link.placeholder = "Optional resource link";

  const button = document.createElement("button");
  button.className = "btn btn-primary btn-sm align-self-start";
  button.type = "submit";
  button.textContent = "Post Resource";

  form.append(title, description, file, link, button);
  return form;
}

function getQuizSubmission(quizId, student = currentStudent) {
  return getCourseQuizSubmissions().find((submission) => submission.quizId === quizId && submission.studentId === student.id);
}

function getQuizTypeLabel(type) {
  if (type === "multiple-choice") return "Multiple Choice";
  if (type === "true-false") return "True or False";
  return "Modified True or False";
}

function getQuizQuestions(quiz) {
  if (Array.isArray(quiz.questions) && quiz.questions.length) return quiz.questions;

  return [{
    id: `${quiz.id}-q1`,
    question: quiz.question,
    options: quiz.options || [],
    correctAnswer: quiz.correctAnswer,
    correction: quiz.correction || ""
  }];
}

function getSubmittedAnswer(submission, question, index) {
  if (!submission) return "";
  if (submission.answers && Object.prototype.hasOwnProperty.call(submission.answers, question.id)) {
    return submission.answers[question.id];
  }
  return index === 0 ? submission.answer || "" : "";
}

function getSubmittedCorrection(submission, question, index) {
  if (!submission) return "";
  if (submission.corrections && Object.prototype.hasOwnProperty.call(submission.corrections, question.id)) {
    return submission.corrections[question.id];
  }
  return index === 0 ? submission.correction || "" : "";
}

function getQuizScore(quiz, submission) {
  if (!submission) return 0;
  return getQuizQuestions(quiz).reduce((total, question, index) => {
    return total + (getSubmittedAnswer(submission, question, index) === question.correctAnswer ? 1 : 0);
  }, 0);
}

function getCourseQuizScore(courseId, student = currentStudent) {
  const quizzes = getCourseItems(getCourseQuizzes(), courseId);
  return quizzes.reduce((score, quiz) => {
    const submission = getQuizSubmission(quiz.id, student);
    const total = getQuizQuestions(quiz).length;
    return {
      points: score.points + getQuizScore(quiz, submission),
      total: score.total + total
    };
  }, { points: 0, total: 0 });
}

function renderCourseQuizItem(quiz) {
  const item = document.createElement("details");
  item.className = "course-quiz-item";

  const questions = getQuizQuestions(quiz);
  const submission = getQuizSubmission(quiz.id);
  const score = getQuizScore(quiz, submission);
  const quizExpired = isPastDue(quiz.dueAt);
  const summary = document.createElement("summary");
  summary.className = "course-quiz-summary";
  const summaryText = document.createElement("span");
  summaryText.append(
    createTextElement("strong", "", quiz.title),
    createTextElement("small", "text-secondary d-block", `${getQuizTypeLabel(quiz.type)} - ${questions.length} question${questions.length === 1 ? "" : "s"}`)
  );
  if (quiz.dueAt) {
    summaryText.appendChild(createTextElement("small", quizExpired && !submission ? "text-danger d-block" : "text-secondary d-block", `Due ${formatDateTime(quiz.dueAt)}`));
  }
  const summaryBadge = createTextElement("span", `badge ${submission ? "text-bg-success" : quizExpired ? "text-bg-warning" : "text-bg-info"}`, submission ? `${score}/${questions.length} points` : quizExpired ? "Closed" : "Open");
  summary.append(summaryText, summaryBadge);

  const meta = document.createElement("div");
  meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";
  meta.append(
    createTextElement("span", "badge text-bg-info", getQuizTypeLabel(quiz.type)),
    createTextElement("small", "text-secondary", formatDate(quiz.createdAt))
  );
  if (quiz.dueAt) {
    meta.appendChild(createTextElement("span", quizExpired ? "badge text-bg-warning" : "badge text-bg-info", `Due ${formatDateTime(quiz.dueAt)}`));
  }

  const content = document.createElement("div");
  content.className = "course-quiz-content";
  content.appendChild(meta);

  if (adminApp || submission) {
    questions.forEach((question, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.className = "course-quiz-question";
      questionBlock.appendChild(createTextElement("p", "fw-bold mb-2", `${index + 1}. ${question.question}`));

      const options = document.createElement("div");
      options.className = "course-quiz-options mb-2";
      const choices = quiz.type === "multiple-choice"
        ? question.options.map((option, optionIndex) => [String.fromCharCode(65 + optionIndex), option])
        : [["True", "True"], ["False", "False"]];

      choices.forEach(([value, label]) => {
        const optionRow = document.createElement("div");
        const isCorrect = adminApp && question.correctAnswer === value;
        const isSubmitted = getSubmittedAnswer(submission, question, index) === value;
        optionRow.className = `course-quiz-option${isCorrect ? " course-quiz-option-correct" : ""}${isSubmitted ? " course-quiz-option-selected" : ""}`;
        optionRow.append(
          createTextElement("span", "course-quiz-letter", value),
          createTextElement("span", "", label)
        );
        options.appendChild(optionRow);
      });

      questionBlock.appendChild(options);
      if (adminApp) {
        questionBlock.appendChild(createTextElement("p", "small text-secondary mb-0", `Answer key: ${question.correctAnswer}${question.correction ? ` - ${question.correction}` : ""}`));
      }
      content.appendChild(questionBlock);
    });
  }

  if (adminApp) {
    const remove = document.createElement("button");
    remove.className = "btn btn-outline-danger btn-sm";
    remove.type = "button";
    remove.dataset.courseQuizAction = "remove";
    remove.dataset.quizId = quiz.id;
    remove.textContent = "Remove";
    content.appendChild(remove);
  } else {
    if (submission) {
      const result = document.createElement("div");
      result.className = "course-quiz-result";
      result.append(
        createTextElement("span", "badge text-bg-success", `Score: ${score}/${questions.length} points`),
        createTextElement("small", "text-secondary", "Submitted answers are highlighted above.")
      );
      content.appendChild(result);
    } else if (quizExpired) {
      const closed = document.createElement("div");
      closed.className = "course-quiz-result";
      closed.append(
        createTextElement("span", "badge text-bg-warning", "Closed"),
        createTextElement("small", "text-secondary", `This quiz closed on ${formatDateTime(quiz.dueAt)}.`)
      );
      content.appendChild(closed);
    } else {
      const form = document.createElement("form");
      form.className = "course-quiz-answer vstack gap-2";
      form.dataset.courseQuizAnswer = quiz.id;

      questions.forEach((question, index) => {
        const answerBlock = document.createElement("div");
        answerBlock.className = "course-quiz-question";
        answerBlock.appendChild(createTextElement("p", "fw-bold mb-2", `${index + 1}. ${question.question}`));

        const choices = document.createElement("div");
        choices.className = "course-answer-choices";
        const answerChoices = quiz.type === "multiple-choice"
          ? question.options.map((option, optionIndex) => [String.fromCharCode(65 + optionIndex), option])
          : [["True", "True"], ["False", "False"]];

        answerChoices.forEach(([value, labelText]) => {
          const label = document.createElement("label");
          label.className = "course-answer-choice";

          const input = document.createElement("input");
          input.className = "visually-hidden";
          input.name = `answer-${question.id}`;
          input.type = "radio";
          input.value = value;
          input.required = true;

          label.append(
            input,
            createTextElement("span", "course-quiz-letter", value),
            createTextElement("span", "", labelText)
          );
          choices.appendChild(label);
        });
        answerBlock.appendChild(choices);

        if (quiz.type === "modified-true-false") {
          const correction = document.createElement("input");
          correction.className = "form-control form-control-sm mt-2";
          correction.name = `correction-${question.id}`;
          correction.type = "text";
          correction.placeholder = "If false, write the corrected statement";
          answerBlock.appendChild(correction);
        }

        form.appendChild(answerBlock);
      });

      const button = document.createElement("button");
      button.className = "btn btn-primary btn-sm align-self-start";
      button.type = "submit";
      button.textContent = "Submit Answer";
      form.appendChild(button);
      content.appendChild(form);
    }
  }

  item.append(summary, content);
  return item;
}

function createQuizCorrectChoice(name, value, text, checked = false) {
  const label = document.createElement("label");
  label.className = "course-correct-choice";

  const input = document.createElement("input");
  input.className = "visually-hidden";
  input.name = name;
  input.type = "radio";
  input.value = value;
  input.required = true;
  input.checked = checked;

  label.append(
    input,
    createTextElement("span", "course-quiz-letter", value),
    createTextElement("span", "", text)
  );
  return label;
}

function createQuizQuestionRow(index, activeType = "multiple-choice") {
  const key = `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`;
  const row = document.createElement("div");
  row.className = "course-quiz-question-form";
  row.dataset.quizQuestionRow = "true";
  row.dataset.questionIndex = String(index);

  const header = document.createElement("div");
  header.className = "course-quiz-question-form-header";
  header.append(
    createTextElement("strong", "", `Question ${index + 1}`)
  );

  if (index > 0) {
    const remove = document.createElement("button");
    remove.className = "btn btn-outline-danger btn-sm";
    remove.type = "button";
    remove.dataset.quizQuestionAction = "remove";
    remove.textContent = "Remove";
    header.appendChild(remove);
  }

  const question = document.createElement("textarea");
  question.className = "form-control form-control-sm";
  question.name = `question-${key}`;
  question.rows = 2;
  question.placeholder = "Question";
  question.required = true;

  const mcFields = document.createElement("div");
  mcFields.className = "course-quiz-fields";
  mcFields.dataset.quizFields = "multiple-choice";
  const correctChoiceGroup = document.createElement("div");
  correctChoiceGroup.className = "course-correct-choice-group";

  ["A", "B", "C", "D"].forEach((letter) => {
    const choiceRow = document.createElement("div");
    choiceRow.className = "course-correct-choice-row";

    const option = document.createElement("input");
    option.className = "form-control form-control-sm";
    option.name = `option${letter}-${key}`;
    option.type = "text";
    option.placeholder = `Choice ${letter}`;
    option.required = activeType === "multiple-choice";

    choiceRow.append(option, createQuizCorrectChoice(`correctChoice-${key}`, letter, "Correct", letter === "A"));
    correctChoiceGroup.appendChild(choiceRow);
  });
  mcFields.appendChild(correctChoiceGroup);

  const tfFields = document.createElement("div");
  tfFields.className = "course-quiz-fields d-none";
  tfFields.dataset.quizFields = "true-false";
  const tfChoices = document.createElement("div");
  tfChoices.className = "course-answer-choices";
  tfChoices.append(
    createQuizCorrectChoice(`correctTf-${key}`, "True", "True", true),
    createQuizCorrectChoice(`correctTf-${key}`, "False", "False")
  );
  tfFields.appendChild(tfChoices);

  const modifiedFields = document.createElement("div");
  modifiedFields.className = "course-quiz-fields d-none";
  modifiedFields.dataset.quizFields = "modified-true-false";
  const modifiedChoices = document.createElement("div");
  modifiedChoices.className = "course-answer-choices";
  modifiedChoices.append(
    createQuizCorrectChoice(`correctModified-${key}`, "True", "True", true),
    createQuizCorrectChoice(`correctModified-${key}`, "False", "False")
  );
  const correction = document.createElement("input");
  correction.className = "form-control form-control-sm mt-2";
  correction.name = `correction-${key}`;
  correction.type = "text";
  correction.placeholder = "Correction if the answer is false";
  modifiedFields.append(modifiedChoices, correction);

  row.append(header, question, mcFields, tfFields, modifiedFields);
  updateQuizQuestionRowType(row, activeType);
  return row;
}

function updateQuizQuestionRowType(row, type) {
  row.querySelectorAll("[data-quiz-fields]").forEach((group) => {
    const isActive = group.dataset.quizFields === type;
    group.classList.toggle("d-none", !isActive);
    group.querySelectorAll("input, textarea, select").forEach((field) => {
      const isCorrection = field.name.startsWith("correction-");
      field.required = isActive && !isCorrection;
    });
  });
}

function refreshQuizQuestionNumbers(container) {
  container.querySelectorAll("[data-quiz-question-row]").forEach((row, index) => {
    row.dataset.questionIndex = String(index);
    const label = row.querySelector(".course-quiz-question-form-header strong");
    if (label) label.textContent = `Question ${index + 1}`;
  });
}

function renderCourseQuizForm(courseId) {
  const panel = document.createElement("details");
  panel.className = "course-add-quiz course-post-form mt-3";

  const summary = document.createElement("summary");
  summary.className = "course-quiz-summary";
  const summaryText = document.createElement("span");
  summaryText.append(
    createTextElement("strong", "", "Add Quiz"),
    createTextElement("small", "text-secondary d-block", "Create multiple questions with pressable answer keys")
  );
  summary.append(summaryText, createTextElement("span", "badge text-bg-info", "Admin"));

  const form = document.createElement("form");
  form.className = "course-quiz-form vstack gap-2";
  form.dataset.courseQuizForm = courseId;

  const type = document.createElement("select");
  type.className = "form-select form-select-sm";
  type.name = "type";
  type.dataset.quizTypeSelect = "true";
  type.required = true;
  type.append(
    new Option("Multiple Choice", "multiple-choice"),
    new Option("True or False", "true-false"),
    new Option("Modified True or False", "modified-true-false")
  );

  const title = document.createElement("input");
  title.className = "form-control form-control-sm";
  title.name = "title";
  title.type = "text";
  title.placeholder = "Quiz title";
  title.required = true;

  const dueAt = document.createElement("input");
  dueAt.className = "form-control form-control-sm mt-1";
  dueAt.name = "dueAt";
  dueAt.type = "datetime-local";
  dueAt.required = true;
  const dueAtLabel = document.createElement("label");
  dueAtLabel.className = "form-label small fw-bold mb-0";
  dueAtLabel.append("Quiz due date and time", dueAt);

  const questions = document.createElement("div");
  questions.className = "course-quiz-question-list";
  questions.dataset.quizQuestions = "true";
  questions.appendChild(createQuizQuestionRow(0, type.value));

  const addQuestion = document.createElement("button");
  addQuestion.className = "btn btn-outline-primary btn-sm align-self-start";
  addQuestion.type = "button";
  addQuestion.dataset.quizQuestionAction = "add";
  addQuestion.textContent = "Add Question";

  const button = document.createElement("button");
  button.className = "btn btn-primary btn-sm align-self-start";
  button.type = "submit";
  button.textContent = "Post Quiz";

  form.append(type, title, dueAtLabel, questions, addQuestion, button);
  panel.append(summary, form);
  return panel;
}

function createCustomCourseWorkspace(course, index) {
  const accent = courseAccentClasses[index % courseAccentClasses.length];

  courseWorkspaces[course.id] = {
    code: String(index + 4).padStart(2, "0"),
    title: course.title,
    status: adminApp ? "Live" : "In Progress",
    progress: adminApp ? 0 : 1,
    accent,
    cover: course.cover || "",
    description: course.description,
    next: "Start reviewing the course materials and wait for new activities from the admin.",
    modules: [
      ["Course overview", "Open"],
      ["Learning materials", "Pending"],
      ["Assessment", "Pending"]
    ],
    resources: [],
    activity: ["Course created by admin", "Ready for learner access"]
  };
}

function createCourseCard(course, index) {
  const accent = courseAccentClasses[index % courseAccentClasses.length];
  const code = String(index + 4).padStart(2, "0");
  const statusText = adminApp ? "Live" : "In Progress";
  const article = document.createElement("article");
  article.className = "card course-card course-card-custom";
  article.dataset.course = course.id;
  article.dataset.status = "live";

  const row = document.createElement("div");
  row.className = "row g-0 course-card-layout";

  const media = document.createElement("div");
  media.className = course.cover ? "col-md-3 course-card-media course-cover-panel" : `col-md-3 course-card-media course-strip course-strip-${accent}`;
  if (course.cover) {
    const cover = document.createElement("img");
    cover.src = course.cover;
    cover.alt = `${course.title} cover photo`;
    media.appendChild(cover);
  } else {
    const stripNumber = document.createElement("span");
    stripNumber.textContent = code;
    media.appendChild(stripNumber);
  }

  const contentColumn = document.createElement("div");
  contentColumn.className = "col-md-9";

  const body = document.createElement("div");
  body.className = "card-body";

  const header = document.createElement("div");
  header.className = "d-flex justify-content-between gap-2 mb-2";
  header.append(
    createTextElement("h3", "h6 mb-0", course.title),
    createTextElement("span", "badge text-bg-success", statusText)
  );

  const progressMeta = document.createElement("div");
  progressMeta.className = "d-flex justify-content-between small mb-1";
  progressMeta.append(
    createTextElement("span", "", "Progress"),
    createTextElement("strong", "", adminApp ? "0%" : "1%")
  );

  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", `${course.title} progress`);
  progress.setAttribute("aria-valuenow", adminApp ? "0" : "1");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");

  const progressBar = document.createElement("div");
  progressBar.className = `progress-bar ${accent === "coral" ? "bg-coral" : accent === "sand" ? "bg-sand" : ""}`;
  progressBar.style.width = adminApp ? "0%" : "1%";
  progress.appendChild(progressBar);

  body.append(
    header,
    createTextElement("p", "text-secondary mb-3", course.description),
    progressMeta,
    progress
  );

  if (adminApp) {
    const actions = document.createElement("div");
    actions.className = "d-flex flex-wrap gap-2 mt-3";
    const remove = document.createElement("button");
    remove.className = "btn btn-outline-danger btn-sm";
    remove.type = "button";
    remove.dataset.courseAction = "remove";
    remove.dataset.courseId = course.id;
    remove.textContent = "Remove";
    actions.appendChild(remove);
    body.appendChild(actions);
  }

  contentColumn.appendChild(body);
  row.append(media, contentColumn);
  article.appendChild(row);
  bindCourseCard(article);
  return article;
}

function renderCustomCourses() {
  const lists = document.querySelectorAll("#courseList");
  if (!lists.length) return;

  Object.keys(courseWorkspaces)
    .filter((courseId) => courseId.startsWith("custom-course-"))
    .forEach((courseId) => delete courseWorkspaces[courseId]);

  const courses = getCustomCourses();
  courses.forEach(createCustomCourseWorkspace);

  lists.forEach((list) => {
    list.querySelectorAll(".course-card-custom").forEach((card) => card.remove());
    courses.forEach((course, index) => {
      list.appendChild(createCourseCard(course, index));
    });
  });
}

function readCourseCover(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => resolve(""));
    reader.readAsDataURL(file);
  });
}

courseForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = courseTitle?.value.trim() || "";
  const description = courseDescription?.value.trim() || "";
  if (!title || !description) return;

  const courses = getCustomCourses();
  const course = {
    id: `custom-course-${Date.now()}`,
    title,
    description,
    cover: await readCourseCover(courseCover?.files?.[0]),
    createdAt: new Date().toISOString()
  };

  courses.unshift(course);
  saveCustomCourses(courses);
  courseForm.reset();
  renderCustomCourses();
  showStudentSection("courses", { updateHash: true });

  const modal = window.bootstrap?.Modal.getInstance(document.querySelector("#courseModal"));
  modal?.hide();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-action='remove']");
  if (!button) return;

  const courseId = button.dataset.courseId;
  saveCustomCourses(getCustomCourses().filter((course) => course.id !== courseId));
  saveCourseNextPosts(getCourseNextPosts().filter((item) => item.courseId !== courseId));
  saveCourseResources(getCourseResources().filter((item) => item.courseId !== courseId));
  saveCourseQuizzes(getCourseQuizzes().filter((item) => item.courseId !== courseId));
  saveCourseQuizSubmissions(getCourseQuizSubmissions().filter((item) => item.courseId !== courseId));
  document.querySelector(".course-workspace")?.remove();
  renderCustomCourses();
});

function refreshOpenCourseWorkspace(courseId) {
  const activeCourseCard = document.querySelector(`.course-card-active[data-course='${courseId}']`);
  if (activeCourseCard) renderCourseWorkspace(courseId, activeCourseCard);
}

document.addEventListener("change", (event) => {
  const select = event.target.closest("[data-quiz-type-select]");
  if (!select) return;

  const form = select.closest("[data-course-quiz-form]");
  if (!form) return;

  form.querySelectorAll("[data-quiz-question-row]").forEach((row) => updateQuizQuestionRowType(row, select.value));
});

document.addEventListener("submit", (event) => {
  const nextForm = event.target.closest("[data-course-next-form]");
  if (!nextForm) return;

  event.preventDefault();
  const courseId = nextForm.dataset.courseNextForm;
  const title = nextForm.elements.title.value.trim();
  const message = nextForm.elements.message.value.trim();
  if (!title || !message) return;

  const posts = getCourseNextPosts().filter((post) => post.courseId !== courseId);
  posts.unshift({
    id: `course-next-${Date.now()}`,
    courseId,
    title,
    message,
    createdAt: new Date().toISOString()
  });

  saveCourseNextPosts(posts);
  refreshOpenCourseWorkspace(courseId);
});

document.addEventListener("submit", async (event) => {
  const resourceForm = event.target.closest("[data-course-resource-form]");
  if (!resourceForm) return;

  event.preventDefault();
  const courseId = resourceForm.dataset.courseResourceForm;
  const title = resourceForm.elements.title.value.trim();
  const description = resourceForm.elements.description.value.trim();
  const link = resourceForm.elements.link.value.trim();
  const file = await readStorageFile(resourceForm.elements.file.files?.[0]);
  if (!title || !description) return;

  const resources = getCourseResources();
  resources.unshift({
    id: `course-resource-${Date.now()}`,
    courseId,
    title,
    description,
    link,
    file,
    createdAt: new Date().toISOString()
  });

  saveCourseResources(resources);
  refreshOpenCourseWorkspace(courseId);
});

document.addEventListener("submit", (event) => {
  const quizForm = event.target.closest("[data-course-quiz-form]");
  if (!quizForm) return;

  event.preventDefault();
  const courseId = quizForm.dataset.courseQuizForm;
  const type = quizForm.elements.type.value;
  const title = quizForm.elements.title.value.trim();
  const dueAt = quizForm.elements.dueAt.value;
  if (!title || !dueAt) return;

  const quiz = {
    id: `course-quiz-${Date.now()}`,
    courseId,
    type,
    title,
    dueAt,
    createdAt: new Date().toISOString()
  };

  const questionRows = Array.from(quizForm.querySelectorAll("[data-quiz-question-row]"));
  const questions = questionRows.map((row, index) => {
    const questionText = row.querySelector("textarea")?.value.trim() || "";
    const question = {
      id: `q-${Date.now()}-${index}`,
      question: questionText,
      options: [],
      correctAnswer: "",
      correction: ""
    };

    if (type === "multiple-choice") {
      question.options = ["A", "B", "C", "D"].map((letter) => row.querySelector(`input[name^='option${letter}-']`)?.value.trim() || "");
      question.correctAnswer = row.querySelector("input[name^='correctChoice-']:checked")?.value || "A";
    } else if (type === "true-false") {
      question.correctAnswer = row.querySelector("input[name^='correctTf-']:checked")?.value || "True";
    } else {
      question.correctAnswer = row.querySelector("input[name^='correctModified-']:checked")?.value || "True";
      question.correction = row.querySelector("input[name^='correction-']")?.value.trim() || "";
    }

    return question;
  });

  if (!questions.length || questions.some((question) => !question.question)) return;
  if (type === "multiple-choice" && questions.some((question) => question.options.some((option) => !option))) return;

  quiz.questions = questions;
  quiz.question = questions[0].question;
  quiz.options = questions[0].options;
  quiz.correctAnswer = questions[0].correctAnswer;
  quiz.correction = questions[0].correction;

  const quizzes = getCourseQuizzes();
  quizzes.unshift(quiz);
  saveCourseQuizzes(quizzes);
  refreshOpenCourseWorkspace(courseId);
});

document.addEventListener("submit", (event) => {
  const answerForm = event.target.closest("[data-course-quiz-answer]");
  if (!answerForm) return;

  event.preventDefault();
  const quizId = answerForm.dataset.courseQuizAnswer;
  const quiz = getCourseQuizzes().find((item) => item.id === quizId);
  if (!quiz) return;
  if (isPastDue(quiz.dueAt)) {
    refreshOpenCourseWorkspace(quiz.courseId);
    return;
  }

  const answers = {};
  const corrections = {};
  const questions = getQuizQuestions(quiz);
  const hasAllAnswers = questions.every((question) => {
    const answer = answerForm.querySelector(`input[name='answer-${question.id}']:checked`)?.value || "";
    answers[question.id] = answer;
    corrections[question.id] = answerForm.querySelector(`input[name='correction-${question.id}']`)?.value.trim() || "";
    return Boolean(answer);
  });
  if (!hasAllAnswers) return;

  const submissions = getCourseQuizSubmissions().filter((submission) => {
    return !(submission.quizId === quizId && submission.studentId === currentStudent.id);
  });
  submissions.push({
    id: `course-quiz-submission-${Date.now()}`,
    courseId: quiz.courseId,
    quizId,
    studentId: currentStudent.id,
    studentName: currentStudent.name,
    answer: answers[questions[0].id],
    answers,
    correction: corrections[questions[0].id],
    corrections,
    submittedAt: new Date().toISOString()
  });

  saveCourseQuizSubmissions(submissions);
  refreshOpenCourseWorkspace(quiz.courseId);
});

document.addEventListener("click", (event) => {
  const questionAction = event.target.closest("[data-quiz-question-action]");
  if (questionAction) {
    const form = questionAction.closest("[data-course-quiz-form]");
    const questionList = form?.querySelector("[data-quiz-questions]");
    if (!form || !questionList) return;

    if (questionAction.dataset.quizQuestionAction === "add") {
      const index = questionList.querySelectorAll("[data-quiz-question-row]").length;
      questionList.appendChild(createQuizQuestionRow(index, form.elements.type.value));
      return;
    }

    if (questionAction.dataset.quizQuestionAction === "remove") {
      questionAction.closest("[data-quiz-question-row]")?.remove();
      refreshQuizQuestionNumbers(questionList);
      return;
    }
  }

  const resourceButton = event.target.closest("[data-course-resource-action='remove']");
  if (resourceButton) {
    const resource = getCourseResources().find((item) => item.id === resourceButton.dataset.resourceId);
    saveCourseResources(getCourseResources().filter((item) => item.id !== resourceButton.dataset.resourceId));
    if (resource) refreshOpenCourseWorkspace(resource.courseId);
    return;
  }

  const quizButton = event.target.closest("[data-course-quiz-action='remove']");
  if (!quizButton) return;

  const quiz = getCourseQuizzes().find((item) => item.id === quizButton.dataset.quizId);
  saveCourseQuizzes(getCourseQuizzes().filter((item) => item.id !== quizButton.dataset.quizId));
  saveCourseQuizSubmissions(getCourseQuizSubmissions().filter((item) => item.quizId !== quizButton.dataset.quizId));
  if (quiz) refreshOpenCourseWorkspace(quiz.courseId);
});

function getCurrentAuthor() {
  return adminApp ? "Admin" : "Student";
}

function isVisibleForSelectedClassroom(item) {
  return item.classroom === selectedClassroom || item.classroom === "all";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function isPastDue(value) {
  return Boolean(value) && new Date(value).getTime() <= Date.now();
}

function getAllAnnouncementComments() {
  return getStoredItems("gthAnnouncementComments", []);
}

function getAnnouncementComments(announcementId) {
  return getAllAnnouncementComments().filter((comment) => comment.announcementId === announcementId);
}

function renderAnnouncementCard(announcement, options = {}) {
  const article = document.createElement("article");
  article.className = "announcement-item";
  if (announcement.pinned) article.classList.add("announcement-pinned");

  const meta = document.createElement("div");
  meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";

  if (announcement.pinned) {
    const pinned = document.createElement("span");
    pinned.className = "badge text-bg-warning";
    pinned.textContent = "Pinned";
    meta.appendChild(pinned);
  }

  const classroom = document.createElement("span");
  classroom.className = "badge text-bg-info";
  classroom.textContent = classroomTitles[announcement.classroom] || "Classroom";
  meta.appendChild(classroom);

  const time = document.createElement("small");
  time.className = "text-secondary";
  time.textContent = formatDate(announcement.createdAt);
  meta.appendChild(time);

  const toggleButton = document.createElement("button");
  toggleButton.className = "btn btn-outline-secondary btn-sm ms-auto";
  toggleButton.type = "button";
  toggleButton.dataset.announcementAction = "toggle-comments";
  toggleButton.textContent = "Minimize Comments";

  const header = document.createElement("div");
  header.className = "d-flex flex-wrap align-items-start gap-2";
  header.append(meta, toggleButton);

  const body = document.createElement("div");
  body.className = "announcement-card-body";

  const subject = document.createElement("h3");
  subject.className = "h6 mb-1";
  subject.textContent = announcement.subject;

  const message = document.createElement("p");
  message.className = "mb-0 text-secondary";
  message.textContent = announcement.message;

  body.append(subject, message);

  const comments = getAnnouncementComments(announcement.id);
  const commentsSection = document.createElement("div");
  commentsSection.className = "announcement-comments mt-3";

  const commentsTitle = document.createElement("h4");
  commentsTitle.className = "h6 mb-2";
  commentsTitle.textContent = "Comments";

  const commentsList = document.createElement("div");
  commentsList.className = "vstack gap-2 mb-2";

  if (!comments.length) {
    const empty = document.createElement("p");
    empty.className = "text-secondary small mb-0";
    empty.textContent = "No comments yet.";
    commentsList.appendChild(empty);
  } else {
    comments.forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.className = "announcement-comment";

      const commentMeta = document.createElement("small");
      commentMeta.className = "text-secondary d-block";
      commentMeta.textContent = `${comment.author} - ${formatDate(comment.createdAt)}`;

      const commentText = document.createElement("p");
      commentText.className = "mb-0";
      commentText.textContent = comment.text;

      commentItem.append(commentMeta, commentText);
      commentsList.appendChild(commentItem);
    });
  }

  const commentForm = document.createElement("form");
  commentForm.className = "announcement-comment-form d-flex gap-2";
  commentForm.dataset.announcementCommentForm = announcement.id;

  const commentLabel = document.createElement("label");
  commentLabel.className = "visually-hidden";
  commentLabel.setAttribute("for", `comment-${announcement.id}`);
  commentLabel.textContent = "Comment";

  const commentInput = document.createElement("input");
  commentInput.className = "form-control form-control-sm";
  commentInput.id = `comment-${announcement.id}`;
  commentInput.name = "comment";
  commentInput.type = "text";
  commentInput.placeholder = "Write a comment";
  commentInput.required = true;

  const commentButton = document.createElement("button");
  commentButton.className = "btn btn-primary btn-sm";
  commentButton.type = "submit";
  commentButton.textContent = "Comment";

  commentForm.append(commentLabel, commentInput, commentButton);
  commentsSection.append(commentsTitle, commentsList, commentForm);
  body.appendChild(commentsSection);

  if (options.admin) {
    const actions = document.createElement("div");
    actions.className = "d-flex flex-wrap gap-2 mt-3";

    const pinButton = document.createElement("button");
    pinButton.className = "btn btn-outline-secondary btn-sm";
    pinButton.type = "button";
    pinButton.dataset.announcementAction = "toggle-pin";
    pinButton.dataset.announcementId = announcement.id;
    pinButton.textContent = announcement.pinned ? "Remove Pin" : "Pin";

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger btn-sm";
    removeButton.type = "button";
    removeButton.dataset.announcementAction = "remove";
    removeButton.dataset.announcementId = announcement.id;
    removeButton.textContent = "Remove";

    actions.append(pinButton, removeButton);
    body.appendChild(actions);
  }

  article.append(header, body);
  return article;
}

function getAnnouncements() {
  const stored = getStoredItems("gthAnnouncements", null);
  if (stored) return stored;

  saveStoredItems("gthAnnouncements", demoAnnouncements);
  return demoAnnouncements;
}

function renderAnnouncements() {
  const announcements = getAnnouncements().sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (adminAnnouncements) {
    adminAnnouncements.replaceChildren();
    announcements.forEach((announcement) => {
      adminAnnouncements.appendChild(renderAnnouncementCard(announcement, { admin: true }));
    });

    observeMotionElements(adminAnnouncements);
  }

  if (studentAnnouncements) {
    const classroomAnnouncements = announcements.filter(isVisibleForSelectedClassroom);

    studentAnnouncements.replaceChildren();
    if (studentAnnouncementClass) studentAnnouncementClass.textContent = selectedClassroomTitle;

    if (!classroomAnnouncements.length) {
      const empty = document.createElement("p");
      empty.className = "text-secondary mb-0";
      empty.textContent = "No announcements for this classroom yet.";
      studentAnnouncements.appendChild(empty);
      return;
    }

    classroomAnnouncements.forEach((announcement) => {
      studentAnnouncements.appendChild(renderAnnouncementCard(announcement));
    });

    observeMotionElements(studentAnnouncements);
  }
}

announcementForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const announcements = getAnnouncements();
  const announcement = {
    id: `announcement-${Date.now()}`,
    classroom: document.querySelector("#announcementClassroom").value,
    subject: document.querySelector("#announcementSubject").value,
    message: document.querySelector("#announcementMessage").value.trim(),
    pinned: document.querySelector("#announcementPinned").checked,
    createdAt: new Date().toISOString()
  };

  if (!announcement.message) return;

  announcements.unshift(announcement);
  saveStoredItems("gthAnnouncements", announcements);
  announcementForm.reset();
  renderAnnouncements();
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-announcement-comment-form]");
  if (!form) return;

  event.preventDefault();

  const input = form.querySelector("input[name='comment']");
  const text = input.value.trim();
  if (!text) return;

  const comments = getAllAnnouncementComments();
  comments.push({
    id: `announcement-comment-${Date.now()}`,
    announcementId: form.dataset.announcementCommentForm,
    author: getCurrentAuthor(),
    text,
    createdAt: new Date().toISOString()
  });

  saveStoredItems("gthAnnouncementComments", comments);
  input.value = "";
  renderAnnouncements();
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-announcement-action]");
  if (!actionButton) return;

  if (actionButton.dataset.announcementAction === "toggle-comments") {
    const comments = actionButton.closest(".announcement-item")?.querySelector(".announcement-comments");
    if (!comments) return;

    comments.classList.toggle("announcement-comments-collapsed");
    actionButton.textContent = comments.classList.contains("announcement-comments-collapsed") ? "Open Comments" : "Minimize Comments";
    return;
  }

  const announcements = getAnnouncements();
  const announcementId = actionButton.dataset.announcementId;

  if (actionButton.dataset.announcementAction === "remove") {
    saveStoredItems("gthAnnouncements", announcements.filter((item) => item.id !== announcementId));
    saveStoredItems("gthAnnouncementComments", getAllAnnouncementComments().filter((item) => item.announcementId !== announcementId));
    renderAnnouncements();
    return;
  }

  if (actionButton.dataset.announcementAction === "toggle-pin") {
    const updatedAnnouncements = announcements.map((item) => {
      if (item.id !== announcementId) return item;
      return { ...item, pinned: !item.pinned };
    });

    saveStoredItems("gthAnnouncements", updatedAnnouncements);
    renderAnnouncements();
  }
});

function getVideos() {
  const stored = getStoredItems("gthVideos", null);
  if (stored) return stored;

  saveStoredItems("gthVideos", demoVideos);
  return demoVideos;
}

function extractYoutubeId(url) {
  try {
    const parsedUrl = new URL(url);
    let youtubeId = "";

    if (parsedUrl.hostname.includes("youtu.be")) {
      youtubeId = parsedUrl.pathname.replace("/", "");
    } else if (parsedUrl.searchParams.has("v")) {
      youtubeId = parsedUrl.searchParams.get("v");
    } else {
      const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/);
      youtubeId = embedMatch ? embedMatch[1] : "";
    }

    return /^[\w-]{11}$/.test(youtubeId) ? youtubeId : "";
  } catch {
    return "";
  }
}

function extractDriveId(url) {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.includes("drive.google.com")) return "";

    const fileMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/);
    if (fileMatch) return fileMatch[1];

    const openId = parsedUrl.searchParams.get("id");
    return openId || "";
  } catch {
    return "";
  }
}

function getVideoSource(url) {
  const youtubeId = extractYoutubeId(url);
  if (youtubeId) {
    return {
      provider: "youtube",
      providerLabel: "YouTube",
      sourceId: youtubeId,
      embedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    };
  }

  const driveId = extractDriveId(url);
  if (driveId) {
    return {
      provider: "drive",
      providerLabel: "Google Drive",
      sourceId: driveId,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      thumbnailUrl: ""
    };
  }

  return null;
}

function getSavedVideoSource(video) {
  if (!video) return null;
  if (video.provider && video.embedUrl) return video;

  const source = getVideoSource(video.url);
  if (source) return { ...video, ...source };

  if (video.youtubeId) {
    return {
      ...video,
      provider: "youtube",
      providerLabel: "YouTube",
      sourceId: video.youtubeId,
      embedUrl: `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    };
  }

  return video;
}

function createVideoPlaceholder(providerLabel = "Video") {
  const placeholder = document.createElement("div");
  placeholder.className = "video-thumb video-thumb-placeholder";
  placeholder.append(
    createTextElement("span", "", "VIDEO"),
    createTextElement("strong", "", providerLabel)
  );
  return placeholder;
}

function showVideoModal() {
  if (!videoModal) return false;

  if (window.bootstrap?.Modal) {
    bootstrap.Modal.getOrCreateInstance(videoModal).show();
    return true;
  }

  videoModal.classList.add("show");
  videoModal.removeAttribute("aria-hidden");
  videoModal.setAttribute("aria-modal", "true");
  videoModal.setAttribute("role", "dialog");
  videoModal.style.display = "block";
  document.body.classList.add("modal-open");

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show video-modal-backdrop";
  backdrop.dataset.videoModalBackdrop = "true";
  document.body.appendChild(backdrop);

  return true;
}

function hideVideoModal() {
  if (!videoModal) return;

  if (window.bootstrap?.Modal) {
    bootstrap.Modal.getOrCreateInstance(videoModal).hide();
    return;
  }

  if (videoModalFrame) videoModalFrame.src = "";
  videoModal.classList.remove("show");
  videoModal.setAttribute("aria-hidden", "true");
  videoModal.removeAttribute("aria-modal");
  videoModal.removeAttribute("role");
  videoModal.style.display = "";
  document.body.classList.remove("modal-open");
  document.querySelector("[data-video-modal-backdrop='true']")?.remove();
}

function renderVideoCard(video, options = {}) {
  const source = getSavedVideoSource(video);

  if (!options.admin) {
    const wrapper = document.createElement("article");
    wrapper.className = "col-12";

    const card = document.createElement("button");
    card.className = "announcement-item video-announcement-item";
    card.dataset.videoAction = "watch";
    card.dataset.videoId = video.id;
    card.type = "button";

    let thumbnail;
    if (source.thumbnailUrl) {
      thumbnail = document.createElement("img");
      thumbnail.className = "video-announcement-thumb";
      thumbnail.src = source.thumbnailUrl;
      thumbnail.alt = "";
    } else {
      thumbnail = createVideoPlaceholder(source.providerLabel);
      thumbnail.classList.add("video-announcement-thumb");
    }

    const content = document.createElement("div");
    content.className = "video-announcement-content";

    const meta = document.createElement("div");
    meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";

    const classroom = document.createElement("span");
    classroom.className = "badge text-bg-info";
    classroom.textContent = classroomTitles[video.classroom] || "Classroom";

    const time = document.createElement("small");
    time.className = "text-secondary";
    time.textContent = formatDate(video.createdAt);

    const title = document.createElement("h3");
    title.className = "h6 mb-2";
    title.textContent = video.title;

    const details = document.createElement("div");
    details.className = "video-announcement-details";
    details.append(
      createTextElement("span", "", "Recorded lesson"),
      createTextElement("span", "", source.providerLabel || "Video"),
      createTextElement("span", "", "Opens player")
    );

    const action = document.createElement("span");
    action.className = "btn btn-primary btn-sm video-announcement-action";
    action.textContent = "Watch";

    meta.append(classroom, time);
    content.append(meta, title, details);
    card.append(thumbnail, content, action);
    wrapper.appendChild(card);

    return wrapper;
  }

  const wrapper = document.createElement("article");
  wrapper.className = "col-12 col-md-6 col-xxl-4 video-card-column";

  const card = document.createElement("div");
  card.className = "card video-resource h-100";

  let thumbnail;
  if (source.thumbnailUrl) {
    thumbnail = document.createElement("img");
    thumbnail.className = "video-thumb";
    thumbnail.src = source.thumbnailUrl;
    thumbnail.alt = "";
  } else {
    thumbnail = createVideoPlaceholder(source.providerLabel);
  }

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";

  const classroom = document.createElement("span");
  classroom.className = "badge text-bg-info";
  classroom.textContent = classroomTitles[video.classroom] || "Classroom";

  const time = document.createElement("small");
  time.className = "text-secondary";
  time.textContent = formatDate(video.createdAt);

  const provider = document.createElement("span");
  provider.className = "badge text-bg-light";
  provider.textContent = source.providerLabel || "Video";

  meta.append(classroom, provider, time);

  const title = document.createElement("h3");
  title.className = "h6 mb-3";
  title.textContent = video.title;

  const actions = document.createElement("div");
  actions.className = "d-flex flex-wrap gap-2";

  const watchButton = document.createElement("button");
  watchButton.className = "btn btn-primary btn-sm";
  watchButton.type = "button";
  watchButton.dataset.videoAction = "watch";
  watchButton.dataset.videoId = video.id;
  watchButton.textContent = "Watch";
  actions.appendChild(watchButton);

  if (options.admin) {
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger btn-sm";
    removeButton.type = "button";
    removeButton.dataset.videoAction = "remove";
    removeButton.dataset.videoId = video.id;
    removeButton.textContent = "Remove";
    actions.appendChild(removeButton);
  }

  body.append(meta, title, actions);
  card.append(thumbnail, body);
  wrapper.appendChild(card);

  return wrapper;
}

function renderVideos() {
  const videos = getVideos().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (adminVideos) {
    adminVideos.replaceChildren();

    if (!videos.length) {
      const empty = document.createElement("p");
      empty.className = "col-12 text-secondary mb-0";
      empty.textContent = "No videos posted yet.";
      adminVideos.appendChild(empty);
    } else {
      videos.forEach((video) => {
        adminVideos.appendChild(renderVideoCard(video, { admin: true }));
      });
    }

    observeMotionElements(adminVideos);
  }

  if (studentVideos) {
    const classroomVideos = videos.filter(isVisibleForSelectedClassroom);

    studentVideos.replaceChildren();
    if (studentVideoClass) studentVideoClass.textContent = selectedClassroomTitle;

    if (!classroomVideos.length) {
      const empty = document.createElement("p");
      empty.className = "text-secondary mb-0";
      empty.textContent = "No videos for this classroom yet.";
      studentVideos.appendChild(empty);
      return;
    }

    classroomVideos.forEach((video) => {
      studentVideos.appendChild(renderVideoCard(video));
    });

    observeMotionElements(studentVideos);
  }
}

videoForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const url = document.querySelector("#videoUrl").value.trim();
  const source = getVideoSource(url);

  if (!source) {
    videoError?.classList.remove("d-none");
    return;
  }

  const videos = getVideos();
  videos.unshift({
    id: `video-${Date.now()}`,
    classroom: document.querySelector("#videoClassroom").value,
    title: document.querySelector("#videoTitle").value.trim(),
    url,
    ...source,
    createdAt: new Date().toISOString()
  });

  saveStoredItems("gthVideos", videos);
  videoError?.classList.add("d-none");
  videoForm.reset();
  renderVideos();
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-video-action]");
  if (!actionButton) return;

  const videos = getVideos();
  const video = getSavedVideoSource(videos.find((item) => item.id === actionButton.dataset.videoId));
  if (!video) return;

  if (actionButton.dataset.videoAction === "remove") {
    saveStoredItems("gthVideos", videos.filter((item) => item.id !== video.id));
    renderVideos();
    return;
  }

  if (actionButton.dataset.videoAction === "watch" && video.embedUrl && videoModal && videoModalFrame && window.bootstrap?.Modal) {
    videoModalFrame.src = video.embedUrl;
    if (videoModalLabel) videoModalLabel.textContent = video.title;
    bootstrap.Modal.getOrCreateInstance(videoModal).show();
    return;
  }

  if (actionButton.dataset.videoAction === "watch") {
    window.open(video.url, "_blank", "noopener");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const actionButton = event.target.closest("[data-video-action]");
  if (!actionButton) return;

  event.preventDefault();
  actionButton.click();
});

videoModal?.addEventListener("hidden.bs.modal", () => {
  if (videoModalFrame) videoModalFrame.src = "";
});

function getAssignments() {
  const stored = getStoredItems("gthAssignments", null);
  if (stored) return stored;

  saveStoredItems("gthAssignments", demoAssignments);
  return demoAssignments;
}

function formatDueDate(value) {
  const date = value?.includes("T") ? new Date(value) : new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getAssignmentSubmissions() {
  return getStoredItems("gthAssignmentSubmissions", []);
}

function getAssignmentClassrooms(assignment) {
  if (assignment.classroom === "all") return Object.keys(classroomStudents);
  return classroomStudents[assignment.classroom] ? [assignment.classroom] : [];
}

function getAssignmentStudents(assignment) {
  return getAssignmentClassrooms(assignment).flatMap((classroom) => {
    return classroomStudents[classroom].map((student) => ({ ...student, classroom }));
  });
}

function isSubmissionForStudent(submission, assignmentId, student) {
  if (submission.assignmentId !== assignmentId) return false;
  if (submission.studentId) return submission.studentId === student.id;
  return submission.classroom === student.classroom && student.id === (classroomStudents[student.classroom] || [])[0]?.id;
}

function getAssignmentSubmission(assignmentId, student = currentStudent) {
  return getAssignmentSubmissions().find((submission) => {
    return isSubmissionForStudent(submission, assignmentId, student);
  });
}

function createGradeForm(courseId, student, options = {}) {
  const grade = getStudentGrade(courseId, student.id) || {};
  const finalGrade = calculateFinalGrade(grade);
  const gradeForm = document.createElement("form");
  gradeForm.className = options.compact ? "assignment-grade-form gradebook-grade-form" : "assignment-grade-form";
  gradeForm.dataset.studentGradeForm = courseId;
  gradeForm.dataset.studentId = student.id;
  gradeForm.dataset.studentName = student.name;
  gradeForm.dataset.classroom = student.classroom;

  [
    ["prelim", "Prelim", grade.prelim],
    ["midterm", "Midterm", grade.midterm],
    ["final", "Final", grade.final]
  ].forEach(([name, labelText, value]) => {
    const label = document.createElement("label");
    label.className = "form-label mb-0";
    label.textContent = labelText;

    const input = document.createElement("input");
    input.className = "form-control form-control-sm mt-1";
    input.name = name;
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.placeholder = "0";
    input.value = value ?? "";

    label.appendChild(input);
    gradeForm.appendChild(label);
  });

  const finalDisplay = document.createElement("div");
  finalDisplay.className = "assignment-final-grade";
  finalDisplay.append(
    createTextElement("span", "", "Final Grade"),
    createTextElement("strong", "", finalGrade === null ? "--" : `${finalGrade}%`)
  );

  const gradeButton = document.createElement("button");
  gradeButton.className = "btn btn-outline-primary btn-sm";
  gradeButton.type = "submit";
  gradeButton.textContent = "Save Grades";

  gradeForm.append(finalDisplay, gradeButton);
  return gradeForm;
}

function renderGradebook() {
  if (!adminGrades) return;

  adminGrades.replaceChildren();

  Object.entries(courseWorkspaces).forEach(([courseId, course]) => {
    const courseGrades = getAllStudents().map((student) => {
      return calculateFinalGrade(getStudentGrade(courseId, student.id) || {});
    }).filter((grade) => grade !== null);

    const courseAverage = courseGrades.length
      ? Math.round(courseGrades.reduce((total, grade) => total + grade, 0) / courseGrades.length)
      : null;

    const coursePanel = document.createElement("article");
    coursePanel.className = "gradebook-course";

    const header = document.createElement("div");
    header.className = "gradebook-course-header";
    const headerText = document.createElement("div");
    headerText.append(
      createTextElement("p", "section-label mb-1", "Course grading"),
      createTextElement("h3", "h6 mb-1", course.title),
      createTextElement("small", "text-secondary", "Record each learner's period grades. Final grade is calculated automatically.")
    );

    const average = document.createElement("div");
    average.className = "gradebook-average";
    average.append(
      createTextElement("span", "", "Course average"),
      createTextElement("strong", "", courseAverage === null ? "--" : `${courseAverage}%`)
    );

    header.append(headerText, average);

    const rows = document.createElement("div");
    rows.className = "gradebook-rows";

    getAllStudents().forEach((student) => {
      const row = document.createElement("section");
      row.className = "gradebook-row";

      const info = document.createElement("div");
      info.className = "gradebook-student";

      const initials = student.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
      info.append(
        createTextElement("span", "avatar", initials),
        createTextElement("strong", "", student.name),
        createTextElement("small", "text-secondary", classroomTitles[student.classroom] || "Classroom")
      );

      row.append(info, createGradeForm(courseId, student, { compact: true }));
      rows.appendChild(row);
    });

    coursePanel.append(header, rows);
    adminGrades.appendChild(coursePanel);
  });

  observeMotionElements(adminGrades);
}

function renderAssignmentReview(assignment) {
  const review = document.createElement("div");
  review.className = "assignment-review mt-3";

  const reviewTitle = document.createElement("strong");
  reviewTitle.className = "d-block mb-2";
  reviewTitle.textContent = "Submission status";

  const list = document.createElement("div");
  list.className = "vstack gap-2";

  getAssignmentStudents(assignment).forEach((student) => {
    const submission = getAssignmentSubmission(assignment.id, student);
    const row = document.createElement("div");
    row.className = "assignment-review-row";

    const info = document.createElement("div");
    info.className = "assignment-review-info";

    const nameLine = document.createElement("div");
    nameLine.className = "d-flex flex-wrap align-items-center gap-2";

    const name = document.createElement("strong");
    name.textContent = student.name;

    const classroom = document.createElement("span");
    classroom.className = "badge text-bg-light";
    classroom.textContent = classroomTitles[student.classroom] || "Classroom";

    const status = document.createElement("span");
    status.className = `badge ${submission ? "text-bg-success" : "text-bg-secondary"}`;
    status.textContent = submission ? "Submitted" : "Not passed yet";

    nameLine.append(name, classroom, status);
    info.appendChild(nameLine);

    if (submission) {
      const submitted = document.createElement("small");
      submitted.className = "text-secondary d-block mt-1";
      submitted.textContent = `Submitted ${formatDate(submission.submittedAt)} with ${submission.files.length} file${submission.files.length === 1 ? "" : "s"}.`;
      info.appendChild(submitted);
    }

    row.append(info);
    list.appendChild(row);
  });

  review.append(reviewTitle, list);
  return review;
}

function renderAssignmentCard(assignment, options = {}) {
  const isExpanded = expandedAssignmentId === assignment.id;
  const wrapper = document.createElement("article");
  wrapper.className = "col-12";

  const card = document.createElement("div");
  card.className = `${options.admin ? "card video-resource h-100" : "announcement-item"} assignment-card${isExpanded ? " assignment-card-expanded" : ""}`;

  const body = document.createElement("div");
  body.className = options.admin ? "card-body" : "";

  const meta = document.createElement("div");
  meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";

  const classroom = document.createElement("span");
  classroom.className = "badge text-bg-info";
  classroom.textContent = classroomTitles[assignment.classroom] || "Classroom";

  const subject = document.createElement("span");
  subject.className = "badge text-bg-light";
  subject.textContent = assignment.subject || "General Activity";

  const dueDate = document.createElement("span");
  dueDate.className = "badge text-bg-warning";
  dueDate.textContent = `Due ${formatDueDate(assignment.dueDate)}`;

  const created = document.createElement("small");
  created.className = "text-secondary";
  created.textContent = formatDate(assignment.createdAt);

  const title = document.createElement("h3");
  title.className = "h6 mb-0";
  title.textContent = assignment.title;

  const instructions = document.createElement("p");
  instructions.className = "text-secondary mb-0";
  instructions.textContent = assignment.instructions;

  const toggle = document.createElement("button");
  toggle.className = "assignment-toggle";
  toggle.type = "button";
  toggle.dataset.assignmentAction = "toggle";
  toggle.dataset.assignmentId = assignment.id;
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.append(
    createTextElement("span", "", isExpanded ? "Hide details" : "View details"),
    createTextElement("span", "assignment-toggle-icon", isExpanded ? "-" : "+")
  );

  const header = document.createElement("div");
  header.className = "assignment-card-header";
  header.append(title, toggle);

  const details = document.createElement("div");
  details.className = "assignment-card-details";

  meta.append(classroom, subject, dueDate, created);
  body.append(meta, header);

  if (!isExpanded) {
    const preview = document.createElement("p");
    preview.className = "assignment-preview text-secondary mb-0";
    preview.textContent = assignment.instructions;
    body.appendChild(preview);
  }

  if (isExpanded) details.appendChild(instructions);

  if (options.admin) {
    if (isExpanded) details.appendChild(renderAssignmentReview(assignment));

    const actions = document.createElement("div");
    actions.className = "d-flex flex-wrap gap-2 mt-3";

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger btn-sm";
    removeButton.type = "button";
    removeButton.dataset.assignmentAction = "remove";
    removeButton.dataset.assignmentId = assignment.id;
    removeButton.textContent = "Remove";

    actions.appendChild(removeButton);
    if (isExpanded) details.appendChild(actions);
  } else {
    const submission = getAssignmentSubmission(assignment.id);
    const uploadForm = document.createElement("form");
    uploadForm.className = "assignment-upload-form vstack gap-2 mt-3";
    uploadForm.dataset.assignmentUploadForm = assignment.id;

    const uploadLabel = document.createElement("label");
    uploadLabel.className = "form-label mb-0";
    uploadLabel.textContent = "Upload files";

    const fileInput = document.createElement("input");
    fileInput.className = "form-control mt-1";
    fileInput.name = "assignmentFiles";
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.className = "btn btn-primary btn-sm align-self-start";
    submitButton.type = "submit";
    submitButton.textContent = submission ? "Replace Upload" : "Upload";

    uploadLabel.appendChild(fileInput);
    uploadForm.append(uploadLabel, submitButton);
    if (isExpanded) details.appendChild(uploadForm);

    if (submission) {
      const submitted = document.createElement("div");
      submitted.className = "assignment-submission mt-3";

      const submittedTitle = document.createElement("strong");
      submittedTitle.className = "d-block mb-1";
      submittedTitle.textContent = "Submitted files";

      const submittedTime = document.createElement("small");
      submittedTime.className = "text-secondary d-block mb-2";
      submittedTime.textContent = formatDate(submission.submittedAt);

      const fileList = document.createElement("ul");
      fileList.className = "list-unstyled vstack gap-1 mb-0";

      submission.files.forEach((file) => {
        const fileItem = document.createElement("li");
        fileItem.className = "small";
        fileItem.textContent = `${file.name} (${formatFileSize(file.size)})`;
        fileList.appendChild(fileItem);
      });

      submitted.append(submittedTitle, submittedTime, fileList);
      if (isExpanded) details.appendChild(submitted);
    }
  }

  if (isExpanded) body.appendChild(details);
  card.appendChild(body);
  wrapper.appendChild(card);
  return wrapper;
}

function renderAssignments() {
  const assignments = getAssignments().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (adminAssignments) {
    if (expandedAssignmentId === undefined) {
      expandedAssignmentId = assignments[0]?.id || null;
    } else if (expandedAssignmentId !== null && !assignments.some((assignment) => assignment.id === expandedAssignmentId)) {
      expandedAssignmentId = assignments[0]?.id || null;
    }

    adminAssignments.replaceChildren();

    if (!assignments.length) {
      const empty = document.createElement("p");
      empty.className = "col-12 text-secondary mb-0";
      empty.textContent = "No assignments posted yet.";
      adminAssignments.appendChild(empty);
    } else {
      assignments.forEach((assignment) => {
        adminAssignments.appendChild(renderAssignmentCard(assignment, { admin: true }));
      });
    }

    observeMotionElements(adminAssignments);
  }

  if (studentAssignments) {
    const classroomAssignments = assignments.filter(isVisibleForSelectedClassroom);
    if (!adminAssignments) {
      if (expandedAssignmentId === undefined) {
        expandedAssignmentId = classroomAssignments[0]?.id || null;
      } else if (expandedAssignmentId !== null && !classroomAssignments.some((assignment) => assignment.id === expandedAssignmentId)) {
        expandedAssignmentId = classroomAssignments[0]?.id || null;
      }
    }

    studentAssignments.replaceChildren();
    if (studentAssignmentClass) studentAssignmentClass.textContent = selectedClassroomTitle;

    if (!classroomAssignments.length) {
      const empty = document.createElement("p");
      empty.className = "text-secondary mb-0";
      empty.textContent = "No assignments for this classroom yet.";
      studentAssignments.appendChild(empty);
      return;
    }

    classroomAssignments.forEach((assignment) => {
      studentAssignments.appendChild(renderAssignmentCard(assignment));
    });

    observeMotionElements(studentAssignments);
  }

  renderGradebook();
}

assignmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#assignmentTitle").value.trim();
  const subject = document.querySelector("#assignmentSubject").value;
  const instructions = document.querySelector("#assignmentInstructions").value.trim();
  const dueDate = document.querySelector("#assignmentDueDate").value;

  if (!title || !subject || !instructions || !dueDate) return;

  const assignments = getAssignments();
  const assignmentId = `assignment-${Date.now()}`;
  assignments.unshift({
    id: assignmentId,
    classroom: document.querySelector("#assignmentClassroom").value,
    subject,
    title,
    instructions,
    dueDate,
    createdAt: new Date().toISOString()
  });

  expandedAssignmentId = assignmentId;
  saveStoredItems("gthAssignments", assignments);
  assignmentForm.reset();
  renderAssignments();
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-assignment-action]");
  if (!actionButton) return;

  if (actionButton.dataset.assignmentAction === "toggle") {
    expandedAssignmentId = expandedAssignmentId === actionButton.dataset.assignmentId ? null : actionButton.dataset.assignmentId;
    renderAssignments();
    return;
  }

  if (actionButton.dataset.assignmentAction === "remove") {
    if (expandedAssignmentId === actionButton.dataset.assignmentId) expandedAssignmentId = null;
    saveStoredItems("gthAssignments", getAssignments().filter((item) => item.id !== actionButton.dataset.assignmentId));
    saveStoredItems("gthAssignmentSubmissions", getAssignmentSubmissions().filter((item) => item.assignmentId !== actionButton.dataset.assignmentId));
    renderAssignments();
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-assignment-upload-form]");
  if (!form) return;

  event.preventDefault();

  const fileInput = form.querySelector("input[type='file']");
  const files = Array.from(fileInput.files || []);
  if (!files.length) return;

  const assignmentId = form.dataset.assignmentUploadForm;
  expandedAssignmentId = assignmentId;
  const submissions = getAssignmentSubmissions().filter((submission) => {
    return !isSubmissionForStudent(submission, assignmentId, currentStudent);
  });

  submissions.push({
    id: `assignment-submission-${Date.now()}`,
    assignmentId,
    classroom: selectedClassroom,
    studentId: currentStudent.id,
    studentName: currentStudent.name,
    files: files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || "Unknown"
    })),
    submittedAt: new Date().toISOString()
  });

  saveStoredItems("gthAssignmentSubmissions", submissions);
  renderAssignments();
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-student-grade-form]");
  if (!form) return;

  event.preventDefault();

  const grades = getStudentGrades().filter((grade) => {
    return !(grade.courseId === form.dataset.studentGradeForm && grade.studentId === form.dataset.studentId);
  });

  const readGrade = (name) => {
    const value = form.querySelector(`[name='${name}']`)?.value.trim();
    return value === "" ? "" : Math.max(0, Math.min(100, Number(value)));
  };

  const grade = {
    id: `student-grade-${Date.now()}`,
    courseId: form.dataset.studentGradeForm,
    studentId: form.dataset.studentId,
    studentName: form.dataset.studentName,
    classroom: form.dataset.classroom,
    prelim: readGrade("prelim"),
    midterm: readGrade("midterm"),
    final: readGrade("final"),
    updatedAt: new Date().toISOString()
  };

  grade.finalGrade = calculateFinalGrade(grade);
  grades.push(grade);

  saveStoredItems("gthStudentGrades", grades);
  renderAssignments();
  renderGradebook();

  const activeCourseCard = document.querySelector(`.course-card-active[data-course='${form.dataset.studentGradeForm}']`);
  if (activeCourseCard) renderCourseWorkspace(form.dataset.studentGradeForm, activeCourseCard);
});

function getInvitations() {
  const stored = getStoredItems("gthInvitations", null);
  if (stored) return stored;

  saveStoredItems("gthInvitations", demoInvitations);
  return demoInvitations;
}

function renderInvitationCard(invitation, options = {}) {
  const article = document.createElement("article");
  article.className = options.admin ? "announcement-item meeting-link-card" : "announcement-item meeting-link-card student-meeting-card";

  const meta = document.createElement("div");
  meta.className = "d-flex flex-wrap gap-2 align-items-center mb-2";

  const classroom = document.createElement("span");
  classroom.className = "badge text-bg-info";
  classroom.textContent = classroomTitles[invitation.classroom] || "Classroom";

  const time = document.createElement("small");
  time.className = "text-secondary";
  time.textContent = formatDate(invitation.createdAt);

  meta.append(classroom, time);

  const title = document.createElement("h3");
  title.className = "h6 mb-2";
  title.textContent = invitation.title;

  const link = document.createElement("a");
  link.className = "btn btn-primary btn-sm";
  link.href = invitation.link;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open GMeet";

  const linkText = document.createElement("p");
  linkText.className = "small text-secondary mb-3 text-break meeting-link-url";
  linkText.textContent = invitation.link;

  const sessionDetails = document.createElement("div");
  sessionDetails.className = "meeting-session-details";
  sessionDetails.append(
    createTextElement("span", "", "Live consultation"),
    createTextElement("span", "", "Google Meet"),
    createTextElement("span", "", options.admin ? "Shared with learners" : "Ready to join")
  );

  const actions = document.createElement("div");
  actions.className = "d-flex flex-wrap gap-2";
  actions.appendChild(link);

  if (options.admin) {
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger btn-sm";
    removeButton.type = "button";
    removeButton.dataset.invitationAction = "remove";
    removeButton.dataset.invitationId = invitation.id;
    removeButton.textContent = "Remove";
    actions.appendChild(removeButton);
  }

  if (options.admin) {
    article.append(meta, title, linkText, actions);
  } else {
    const content = document.createElement("div");
    content.className = "student-meeting-content";
    content.append(meta, title, sessionDetails, linkText);
    article.append(content, actions);
  }

  return article;
}

function renderInvitations() {
  const invitations = getInvitations().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (enrollmentRequests) {
    enrollmentRequests.replaceChildren();

    if (!invitations.length) {
      const empty = document.createElement("p");
      empty.className = "text-secondary mb-0";
      empty.textContent = "No GMeet links posted yet.";
      enrollmentRequests.appendChild(empty);
    } else {
      invitations.forEach((invitation) => {
        enrollmentRequests.appendChild(renderInvitationCard(invitation, { admin: true }));
      });
    }

    observeMotionElements(enrollmentRequests);
  }

  if (studentInvitations) {
    const classroomInvitations = invitations.filter(isVisibleForSelectedClassroom);

    studentInvitations.replaceChildren();
    if (studentInvitationClass) studentInvitationClass.textContent = selectedClassroomTitle;

    if (!classroomInvitations.length) {
      const empty = document.createElement("p");
      empty.className = "text-secondary mb-0";
      empty.textContent = "No GMeet links for this classroom yet.";
      studentInvitations.appendChild(empty);
      return;
    }

    classroomInvitations.forEach((invitation) => {
      studentInvitations.appendChild(renderInvitationCard(invitation));
    });

    observeMotionElements(studentInvitations);
  }
}

invitationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#invitationTitle").value.trim();
  const link = document.querySelector("#invitationLink").value.trim();
  if (!title || !link) return;

  const invitations = getInvitations();
  invitations.unshift({
    id: `invitation-${Date.now()}`,
    classroom: document.querySelector("#invitationClassroom").value,
    title,
    link,
    createdAt: new Date().toISOString()
  });

  saveStoredItems("gthInvitations", invitations);
  invitationForm.reset();
  renderInvitations();
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-invitation-action]");
  if (!actionButton) return;

  if (actionButton.dataset.invitationAction === "remove") {
    saveStoredItems("gthInvitations", getInvitations().filter((item) => item.id !== actionButton.dataset.invitationId));
    renderInvitations();
  }
});

function getActiveChatClassroom() {
  if (chatClassroom) return chatClassroom.value;
  return selectedClassroom;
}

function getChatMessages() {
  return getStoredItems("gthChatMessages", []);
}

function renderChatMessages() {
  if (!chatMessages) return;

  const activeClassroom = getActiveChatClassroom();
  const messages = getChatMessages().filter((message) => message.classroom === activeClassroom);
  chatMessages.replaceChildren();

  if (!messages.length) {
    const empty = document.createElement("p");
    empty.className = "chat-empty text-secondary small mb-0";
    empty.textContent = "No messages yet.";
    chatMessages.appendChild(empty);
    return;
  }

  const currentAuthor = chatbox?.dataset.role === "admin" ? "Admin" : "Student";

  messages.slice(-20).forEach((message) => {
    const item = document.createElement("div");
    item.className = "chat-message";
    if (message.author === currentAuthor) {
      item.classList.add("chat-message-own");
    }

    const meta = document.createElement("small");
    meta.className = "text-secondary d-block";
    meta.textContent = `${message.author} - ${formatDate(message.createdAt)}`;

    const text = document.createElement("p");
    text.className = "mb-0";
    text.textContent = message.text;

    item.append(meta, text);
    chatMessages.appendChild(item);
  });

  observeMotionElements(chatMessages);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatClassroom?.addEventListener("change", renderChatMessages);

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatMessage.value.trim();
  if (!text) return;

  const messages = getChatMessages();
  messages.push({
    id: `chat-${Date.now()}`,
    classroom: getActiveChatClassroom(),
    author: chatbox?.dataset.role === "admin" ? "Admin" : "Student",
    text,
    createdAt: new Date().toISOString()
  });

  saveStoredItems("gthChatMessages", messages);
  chatMessage.value = "";
  renderChatMessages();
});

chatToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    chatbox?.classList.toggle("chatbox-collapsed");
    toggle.textContent = chatbox?.classList.contains("chatbox-collapsed") ? "Open" : "Minimize";
  });
});

function getPrivateMessages() {
  return getStoredItems("gthPrivateMessages", []);
}

function getActivePrivateStudentId() {
  if (privateMessageStudent) return privateMessageStudent.value;
  return currentStudent.id;
}

function getStudentById(studentId) {
  return getAllStudents().find((student) => student.id === studentId) || currentStudent;
}

function setupPrivateMessageStudents() {
  if (!privateMessageStudent) return;

  privateMessageStudent.replaceChildren();
  getAllStudents().forEach((student) => {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = `${student.name} - ${classroomTitles[student.classroom]}`;
    privateMessageStudent.appendChild(option);
  });
}

function renderPrivateMessages() {
  if (!privateMessages) return;

  const studentId = getActivePrivateStudentId();
  const student = getStudentById(studentId);
  const messages = getPrivateMessages().filter((message) => message.studentId === studentId);
  const currentRole = privateMessagePanel?.dataset.privateRole === "admin" ? "admin" : "student";

  if (privateMessageStudentName) privateMessageStudentName.textContent = student.name;
  privateMessages.replaceChildren();

  if (!messages.length) {
    const empty = createTextElement("p", "chat-empty text-secondary small mb-0", "No private messages yet.");
    privateMessages.appendChild(empty);
    return;
  }

  messages.forEach((message) => {
    const item = document.createElement("div");
    item.className = "chat-message";
    if (message.role === currentRole) item.classList.add("chat-message-own");

    const meta = document.createElement("small");
    meta.className = "text-secondary d-block mb-1";
    meta.textContent = `${message.author} - ${formatDate(message.createdAt)}`;

    const text = createTextElement("p", "mb-0", message.text);
    item.append(meta, text);
    privateMessages.appendChild(item);
  });

  observeMotionElements(privateMessages);
  privateMessages.scrollTop = privateMessages.scrollHeight;
}

privateMessageStudent?.addEventListener("change", renderPrivateMessages);

privateMessageForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = privateMessageText?.value.trim() || "";
  const studentId = getActivePrivateStudentId();
  const student = getStudentById(studentId);
  if (!text) return;

  const isAdmin = privateMessagePanel?.dataset.privateRole === "admin";
  const messages = getPrivateMessages();
  messages.push({
    id: `private-message-${Date.now()}`,
    studentId,
    classroom: student.classroom,
    role: isAdmin ? "admin" : "student",
    author: isAdmin ? "Admin" : student.name,
    text,
    createdAt: new Date().toISOString()
  });

  saveStoredItems("gthPrivateMessages", messages);
  privateMessageText.value = "";
  renderPrivateMessages();
});

function redirectAdminIfLoggedOut() {
  if (adminApp && sessionStorage.getItem("gthAdminLoggedIn") !== "true") {
    window.location.replace("login.html");
  }
}

redirectAdminIfLoggedOut();
window.addEventListener("pageshow", redirectAdminIfLoggedOut);

adminLogout?.addEventListener("click", () => {
  sessionStorage.removeItem("gthAdminLoggedIn");
  window.location.replace("login.html");
});

portalLoginForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#portalUsername").value.trim();
  const password = document.querySelector("#portalPassword").value;

  if (username.toLowerCase() === "admin" && password === "123") {
    sessionStorage.setItem("gthAdminLoggedIn", "true");
    window.location.replace("admin.html");
    return;
  }

  if (username.toLowerCase() === "user" && password === "321") {
    sessionStorage.setItem("gthClientLoggedIn", "true");
    window.location.replace("classrooms.html");
    return;
  }

  portalLoginError?.classList.remove("d-none");
});

clientLogout?.addEventListener("click", () => {
  sessionStorage.removeItem("gthClientLoggedIn");
  window.location.replace("login.html");
});

if ((document.body.contains(clientLogout) || classroomName) && sessionStorage.getItem("gthClientLoggedIn") !== "true") {
  window.location.replace("login.html");
}

if (selectedClassroomTitle) {
  if (classroomName) classroomName.textContent = selectedClassroomTitle;
  if (classroomLabel) classroomLabel.textContent = selectedClassroomTitle;
}

renderAnnouncements();
renderVideos();
renderAssignments();
renderInvitations();
renderChatMessages();
renderCustomCourses();
setupPrivateMessageStudents();
renderPrivateMessages();
observeMotionElements();
