//navigation js 
let menu = document.querySelector('#menu-icon');
let navigation = document.querySelector('.navigation');
// carousel javascript
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns= document.querySelectorAll(".wrapper i");
const firstCardWidth= carousel.querySelector(".cadre").offsetWidth;
const carouselChildrens=[...carousel.children];

// loader

setTimeout(function(){
  $('.loader-bg').fadeToggle();
},2500);






let isDragging = false , startX , startScrollLeft, timeoutId;

let cardPreView = Math.round(carousel.offsetWidth / firstCardWidth);




carouselChildrens.slice(-cardPreView ).reverse().forEach(card =>{
  carousel.insertAdjacentHTML("afterbegin" , card.outerHTML);
});

carouselChildrens.slice(0, cardPreView ).forEach(card =>{
  carousel.insertAdjacentHTML("beforeend" , card.outerHTML);
});

//ajouter des auditeurs d'événements du bouton fléché pour faire défiler le carrousel à gauche et à droite
arrowBtns.forEach(btn =>{
  btn.addEventListener("click" , () =>{
    carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
    
  });

});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  //enregistre le curseur initial et la position de défilement du carrousel
  startX= e.pageX;
  startScrollLeft= carousel.scrollLeft;

}

const dragging = (e) => {
  if(!isDragging) return;//si le glissement est un faux retour d'ici
  //met à jour la position de défilement du carrousel en fonction du mouvement du curseur
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");

}

const autoPlay = () => {
  if (window.innerWidth < 800) return; // retour si la fenêtre est inférieure à 800
  timeoutId = setTimeout( () => carousel.scrollLeft += firstCardWidth, 2500);//lecture automatique du carrousel toutes les 2500 ms
}
autoPlay();

const infiniteScroll= () => {
  //si le carrousel est au début, faites défiler jusqu'à la fin
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    //si le carrousel est a la fin, faites défiler jusqu'au debut
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.remove("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;

  }

  clearTimeout(timeoutId);
  // effacer le temps mort existant et démarrer la lecture automatique si la souris ne survole pas le carrousel de survol
  if(!wrapper.matches(":hover")) autoPlay();  

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup" , dragStop);
carousel.addEventListener("scroll" , infiniteScroll);
wrapper.addEventListener("mouseenter" , () =>  clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave" , autoPlay);







//reveal animation  js 
menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navigation.classList.toggle('open');
}

const sr = ScrollReveal({
  duration:2600, 
  origin:'left',
  distance:'60px',
  delay:200,
  scale:0.5,
  reset:true,
});

sr.reveal('.navigation', {
  delay:300,
  origin:'bottom',
});

sr.reveal('.hero-text', {
  delay:'500',
  origin:'right',
});

sr.reveal('.hero-img', {
  delay:450,
  origin:'right',

});

sr.reveal('.icons', {
  delay:'500',
  origin:'left',
});

sr.reveal('.scroll-down', {
  delay:'500',
  origin:'right',
});

sr.reveal('.card', {
  delay:'500',
  origin:'top',
  duration:2400,
  scale:1.5,
});
sr.reveal('.propos', {
  delay:'500',
  origin:'top',
  duration:2400,
  scale:1.5,
});

sr.reveal('.text-pr', {
  delay:'500',
  origin:'right',
});
// window.addEventListener('scroll', reveal);


// function reveal(){
//   var reveals = document.querySelectorAll('.reveal');

//   for(var i=0; i<reveals.length; i++){

//     var windowheight = window.innerHeight;
//     var revealtop = reveals[i].getBoundingClientRect().top;
//     var revealpoint = 150;

//     if(revealtop<windowheight-revealpoint){
//       reveals[i].classList.add('active');
//     }
//     else{
//       reveals[i].classList.remove('active');
//     }
//   }
// }

var to = "sirimesylvestrejean@gmail.com";
            var subject = "Nouveau Message";

            document.getElementById('sub').addEventListener('click', function(event) {

            var nom = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var telephone = document.getElementById('telephone').value;

            var message = "Nom : " + nom + "\nEmail : " + email+  "\nTelephone : " + telephone + "\n\n" + document.getElementById('message').value;

            // Vérifier si l'e-mail est valide
            if (!validateEmail(email)) {
            alert('Adresse e-mail non valide.');
            return; // Arrêter l'exécution de la fonction
            }

            fetch('https://codingmailer.onrender.com/send-email', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            to: to,
            subject: subject,
            message: message
            })
            })
            .then(function(response) {
            if (response.ok) {
            alert('E-mail envoyé avec succès.');
            // Réinitialiser les champs du formulaire
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telephone').value = '';
            document.getElementById('message').value = '';
            } else {
            response.json().then(function(data) {
            var errorMessage = data && data.message ? data.message : 'Erreur lors de l\'envoi de l\'e-mail.';
            alert('Erreur : ' + errorMessage);
            });
            }
            })
            .catch(function(error) {
                alert('E-mail envoyé avec succès.');
            });
            });

            // Fonction de validation de l'e-mail
            function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
            }

















