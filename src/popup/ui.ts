let connectivity_lock = false;

function format_date(target_ms: number): string {
    const difference = Date.now() - target_ms;
    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor(hours / 60000);
    const seconds = Math.floor(minutes / 60000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function update_ui(info: ConnectionInfo): void {
    if (!connectivity_lock) {
        const homeserver = info.homeserver.replace(/https?:\/\//g, "").split(".");
        if (homeserver.length > 2) homeserver.shift();
        document.getElementById("connection")!.textContent = "Homeserver: " + homeserver.join(".").split("/")[0];
        document.getElementById("shared")!.textContent = "Shared Tab: " + info.tab;
        document.getElementById("duration")!.textContent = format_date(Date.now()) + " Elapsed";
    
        const share = document.getElementById("share")!;
        share.textContent = connection ? "Disconnect" : "Connect";
        (connection) ? share.classList.add("sharing") : share.classList.remove("sharing")
    };
};
update_ui(info_defaults);
async function onclick_share(): Promise<boolean> {
    if (connectivity_lock) return connectivity_lock;
    connectivity_lock = true;

    const share = document.getElementById("share")!;
    share.classList.add("connecting");
    share.textContent = connection ? "Disconnecting..." :  "Connecting...";

    let result;
    if (connection) result = await disconnect();
    else result = await connect();

    share.classList.remove("connecting");
    register_ui_updater(result);

    connectivity_lock = false;
    return connectivity_lock;
}
document.getElementById("share")!.onclick = onclick_share;