const postsContainer = document.getElementById("postsContainer");
const postBtn = document.getElementById("postBtn");
const searchInput = document.getElementById("searchInput");
const loginBtn = document.getElementById("loginBtn");
let posts = [];
let currentUser = null;

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    // Si nom d'utilisateur vide, on est en mode anonyme
    currentUser = username || "Anonyme";
    alert(`Bienvenue ${currentUser}`);
    // Passer à l'interface de publication
    document.getElementById("authForm").style.display = 'none';
    document.getElementById("postForm").style.display = 'block';
});

postBtn.addEventListener("click", () => {
    const message = document.getElementById("message").value.trim();
    const doctorFile = document.getElementById("doctorFile").files[0];
    if (!message) return alert("Le message est vide.");

    const isDoctor = doctorFile ? true : false;

    const post = {
        user: currentUser,
        text: message,
        doctor: isDoctor
    };

    posts.unshift(post);
    renderPosts();
});

searchInput.addEventListener("input", () => {
    renderPosts(searchInput.value.toLowerCase());
});

function renderPosts(filter = "") {
    postsContainer.innerHTML = "<h2>Discussions</h2>";

    posts
        .filter(p => p.text.toLowerCase().includes(filter))
        .forEach(p => {
            const div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `
                <p><strong>${p.user}</strong> 
                ${p.doctor ? '<span class="doctor-badge">[Médecin Certifié]</span>' : ""}
                </p>
                <p>${p.text}</p>
            `;
            postsContainer.appendChild(div);
        });
}
