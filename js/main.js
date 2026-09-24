const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Form handling script
        async function handleFormSubmit(event) {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const statusAlert = document.getElementById('statusAlert');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const spinner = document.getElementById('spinner');

            // Reset alert state
            statusAlert.classList.add('hidden');
            statusAlert.className = 'hidden mb-6 p-4 rounded text-sm transition-all duration-300';

            // Basic validation check
            if (!firstName || !lastName || !email || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            spinner.classList.remove('hidden');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: '8315d46f-e069-4aa2-9dd9-648eed554550',
                        name: `${firstName} ${lastName}`,
                        email: email,
                        message: message,
                        subject: `New Website Inquiry from ${firstName} ${lastName}`,
                        from_name: 'Cannon Commercial Website'
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert('Thank you! Your message has been sent successfully.', 'success');
                    document.getElementById('contactForm').reset();
                } else {
                    throw new Error(data.message || 'Error sending message');
                }
            } catch (err) {
                showAlert(err.message || 'There was a problem submitting your message. Please check your connection and try again.', 'error');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                btnText.textContent = 'Submit';
                spinner.classList.add('hidden');
            }
        }

        function showAlert(msg, type) {
            const statusAlert = document.getElementById('statusAlert');
            statusAlert.textContent = msg;
            statusAlert.classList.remove('hidden');

            if (type === 'error') {
                statusAlert.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
            } else {
                statusAlert.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
            }
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        const propertyFilter = document.getElementById("propertyFilter");
        if (propertyFilter) {
            const propertyCards = propertyFilter.closest(".container").querySelectorAll(".card-grid > .card");

            propertyFilter.addEventListener("change", () => {
                const filter = propertyFilter.value;

                propertyCards.forEach((card) => {
                    const isLease = card.querySelector(".label-lease") !== null;
                    const isSale = card.querySelector(".label-sale") !== null;
                    const shouldShow = filter === "all"
                        || (filter === "lease" && isLease)
                        || (filter === "sale" && isSale);

                    card.hidden = !shouldShow;
                });
            });
        }
