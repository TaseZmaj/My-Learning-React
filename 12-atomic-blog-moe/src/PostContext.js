import { createContext, useState, useContext } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//SHABLON (za Context API):

// 1) CREATE A CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  //PAZI: pazi gi searchedPosts -> ako titleot ili body-to sodrzat searchQuery
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

//custom hook usePosts()
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("Post context was used outside of the PostProvider");
  return context;
}

//namesto Default export, ...
// export default PostProvider;

// 1)
//napravi Named export:
// export { PostProvider, PostContext };
//bidejki morasi PostProvider-ot i ContextProvider-ot da gi exportnesh
//bidejki gi koristis na posebni mesta

//2) Namesto ova gore, za da nemoras vo sekoj komponent posebno
//da pishuvas const {neshto} = useContext(PostContext), go pravis
//vo custom Hook (vo istiot file bidejki taka obicno se pravi),
//i namesto exportot gore, go pravis vaka:
export { PostProvider, usePosts };
