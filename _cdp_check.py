import json, urllib.request, websocket, sys, time

sys.stdout.reconfigure(encoding="utf-8")

PORT = 9223
BASE = f"http://127.0.0.1:{PORT}"

def get_json(path):
    with urllib.request.urlopen(BASE + path, timeout=3) as r:
        return json.loads(r.read().decode("utf-8"))

try:
    targets = get_json("/json")
    print("TARGETS:", len(targets))
    for t in targets:
        print("  -", t.get("type"), "|", t.get("title", "")[:50], "|", t.get("url", "")[:60])
except Exception as e:
    print("ERROR listing targets:", e)
    sys.exit(1)

# 找页面目标（renderer）
page = None
for t in targets:
    if t.get("type") == "page":
        page = t
    if t.get("type") == "page" and "project" in t.get("url", ""):
        page = t
        break
if not page:
    print("NO page target found")
    sys.exit(1)

ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=15)
msg_id = 0

def send(method, params=None):
    global msg_id
    msg_id += 1
    ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            return resp.get("result", {})

def evaluate(expr):
    r = send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
    return r.get("result", {}).get("value")

# 允许 require
send("Runtime.enable")

# 检查 i18n currentLocale 与页签名
print("\n--- DIAG ---")
try:
    loc = evaluate("require('eez-studio-shared/i18n').currentLocale.get()")
    print("currentLocale:", loc)
except Exception as e:
    print("locale probe err:", e)

try:
    tabs = evaluate("""
        (() => {
            try {
                const lm = require('project-editor/store/layout-models');
                const m = lm.layoutModels ? (lm.layoutModels.root || lm.layoutModels.rootEditor) : undefined;
                if (!m) return { err: 'no model' };
                const out = [];
                m.visitNodes(n => {
                    if (n instanceof require('flexlayout-react').TabNode) {
                        out.push({ id: n.getId(), name: n.getName(), comp: n.getComponent() });
                    }
                });
                return out;
            } catch (e) { return { err: String(e) }; }
        })()
    """)
    print("TABS @model:", json.dumps(tabs, ensure_ascii=False))
except Exception as e:
    print("tabs probe err:", e)

try:
    dom = evaluate("""
        (() => {
            const tabs = document.querySelectorAll('.flexlayout__tab_button_text');
            return Array.from(tabs).map(t => t.textContent).join(' | ');
        })()
    """)
    print("DOM TAB TEXTS:", dom)
except Exception as e:
    print("dom probe err:", e)

ws.close()
