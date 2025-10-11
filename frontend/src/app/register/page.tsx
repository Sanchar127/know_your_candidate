'use client';
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: { name: string; email: string; password: string }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please login.");
        router.push("/login");
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return <AuthForm mode="register" onSubmit={handleSubmit} />;
}
