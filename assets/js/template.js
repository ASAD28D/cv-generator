let cvData = JSON.parse(localStorage.getItem('cvData'))

function showCv(buttonClass, templateClass) {
    let resultBtn = document.querySelector(buttonClass);

    resultBtn.addEventListener('click', () => {
        console.log(cvData)

        const template = document.querySelector(templateClass)
        const clone = template.content.cloneNode(true)

        clone.querySelector('.first-name').textContent = cvData.first_name
        clone.querySelector('.last-name').textContent = cvData.last_name
        clone.querySelector('.profession').textContent = cvData.Profession
        clone.querySelector('.profile-text').textContent = cvData.about
        clone.querySelector('.phone').textContent = cvData.phone
        clone.querySelector('.email').textContent = cvData.email
        clone.querySelector('.address').textContent = cvData.address

        let skillsArr = cvData.skills.split(/\s*,\s*/);
        let skillsContainer = clone.querySelector('.skills');

        if (skillsContainer.innerHTML.includes("<br>")) {
            skillsContainer.innerHTML = "";

            for (let i = 0; i < skillsArr.length; i++) {
                let skillTag = document.createElement("span")
                skillTag.classList.add('skill-item')
                skillTag.textContent = skillsArr[i];
                skillsContainer.appendChild(skillTag)

                let br = document.createElement("br")
                skillsContainer.appendChild(br)
            }
        } else {
            skillsContainer.innerHTML = "";

            for (let i = 0; i < skillsArr.length; i++) {
                let skillTag = document.createElement("span")
                skillTag.classList.add('skill-item')
                skillTag.textContent = skillsArr[i];
                skillsContainer.appendChild(skillTag)
            }
        }

        let eduCount = parseInt(localStorage.getItem('education-container-count'));
        let workCount = parseInt(localStorage.getItem('work-container-count'));

        if (!eduCount && !workCount) {
            eduCount = 1;
            workCount = 1;
        }

        for (let i = 1; i <= eduCount; i++) {
            const eduItemContainer = clone.querySelector('.edu-items-container')
            const eduTemplate = clone.querySelector('.edu-template')
            const eduClone = eduTemplate.content.cloneNode(true)

            eduClone.querySelector('.edu-year').textContent = cvData[`years_${i}`]
            eduClone.querySelector('.edu-degree').textContent = cvData[`degree_${i}`]
            eduClone.querySelector('.institute').textContent = cvData[`institute_${i}`]
            eduClone.querySelector('.edu-city').textContent = cvData[`education_city_${i}`]

            eduItemContainer.appendChild(eduClone)
        }

        for (let i = 1; i <= workCount; i++) {
            const workItemContainer = clone.querySelector('.work-items-container')
            const workTemplate = clone.getElementById('work-item-template')
            const workClone = workTemplate.content.cloneNode(true)

            if (workClone.querySelector('.work-year').innerHTML.includes("<br>")) {
                workClone.querySelector('.work-year').innerHTML = cvData[`duration_${i}`].replace(/\s*-\s*/, "<br>-<br>");
            } else {
                workClone.querySelector('.work-year').textContent = cvData[`duration_${i}`]
            }
            workClone.querySelector('.job-title').textContent = cvData[`work_role_${i}`];
            workClone.querySelector('.work-company').textContent = cvData[`company_${i}`];
            workClone.querySelector('.work-city').textContent = cvData[`work_city_${i}`];
            workClone.querySelector('.job-desc').textContent = cvData[`description_${i}`];

            workItemContainer.appendChild(workClone)
        }

        const templateContainer = document.querySelector('.templates-container')
        templateContainer.innerHTML = ""

        templateContainer.appendChild(clone)
    })
}

showCv(".template-1-btn", ".cv-template-1")
showCv(".template-2-btn", ".cv-template-2")
showCv(".template-3-btn", ".cv-template-3")
showCv(".template-4-btn", ".cv-template-4")
showCv(".template-5-btn", ".cv-template-5")

