import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const WARPS = [
    { name: "Spawn", location: { x: 0.5, y: -62, z: 0.5 } },
    { name: "Market", location: { x: 24.5, y: -62, z: 8.5 } },
];

function openWarps(player) {
    const form = new ActionFormData().title("Warps");
    for (const warp of WARPS) form.button(warp.name);
    form.show(player).then((response) => {
        const warp = WARPS[response.selection ?? -1];
        if (!warp) return;
        player.teleport(warp.location);
        player.sendMessage(`Teleported to ${warp.name}`);
    });
}

system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
    customCommandRegistry.registerCommand(
        { name: "demo:warps", description: "Open the warp menu", permissionLevel: 0 },
        (origin) => {
            const player = origin.sourceEntity;
            if (player?.typeId === "minecraft:player") system.run(() => openWarps(player));
        },
    );
});

world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
    if (initialSpawn) player.sendMessage("Welcome! Type /demo:warps to travel.");
});
