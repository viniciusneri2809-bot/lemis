import { test } from "node:test";
import assert from "node:assert/strict";
import { linkWhatsApp, LINK_WHATSAPP, WHATSAPP_NUMERO } from "../src/lib/contato.ts";

test("número centralizado", () => {
  assert.equal(WHATSAPP_NUMERO, "5575988023044");
});

test("link padrão usa wa.me com mensagem codificada", () => {
  assert.ok(LINK_WHATSAPP.startsWith("https://wa.me/5575988023044?text="));
  assert.ok(LINK_WHATSAPP.includes(encodeURIComponent("Lemis")));
  assert.ok(!LINK_WHATSAPP.includes(" "));
});

test("mensagem personalizada", () => {
  assert.equal(linkWhatsApp("oi"), "https://wa.me/5575988023044?text=oi");
});
