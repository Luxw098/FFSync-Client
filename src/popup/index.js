console.log("[FFSync] Index Loaded");

let connected_on = 0;
let connected = true;

let share_lock = false;
async function share() {
    if (share_lock) return;
    share_lock = true;

    const share = document.getElementById("share");
    connected = !connected;

    share.classList.add("connecting");
    share.textContent = "Connecting...";

    await (async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    })();

    // Do Connection/Disconnection Logic

    share.classList.remove("connecting");
    if (connected) {
        share.classList.add("sharing");
        share.textContent = "End Session";

        connected_on = Date.now()-100000;

        let tab = "";
        for (const i of document.getElementsByClassName("tab")) {
            if (i.classList.contains("selected")) {
                tab = i.textContent;
                break;
            }
        }

        document.getElementById("connection").innerText = "Homeserver: " + document.getElementById("homeserver").value;
        document.getElementById("shared").innerText = "Shared Tab: " + tab;
        const ms = Date.now() - connected_on;
        const h = Math.floor(ms / 3600000);
        const m = Math.floor(h / 60000);
        const s = Math.floor(m / 60000);
        document.getElementById("duration").innerText = 
            `${h.toString().padEnd("0")}:${m.toString().padEnd("0")}:${s.toString().padEnd("0")} Time Elapsed`; 
    } else {
        share.classList.remove("sharing");
        share.textContent = "Create Session";
    };

    share_lock = false;
}
share()
document.getElementById("share").onclick = share;