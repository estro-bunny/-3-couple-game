const LOVENSE_TOKEN_URL = "https://api.lovense-api.com/api/basicApi/getToken";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: JSON.stringify({ message: "Method not allowed" }) };
  }

  const developerToken = process.env.LOVENSE_DEVELOPER_TOKEN;
  const platform = process.env.LOVENSE_PLATFORM || "CouplePlayHub";

  if (!developerToken) {
    return { statusCode: 503, body: JSON.stringify({ message: "Lovense is not configured on this deployment yet." }) };
  }

  let requestedUid = null;
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    requestedUid = typeof body.uid === "string" ? body.uid.trim() : null;
  } catch {}

  const uid = requestedUid && /^cph_[a-f0-9]{32}$/.test(requestedUid)
    ? requestedUid
    : "cph_" + crypto.randomUUID().replaceAll("-", "");

  try {
    const response = await fetch(LOVENSE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: developerToken, uid, uname: "CouplePlayHub player", utoken: uid }),
    });
    const data = await response.json();

    if (!response.ok || data.code !== 0 || !data.data?.authToken) {
      return { statusCode: 502, body: JSON.stringify({ message: data.message || "Lovense token request failed." }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ authToken: data.data.authToken, uid, platform }),
    };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ message: "Unable to reach Lovense right now." }) };
  }
};
