document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;

    const resumeOutput = `
        <h2>Editable Resume</h2>
        <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <p><strong>Phone Number:</strong> <span contenteditable="true">${phone}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>
        <h3>Work Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;

        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print(); // You may want to replace this with actual PDF generation code.
        });
        buttonsContainer.appendChild(downloadButton);

        const shareableLinkButton = document.createElement("button");
        shareableLinkButton.textContent = "Copy shareable Link";
        shareableLinkButton.addEventListener("click", async () => {
            try {
                const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, '-')}`;
                await navigator.clipboard.writeText(shareableLink);
                alert("Shareable link copied to clipboard!");
            } catch (error) {
                console.error("Error copying link:", error);
            }
        });
        buttonsContainer.appendChild(shareableLinkButton);

        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(name)}`;
        const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
        document.getElementById("shareable-link-container")!.style.display = "block";

        const resumeData = { name, email, phone, education, experience, skills };
        localStorage.setItem(name, JSON.stringify(resumeData));
    }
});

// Load saved resume data on page load
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
            (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
            (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
            (document.getElementById("education") as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById("experience") as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById("skills") as HTMLTextAreaElement).value = resumeData.skills;

            document.getElementById("resumeOutput")!.innerHTML = `
                <h2>Editable Resume</h2>
                <p><strong>Name:</strong> <span contenteditable="true">${resumeData.name}</span></p>
                <p><strong>Email:</strong> <span contenteditable="true">${resumeData.email}</span></p>
                <p><strong>Phone Number:</strong> <span contenteditable="true">${resumeData.phone}</span></p>
                <h3>Education</h3>
                <p contenteditable="true">${resumeData.education}</p>
                <h3>Work Experience</h3>
                <p contenteditable="true">${resumeData.experience}</p>
                <h3>Skills</h3>
                <p contenteditable="true">${resumeData.skills}</p>
            `;
            document.getElementById("shareable-link-container")!.style.display = "block";
        }
    }
});
