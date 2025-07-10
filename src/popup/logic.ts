console.log("[FFSync] Index Loaded");

type ConnectionInfo = {
    homeserver: string,
    tab: string,
    timestamp: number,
};
const info_defaults: ConnectionInfo = {
    homeserver: "None",
    tab: "None",
    timestamp: Date.now()
}
let connection = false;

async function connect(): Promise<ConnectionInfo> {
    connection = true;
    return {
        ...info_defaults,
        homeserver: "https://relay.example.com",
        tab: "Tab Name"
    };
};
async function disconnect(): Promise<ConnectionInfo> {
    connection = false;
    return info_defaults;
};
