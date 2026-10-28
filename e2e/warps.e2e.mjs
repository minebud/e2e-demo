import { test, expect, diagnostics, expectNoScriptErrors } from "@minebud/e2e";

test("new players are told about the warp menu", ({ bot }) => {
    expect(bot.chatLog(), { timeoutMs: 10000 }).toContain("Welcome! Type /demo:warps to travel.");
});

test("the warp menu teleports to the market", ({ bot }) => {
    bot.command("/demo:warps");
    const form = bot.waitForForm({ title: "Warps" });
    expect(form.buttons).toHaveCount(2);
    bot.respondForm(form, { button: 1 });
    expect(bot.chatLog(), { timeoutMs: 5000 }).toContain("Teleported to Market");
    expect(bot.position()).toBeNear([24.5, -62, 8.5], 2);
    expectNoScriptErrors();
});

expect(diagnostics.tps.mean).toBeGreaterThan(19);
