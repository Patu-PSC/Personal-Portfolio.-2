// ===== Typing Animation =====
const roles = [
  "AI & Data Science Enthusiast", "Python Developer", "Web Developer",
  "Machine Learning Learner", "Creative Technologist", "Tech Explorer",
  "Junior Data Scientist", "Self-Taught Coder", "Aspiring AI Engineer", "Problem Solver"
];

let index = 0;
let charIndex = 0;
let typing = true;

function type() {
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  if (typing) {
    if (charIndex < roles[index].length) {
      typingElement.textContent += roles[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      typing = false;
      setTimeout(type, 1000);
    }
  } else {
    if (charIndex > 0) {
      typingElement.textContent = roles[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 50);
    } else {
      typing = true;
      index = (index + 1) % roles.length;
      setTimeout(type, 500);
    }
  }
}
type();


// ===== Skill Toggle on Click =====
let activeSkill = null;

function toggleProgress(button, skill, percent) {
  const container = document.getElementById("progress-container");
  const fill = document.getElementById("skill-fill");
  const label = container.querySelector(".progress-label");

  if (activeSkill === skill) {
    container.style.display = "none";
    activeSkill = null;
    return;
  }

  activeSkill = skill;
  label.textContent = skill;
  fill.style.width = "0%";
  fill.textContent = "0%";
  container.style.display = "block";

  let current = 0;
  const animate = setInterval(() => {
    if (current >= percent) {
      clearInterval(animate);
    } else {
      current++;
      fill.style.width = current + "%";
      fill.textContent = current + "%";
    }
  }, 15);
}


// ===== Auto Animate Top 3 Skills on Scroll =====
function animateSkillProgress(skill, percent) {
  const container = document.getElementById("progress-container");
  const fill = document.getElementById("skill-fill");
  const label = container.querySelector(".progress-label");

  label.textContent = skill;
  fill.style.width = "0%";
  fill.textContent = "0%";
  container.style.display = "block";

  let current = 0;
  const animate = setInterval(() => {
    if (current >= percent) {
      clearInterval(animate);
    } else {
      current++;
      fill.style.width = current + "%";
      fill.textContent = current + "%";
    }
  }, 15);
}

let hasAnimatedSkills = false;

window.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills");
  const rect = skillsSection.getBoundingClientRect();

  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible && !hasAnimatedSkills) {
    hasAnimatedSkills = true;

    setTimeout(() => animateSkillProgress('Python', 60), 200);
    setTimeout(() => animateSkillProgress('JavaScript', 50), 1700);
    setTimeout(() => animateSkillProgress('SQL', 30), 3200);
  }
});


// ===== Calculator Logic + Sound Toggle =====
let history = [];
let soundEnabled = false;

const audio = new Audio('M.mp3');
audio.preload = 'auto';

function appendValue(val) {
  const display = document.getElementById('display');
  display.value += val;
  playSound();
}

function clearDisplay() {
  document.getElementById('display').value = '';
  playSound();
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
  playSound();
}

function calculate() {
  const display = document.getElementById('display');
  try {
    const result = eval(display.value);
    history.push(`${display.value} = ${result}`);
    display.value = result;
    updateHistory();
  } catch {
    display.value = "Error";
  }
  playSound();
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  if (historyList) {
    historyList.innerHTML = history
      .slice(-5)
      .reverse()
      .map(entry => `<li>${entry}</li>`)
      .join('');
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  alert(`Sound ${soundEnabled ? "enabled 🔊" : "disabled 🔇"}`);
}

function playSound() {
  if (!soundEnabled) return;
  audio.currentTime = 0;
  audio.play();
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});


// ===== Submit Form with Sound & Animation =====
function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button[type='submit']");
  const originalText = button.textContent;
  const sound = document.getElementById("success-sound");

  button.textContent = "Sending...";
  button.disabled = true;

  setTimeout(() => {
    alert("Message sent! (Not really, this is a front-end demo 😅)");

    // ✅ Reset form fields
    form.reset();

    // ✅ Reset button
    button.textContent = originalText;
    button.disabled = false;

    // ✅ Play success sound
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }, 1500);
}


// ===== Animate Skills on Scroll (for bars/fill) =====
document.addEventListener('DOMContentLoaded', () => {
  const skillSection = document.querySelector('#skills');
  if (!skillSection) return;

  let animated = false;

  function animateSkills() {
    const skills = document.querySelectorAll('.skill-fill');
    skills.forEach(skill => {
      const percent = skill.getAttribute('data-percent');
      skill.style.width = percent;
      skill.classList.add('visible');
    });
  }

  function isInViewport(elem) {
    const rect = elem.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  window.addEventListener('scroll', () => {
    if (!animated && isInViewport(skillSection)) {
      animateSkills();
      animated = true;
    }
  });

  if (isInViewport(skillSection)) {
    animateSkills();
    animated = true;
  }
});


// ===== Animate Project Cards on Scroll =====
const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

projectCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.6s ease-out";
  projectObserver.observe(card);
});