/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders only title and author by default", () => {
  const user = {
    username: "superuser",
  };
  const blog = {
    title: "An awesome blog",
    author: "Random Guy",
    url: "www.awesomeblogs.com/awesome-test-blog",
    user: {
      username: "superuser",
    },
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const element = container.querySelector(".blog");
  expect(element).toHaveTextContent("An awesome blog Random Guy");
  const blogDetails = container.querySelector(".blog-details");
  expect(blogDetails).toHaveStyle("display: none");
});

test("url and likes are shown on click", async () => {
  const user = {
    username: "superuser",
  };
  const blog = {
    title: "An awesome blog",
    author: "Random Guy",
    url: "www.awesomeblogs.com/awesome-test-blog",
    user: {
      username: "superuser",
    },
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const userTester = userEvent.setup();
  const button = container.querySelector(".hide-blog-button");
  await userTester.click(button);

  const blogDetails = container.querySelector(".blog-details");
  expect(blogDetails).not.toHaveStyle("display: none");
});

test("if like button clicked twice, event handler is called twice", async () => {
  const user = {
    username: "superuser",
  };
  const blog = {
    title: "An awesome blog",
    author: "Random Guy",
    url: "www.awesomeblogs.com/awesome-test-blog",
    user: {
      username: "superuser",
    },
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />,
  );

  const userTester = userEvent.setup();
  const button = container.querySelector(".like-blog-button");
  await userTester.click(button);
  await userTester.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
