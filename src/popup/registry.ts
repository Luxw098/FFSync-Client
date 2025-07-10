let registry = {
    ui_updater: setInterval(() => {}, Infinity),
};
function register_ui_updater(info: ConnectionInfo) {
    clearInterval(registry.ui_updater)
    registry.ui_updater = setInterval(update_ui, 33, info);
}