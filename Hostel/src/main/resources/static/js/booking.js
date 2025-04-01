document.addEventListener("DOMContentLoaded", function() {
	console.log("JavaScript loaded!");

	const confirmBookingBtn = document.getElementById("confirmBookingBtn");
	const bookingModal = new bootstrap.Modal(document.getElementById("bookingModal"));
	const toastContainer = document.getElementById("toastContainer");

	const nameInput = document.getElementById("customerName");
	const phoneInput = document.getElementById("customerPhone");


	const bookingModalEl = document.getElementById("bookingModal");

	// When the modal is completely hidden
	bookingModalEl.addEventListener("hidden.bs.modal", function() {
		// Clear input values
		nameInput.value = "";
		phoneInput.value = "";

		// Clear error messages (if any)
		nameError.textContent = "";
		phoneError.textContent = "";

		// Optionally, reset the room text if needed
		document.getElementById("selectedRoom").textContent = "Selected Room";
	});


	// Update selected room text when a "Book Now" button is clicked
	const bookNowButtons = document.querySelectorAll(".book-now-btn");
	bookNowButtons.forEach(function(button) {
		button.addEventListener("click", function() {
			const room = this.getAttribute("data-room");
			document.getElementById("selectedRoom").textContent = room;
		});
	});

	const roomTypeElement = document.getElementById("selectedRoom");
	const roomType = roomTypeElement ? roomTypeElement.textContent.trim() : "Not Selected";


	const nameError = document.createElement("p");
	nameError.style.color = "red";
	nameError.style.fontSize = "small";
	nameInput.parentNode.appendChild(nameError);

	const phoneError = document.createElement("p");
	phoneError.style.color = "red";
	phoneError.style.fontSize = "small";
	phoneInput.parentNode.appendChild(phoneError);

	function validateName(name) {
		return /^[A-Za-z\s]+$/.test(name);
	}

	function validatePhone(phone) {
		return /^[0-9]{10}$/.test(phone);
	}

	nameInput.addEventListener("input", function() {
		if (!validateName(nameInput.value)) {
			nameError.textContent = "Only letters are allowed in the name field.";
		} else {
			nameError.textContent = "";
		}
	});

	phoneInput.addEventListener("input", function() {
		if (!validatePhone(phoneInput.value)) {
			phoneError.textContent = "Enter a valid 10-digit phone number.";
		} else {
			phoneError.textContent = "";
		}
	});

	if (confirmBookingBtn) {
		confirmBookingBtn.addEventListener("click", function() {
			console.log("Confirm Booking Clicked");

			const name = nameInput.value.trim();
			const phone = phoneInput.value.trim();
			const roomType = document.getElementById("selectedRoom")?.textContent || "Selected Room";

			if (!name || !phone || nameError.textContent || phoneError.textContent) {
				alert("Please correct the errors before submitting.");
				return;
			}

			bookingModal.hide();

			toastContainer.innerHTML = `
                <div class="toast show bg-success text-white" role="alert">
                    <div class="toast-header">
                        <strong class="me-auto">Booking Confirmed</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Thank you, ${name}! Your booking for ${roomType} has been confirmed.
                    </div>
                </div>`;

			setTimeout(() => {
				toastContainer.innerHTML = "";
			}, 6000);

			const bookingData = {
				name: name,
				phone: phone,
				roomType: roomType,
				checkInDate: new Date().toISOString().split('T')[0]
			};

			console.log("Booking Data:", bookingData);

			fetch("http://localhost:8081/customers/confirm", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bookingData)
			})
				.then(response => response.text())
				.then(data => console.log("Backend Response:", data))
				.catch(error => console.error("Error:", error));
		});
	}
	
	// Contact Form Validation

    const contactForm = document.getElementById("contactForm");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateName(name) {
        return /^[A-Za-z\s]+$/.test(name);
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    nameField.addEventListener("input", function () {
        nameField.setCustomValidity(validateName(nameField.value) ? "" : "Only letters and spaces are allowed.");
    });

    phoneField.addEventListener("input", function () {
        phoneField.setCustomValidity(validatePhone(phoneField.value) ? "" : "Enter a valid 10-digit phone number.");
    });

    emailField.addEventListener("input", function () {
        emailField.setCustomValidity(validateEmail(emailField.value) ? "" : "Enter a valid email address.");
    });

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                phone: phoneField.value.trim(),
                message: messageField.value.trim()
            };

            console.log("Contact Form Data:", formData);

            fetch("http://localhost:8081/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
                .then(response => response.text())
                .then(data => {
                    alert("Message sent successfully!");
                    contactForm.reset();
                    setTimeout(() => location.reload(), 500);
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to send message. Please try again.");
                });
        });
    }


});
