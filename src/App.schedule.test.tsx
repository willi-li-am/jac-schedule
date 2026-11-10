import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Schedule from "./components/schedule";

jest.mock("@vercel/analytics/react", () => ({ Analytics: () => null }), {
  virtual: true,
});

const mockCoursePick = jest.fn((_props: any) => null);

jest.mock("./components/coursePick", () => ({
  __esModule: true,
  default: (props: unknown) => mockCoursePick(props),
}));

function picker() {
  const calls = mockCoursePick.mock.calls;
  return calls[calls.length - 1][0];
}

const first = {
  type: "custom",
  schedule: { M: "", T: "0900-1000", W: "", R: "", F: "" },
};
const second = {
  type: "custom",
  schedule: { M: "1000-1100", T: "", W: "", R: "", F: "" },
};

function renderPlanner() {
  render(
    <MemoryRouter initialEntries={["/create"]}>
      <App />
    </MemoryRouter>,
  );
  act(() => {
    picker().setCoursePicked(["FIRST", "SECOND"]);
    picker().setCourseInfo([[first], [second]]);
  });
  act(() => picker().addCourse(first, "FIRST", 0));
  act(() => picker().addCourse(second, "SECOND", 0));
}

test("deleting a course preserves every day for the remaining section", () => {
  renderPlanner();
  act(() => picker().removeCourseCode("FIRST"));

  expect(picker().coursePicked).toEqual(["SECOND"]);
  expect(picker().courseIndexPicked).toEqual({ SECOND: 0 });
  expect(picker().schedule).toEqual({
    M: ["1000-1100"],
    T: [""],
    W: [""],
    R: [""],
    F: [""],
  });
});

test("removing a section with a missing time leaves other sections intact", () => {
  renderPlanner();
  act(() => picker().setSchedule({ ...picker().schedule, T: ["1100-1200"] }));
  act(() => picker().removeCourse(first, "FIRST"));

  expect(picker().courseIndexPicked).toEqual({ SECOND: 0 });
  expect(picker().schedule.T).toEqual(["1100-1200"]);
});

test("deleting an unknown course keeps all courses", () => {
  renderPlanner();
  act(() => picker().removeCourseCode("MISSING"));

  expect(picker().coursePicked).toEqual(["FIRST", "SECOND"]);
  expect(picker().courseInfo).toEqual([[first], [second]]);
});

test("previewing a section preserves the original course type", () => {
  renderPlanner();
  const course = { ...first };
  act(() => picker().addHoverCourse(course, "FIRST"));

  expect(picker().hoverCourse.current.course.type).toBe("hover");
  expect(course.type).toBe("custom");
});

test("rendering a custom block preserves its course type and label", () => {
  const course = Object.freeze({ ...first, title: "Custom block" });

  render(
    <Schedule
      courseInfo={[[course]]}
      coursePicked={["FIRST"]}
      courseIndexPicked={{ FIRST: 0 }}
      colorList={{ FIRST: { background: "#394351" } }}
      hoverCourse={{ current: {} }}
    />,
  );

  expect(screen.getByText("FIRST")).toBeInTheDocument();
  expect(course.type).toBe("custom");
});
