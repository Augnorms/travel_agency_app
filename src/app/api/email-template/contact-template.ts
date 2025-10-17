export function contactTemplate({ firstname, lastname, email, phone, message, }: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    message: string;
}) {
    return `
    <div style="margin:0; padding:40px 0; background:#f3f3f3; background-image: url('https://shamasistercitycommission.co.uk/assets/background-image.svg'); background-size: cover; background-position: center; text-align:center;">
        <div style="max-width:600px; margin:0 auto; background:white; border-radius:15px; padding:30px; box-shadow:0 8px 20px rgba(0,0,0,0.15); text-align:left;">

        <h2 style="color:#1a1a1a; text-align:center;">📩 New Contact Message</h2>
        <hr style="border:none; border-top:2px solid #eee; margin:20px 0;"/>

        <p><strong>First Name:</strong> ${firstname}</p>
        <p><strong>Last Name:</strong> ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <div style="margin-top:20px;">
            <p><strong>Message:</strong></p>
            <div style="background:#f9f9f9; padding:15px; border-radius:8px; line-height:1.5;">
            ${message.replace(/\n/g, "<br/>")}
            </div>
        </div>

        <hr style="border:none; border-top:2px solid #eee; margin:30px 0;"/>
        <footer style="text-align:center; color:#777; font-size:13px;">
            <p>© ${new Date().getFullYear()} Shama Sister City Commission</p>
            <p>
            <a href="https://shamasistercitycommission.co.uk" style="color:#007bff; text-decoration:none;">Visit our Website</a>
            </p>
        </footer>

        </div>
    </div>
    `
}