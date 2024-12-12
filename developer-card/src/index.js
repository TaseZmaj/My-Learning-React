import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import stefan from "./assets/stefan.jpg";

const skillList = [
  { name: "HTML+CSS", level: "advanced", color: "blue" },
  { name: "Photoshop", level: "intermediate", color: "red" },
  { name: "Javascript", level: "intermediate", color: "yellow" },
  { name: "React", level: "beginner", color: "orange" },
  { name: "Word, Excel, PowerPoint", level: "advanced", color: "teal" },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <>
      <img className="avatar" src={stefan} alt="stefan img" />
    </>
  );
}
function Intro() {
  return (
    <div>
      <h1>Stefan Tasevski</h1>
      <p>
        Aspiring front-end developer, soon to be fully specialized in React
        developement with Next.js, GraphQL etc etc.
      </p>
    </div>
  );
}
function SkillList() {
  return (
    <ul className="skill-list" style={{ listStyleType: "none" }}>
      {skillList.map((skill, index) => (
        <li key={index}>
          <Skill data={skill} />
        </li>
      ))}
    </ul>
  );
}
function Skill({ data }) {
  const { name, color, level } = data;

  //#1 Nacin
  // let emoji;
  // switch (level) {
  //   case "beginner":
  //     emoji = "👶";
  //     break;
  //   case "intermediate":
  //     emoji = "👍";
  //     break;
  //   case "advanced":
  //     emoji = "💪";
  //     break;
  //   default:
  //     emoji = "";
  // }

  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{name}</span>
      {/* {emoji} */}
      {/* #2 Nacin */}
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
