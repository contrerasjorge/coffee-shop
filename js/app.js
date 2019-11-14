class UI {
  hidePreloader() {
    document.querySelector(".preloader").style.display = "none";
  }

  showNav() {
    document.querySelector(".nav").classList.toggle("nav--show");
  }

  videoControls() {
    let btn = document.querySelector(".video__switch-btn");
    if (!btn.classList.contains("btnSlide")) {
      btn.classList.add("btnSlide");
      document.querySelector(".video__item").pause();
    } else {
      btn.classList.remove("btnSlide");
      document.querySelector(".video__item").play();
    }
  }

  checkEmpty(name, lastname, email) {
    let result;
    if (name === "" || lastname === "" || email === "") {
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  showFeedback(text, type) {
    let feedback = document.querySelector(".drink-form__feedback");
    if (type === "success") {
      feedback.classList.add("success");
      feedback.innerText = text;
      this.removeAlert("success");
    } else if (type === "error") {
      feedback.classList.add("error");
      feedback.innerText = text;
      this.removeAlert("error");
    }
  }

  removeAlert(type) {
    setTimeout(function() {
      document.querySelector(".drink-form__feedback").classList.remove(type);
    }, 3000);
  }

  addCustomer(customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
    <img
      src="img/person-${random}.jpeg"
      alt="person"
      class="person__thumbnail"
    />
    <h4 class="person__name">${customer.name}</h4>
    <h4 class="person__last-name">${customer.lastname}</h4>`;
    document.querySelector(".drink-card__list").appendChild(div);
  }

  clearField() {
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastname").value = "";
    document.querySelector(".input-email").value = "";
  }

  showModal(event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("work-item__icon")) {
      let id = event.target.parentElement.dataset.id;

      const modal = document.querySelector(".work-modal");
      const modalItem = document.querySelector(".work-modal__item");

      modal.classList.add("work-modal--show");
      modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    }
  }

  closeModal() {
    document.querySelector(".work-modal").classList.remove("work-modal--show");
  }
}

// event listeners
(function eventListeners() {
  const ui = new UI();

  // preloader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  // nav btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });

  // control the video
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoControls();
    });

  // submit the form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastname = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastname, email);

      if (value) {
        let customer = new Customer(name, lastname, email);

        ui.addCustomer(customer);

        ui.showFeedback("customer added to the list", "success");

        ui.clearField();
      } else {
        ui.showFeedback("some form values empty", "error");
      }
    });

  // display  modal
  const links = document.querySelectorAll(".work-item__icon");

  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });

  // hide modal
  document
    .querySelector(".work-modal__close")
    .addEventListener("click", function() {
      ui.closeModal();
    });
})();

function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}
