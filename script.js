const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const toggleSoundButton = document.getElementById("toggleSound");

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

let aviaoX = canvas.width / 2;
let aviaoY = canvas.height / 2;
let misselX = 0;
let misselY = 0;
let velMissel = 5;
let missel = false;
let ativaSom = true;

const somExplosao = new Audio('explosion.mp3');
const somMissel = new Audio('missile.mp3');

const imagemAviao = new Image();
imagemAviao.src = 'aviao.png';

const imagemMissel = new Image();
imagemMissel.src = 'missel.png';

toggleSoundButton.addEventListener("click", () => {
    ativaSom = !ativaSom;
    toggleSoundButton.textContent = ativaSom ? "Mute Sound" : "Unmute Sound";
});

canvas.addEventListener("mousemove", (event) => {
    aviaoX = event.clientX - canvas.getBoundingClientRect().left;
    aviaoY = event.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    
    if (!missel) {
        misselX = canvas.width / 2;
        misselY = canvas.height / 2;
        missel = true;

        if (ativaSom) {
            somMissel.play();
        }
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imagemAviao, aviaoX - 50, aviaoY - 40, 100, 80);

    if (missel) {
        ctx.drawImage(imagemMissel, misselX - 20, misselY - 20, 40, 40);

        const angle = Math.atan2(aviaoY - misselY, aviaoX - misselX);
        misselX += Math.cos(angle) * velMissel;
        misselY += Math.sin(angle) * velMissel;

        if (Math.abs(misselX - aviaoX) < 10 && Math.abs(misselY - aviaoY) < 10) {
            if (ativaSom) {
                somExplosao.play();
            }
            missel = false;
        }
    }

    requestAnimationFrame(draw);
}

imagemAviao.onload = () => {
    imagemMissel.onload = () => {
        draw();
    };
};
