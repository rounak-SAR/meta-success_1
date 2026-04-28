const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getPageContent(pageName: string) {
  try {
    const endpoint = pageName === "homepage" ? "homepage" : pageName;
    const response = await fetch(`${API_URL}/${endpoint}`, { cache: "no-store" });
    if (!response.ok) throw new Error('Failed to fetch content');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export async function submitContactMessage(payload: ContactPayload) {
  const response = await fetch(`${API_URL}/contact/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.error || data?.message || "Failed to send message");
  }

  return response.json();
}
