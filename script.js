/* BuildNext Community — interactions only.
   No data leaves the browser. The contact form prepares a local draft;
   it does not send anything (no backend is connected). */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ============================================================
     SITE_CONFIG — EDIT HERE, IN ONE PLACE.
     Fill in ONLY verified information. Leave a field empty ("")
     and the site keeps showing its clearly labelled placeholder
     instead of inventing a detail. Never invent a name, role,
     email address, social profile or joining link.
     - officialEmail: the community's official email address.
     - social: official profile URLs, one per network.
     - joinUrl: the official community joining page/form URL.
     - team: one entry per team card (slots 1-6, in order).
       Each entry: { name, role, bio, initials }.
       Leave name empty to keep that card a labelled placeholder.
       Bios are added only with the person's approval; no photos
       are used — initials circles only.
     ============================================================ */
  var SITE_CONFIG = {
    officialEmail: "",
    social: { instagram: "", linkedin: "", github: "", youtube: "" },
    joinUrl: "",
    team: [
      { name: "", role: "", bio: "", initials: "" },
      { name: "", role: "", bio: "", initials: "" },
      { name: "", role: "", bio: "", initials: "" },
      { name: "", role: "", bio: "", initials: "" },
      { name: "", role: "", bio: "", initials: "" },
      { name: "", role: "", bio: "", initials: "" }
    ]
  };
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function scrollBehavior() { return prefersReducedMotion ? "auto" : "smooth"; }
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Footer year */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Toast */
  var toast = $("#toast"), toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4200);
  }

  /* Apply SITE_CONFIG: email, social links, joining link, team profiles.
     Empty values leave the honest placeholders in place. */
  (function applySiteConfig() {
    var cfg = SITE_CONFIG || {};
    var emailEl = $("#official-email");
    if (emailEl && cfg.officialEmail) {
      var a = document.createElement("a");
      a.href = "mailto:" + cfg.officialEmail;
      a.textContent = cfg.officialEmail;
      emailEl.textContent = "";
      emailEl.appendChild(a);
    }
    $$(".placeholder-link").forEach(function (btn) {
      var url = cfg.social && cfg.social[btn.getAttribute("data-url-key")];
      if (!url) return;
      var link = document.createElement("a");
      link.className = btn.className;
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = btn.getAttribute("data-network") + " <span>Open profile \u2197</span>";
      btn.parentNode.replaceChild(link, btn);
    });
    var slot = $("#join-link-slot");
    if (slot && cfg.joinUrl) {
      var join = document.createElement("a");
      join.className = "btn btn-outline btn-small";
      join.href = cfg.joinUrl;
      join.target = "_blank";
      join.rel = "noopener";
      join.textContent = "Open the community joining page \u2197";
      slot.textContent = "";
      slot.appendChild(join);
      var note = document.createElement("p");
      note.className = "muted small";
      note.textContent = "Opens the community\u2019s official joining page in a new tab.";
      slot.appendChild(note);
    }
    $$("[data-team-slot]").forEach(function (card) {
      var idx = parseInt(card.getAttribute("data-team-slot"), 10) - 1;
      var member = cfg.team && cfg.team[idx];
      if (!member || !member.name) return;
      var nameEl = card.querySelector("h3");
      var roleEl = card.querySelector(".team-role");
      var bioEl = card.querySelector("p.muted.small");
      var initEl = card.querySelector(".avatar-initials");
      var tagEl = card.querySelector(".placeholder-tag");
      if (nameEl) nameEl.textContent = member.name;
      if (roleEl) roleEl.textContent = member.role || "Role \u2014 to be confirmed";
      if (bioEl && member.bio) bioEl.textContent = member.bio;
      if (initEl) {
        initEl.textContent = member.initials || member.name.trim().split(/\s+/).map(function (w) { return w.charAt(0); }).slice(0, 2).join("").toUpperCase();
      }
      if (tagEl) tagEl.remove();
    });
  })();

  /* Mobile nav */
  var toggle = $("#nav-toggle"), nav = $("#main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$(".nav-link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Active nav highlighting */
  var navLinks = $$(".nav-link");
  var sections = navLinks.map(function (l) {
    var id = l.getAttribute("href");
    return id && id.charAt(0) === "#" ? $(id) : null;
  }).filter(Boolean);
  function setActive() {
    var pos = window.scrollY + 140, current = sections[0];
    sections.forEach(function (sec) { if (sec.offsetTop <= pos) current = sec; });
    navLinks.forEach(function (l) {
      l.classList.toggle("is-active", l.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* Back to top */
  var backBtn = $("#back-to-top");
  window.addEventListener("scroll", function () {
    if (backBtn) backBtn.hidden = window.scrollY < 600;
  }, { passive: true });
  if (backBtn) backBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: scrollBehavior() }); });

  /* Reveal on scroll (skipped automatically when reduced motion is set,
     because CSS makes .reveal fully visible in that case) */
  var revealEls = $$(".card, .journey-step, .section-head, .split-panel, .callout");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  /* Project filters */
  var filterBtns = $$(".filter-btn"), cards = $$(".project-card"),
      statusEl = $("#filter-status"), emptyEl = $("#project-empty");
  function applyFilter(value, btn) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = value === "all" || card.getAttribute("data-category") === value;
      card.hidden = !match;
      if (match) shown += 1;
    });
    if (emptyEl) emptyEl.hidden = shown !== 0;
    filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
    if (statusEl) {
      var label = btn ? btn.textContent.trim() : "All concepts";
      statusEl.textContent = shown === 0
        ? "No illustrative concepts in this category."
        : "Showing " + shown + " illustrative concept" + (shown === 1 ? "" : "s") + " — " + label + ".";
    }
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () { applyFilter(btn.getAttribute("data-filter"), btn); });
  });
  var resetBtn = $("#reset-filter");
  if (resetBtn) resetBtn.addEventListener("click", function () {
    var all = $('.filter-btn[data-filter="all"]');
    if (all) applyFilter("all", all);
  });

  /* Project detail toggles */
  $$(".project-details-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Hide learning goals" : "View learning goals";
    });
  });

  /* FAQ accordion — one open at a time, keyboard friendly by default (button) */
  $$(".faq-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var willOpen = panel.hidden;
      $$(".faq-btn").forEach(function (other) {
        var p = document.getElementById(other.getAttribute("aria-controls"));
        p.hidden = true;
        other.setAttribute("aria-expanded", "false");
      });
      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* Pre-fill contact subject from CTAs / event interest buttons */
  var subjectSelect = $("#cf-subject"), messageField = $("#cf-message");
  function prefill(subject, extraMessage) {
    if (!subjectSelect) return;
    var found = false;
    $$("option", subjectSelect).forEach(function (opt) {
      if (opt.textContent.trim() === subject) { subjectSelect.value = opt.value || opt.textContent; found = true; }
    });
    if (!found && subject) {
      // Fall back to the closest subject for event interest.
      subjectSelect.value = "Events";
    }
    if (extraMessage && messageField && !messageField.value) {
      messageField.value = extraMessage;
    }
  }
  $$("[data-subject]").forEach(function (el) {
    el.addEventListener("click", function () { prefill(el.getAttribute("data-subject")); });
  });
  $$("[data-program]").forEach(function (el) {
    el.addEventListener("click", function () {
      prefill("General question", "Hello, I am interested in the \"" + el.getAttribute("data-program") + "\" program. Please share how to take part.");
    });
  });
  $$(".event-interest").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-event");
      prefill("Events", "Hello, I would like to hear when the next " + name + " is announced. Please let me know the date, venue and how to register once confirmed.");
      document.getElementById("contact").scrollIntoView({ behavior: scrollBehavior() });
      showToast("Contact form pre-filled for “" + name + "”. Add your details and prepare your message.");
      setTimeout(function () { var n = $("#cf-name"); if (n) n.focus({ preventScroll: true }); }, 650);
    });
  });

  /* Placeholder social links — honest feedback instead of a dead link */
  $$(".placeholder-link").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showToast(btn.getAttribute("data-network") + " link has not been added yet. Set it in SITE_CONFIG.social in script.js once the official profile is confirmed.");
    });
  });

  /* Contact form: validate, then prepare a local draft (nothing is sent) */
  var form = $("#contact-form");
  if (form) {
    var nameInput = $("#cf-name"), emailInput = $("#cf-email"),
        feedback = $("#form-feedback"), draftBox = $("#draft-box"), draftText = $("#draft-text");
    function setError(input, errId, bad) {
      var err = document.getElementById(errId);
      input.setAttribute("aria-invalid", String(bad));
      if (err) err.hidden = !bad;
      return !bad;
    }
    function validate() {
      var ok = true;
      ok = setError(nameInput, "err-name", nameInput.value.trim().length < 2) && ok;
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim());
      ok = setError(emailInput, "err-email", !emailOk) && ok;
      ok = setError(subjectSelect, "err-subject", !subjectSelect.value) && ok;
      ok = setError(messageField, "err-message", messageField.value.trim().length < 10) && ok;
      return ok;
    }
    [nameInput, emailInput, subjectSelect, messageField].forEach(function (el) {
      el.addEventListener("input", function () {
        if (el.getAttribute("aria-invalid") === "true") validate();
      });
      el.addEventListener("blur", function () {
        if (el.value) validate();
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (draftBox) draftBox.hidden = true;
      if (!validate()) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Please fix the highlighted fields above, then try again. Nothing has been sent.";
        feedback.hidden = false;
        var firstInvalid = form.querySelector("[aria-invalid=\"true\"]");
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      var subjectText = subjectSelect.options[subjectSelect.selectedIndex].textContent.trim();
      var draft = "Subject: " + subjectText + "\n"
        + "Name: " + nameInput.value.trim() + "\n"
        + "Email: " + emailInput.value.trim() + "\n\n"
        + messageField.value.trim() + "\n\n"
        + "— Sent via the BuildNext Community contact form (draft prepared in the browser; no backend connected yet).";
      draftText.textContent = draft;
      draftBox.hidden = false;
      feedback.className = "form-feedback success";
      feedback.textContent = "Thank you, " + nameInput.value.trim().split(" ")[0] + ". Your details look good and a draft is ready below. This form does not send messages yet — copy the draft and send it through the community’s official contact route.";
      feedback.hidden = false;
      draftBox.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
    });
    form.addEventListener("reset", function () {
      feedback.hidden = true;
      if (draftBox) draftBox.hidden = true;
      [nameInput, emailInput, subjectSelect, messageField].forEach(function (el) { el.removeAttribute("aria-invalid"); });
      $$(".field-error").forEach(function (err) { err.hidden = true; });
    });
    var copyBtn = $("#copy-draft");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      var text = draftText.textContent;
      function done() { showToast("Draft copied. Paste it into your email or message to the community."); }
      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        document.body.removeChild(ta);
        if (ok) { done(); } else { showToast("Copy did not work in this browser — select the draft text and copy it manually."); }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }
})();
