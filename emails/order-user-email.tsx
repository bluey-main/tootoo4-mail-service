import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface OrderEmailProps {
  customerName?: string;
  orderId?: string;
  items?: OrderItem[];
  total?: number;
}

export const OrderConfirmationEmail = ({
  customerName = "John Doe",
  orderId = "ORD-12345",
  items = [
    { productName: "Leather Strap  Watch", quantity: 1, price: 129.99 },
    { productName: "Silver Chain Bracelet", quantity: 2, price: 49.99 },
  ],
  total = 229.97,
}: OrderEmailProps) => {
  const previewText = `Order Confirmation - ${orderId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo */}
          <Section style={logoSection}>
            <Img
              src="https://sstqqebhxjxkcxuaxtcl.supabase.co/storage/v1/object/public/product-images/tootoo-assets/Screenshot%202025-10-05%20185341.png"
              alt="Company Logo"
              width="200"
              height="100"
              style={{
                display: "block",
                margin: "0 auto 20px",
                maxWidth: "100%",
              }}
            />
          </Section>

          {/* Greeting */}
          <Section style={section}>
            <Heading style={h2}>Order Confirmation</Heading>
            <Text style={text}>
              Hi <strong>{customerName}</strong>,<br />
              Thank you for your purchase! We’ve received your order and are
              preparing it for shipment.
            </Text>
            <Text style={text}>
              <strong>Order ID:</strong> {orderId}
            </Text>
          </Section>

          {/* Order Summary */}
          <Section style={infoSection}>
            <Heading style={h3}>Order Summary</Heading>

            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Product</th>
                  <th style={th}>Qty</th>
                  <th style={th}>Price</th>
                  <th style={th}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                { items&&items?.map((item, index) => (
                  <tr key={index}>
                    <td style={td}>{item.productName}</td>
                    <td style={tdCenter}>{item.quantity}</td>
                    <td style={td}>${item.price.toFixed(2)}</td>
                    <td style={td}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Hr style={hr} />

            <Text style={totalText}>
              <strong>Total:</strong> ${total.toFixed(2)}
            </Text>
          </Section>

          {/* Thank You Note */}
          <Section style={thankYouSection}>
            <Text style={thankYouText}>
              We appreciate your business and hope you enjoy your purchase.
              <br />
              You’ll receive another email once your order ships.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Tootoo Store — All rights
              reserved.
              <br />
              <Link href="https://yourstore.com" style={link}>
                Visit our website
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

/* ==================== STYLES ==================== */
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  padding: "0",
  margin: "40px auto",
  maxWidth: "600px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
  height: "100px",
  backgroundColor: "#000",
};

const section = {
  margin: "24px 0",
};

const h2 = {
  color: "#1f2937",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const h3 = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 12px 0",
};

const text = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const infoSection = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "10px",
};

const th = {
  textAlign: "left" as const,
  borderBottom: "1px solid #e5e7eb",
  padding: "8px",
  color: "#374151",
  fontSize: "14px",
};

const td = {
  borderBottom: "1px solid #f0f0f0",
  padding: "8px",
  color: "#1f2937",
  fontSize: "14px",
};

const tdCenter = {
  ...td,
  textAlign: "center" as const,
};

const totalText = {
  textAlign: "right" as const,
  color: "#111827",
  fontSize: "16px",
  fontWeight: "700",
  marginTop: "12px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const thankYouSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const thankYouText = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
};

const footer = {
  textAlign: "center" as const,
  margin: "32px 0 0 0",
};

const footerText = {
  color: "#9ca3af",
  backgroundColor: "#0d0d0d",
  padding: "20px",
  fontSize: "12px",
  margin: "0",
};

const link = {
  color: "#3b82f6",
  fontSize: "14px",
  textDecoration: "underline",
};
