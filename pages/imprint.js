export default function Imprint() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Imprint</h1>
      <p><strong>Founder:</strong> Mateo LP</p>
      <p><strong>Email:</strong> you@example.com</p>
      <p><strong>LinkedIn:</strong> https://linkedin.com/in/yourprofile</p>
      <p><strong>Cooperations:</strong> Academic and research institutes welcome</p>
      <p><strong>Copyright:</strong> © {new Date().getFullYear()} Mateo LP. All rights reserved.</p>
    </div>
  );
}