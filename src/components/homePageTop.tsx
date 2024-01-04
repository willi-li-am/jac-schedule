import bgPic from "../assets/JAC_ICON.png";

export default function HomePageTop() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: "60vh",
        backgroundImage: "linear-gradient(to bottom, #819fcc, #323d54)",
      }}
    >
      <div
        className="text-white font-title mt-10 p-2"
        style={{ fontSize: "40px" }}
      >
        Mock Visual Schedule Builder for CEGEP
      </div>
      <div
        className="text-white italic p-2"
        style={{ fontSize: "20px", marginTop: "" }}
      >
        "inspiring quote about helping students"
      </div>
    </div>
  );
}
