import { useEffect, useState } from "react";

interface Skills {
  id: number;
  name: string;
}

function TestRandomSkill() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomSkills = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/skills/random");

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data: Skills[] = await response.json();
        setSkills(data);
        console.log(data[0]["name"]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomSkills();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  async function sendClick(id: number) {
    let input = document.getElementById("jd") as HTMLInputElement | null;
    let jobTitle;

    if (input) jobTitle = input.value;
    console.log(id + " " + jobTitle);

    await fetch("http://localhost:1337/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillId: id,
        jobTitle: jobTitle,
      }),
    });
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Skills</h1>
      <label htmlFor="jd" className="m-1">
        Job Description
      </label>
      <input type="text" className="border-1" id="jd"></input>
      <ul>
        {skills.map((user) => (
          <li key={user.id}>
            <button
              className="m-1 px-2 py-1 rounded bg-blue-600 text-white font-medium 
             hover:bg-blue-400 active:bg-blue-800 
             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
             transition-colors duration-200"
              onClick={() => {
                sendClick(user["id"]);
              }}
            >
              {user["name"]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestRandomSkill;
