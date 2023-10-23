import TimeTable from "./TimeTable";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atom/TimeTable",
  component: TimeTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const openingHours = {
  args: {
    start_time: "2023-10-16T00:00",
    end_time: "2023-10-16T23:59",
    bookedTime: [
      {
        start_time: "2023-10-15T23:00:00",
        end_time: "2023-10-16T02:00:00",
      },
      {
        start_time: "2023-10-16T07:00:00",
        end_time: "2023-10-16T09:00:00",
      },
      {
        start_time: "2023-10-16T04:00:00",
        end_time: "2023-10-16T06:00:00",
      },
      {
        start_time: "2023-10-16T20:00:00",
        end_time: "2023-10-16T21:00:00",
      },
      {
        start_time: "2023-10-16T19:00:00",
        end_time: "2023-10-16T20:00:00",
      },
      {
        start_time: "2023-10-16T23:00:00",
        end_time: "2023-10-17T01:30:00",
      },
    ],
  },
};
