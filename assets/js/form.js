const steps = document.querySelectorAll('.form-step');
const dots = document.querySelectorAll('.dot');
let currentStep = 0;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function updateStep() {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
    dots[index].classList.toggle('active', index === currentStep);
  });

  prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
  nextBtn.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next →';
}

nextBtn.addEventListener('click', (e) => {
  const currentStepEl = steps[currentStep];
  const currentInputs = currentStepEl.querySelectorAll('input, textarea');

  const valid = Array.from(currentInputs).every(input => input.checkValidity());

  if (!valid) {
    currentStepEl.querySelector('input:invalid, textarea:invalid')?.reportValidity();
    return;
  }

  saveData();

  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStep();
  } else {
    console.log(JSON.parse(localStorage.getItem('cvData')));
    window.location = "/templates/template.html"
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStep();
  }
});

updateStep();

function saveData() {
  const inputs = document.querySelectorAll('input, textarea');
  const data = {};

  inputs.forEach(input => {
    data[input.name] = input.value.trim();
  });

  localStorage.setItem('cvData', JSON.stringify(data));
}

function addInputs(addBtnId, containerId, templateId) {
  const addBtn = document.getElementById(addBtnId);
  const container = document.getElementById(containerId);
  const template = document.getElementById(templateId);

  let count = 1;

  addBtn.addEventListener('click', () => {
    const clone = template.content.cloneNode(true);
    count++;

    const inputs = clone.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const baseName = input.getAttribute('name');
      input.name = `${baseName}_${count}`;
    });

    container.appendChild(clone);
    localStorage.setItem(`${containerId}-count`, count);
  });

  container.addEventListener('click', (e) => {
    if (e.target.closest('.remove-additional')) {
      e.target.closest('.inputs-entry').remove();
      count--
      localStorage.setItem(`${containerId}-count`, count);
    }
  });
}

addInputs('education-add-btn', 'education-container', 'education-template');
addInputs('work-add-btn', 'work-container', 'work-template');

