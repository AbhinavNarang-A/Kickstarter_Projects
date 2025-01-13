// import { renderHook, act } from "@testing-library/react-hooks";
// import useFetch from "./usefetch";

// describe("useFetch", () => {
//   beforeEach(() => {
//     global.fetch = jest.fn();
//   });

//   it("should return loading state initially", () => {
//     global.fetch.mockResolvedValueOnce({
//       json: () => Promise.resolve([]),
//     });

//     const { result } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     expect(result.current.loading).toBe(true);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBeNull();
//   });

//   it("should fetch data successfully and return it", async () => {
//     const mockData = [
//       { "s.no": 1, "percentage.funded": "75%", "amt.pledged": "$10,000" },
//     ];

//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     });

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     await waitForNextUpdate();

//     expect(result.current.loading).toBe(false);
//     expect(result.current.data).toEqual(mockData);
//     expect(result.current.error).toBeNull();
//   });

//   it("should handle errors and set the error state", async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: false,
//       status: 404,
//       json: () => Promise.resolve({ message: "Not found" }),
//     });

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     await waitForNextUpdate();

//     // Check if error state is set properly
//     expect(result.current.loading).toBe(false);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBe("HTTP error! status: 404");
//   });

//   it("should handle errors on network failure", async () => {
//     global.fetch.mockRejectedValueOnce(new Error("Network Error"));

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     await waitForNextUpdate();

//     expect(result.current.loading).toBe(false);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBe("Network Error");
//   });

//   it("should return empty data if response is not ok (status 500)", async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: false,
//       status: 500,
//       json: () => Promise.resolve({ message: "Internal Server Error" }),
//     });

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     await waitForNextUpdate();

//     expect(result.current.loading).toBe(false);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBe("HTTP error! status: 500");
//   });

//   it("should cleanup properly and not update state after unmount", async () => {
//     global.fetch.mockResolvedValueOnce({
//       json: () => Promise.resolve([{ "s.no": 1, "percentage.funded": "75%" }]),
//     });

//     const { result, unmount } = renderHook(() =>
//       useFetch("https://api.example.com/projects")
//     );

//     unmount();

//     expect(result.current.loading).toBe(true);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBeNull();
//   });
// });
