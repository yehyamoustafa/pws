// /api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name = "", email = "", message = "" } = req.body || {};

    // Basic validation
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message.trim()) {
      return res.status(400).json({ error: "Please provide a valid name, email, and message." });
    }

    // Send email via Resend (no package needed)
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Yehya Portfolio <onboarding@resend.dev>", // works without domain verification
        to: ["yehyamoustafa.prime@gmail.com"],
        reply_to: email, // clicking reply goes to the sender
        subject: `New message from ${name}`,
        html: `
          <h2>New portfolio contact</h2>
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Message:</b></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(502).json({ error: "Email provider error", details: err });
    }

    return res.status(200).json({ success: true, message: "Thanks! Your message was sent." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}

// Simple HTML-escape to avoid injection
function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
