const FAKE_PATHS = new Set([
  "LHJ초코",
  "LHJ동글",
  "LHJ동글동글",
  "LHJ초코초코",
  "LHJ동글초코"
]);
const REAL_PATH = "LHJ초코동글";

function response(html, status = 200, extra = {}) {
  const headers = new Headers({
    "Content-Type": "text/html; charset=UTF-8",
    "Cache-Control": "no-store, private",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    ...extra
  });
  return new Response(html, { status, headers });
}

function login(pathName) {
  return response(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>접근 확인</title><style>*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,"Noto Sans KR",sans-serif}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#111b46,#07102b 55%,#04091a);color:#fff}.card{width:min(440px,calc(100% - 40px));padding:44px 34px;text-align:center;border:1px solid rgba(255,255,255,.16);border-radius:22px;background:rgba(255,255,255,.045);box-shadow:0 20px 60px rgba(0,0,0,.28)}.badge{font-size:12px;letter-spacing:.18em;color:#9da9ff;margin-bottom:18px}h1{font-size:28px;margin:0 0 10px}p{font-size:15px;color:#aeb7cf;margin:0 0 28px}input{width:100%;padding:15px 16px;border-radius:10px;border:1px solid #394462;background:#0b1430;color:#fff;font-size:16px;outline:none}button{width:100%;margin-top:12px;padding:15px;border:0;border-radius:10px;background:#8066ff;color:#fff;font-size:16px;font-weight:700;cursor:pointer}.err{min-height:22px;margin-top:14px;color:#ff8e9d;font-size:13px}</style></head><body><main class="card"><div class="badge">ACCESS</div><h1>접근 확인</h1><p>비밀번호를 입력해 주세요.</p><form id="form"><input id="pw" type="password" autocomplete="current-password" autofocus><button>확인</button></form><div id="err" class="err"></div></main><script>const f=document.getElementById('form'),p=document.getElementById('pw'),e=document.getElementById('err');f.addEventListener('submit',async ev=>{ev.preventDefault();e.textContent='';try{const r=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p.value})});if(r.ok)location.reload();else{e.textContent='비밀번호가 올바르지 않습니다.';p.select()}}catch{e.textContent='잠시 후 다시 시도해 주세요.'}});</script></body></html>`);
}

function fakePage(pathName) {
  return response(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>페이지 공사중</title><style>*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,"Noto Sans KR",sans-serif}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#111b46,#07102b 55%,#04091a);color:#fff}.card{width:min(760px,calc(100% - 40px));padding:56px 42px;text-align:center;border:1px solid rgba(255,255,255,.16);border-radius:24px;background:rgba(255,255,255,.045)}.badge{font-size:12px;letter-spacing:.2em;color:#9da9ff;margin-bottom:20px}h1{font-size:clamp(30px,5vw,52px);margin:0 0 18px}p{font-size:17px;line-height:1.7;color:#cbd2e8}.small{font-size:13px;color:#7f89a5;margin-top:28px}</style></head><body><main class="card"><div class="badge">UNDER CONSTRUCTION</div><h1>페이지 공사중입니다.</h1><p>현재 페이지를 준비하고 있습니다.<br>조금만 기다려 주세요.</p><div class="small">${pathName}</div></main></body></html>`);
}

function realPage() {
  return response(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>LHJ초코동글</title><style>*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,"Noto Sans KR",sans-serif}body{min-height:100vh;background:linear-gradient(160deg,#111b46,#07102b 55%,#04091a);color:#fff}.wrap{width:min(1100px,calc(100% - 40px));margin:auto;padding:90px 0}.badge{font-size:12px;letter-spacing:.2em;color:#9da9ff;margin-bottom:18px}h1{font-size:clamp(38px,7vw,76px);margin:0 0 18px}p{font-size:18px;line-height:1.8;color:#cbd2e8}</style></head><body><main class="wrap"><div class="badge">PERSONAL SPACE</div><h1>LHJ초코동글</h1><p>개인 페이지입니다.<br>이 공간에서 개인용 콘텐츠를 별도로 구현합니다.</p></main></body></html>`);
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const raw = Array.isArray(params.path) ? params.path : [params.path];
  const pathName = raw.filter(Boolean).join("/");
  if (pathName.includes("/")) return new Response("Not Found", { status: 404 });

  let kind = null;
  if (FAKE_PATHS.has(pathName)) kind = "fake";
  else if (pathName === REAL_PATH) kind = "real";
  else return new Response("Not Found", { status: 404 });

  const password = kind === "real"
    ? (env.LHJ_CHOCODONGLE_PASSWORD || "750503&20240626!")
    : (env.LHJ_FAKE_PASSWORD || "20240626");

  const cookieName = kind === "real" ? "lhj_real_access" : `lhj_fake_${encodeURIComponent(pathName)}`;
  const cookie = request.headers.get("Cookie") || "";
  const session = cookie.split(";").map(v=>v.trim()).find(v=>v.startsWith(cookieName + "="));

  if (request.method === "POST") {
    let body = {};
    try { body = await request.json(); } catch {}
    if ((body.password || "") !== password) return new Response("Unauthorized", {status:401,headers:{"Cache-Control":"no-store"}});
    const headers = new Headers({"Cache-Control":"no-store","Location":request.url});
    headers.append("Set-Cookie", `${cookieName}=1; Max-Age=28800; Path=/archive/${encodeURIComponent(pathName)}/; Secure; HttpOnly; SameSite=Strict`);
    return new Response(null,{status:303,headers});
  }

  if (session === cookieName + "=1") return kind === "real" ? realPage() : fakePage(pathName);
  return login(pathName);
}
