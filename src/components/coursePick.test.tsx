import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CoursePick from "./coursePick";

jest.mock("./schedule", () => ({ __esModule: true, default: () => null }));
jest.mock("./input", () => ({
  __esModule: true,
  default: ({ handleFormSubmit, school }: any) => (
    <button onClick={event => handleFormSubmit(event, school, " 201-nya-05 ")}>Submit course</button>
  ),
}));

const originalFetch = global.fetch;
const fetchMock = jest.fn();
const section = {
  section: "00001",
  title: "Calculus I",
  schedule: { M: "0830-1000", T: "", W: "", R: "", F: "" },
};

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
  jest.spyOn(window, "alert").mockImplementation(() => undefined);
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

function renderCoursePicker(courseList: string[] | "") {
  const setCoursePicked = jest.fn();
  render(<CoursePick
    lastPage="/create"
    school="JAC"
    courseList={courseList}
    courseInfo={[]}
    coursePicked={[]}
    courseInfoCache={{}}
    autoComplete={{ current: { insert: jest.fn() } }}
    setCoursePicked={setCoursePicked}
    setCourseList={jest.fn()}
    setCourseInfo={jest.fn()}
    setCourseInfoCache={jest.fn()}
    setColorList={jest.fn()}
  />);
  return { submit: screen.getByRole("button", { name: "Submit course" }), setCoursePicked };
}

test("deduplicates a pending section request and allows a retry after a server error", async () => {
  fetchMock.mockResolvedValueOnce({ ok: false, status: 503 });
  const { submit, setCoursePicked } = renderCoursePicker(["201-NYA-05"]);

  fireEvent.click(submit);
  fireEvent.click(submit);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));

  fetchMock.mockResolvedValueOnce({ ok: true, json: async () => [section] });
  fireEvent.click(submit);
  await waitFor(() => expect(setCoursePicked).toHaveBeenCalledTimes(1));
  expect(setCoursePicked.mock.calls[0][0]([])).toEqual(["201-NYA-05"]);
  expect(fetchMock).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/course\/JAC\/201-NYA-05$/),
    expect.objectContaining({ credentials: "omit" }),
  );
});

test("a failed catalog list request keeps the course form usable", async () => {
  fetchMock.mockRejectedValueOnce(new TypeError("Network unavailable"));
  const { submit, setCoursePicked } = renderCoursePicker("");
  fireEvent.click(submit);
  await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
  expect(setCoursePicked).toHaveBeenCalledTimes(0);

  fetchMock
    .mockResolvedValueOnce({ ok: true, json: async () => ["201-NYA-05"] })
    .mockResolvedValueOnce({ ok: true, json: async () => [section] });
  fireEvent.click(submit);
  await waitFor(() => expect(setCoursePicked).toHaveBeenCalledTimes(1));
  expect(fetchMock).toHaveBeenCalledTimes(3);
});

test("an incomplete section response can be retried without adding a broken course", async () => {
  fetchMock
    .mockResolvedValueOnce({ ok: true, json: async () => [{ section: "00001" }] })
    .mockResolvedValueOnce({ ok: true, json: async () => [section] });
  const { submit, setCoursePicked } = renderCoursePicker(["201-NYA-05"]);

  fireEvent.click(submit);
  await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
  expect(setCoursePicked).toHaveBeenCalledTimes(0);

  fireEvent.click(submit);
  await waitFor(() => expect(setCoursePicked).toHaveBeenCalledTimes(1));
});
