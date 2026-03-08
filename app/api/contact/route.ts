import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// TODO: Once floridaexecutiverealty.com is verified in Resend, add gina@floridaexecutiverealty.com here
const TO_EMAIL = "limafoxtrotshipping@proton.me";
const FROM_EMAIL = "GinaBartelWebsite <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const {
      name,
      email,
      phone,
      preferredContact,
      interest,
      timeline,
      priceRange,
      beds,
      baths,
      areas,
      priorities,
      notes,
      listing,
      subject,
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const emailSubject = subject
      ? `Website Inquiry: ${subject}`
      : `New Consultation Request from ${name}`;

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #1a1a1a; padding: 24px 32px;">
          <p style="color: #c9a84c; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 6px;">
            New Inquiry — GinaBartelWebsite.vercel.app
          </p>
          <h1 style="color: #ffffff; font-size: 22px; margin: 0;">${emailSubject}</h1>
        </div>

        <div style="padding: 32px; background: #fafafa; border: 1px solid #e8e0d4;">

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888; width: 40%;">Name</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Email</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">
                <a href="mailto:${email}" style="color: #c9a84c;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Phone</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">
                <a href="tel:${phone}" style="color: #c9a84c;">${phone}</a>
              </td>
            </tr>` : ""}
            ${preferredContact ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Preferred Contact</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${preferredContact}</td>
            </tr>` : ""}
            ${interest ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Interested In</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${interest}</td>
            </tr>` : ""}
            ${timeline ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Timeline</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${timeline}</td>
            </tr>` : ""}
            ${priceRange ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Price Range</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${priceRange}</td>
            </tr>` : ""}
            ${(beds || baths) ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Beds / Baths</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${beds || "—"} bd / ${baths || "—"} ba</td>
            </tr>` : ""}
            ${areas ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Preferred Areas</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${areas}</td>
            </tr>` : ""}
            ${listing ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0; color: #888;">Re: Listing</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ede8e0;">${listing}</td>
            </tr>` : ""}
          </table>

          ${priorities ? `
          <div style="margin-top: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #c9a84c; margin-bottom: 8px;">Family Priorities</p>
            <p style="font-size: 14px; line-height: 1.7; background: #fff; border: 1px solid #ede8e0; padding: 14px 16px; border-radius: 8px;">${priorities}</p>
          </div>` : ""}

          ${notes ? `
          <div style="margin-top: 16px;">
            <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #888; margin-bottom: 8px;">Additional Notes</p>
            <p style="font-size: 14px; line-height: 1.7; background: #fff; border: 1px solid #ede8e0; padding: 14px 16px; border-radius: 8px;">${notes}</p>
          </div>` : ""}

          <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #ede8e0;">
            <a href="mailto:${email}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 10px 24px; border-radius: 999px; font-size: 13px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>

        </div>

        <div style="padding: 16px 32px; font-size: 11px; color: #aaa; text-align: center;">
          Sent via ginabartelwebsite.vercel.app
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: `Resend error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
