
/////////////////////// config del menu y reloj ///////////////////////////////////////////

  function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }

  function togglePowerMenu() {
    const power = document.getElementById('power-menu');
    power.style.display = power.style.display === 'block' ? 'none' : 'block';
  }

  // Ocultar menú si haces clic fuera
  window.addEventListener('click', function (e) {
    const menu = document.getElementById('start-menu');
    const logo = document.querySelector('.taskbar-logo');
    const power = document.getElementById('power-menu');
    const powerBtn = document.querySelector('.power-dropdown button');

    if (!menu.contains(e.target) && !logo.contains(e.target)) {
      menu.style.display = 'none';
      power.style.display = 'none';
    }

    if (!power.contains(e.target) && !powerBtn.contains(e.target)) {
      power.style.display = 'none';
    }
  });

  // Reloj en vivo
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    document.getElementById("live-clock").textContent = `${hours}:${minutes}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
//////////////////////////////////////////////////////////////////////////////////////////////////////
function openMusic() {
  console.log("Abrir reproductor de música");
  // openMusicPlayerWindow();
}

function openMyPC() {
  console.log("Abrir Mi PC");
  // openMyPCWindow();
}

function openTerminal() {
  console.log("Abrir Terminal");
  // openTerminalWindow();
}

function openNotes() {
  console.log("Abrir Bloc de notas");
  // openNoteAppWindow();
}

function openBrowser() {
  console.log("Abrir Navegador");
  // openBrowserWindow();
}
////////////////////////////////////////////////////////////////////////////////////
let highestZ = 10;

function bringToFront(win) {
  highestZ++;
  win.style.zIndex = highestZ;
}

function startDrag(e, windowEl) {
  bringToFront(windowEl);
  const offsetX = e.clientX - windowEl.offsetLeft;
  const offsetY = e.clientY - windowEl.offsetTop;

  function move(e) {
    windowEl.style.left = e.clientX - offsetX + 'px';
    windowEl.style.top = e.clientY - offsetY + 'px';
  }

  function stop() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', stop);
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stop);
}

function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

function minimizeWindow(id) {
  document.getElementById(id).style.height = '40px';
}

function maximizeWindow(id) {
  const win = document.getElementById(id);

  if (!win.classList.contains('maximized')) {
    // Guardar tamaño y posición actual
    win.dataset.prevWidth = win.style.width || win.offsetWidth + 'px';
    win.dataset.prevHeight = win.style.height || win.offsetHeight + 'px';
    win.dataset.prevTop = win.style.top || win.offsetTop + 'px';
    win.dataset.prevLeft = win.style.left || win.offsetLeft + 'px';

    // Estilo tipo ventana grande restaurada
    win.style.width = '620px';
    win.style.height = '500px';
    win.style.top = '50px';
    win.style.left = 'calc(50% - 450px)'; // Centrada horizontalmente

    win.classList.add('maximized');
  } else {
    // Restaurar tamaño/posición anterior
    win.style.width = win.dataset.prevWidth;
    win.style.height = win.dataset.prevHeight;
    win.style.top = win.dataset.prevTop;
    win.style.left = win.dataset.prevLeft;

    win.classList.remove('maximized');
  }
}
/////////////////////////////////////////////////////////

//////////// codigo de musica //////////////////////
// Datos de canciones (puedes cambiar rutas locales)
const musicData = [
  { name: "Lisa-bron again", path: "../mp3/LISA - BORN AGAIN.webm" },
  { name: "never troll", path: "../mp3/nevertroll.webm" },
  { name: "Jennie-seoul city", path: "../mp3/JENNIE - Seoul City.webm" },
  { name: "nata", path: "../mp3/nata.webm" },
];

// Inicializar reproductor
function initMusicPlayer() {
  const audioPlayer = document.getElementById("audioPlayer");
  const musicList = document.getElementById("musicList");

  musicList.innerHTML = ""; // Limpiar si se vuelve a abrir

  musicData.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => {
      audioPlayer.src = track.path;
      audioPlayer.play();
    });
    musicList.appendChild(li);
  });
}

// Mostrar ventana de música
function openMusic() {
  const win = document.getElementById("musicWindow");
  win.style.display = "flex";
  bringToFront(win);
  initMusicPlayer();
}
//////////////////////////////////////////////////////////

//////////////// js de mi pc /////////////
function openMyPC() {
  const win = document.getElementById("mypcWindow");
  win.style.display = "block"; // o "flex" solo si tu CSS lo necesita explícitamente dentro del contenido
  bringToFront(win);
}

///////////////////////////////////////////////////////////////////////

//////////// js de terminal /////////////////////
function openTerminal() {
  const win = document.getElementById("terminalWindow");
  win.style.display = "flex";
  bringToFront(win);
}

// 🧠 Estado de la terminal
const terminalState = {
  user: "skynisys",
  host: "webos",
  path: "~",
  uptimeStart: Date.now(),
  // 🗂️ Estructura simulada del sistema de archivos
  fs: {
    root: {
      type: "dir",
      contents: {
        "Carpeta": {
          type: "dir",
          contents: {
            "Fotos": {
              type: "dir",
              contents: {
                "foto1.png": { type: "file", content: "📷 Imagen 1 - fondo neon" },
                "foto3.png": { type: "file", content: "📸 Imagen 2 - fondo cyber" },
              }
            },
            "Videos": {
              type: "dir",
              contents: {
                "lissa1.mp4": { type: "file", content: "🎥 Video clip 1" },
                "yahweh.mp4": { type: "file", content: "🎞️ Video clip 2" },
              }
            }
          }
        },
        "readme.txt": { type: "file", content: "Bienvenido a SYN-OS - Skynisys WebOS." },
        "music": {
          type: "dir",
          contents: {
            "track1.mp3": { type: "file", content: "🎵 Tema futurista" },
            "track2.mp3": { type: "file", content: "🎶 Tema Tron" },
          }
        }
      }
    }
  }
};

function handleTerminal(e) {
  if (e.key === "Enter") {
    const input = e.target;
    const output = document.getElementById("terminalOutput");
    const command = input.value.trim();
    const prompt = `<span style="color:#00ff88;">${terminalState.user}@${terminalState.host}</span>:<span style="color:#88f;">${terminalState.path}</span>$ `;

    // Mostrar el comando
    output.innerHTML += `<div>${prompt}${command}</div>`;

    const args = command.split(" ");
    const cmd = args[0].toLowerCase();
    const arg = args[1];

    // 🔍 Obtener carpeta actual según la ruta
    function getCurrentDir() {
      let dir = terminalState.fs.root;
      if (terminalState.path === "~") return dir;
      const parts = terminalState.path.split("/").slice(1);
      for (const p of parts) {
        if (dir.contents[p]) dir = dir.contents[p];
      }
      return dir;
    }

 switch (cmd) {
  case "help":
    output.innerHTML += `
      <div class="terminal-help">
        <b>📘 Comandos disponibles:</b><br><br>
        <div><b>help</b> — Muestra esta lista de comandos disponibles.</div>
        <div><b>clear</b> — Limpia la pantalla del terminal.</div>
        <div><b>ls</b> — Lista los archivos y carpetas del directorio actual.</div>
        <div><b>cd</b> — Cambia de directorio (ejemplo: <i>cd carpeta</i>).</div>
        <div><b>cat</b> — Muestra el contenido de un archivo (ejemplo: <i>cat archivo.txt</i>).</div>
        <div><b>echo</b> — Imprime un texto en pantalla (ejemplo: <i>echo hola o echo remote nasa</i>).</div>
        <div><b>uname</b> — Muestra información del sistema operativo simulado.</div>
        <div><b>date</b> — Muestra la fecha y hora actual.</div>
        <div><b>whoami</b> — Muestra el nombre del usuario actual.</div>
        <div><b>uptime</b> — Indica cuánto tiempo lleva activo el sistema.</div>
        <div><b>skynisys root</b> — Acceso al modo administrador de Skynisys OS (simulado).</div>
      </div>
    `;
    break;

      case "clear":
        output.innerHTML = "";
        break;

      case "ls": {
        const dir = getCurrentDir();
        const contents = Object.keys(dir.contents);
        if (contents.length === 0) {
          output.innerHTML += `<div>(vacío)</div>`;
        } else {
          // 🎨 Mostrar colores tipo Ubuntu
          const list = contents.map(name => {
            const item = dir.contents[name];
            if (item.type === "dir") return `<span style="color:#00ccff;">${name}/</span>`;
            else return `<span style="color:#eee;">${name}</span>`;
          });
          output.innerHTML += `<div>${list.join("  ")}</div>`;
        }
        break;
      }

      case "cd": {
        const currentDir = getCurrentDir();
        if (!arg) {
          terminalState.path = "~";
        } else if (arg === "..") {
          if (terminalState.path !== "~") {
            const parts = terminalState.path.split("/");
            parts.pop();
            terminalState.path = parts.join("/") || "~";
          }
        } else if (currentDir.contents[arg] && currentDir.contents[arg].type === "dir") {
          terminalState.path += (terminalState.path === "~" ? "/" : "/") + arg;
        } else {
          output.innerHTML += `<div>cd: ${arg}: No existe el directorio</div>`;
        }
        break;
      }

      case "cat": {
        const dir = getCurrentDir();
        if (dir.contents[arg] && dir.contents[arg].type === "file") {
          output.innerHTML += `<div>${dir.contents[arg].content}</div>`;
        } else {
          output.innerHTML += `<div>cat: ${arg || ""}: Archivo no encontrado</div>`;
        }
        break;
      }

case "echo": {
  // reconstruir texto con variables
  let raw = args.slice(1).join(" ");
  raw = raw
    .replace(/\$USER/g, terminalState.user)
    .replace(/\$HOSTNAME/g, terminalState.host)
    .replace(/\$PWD/g, terminalState.path);

  // detectar si es un "remote" especial: echo remote <servicio>
  const remoteMatch = raw.match(/^remote\s+(\S+)$/i);

  // detectar redirección simple: texto > archivo.txt
  const redirectMatch = raw.match(/^(.*)\s*>\s*(\S+)$/);
  let toFile = null;
  if (redirectMatch) {
    raw = redirectMatch[1].trim();
    toFile = redirectMatch[2].trim();
  }

  // salida "hack" con typing effect
  function hackEcho(text, container, speed = 18, pulse = true, after) {
    const span = document.createElement("span");
    span.className = "hack-line" + (pulse ? " pulse" : "");
    container.appendChild(span);

    const cursor = document.createElement("span");
    cursor.className = "hack-cursor";
    container.appendChild(cursor);

    let i = 0;
    const timer = setInterval(() => {
      span.textContent += text.charAt(i);
      i++;
      container.parentElement.scrollTop = container.parentElement.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(() => {
          cursor.remove();
          if (typeof after === "function") after(span.textContent);
        }, 220);
      }
    }, speed);
  }

  const outputContainer = output; // asumimos 'output' en scope

  // Si es remote special
  if (remoteMatch) {
    const service = remoteMatch[1].toLowerCase();

    // Lista de URLs "trol" (aleatorias)
    const trollUrls = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=DLzxrzFCyOs"
    ];
    const randomUrl = () => trollUrls[Math.floor(Math.random() * trollUrls.length)];

    if (service === "nasa") {
      hackEcho(`[remote/${service}] iniciando enlace...`, outputContainer, 14, true, () => {
        hackEcho(`[remote/${service}] nasa conectado. ¿quieres ver algo interesante?`, outputContainer, 18, true, () => {
          // escoger url y crear link camuflado
          const url = randomUrl();

          const linkWrap = document.createElement("div");
          linkWrap.style.marginTop = "6px";

          const a = document.createElement("a");
          // Texto camuflado que verá el usuario
          a.textContent = "mira los archivos clasificados";
          a.href = "#"; // evitar mostrar url en status bar por href directo
          a.style.color = "#66ffe0";
          a.style.textShadow = "0 0 8px rgba(102,255,224,0.8)";
          a.style.fontFamily = "Source Code Pro, monospace";
          a.style.textDecoration = "underline";
          a.style.cursor = "pointer";
          a.title = "Abrir enlace remoto";

          // Al hacer click abrimos la url real en nueva pestaña
          a.addEventListener("click", (ev) => {
            ev.preventDefault();
            window.open(url, "_blank", "noopener,noreferrer");
          });

          linkWrap.appendChild(a);
          outputContainer.appendChild(linkWrap);
          outputContainer.parentElement.scrollTop = outputContainer.parentElement.scrollHeight;
        });
      });
    } else {
      // genérico para otros servicios
      hackEcho(`[remote/${service}] intentando conectar...`, outputContainer, 16, true, () => {
        hackEcho(`[remote/${service}] conectado (simulado). ¿mostrar detalles?`, outputContainer, 18, true);
      });
    }

    break;
  }

  // Si se pidió redirección, escribimos el contenido en el fs simulado
  if (toFile) {
    const dir = (function getCurrentDirObj() {
      let d = terminalState.fs.root;
      if (terminalState.path === "~") return d;
      const parts = terminalState.path.split("/").slice(1);
      for (const p of parts) {
        if (d.contents[p]) d = d.contents[p];
      }
      return d;
    })();

    dir.contents[toFile] = { type: "file", content: raw };
    hackEcho(`[written -> ${toFile}]`, outputContainer, 12, true, () => {
      outputContainer.innerHTML += `<div style="color:#9ff">Archivo '${toFile}' actualizado.</div>`;
    });

    break;
  }

  // Normal: solo mostrar con efecto hack
  hackEcho(raw, outputContainer, 14, true);
  break;
}
/////////////////////////////////////////////////////////////////////////////////////

case "skynisys": {
  const sub = args[1]?.toLowerCase();

  // ======== COMANDO "skynisys root" ========
  if (sub === "root") {
    const lines = [
      "[skynisys/root] Conectando con el servidor...",
      "✔ Servidor remoto encontrado: 157.170.68.4",
      "✔ Autenticando como administrador...",
      "✔ Acceso concedido.",
      "Se ha conectado. Ingrese 'Y' para continuar."
    ];

const asciiArt = `
<pre style="color:#00fff2; font-family:'Courier New', monospace; text-shadow:0 0 12px #00fff2; line-height:0.9; font-size:12px;">
███████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗███████╗██╗   ██╗███████╗
██╔════╝██║ ██╔╝╚██╗ ██╔╝████╗  ██║██║██╔════╝╚██╗ ██╔╝██╔════╝
███████╗█████╔╝  ╚████╔╝ ██╔██╗ ██║██║███████╗ ╚████╔╝ ███████╗
╚════██║██╔═██╗   ╚██╔╝  ██║╚██╗██║██║╚════██║  ╚██╔╝  ╚════██║
███████║██║  ██╗   ██║   ██║ ╚████║██║███████║   ██║   ███████║
╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚═╝╚══════╝   ╚═╝   ╚══════╝ <span style="color:#00ff88;">SYN OS v3.4</span>
                                                                                          
                              
<span style="color:#00ff88;">+ -- -- +[ author GN | homepage: kynisysia.blogspot.com</span> 
<span style="color:#00ff88;">+ -- -- +[ X-250 androide IA segunda generación</span>                              

<span style="color:#F57A0F;">[!] all Skynisys repositories are on github, the website is updated with more features.</span>          

<span style="color:#00ff88;">OS: SYN WEB-OS</span>         
<span style="color:#00ff88;">NPU: Ryzen IA-9400</span>  
<span style="color:#00ff88;">GPU: Geforce IA XLS 9090 120TB</span>                             
<span style="color:#00ff88;">Memory: kingston DXL 30TB</span>                             
</pre>
`;


    // Efecto de escritura tipo "hack"
    let index = 0;
    const writeLine = () => {
      if (index < lines.length) {
        const div = document.createElement("div");
        div.textContent = lines[index];
        div.style.color = index === 4 ? "#ff0" : "#0f0";
        div.style.textShadow = "0 0 6px #0f0";
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
        index++;
        setTimeout(writeLine, 600);
      } else {
        // Cuando termina, esperar a "Y"
        const inputHandler = (e) => {
          if (e.key === "y" || e.key === "Y") {
            e.preventDefault();
            output.innerHTML += `<div style="color:#0f0; margin-top:8px;">Iniciando entorno root...</div>`;
            output.innerHTML += asciiArt;
            output.innerHTML += `<div style="color:#0f0;">[root@skynisys] Bienvenido al entorno avanzado.</div>`;
            e.target.removeEventListener("keypress", inputHandler);
            output.scrollTop = output.scrollHeight;
          }
        };
        document.getElementById("terminalInput").addEventListener("keypress", inputHandler);
      }
    };
    writeLine();
    break;
  }

  // ======== OTROS SUBCOMANDOS FUTUROS (como "skynisys ia") ========
  else if (sub === "ia") {
    output.innerHTML += `<div style="color:#0ff;">[skynisys/ia] Inicializando conexión con Gemini...</div>`;
    // Aquí puedes integrar la API de Gemini más adelante
    break;
  }

  // ======== DEFAULT ========
  else {
    output.innerHTML += `<div style="color:#f66;">Uso: skynisys ia | skynisys root</div>`;
    break;
  }
}

/////////////////////////////////////////////////////////////////////////////////////
case "update": {
  const updates = [
    {
      month: "Octubre",
      items: [
        "Se corrigió un bug que cerraba la ventana de Matrix root",
        "Mejoras en la animación continua",
        "Ajustes visuales en la barra translúcida"
      ]
    },
    {
      month: "Septiembre",
      items: [
        "Se añadió más elementos al escritorio",
        "Nueva carpeta con subcarpetas (Imagen, Video)",
        "Optimización del manejo de ventanas"
      ]
    }
    // Agrega más meses aquí
  ];

  // Formatea la salida
  let changelog = "\n=== ACTUALIZACIONES DE Skynisys WEB-OS ===\n\n";
  updates.forEach(u => {
    changelog += `${u.month}\n`;
    u.items.forEach(it => {
      changelog += `  - ${it}\n`;
    });
    changelog += "\n";
  });

  // Muestra la salida
  console.log(changelog);
  return;
}




      case "uname":
        output.innerHTML += `<div>skynisys${terminalState.host} SYN-OS x-IA</div>`;
        break;

      case "date":
        output.innerHTML += `<div>${new Date().toLocaleString()}</div>`;
        break;

      case "whoami":
        output.innerHTML += `<div>${terminalState.user}</div>`;
        break;

      case "uptime":
        const uptimeSec = Math.floor((Date.now() - terminalState.uptimeStart) / 1000);
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        output.innerHTML += `<div>up ${hours}h ${minutes}m, 1 user, load average: 0.12, 0.06, 0.01</div>`;
        break;

      case "":
        break;

      default:
        output.innerHTML += `<div>Comando no encontrado: ${cmd}. Escribe <b>help</b> para ver los disponibles.</div>`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
}


////////////////////////////////////////////////////////////////////////////////////////

/////////// codigo de notes //////////////
function openNotes() {
  const win = document.getElementById("notesWindow");
  win.style.display = "flex";
  bringToFront(win);
  // Cargar notas guardadas si existen
  const saved = localStorage.getItem("myNotes");
  if (saved) document.getElementById("notesArea").value = saved;
}

function saveNotes() {
  const content = document.getElementById("notesArea").value;
  localStorage.setItem("myNotes", content);
  alert("📝 Notas guardadas localmente.");
}
/////////////////////////////////////////////////////////////////////////////////////////

////////////////////// codigo del navegador ///////////////////////
function openBrowser() {
  const win = document.getElementById("browserWindow");
  win.style.display = "flex";
  bringToFront(win);
}

function loadWebsite() {
  const input = document.getElementById("browserInput").value.trim();
  const iframe = document.getElementById("browserFrame");

  // Si parece una URL
  if (/^https?:\/\//i.test(input) || input.includes(".com") || input.includes(".")) {
    let url = input.startsWith("http") ? input : "https://" + input;
    iframe.src = url;
  } else {
    // Si es una búsqueda
    const query = encodeURIComponent(input);
    window.open("https://www.google.com/search?q=" + encodeURIComponent(query), "_blank");
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
let currentFolder = "main";

function openFolderWindow() {
  document.getElementById("folderWindow").style.display = "block";
  loadFolder("main");
  bringToFront("folderWindow");
}

function loadFolder(type) {
  currentFolder = type;
  const content = document.getElementById("folderContent");
  content.innerHTML = "";

  if (type === "main") {
    content.className = "window-content folder-grid";
    content.innerHTML = `
      <div class="folder-item" onclick="loadFolder('fotos')">
        <img src="https://img.icons8.com/ios-filled/100/00ffff/pictures-folder.png" alt="Fotos" />
        <span>Fotos</span>
      </div>
      <div class="folder-item" onclick="loadFolder('videos')">
        <img src="https://img.icons8.com/ios-filled/100/00ffff/movies-folder.png" alt="Videos" />
        <span>Videos</span>
      </div>
    `;
  } else if (type === "fotos") {
    content.className = "window-content folder-grid";
    content.innerHTML = `
      <div class="folder-item">
        <img src="../media/fotos/foto1.png" alt="1" />
        <span>foto1.png</span>
      </div>
      <div class="folder-item">
        <img src="../media/fotos/never.gif" alt="2" />
        <span>foto2.png</span>
      </div>
      <div class="back-button" onclick="loadFolder('main')">⬅ Volver</div>
    `;
  } else if (type === "videos") {
    content.className = "window-content folder-grid";
    content.innerHTML = `
      <div class="folder-item">
        <video src="../media/videos/vendicion.mp4" controls></video>
        <span>video1.mp4</span>
      </div>
      <div class="folder-item">
        <video src="../media/videos/camellos.mp4" controls></video>
        <span>video2.mp4</span>
      </div>
      <div class="back-button" onclick="loadFolder('main')">⬅ Volver</div>
    `;
  }
}


function goBackFolder() {
  if (currentFolder !== "main") {
    loadFolder("main");
  }
}
