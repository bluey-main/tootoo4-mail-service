import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactEmail from "../emails/contact-email";
import { OrderConfirmationEmail } from "../emails/order-user-email"; // ✅ import your new email template
import React from "react";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------- CONTACT EMAIL ENDPOINT ----------------

interface ContactFormData {
  from_name: string;
  from_email: string;
  phone_number: string;
  message: string;
  subject: string;
}

const sendEmailHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    to,
    subject,
    formData,
  }: { to: string; subject: string; formData: ContactFormData } = req.body;

  try {
    const emailHtml = await render(React.createElement(ContactEmail, formData));
    const emailText = `
New Contact Form Submission

Name: ${formData.from_name}
Email: ${formData.from_email}
Phone: ${formData.phone_number}
Subject: ${formData.subject}

Message:
${formData.message}
    `.trim();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
      text: emailText,
    });

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: error.message });
  }
};

app.post("/send-email", sendEmailHandler);

// ---------------- ORDER CONFIRMATION ENDPOINT ----------------

interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
}

interface OrderEmailData {
  customer_name: string;
  order_id: string;
  products: OrderProduct[];
  total: number;
  note?: string;
}

const sendOrderEmailHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    to,
    subject,
    orderData,
  }: { to: string; subject: string; orderData: OrderEmailData } = req.body;

  try {
    // Render the React email with order details
    const emailHtml = await render(React.createElement(OrderConfirmationEmail, orderData));

    // Plain text fallback
    const productLines = orderData.products
      .map(
        (p) => `${p.name} — ${p.quantity} × $${p.price.toFixed(2)} = $${(p.price * p.quantity).toFixed(2)}`
      )
      .join("\n");

    const emailText = `
Order Confirmation - ${orderData.order_id}

Hello ${orderData.customer_name},

Thank you for your purchase! Here are your order details:

${productLines}

Total: $${orderData.total.toFixed(2)}
${orderData.note ? `\nNote: ${orderData.note}` : ""}

We appreciate your business!
`.trim();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to:"victorekeochaibe@gmail.com",
      subject: subject || `Order Confirmation #${orderData.order_id}`,
      html: emailHtml,
      text: emailText,
    });

    res.status(200).json({ success: true, data });

    console.log("ORDER EMAIL SENT", data )
  } catch (error: any) {
    console.error("Order email sending error:", error);
    res.status(500).json({ error: error.message });
  }
};

app.post("/send-order-email", sendOrderEmailHandler);

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
